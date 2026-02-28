import React, { useState } from "react";
import { Box, Paper, Typography, Button, styled } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import { SASKATOON } from "./destinationRegistry";
import { Visit, visits } from "./visits";
import { AlbumLightbox } from "./components/AlbumLightbox";
import {
  formatDestinationLabel,
  formatVisitDateRange,
  getLatestVisit,
  isSelectedVisit,
  parseLocalDate,
} from "./helpers";
import { VerticalTravelTimeline } from "./components/VerticalTravelTimeline";
import { HorizontalTravelTimeline } from "./components/HorizontalTravelTimeline";
import { TravelMap } from "./components/TravelMap";
import { useWidth } from "hooks";
import { Crumbs } from "common/Crumbs";

const home = SASKATOON;

const PREFIX = "Travel";
const classes = {
  content: `${PREFIX}-content`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.content}`]: {
    maxWidth: theme.spacing(100),
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function Travel() {
  const width = useWidth();
  const isMobile = width !== "lg" && width !== "xl";
  const visibleVisits = visits.filter(
    (v) => parseLocalDate(v.startDate).getTime() - Date.now() <= ONE_WEEK_MS
  );
  const latestVisit = getLatestVisit(visibleVisits);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]); // Default center
  const [mapZoom, setMapZoom] = useState<number>(1); // Default zoom
  const [mapKey, setMapKey] = useState<number>(0); // Key to force map re-render
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(latestVisit);
  const resetSelectedVisit = () => setSelectedVisit(latestVisit);
  const isLatestVisitSelected =
    selectedVisit && latestVisit && isSelectedVisit(selectedVisit, latestVisit);

  // Sort places by date for timeline (most recent first)
  const sortedVisits = [...visibleVisits].sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  );

  // Handler to zoom to a specific location
  const handleZoomToCoordinates = (
    coordinates: [number, number],
    zoom?: number
  ) => {
    setMapCenter(coordinates);
    setMapZoom(zoom ?? 12);
    setMapKey((prev) => prev + 1); // Force map to re-render with new center
  };

  const handleZoomToVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    handleZoomToCoordinates(
      visit.destination.coordinates,
      visit.destination.zoom
    );
  };

  // Handler to reset zoom to world view
  const handleResetZoom = () => {
    resetSelectedVisit();
    setMapCenter([20, 0]);
    setMapZoom(1);
    setMapKey((prev) => prev + 1);
  };

  // Navigation handlers
  const handleNextVisit = () => {
    if (!selectedVisit) return;
    const currentIndex = sortedVisits.findIndex((v) =>
      isSelectedVisit(v, selectedVisit)
    );
    if (currentIndex > 0) {
      const prevVisit = sortedVisits[currentIndex - 1];
      handleZoomToVisit(prevVisit);
    }
  };

  const handlePreviousVisit = () => {
    if (!selectedVisit) return;
    const currentIndex = sortedVisits.findIndex((v) =>
      isSelectedVisit(v, selectedVisit)
    );
    if (currentIndex < sortedVisits.length - 1) {
      const nextVisit = sortedVisits[currentIndex + 1];
      handleZoomToVisit(nextVisit);
    }
  };

  const hasNextVisit = selectedVisit
    ? sortedVisits.findIndex((v) => isSelectedVisit(v, selectedVisit)) > 0
    : false;
  const hasPreviousVisit = selectedVisit
    ? sortedVisits.findIndex((v) => isSelectedVisit(v, selectedVisit)) <
      sortedVisits.length - 1
    : false;

  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/travel", label: "Travel" },
        ]}
      />
      <Box
        sx={{ display: "flex", minWidth: 0, flexDirection: "column", gap: 2 }}
      >
        <Box
          sx={{ display: "flex", gap: 2, height: isMobile ? "30vh" : "60vh" }}
        >
          {!isMobile && (
            <Paper
              elevation={3}
              sx={{ width: "300px", overflow: "auto", p: 2 }}
            >
              <VerticalTravelTimeline
                visits={sortedVisits}
                home={home}
                onZoomToVisit={handleZoomToVisit}
              />
            </Paper>
          )}

          <Paper elevation={3} sx={{ flex: 1, position: "relative" }}>
            <TravelMap
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              mapKey={mapKey.toString()}
              selectedVisit={selectedVisit}
              setSelectedVisit={setSelectedVisit}
              handleResetZoom={handleResetZoom}
            />
          </Paper>
        </Box>

        {isMobile && (
          <Paper elevation={3} sx={{ p: 2 }}>
            <HorizontalTravelTimeline
              visits={sortedVisits.reverse()}
              selectedVisit={selectedVisit}
              home={home}
              onZoomToVisit={handleZoomToVisit}
            />
          </Paper>
        )}

        {selectedVisit && (
          <VisitDetailPanel
            selectedVisit={selectedVisit}
            isLatestVisitSelected={isLatestVisitSelected ?? false}
            hasPreviousVisit={hasPreviousVisit}
            hasNextVisit={hasNextVisit}
            onPrevious={handlePreviousVisit}
            onNext={handleNextVisit}
            isMobile={isMobile}
          />
        )}
      </Box>
    </StyledPage>
  );
}

interface VisitDetailPanelProps {
  selectedVisit: Visit;
  isLatestVisitSelected: boolean;
  hasPreviousVisit: boolean;
  hasNextVisit: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isMobile: boolean;
}

const VisitDetailPanel: React.FC<VisitDetailPanelProps> = ({
  selectedVisit,
  isLatestVisitSelected,
  hasPreviousVisit,
  hasNextVisit,
  onPrevious,
  onNext,
  isMobile,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const isUpcomingVisit = parseLocalDate(selectedVisit.startDate) > new Date();
  const isCurrentlyVisiting =
    parseLocalDate(selectedVisit.startDate) <= new Date() &&
    parseLocalDate(selectedVisit.endDate) >= new Date();
  let visitPrefix = "I visited";
  if (isUpcomingVisit) {
    visitPrefix = "I will be visiting";
  } else if (isCurrentlyVisiting) {
    visitPrefix = "I am visiting";
  } else if (isLatestVisitSelected) {
    visitPrefix = "I last visited";
  }
  const daysCount =
    (parseLocalDate(selectedVisit.endDate).getTime() -
      parseLocalDate(selectedVisit.startDate).getTime()) /
      (1000 * 3600 * 24) +
    1;
  const daysStr = daysCount === 1 ? "a day" : `${daysCount} days`;
  const destinationLabel = formatDestinationLabel(selectedVisit.destination);

  const visitPhotoFolder = `/photos/travel/${
    selectedVisit.startDate
  }-${selectedVisit.destination.name.replace(/\s+/g, "_").toLowerCase()}/`;
  const photos = selectedVisit.photos.map((photo) => ({
    src: `${visitPhotoFolder}${photo.filename}`,
    width: photo.orientation === "portrait" ? 600 : 800,
    height: photo.orientation === "portrait" ? 800 : 600,
    alt: photo.caption,
    title: photo.caption,
  }));

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1">
          {visitPrefix} <strong>{destinationLabel}</strong> for {daysStr} from{" "}
          <strong>{formatVisitDateRange(selectedVisit)}</strong>
        </Typography>
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBack />}
              onClick={onPrevious}
              disabled={!hasPreviousVisit}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForward />}
              onClick={onNext}
              disabled={!hasNextVisit}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>

      {photos.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <MasonryPhotoAlbum
            photos={photos}
            render={{
              image: (props, context) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  {...props}
                  loading="lazy"
                  style={{
                    ...props.style,
                    cursor: "zoom-in",
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  onClick={() => setLightboxIndex(context.index)}
                />
              ),
              extras: (_, { photo }) => (
                <Typography
                  variant="caption"
                  sx={{ display: "block", textAlign: "center", mt: 0.5 }}
                >
                  {photo.alt}
                </Typography>
              ),
            }}
          />
        </Box>
      )}
      {photos.length <= 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Sorry, no photos uploaded yet!
        </Typography>
      )}
      <AlbumLightbox
        photos={photos.map((photo) => ({
          src: photo.src,
          description: photo.title,
        }))}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
      />
    </Paper>
  );
};

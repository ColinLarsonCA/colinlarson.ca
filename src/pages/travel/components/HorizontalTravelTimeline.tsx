import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Visit } from "../visits";
import { Destination } from "../destinationRegistry";
import {
  formatDestinationLabel,
  parseLocalDate,
  relativeTimeFromNow,
} from "../helpers";

export function HorizontalTravelTimeline(props: {
  visits: Visit[];
  selectedVisit: Visit | null;
  home: Destination;
  onZoomToVisit: (visit: Visit) => void;
}) {
  const { visits, selectedVisit, onZoomToVisit } = props;

  const selectedIndex = selectedVisit
    ? visits.findIndex((v) => v === selectedVisit)
    : -1;
  const startIndex = Math.max(0, selectedIndex - 1);
  const endIndex = Math.min(visits.length, selectedIndex + 2);
  const visibleVisits =
    selectedIndex === -1
      ? visits.slice(-3)
      : visits.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {visibleVisits.map((visit, index) => {
        const isSelected = selectedVisit ? visit === selectedVisit : false;
        return (
          <TimelineCard
            key={index}
            visit={visit}
            isSelected={isSelected}
            onZoom={onZoomToVisit}
          />
        );
      })}
    </Box>
  );
}

interface TimelineCardProps {
  visit: Visit;
  isSelected: boolean;
  onZoom: (visit: Visit) => void;
}

function TimelineCard({ visit, isSelected, onZoom }: TimelineCardProps) {
  const startDate = parseLocalDate(visit.startDate);
  const endDate = parseLocalDate(visit.endDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isCurrent = today >= startDate && today <= endDate;
  const isNext = startDate > today;

  let borderColor = "#4285F4";
  if (isCurrent) {
    borderColor = "#F4B942";
  } else if (isNext) {
    borderColor = "#9B59B6";
  }

  let secondaryText = "";
  if (isCurrent) {
    secondaryText = "now";
  } else if (isNext) {
    secondaryText = "soon";
  } else if (isSelected) {
    secondaryText = relativeTimeFromNow(visit);
  }

  const showSecondaryText = isSelected || isCurrent || isNext;

  return (
    <Card
      sx={{
        borderTop: `4px solid ${borderColor}`,
        flexShrink: 0,
        cursor: "pointer",
      }}
      elevation={isSelected ? 0 : 2}
      onClick={() => onZoom(visit)}
    >
      <CardContent>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontWeight: 500,
          }}
        >
          {formatDestinationLabel(visit.destination, {
            name: false,
            flag: false,
          })}
        </Typography>
        {showSecondaryText && (
          <Typography variant="body2" color="text.secondary">
            {secondaryText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

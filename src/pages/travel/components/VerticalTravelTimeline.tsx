import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Visit } from "../visits";
import { Destination } from "../destinationRegistry";
import { ZoomIn } from "@mui/icons-material";
import {
  formatDestinationLabel,
  formatVisitDateRange,
  isCurrentlyTraveling,
  parseLocalDate,
} from "../helpers";

export function VerticalTravelTimeline(props: {
  visits: Visit[];
  home: Destination;
  onZoomToVisit: (visit: Visit) => void;
}) {
  const { visits, home, onZoomToVisit } = props;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Travel Timeline
      </Typography>
      <List>
        {!isCurrentlyTraveling(visits) && (
          <ListItem
            sx={{
              borderLeft: "3px solid #2D6A4F",
              mb: 1,
              pl: 2,
              backgroundColor: "rgba(45, 106, 79, 0.05)",
              borderRadius: "4px",
            }}
          >
            <ListItemText
              primary="🏠 Currently at home"
              secondary={formatDestinationLabel(home)}
            />
          </ListItem>
        )}
        {visits.map((visit, index) => (
          <TimelineEntry
            key={index}
            visit={visit}
            index={index}
            sortedVisits={visits}
            onZoom={onZoomToVisit}
          />
        ))}
      </List>
    </>
  );
}

interface TimelineEntryProps {
  visit: Visit;
  index: number;
  sortedVisits: Visit[];
  onZoom: (visit: Visit) => void;
}

function TimelineEntry({
  visit,
  index,
  sortedVisits,
  onZoom,
}: TimelineEntryProps) {
  const startDate = parseLocalDate(visit.startDate);
  const endDate = parseLocalDate(visit.endDate);
  const dateRange = formatVisitDateRange(visit);

  const currentYear = endDate.getFullYear();
  const previousYear =
    index > 0
      ? parseLocalDate(sortedVisits[index - 1].endDate).getFullYear()
      : null;
  const showYearDivider = previousYear !== null && currentYear !== previousYear;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isCurrent = today >= startDate && today <= endDate;
  const isNext = startDate > today;

  let borderColor = "#4285F4";
  let emoji = "";
  let prefix = "";
  let suffix = "";
  if (isCurrent) {
    borderColor = "#F4B942";
    emoji = "⭐ ";
    prefix = "Currently in ";
  } else if (isNext) {
    borderColor = "#9B59B6";
    emoji = "✈️ ";
    prefix = "Next up: ";
  }

  return (
    <React.Fragment>
      {showYearDivider && (
        <Box
          sx={{ display: "flex", alignItems: "center", my: 2, opacity: 0.5 }}
        >
          <Box
            sx={{ flex: 1, height: "1px", backgroundColor: "text.secondary" }}
          />
          <Typography variant="caption" sx={{ px: 2, color: "text.secondary" }}>
            {currentYear}
          </Typography>
          <Box
            sx={{ flex: 1, height: "1px", backgroundColor: "text.secondary" }}
          />
        </Box>
      )}
      <ListItem
        sx={{
          borderLeft: `3px solid ${borderColor}`,
          mb: 1,
          pl: 2,
          backgroundColor: "rgba(66, 133, 244, 0.05)",
          borderRadius: "4px",
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="zoom to location"
            onClick={() => onZoom(visit)}
            size="small"
          >
            <ZoomIn />
          </IconButton>
        }
      >
        <ListItemText
          primary={`${emoji}${prefix}${formatDestinationLabel(
            visit.destination,
            { name: false, flag: true }
          )}${suffix}`}
          secondary={dateRange}
        />
      </ListItem>
    </React.Fragment>
  );
}

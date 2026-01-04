import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  ZoomOutMap,
} from "@mui/icons-material";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { destinationsToVisits, Visit } from "../visits";
import {
  formatDestinationLabel,
  formatVisitDateRange,
  isSelectedVisit,
  parseLocalDate,
} from "../helpers";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { IconButton } from "@mui/material";
import { SASKATOON } from "../destinationRegistry";

const home = SASKATOON;

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

let HomeLocationIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #2D6A4F; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 1px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">🏠</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

let CurrentLocationIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #000000; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 1px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">⭐</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

let NextLocationIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: #9B59B6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 1px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">✈️</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface TravelMapProps {
  mapCenter: LatLngExpression;
  mapZoom: number;
  mapKey: string;
  selectedVisit: Visit | null;
  setSelectedVisit: (visit: Visit | null) => void;
  handleResetZoom: () => void;
}

export function TravelMap(props: TravelMapProps) {
  const {
    mapCenter,
    mapZoom,
    mapKey,
    selectedVisit,
    setSelectedVisit,
    handleResetZoom,
  } = props;

  return (
    <>
      <IconButton
        onClick={handleResetZoom}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          backgroundColor: "background.paper",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "background.paper",
            boxShadow: 4,
          },
        }}
        aria-label="reset zoom"
      >
        <ZoomOutMap />
      </IconButton>
      <MapContainer
        key={mapKey}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {Array.from(destinationsToVisits.entries()).map(
          ([destination, visits], index) => (
            <Marker
              key={index}
              position={destination.coordinates}
              icon={getIconForDestination(visits)}
            >
              <Popup closeOnClick={false}>
                <h3>{formatDestinationLabel(destination)}</h3>
                <div style={{ marginBottom: "8px" }}></div>
                {visits.map((visit) => (
                  <div
                    key={visit.startDate}
                    style={{
                      fontWeight: isSelectedVisit(visit, selectedVisit)
                        ? "bold"
                        : "normal",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                      width: "100%",
                    }}
                  >
                    <span>{formatVisitDateRange(visit)}</span>
                    {!isSelectedVisit(visit, selectedVisit) && (
                      <IconButton
                        size="small"
                        onClick={() => setSelectedVisit(visit)}
                        sx={{ ml: 1, p: 0.5 }}
                      >
                        <RadioButtonUnchecked
                          fontSize="small"
                          sx={{ color: "#4285F4" }}
                        />
                      </IconButton>
                    )}
                    {isSelectedVisit(visit, selectedVisit) && (
                      <IconButton size="small" disabled sx={{ ml: 1, p: 0.5 }}>
                        <RadioButtonChecked
                          fontSize="small"
                          sx={{ color: "#4285F4" }}
                        />
                      </IconButton>
                    )}
                  </div>
                ))}
              </Popup>
            </Marker>
          )
        )}

        <Marker position={home.coordinates} icon={HomeLocationIcon}>
          <Popup>
            <strong>{formatDestinationLabel(home)}</strong>
            <div style={{ marginBottom: "8px" }}></div>
            <div>Home Base</div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

const getIconForDestination = (visits: Visit[]) => {
  const mostRecentVisit = visits.reduce((latest, current) => {
    return current.endDate > latest.endDate ? current : latest;
  }, visits[0]);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  const startDate = parseLocalDate(mostRecentVisit.startDate);
  const endDate = parseLocalDate(mostRecentVisit.endDate);

  // If currently visiting (today is within date range)
  if (today >= startDate && today <= endDate) {
    return CurrentLocationIcon;
  }
  // If future trip (start date is after today)
  if (startDate > today) {
    return NextLocationIcon;
  }
  // Past trip - use default icon
  return DefaultIcon;
};

import { Destination } from "./destinationRegistry";
import { Visit } from "./visits";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JS
}

export function formatVisitDateRange(visit: Visit): string {
  const startDate = parseLocalDate(visit.startDate);
  const endDate = parseLocalDate(visit.endDate);
  return formatDateRange(startDate, endDate);
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const fullStartStr = startDate.toLocaleDateString("en-US", options);
  const fullEndStr = endDate.toLocaleDateString("en-US", options);

  const isSameYear = startDate.getFullYear() === endDate.getFullYear();
  const isSameMonth = isSameYear && startDate.getMonth() === endDate.getMonth();
  const isSameDay = isSameMonth && startDate.getDate() === endDate.getDate();

  if (isSameDay) {
    return fullStartStr; // e.g., "Jan 5, 2024"
  } else if (isSameMonth) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.getDate()}, ${endDate.getFullYear()}`; // e.g., "Jan 5 - 10, 2024"
  } else if (isSameYear) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`; // e.g., "Jan 28 - Feb 2, 2024"
  }
  return `${fullStartStr} - ${fullEndStr}`;
}

export function isSelectedVisit(
  visit: Visit,
  selectedVisit: Visit | null
): boolean {
  if (!selectedVisit) return false;
  return (
    visit.destination.name === selectedVisit.destination.name &&
    visit.startDate === selectedVisit.startDate &&
    visit.endDate === selectedVisit.endDate
  );
}

export function getLatestVisit(visits: Visit[]): Visit | null {
  if (visits.length === 0) return null;
  const pastVisits = visits.filter((visit) => {
    const endDate = parseLocalDate(visit.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return endDate < today;
  });
  if (pastVisits.length === 0) return null;
  return pastVisits.reduce((latest, current) => {
    return current.endDate > latest.endDate ? current : latest;
  }, pastVisits[0]);
}

export function formatDestinationLabel(
  destination: Destination,
  options: { name?: boolean; flag?: boolean } = {}
): string {
  const { name = true, flag = true } = options;
  return `${destination.name}${name ? ", " + destination.country.name : " "}${
    flag ? " " + destination.country.flag : ""
  }`;
}

export function isCurrentlyTraveling(visits: Visit[]): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return visits.some((visit) => {
    const startDate = parseLocalDate(visit.startDate);
    const endDate = parseLocalDate(visit.endDate);
    return startDate <= today && today <= endDate;
  });
}

export function relativeTimeFromNow(visit: Visit): string {
  const startDate = parseLocalDate(visit.startDate);
  return dayjs(startDate).fromNow();
}

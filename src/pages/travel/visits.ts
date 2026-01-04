import {
  AMSTERDAM,
  BRUSSELS,
  Destination,
  FUKUOKA,
  KAGOSHIMA,
  MONTREAL,
  NANTES,
  OSAKA,
  SEOUL,
  TOKYO,
  VANCOUVER,
} from "./destinationRegistry";

export interface Visit {
  destination: Destination;
  description?: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  photos: Photo[];
}

export interface Photo {
  filename: string;
  caption: string;
  orientation?: "landscape" | "portrait"; // assumes landscape if not specified
}

export const visits: Visit[] = [
  // 2026
  {
    destination: SEOUL,
    startDate: "2026-01-18",
    endDate: "2026-02-21",
    photos: [],
  },

  // 2025
  {
    destination: OSAKA,
    startDate: "2025-11-29",
    endDate: "2025-12-05",
    photos: [
      { filename: "IMG_4643.JPG", caption: "A very photogenic deer in Nara" },
      { filename: "IMG_4658.JPG", caption: "Turtles living the good life" },
      {
        filename: "IMG_4664.JPG",
        caption: "Tranquility on the way to Fushimi Inari Taisha",
      },
      { filename: "IMG_4667.JPG", caption: "One of the many kitsune statues" },
      {
        filename: "IMG_4670.JPG",
        caption: "Love the look of the flames in this one",
      },
      {
        filename: "IMG_4671.JPG",
        caption: "Kinkaku-ji, hard to get a good shot but worth seeing once",
      },
    ],
  },
  {
    destination: TOKYO,
    startDate: "2025-11-22",
    endDate: "2025-11-29",
    photos: [
      { filename: "IMG_4489.JPG", caption: "RuriDragon!!!!" },
      { filename: "IMG_4503.JPG", caption: "Big ol' whale in Ueno Park" },
      {
        filename: "IMG_4538.JPG",
        caption: "Hogwarts scale model at the Warner Bros. Studio Tour",
      },
      { filename: "IMG_4568.JPG", caption: "Outside of the Ghibli Museum" },
      {
        filename: "IMG_4571.JPG",
        caption: "Robot from Laputa on the Ghibli Museum roof",
        orientation: "portrait",
      },
      {
        filename: "IMG_4609.JPG",
        caption: "So many maneki neko at Imado Shrine!",
      },
      { filename: "IMG_4618.JPG", caption: "富士山だ！" },
      {
        filename: "IMG_4635.JPG",
        caption: "Stayed until the very last cable car back down",
      },
    ],
  },
  {
    destination: AMSTERDAM,
    startDate: "2025-03-25",
    endDate: "2025-03-31",
    photos: [],
  },
  {
    destination: BRUSSELS,
    startDate: "2025-03-19",
    endDate: "2025-03-25",
    description: "+ Bruges",
    photos: [],
  },
  {
    destination: NANTES,
    startDate: "2025-03-15",
    endDate: "2025-03-19",
    photos: [],
  },
  {
    destination: VANCOUVER,
    startDate: "2025-02-09",
    endDate: "2025-03-15",
    photos: [],
  },

  // 2024
  {
    destination: TOKYO,
    startDate: "2024-11-30",
    endDate: "2024-12-14",
    photos: [],
  },
  {
    destination: KAGOSHIMA,
    startDate: "2024-11-16",
    endDate: "2024-11-30",
    photos: [],
  },
  {
    destination: FUKUOKA,
    startDate: "2024-10-19",
    endDate: "2024-11-16",
    photos: [],
  },
  {
    destination: OSAKA,
    startDate: "2024-09-18",
    endDate: "2024-10-19",
    photos: [],
  },
  {
    destination: MONTREAL,
    startDate: "2024-07-27",
    endDate: "2024-09-07",
    photos: [],
  },
];

export const destinationsToVisits = new Map<Destination, Visit[]>();
visits.forEach((visit) => {
  if (!destinationsToVisits.has(visit.destination)) {
    destinationsToVisits.set(visit.destination, []);
  }
  destinationsToVisits.get(visit.destination)!.push(visit);
});

export const visitedDestinations: Destination[] = Array.from(
  destinationsToVisits.keys()
);

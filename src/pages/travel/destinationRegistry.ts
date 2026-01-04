export interface Destination {
  name: string;
  coordinates: [number, number];
  country: Country;
  zoom?: number;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

// Country definitions
export const SOUTH_KOREA: Country = {
  name: "South Korea",
  code: "KR",
  flag: "🇰🇷",
};

export const JAPAN: Country = {
  name: "Japan",
  code: "JP",
  flag: "🇯🇵",
};

export const NETHERLANDS: Country = {
  name: "Netherlands",
  code: "NL",
  flag: "🇳🇱",
};

export const BELGIUM: Country = {
  name: "Belgium",
  code: "BE",
  flag: "🇧🇪",
};

export const FRANCE: Country = {
  name: "France",
  code: "FR",
  flag: "🇫🇷",
};

export const CANADA: Country = {
  name: "Canada",
  code: "CA",
  flag: "🇨🇦",
};

// Destination (city) definitions
export const SASKATOON: Destination = {
  name: "Saskatoon",
  country: CANADA,
  coordinates: [52.1332, -106.67],
};

export const SEOUL: Destination = {
  name: "Seoul",
  country: SOUTH_KOREA,
  coordinates: [37.5665, 126.978],
};

export const TOKYO: Destination = {
  name: "Tokyo",
  country: JAPAN,
  coordinates: [35.676666, 139.769431],
};

export const OSAKA: Destination = {
  name: "Osaka",
  country: JAPAN,
  coordinates: [34.6937, 135.5023],
};

export const KAGOSHIMA: Destination = {
  name: "Kagoshima",
  country: JAPAN,
  coordinates: [31.5969, 130.5571],
};

export const FUKUOKA: Destination = {
  name: "Fukuoka",
  country: JAPAN,
  coordinates: [33.5904, 130.4017],
};

export const AMSTERDAM: Destination = {
  name: "Amsterdam",
  country: NETHERLANDS,
  coordinates: [52.3676, 4.9041],
};

export const BRUSSELS: Destination = {
  name: "Brussels",
  country: BELGIUM,
  coordinates: [50.8503, 4.3517],
  zoom: 11,
};

export const NANTES: Destination = {
  name: "Nantes",
  country: FRANCE,
  coordinates: [47.2184, -1.5536],
};

export const VANCOUVER: Destination = {
  name: "Vancouver",
  country: CANADA,
  coordinates: [49.2827, -123.1207],
};

export const MONTREAL: Destination = {
  name: "Montreal",
  country: CANADA,
  coordinates: [45.5017, -73.5673],
};

// All countries array
export const ALL_COUNTRIES: Country[] = [
  SOUTH_KOREA,
  JAPAN,
  NETHERLANDS,
  BELGIUM,
  FRANCE,
  CANADA,
];

// All destinations array
export const ALL_DESTINATIONS: Destination[] = [
  SEOUL,
  TOKYO,
  OSAKA,
  KAGOSHIMA,
  FUKUOKA,
  AMSTERDAM,
  BRUSSELS,
  NANTES,
  VANCOUVER,
  MONTREAL,
];

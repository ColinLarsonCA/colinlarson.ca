import { item } from "./funcs";
import { FullPackingList } from "./types";

export const standardList: FullPackingList = {
  sections: [
    {
      name: "Luggage",
      items: [
        item("Shirts", 7),
        item("Underwear", 7),
        item("Socks", 7),
        item("Shorts"),
        item("Pants"),
        item("Swim trunks"),
        item("Sandals"),
        item("Packable daypack"),
        item("Beard trimmer"),
        item("GAN charger"),
        item("Travel converter (optional)"),
        item("Sunglasses"),
        item("Passport copies"),
        item("Deodorant"),
        item("Bathroom bag"),
        item("Laptop"),
        item("Reading tablet"),
        item("Small charging brick"),
        item("Airpods"),
        item("Nintendo Switch"),
        item("Wired earbuds"),
        item("Charging cables"),
      ],
    },
    {
      name: "Worn or carried",
      items: [
        item("Clothes"),
        item("Wallet"),
        item("Keys"),
        item("Phone"),
        item("Shoes"),
        item("Jacket"),
        item("Passport"),
      ],
    },
  ],
};

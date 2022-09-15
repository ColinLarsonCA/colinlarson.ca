import React from "react";
import Twitter from "assets/twitter.png";
import GithubBlack from "assets/github-black.png";
import GithubWhite from "assets/github-white.png";
import Facebook from "assets/facebook.png";
import Linkedin from "assets/linkedin.png";
import Twitch from "assets/twitch.png";
import Instagram from "assets/instagram.png";
import { IconButton, Tooltip } from "@mui/material";
import { ImgIcon } from "common/ImgIcon";

export type Site =
  | "Twitter"
  | "Facebook"
  | "Instagram"
  | "Twitch"
  | "Github White"
  | "Github Black"
  | "LinkedIn";

export interface IconData {
  href: string;
  src: any;
}

export const iconMap: Map<Site, IconData> = new Map([
  ["Twitter", { href: "https://twitter.com/colintxt", src: Twitter }],
  ["Facebook", { href: "https://facebook.com/ColinLarsonCA", src: Facebook }],
  [
    "Instagram",
    { href: "https://instagram.com/colinlarson.ca", src: Instagram },
  ],
  ["Twitch", { href: "https://twitch.tv/saiaiaiai", src: Twitch }],
  [
    "Github White",
    { href: "https://github.com/ColinLarsonCA", src: GithubWhite },
  ],
  [
    "Github Black",
    { href: "https://github.com/ColinLarsonCA", src: GithubBlack },
  ],
  [
    "LinkedIn",
    { href: "https://www.linkedin.com/in/colinlarson/", src: Linkedin },
  ],
]);

export const socialIcon = (site: Site) => {
  return (
    <Tooltip title={site.split(" ")[0]}>
      <IconButton href={iconMap.get(site)?.href || ""} target="_blank">
        <ImgIcon alt={site} src={iconMap.get(site)?.src || ""} />
      </IconButton>
    </Tooltip>
  );
};

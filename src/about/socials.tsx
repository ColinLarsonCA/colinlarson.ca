import React from "react";
import Bluesky from "assets/bluesky.png";
import GithubBlack from "assets/github-black.png";
import GithubWhite from "assets/github-white.png";
import Linkedin from "assets/linkedin.png";
import { IconButton, Tooltip } from "@mui/material";
import { ImgIcon } from "common/ImgIcon";

export type Site = "Bluesky" | "Github White" | "Github Black" | "LinkedIn";

interface SiteData {
  href: string;
  src: any;
  tooltip: string;
}

const siteData: Map<Site, SiteData> = new Map([
  [
    "Github White",
    {
      href: "https://github.com/ColinLarsonCA",
      src: GithubWhite,
      tooltip: "GitHub",
    },
  ],
  [
    "Github Black",
    {
      href: "https://github.com/ColinLarsonCA",
      src: GithubBlack,
      tooltip: "GitHub",
    },
  ],
  [
    "Bluesky",
    {
      href: "https://bsky.app/profile/colinlarson.ca",
      src: Bluesky,
      tooltip: "Bluesky",
    },
  ],
  [
    "LinkedIn",
    {
      href: "https://www.linkedin.com/in/colinlarson/",
      src: Linkedin,
      tooltip: "LinkedIn",
    },
  ],
]);

export const socialIcon = (site: Site) => {
  const data = siteData.get(site);
  return (
    <Tooltip title={data?.tooltip || ""}>
      <IconButton href={data?.href || ""} target="_blank">
        <ImgIcon alt={site} src={data?.src || ""} />
      </IconButton>
    </Tooltip>
  );
};

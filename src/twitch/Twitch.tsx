import React from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { useThemeType } from "themes";

export function Twitch() {
  const theme = useThemeType();
  return (
    <ReactTwitchEmbedVideo
      channel="colintilts"
      theme={theme}
      width="100%"
    />
  );
}
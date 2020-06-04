import React from "react";
import { Twitch, useIsLiveOnTwitch } from "twitch";

export function Home() {
  return (
    <React.Fragment>
      {useIsLiveOnTwitch() && <Twitch />}
      <p>
        Dynamically load recent content cards here
      </p>
    </React.Fragment>
  )
}
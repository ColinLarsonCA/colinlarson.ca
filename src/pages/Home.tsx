import React from "react";
import { Grid } from "@material-ui/core";
// import { Twitch, useIsLiveOnTwitch } from "twitch";
import { IntroCard, TwitterCard } from "cards";

export function Home() {
  return (
    <React.Fragment>
      <Grid container spacing={2} justify="flex-start">
        {/* {useIsLiveOnTwitch &&
          <Grid item xs={12}>
            <Twitch />
          </Grid>
        } */}
        <Grid item container md={12} lg={4}>
          <IntroCard
            title="Work History"
            text={`I've been a professional programmer since 2013 and documented my experiences at the various companies I've worked for. I've done work for Environment Canada, SiriusXM Satellite Radio, shipped and maintained countless systems from billing to marketplaces to IoT, and contributed to and lead teams locally and remotely across numerous stacks.\n\nThis is the place to go if you're looking to learn more about my professional contributions.`}
            action="Start Reading"
            href="/history"
          />
        </Grid>
        <Grid item container md={12} lg={4}>
          <IntroCard
            title="Experiments"
            text={`Occasionally I like to tinker with a personal project to try out a new technology or make something useful for myself. I've collected these under the Experiments section, take a look to see if there's anything there you might find useful as well!`}
            action="Start Tinkering"
            href="/experiments"
          />
        </Grid>
        <Grid item container md={12} lg={4}>
          <TwitterCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

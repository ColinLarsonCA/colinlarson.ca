import React from "react";
import { Grid } from "@mui/material";
import { IntroCard } from "cards";

export function Home() {
  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-start">
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
            text={`Occasionally I like to tinker with a personal project to try out a new technology or make something useful for myself. I've collected these under the Experiments section, take a look to see if there's anything there you might find useful as well! My latest experiment is a financial planning website named Will-o'-Wisp after the fiery spirit in Dungeons & Dragons, check it out at https://willowisp.ca`}
            action="Start Tinkering"
            href="/experiments"
          />
        </Grid>
        <Grid item container md={12} lg={4}>
        </Grid>
      </Grid>
    </div>
  );
}

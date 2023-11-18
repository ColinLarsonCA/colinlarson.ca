import React from "react";
import { Grid } from "@mui/material";
import { IntroCard } from "cards";

export function Home() {
  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item container md={12} lg={6}>
          <IntroCard
            title="Work History"
            text={`I have been a professional programmer since 2013 and fully remote since 2020. The projects I've been involved with have spanned various domains, such as: satellite radio, billing, scheduling, recommendation engines, autonomous agriculture, and AB testing. My roles have involved individual contributions and leading and mentoring cross-functional teams within many different tech stacks.\n\nClick Start Reading below to learn more about my professional experiences and contributions.`}
            action="Start Reading"
            href="/history"
          />
        </Grid>
        <Grid item container md={12} lg={6}>
          <IntroCard
            title="Experiments"
            text={`Occasionally I like to tinker with a personal project to try out a new technology or make something useful for myself. I've collected these under the Experiments section; take a look to see if there's anything there you might find useful as well! My latest experiment is a financial planning website named Will-o'-Wisp, after the fiery spirit in Dungeons & Dragons.\n\nCheck it out at willowisp.ca`}
            action="Start Tinkering"
            href="/experiments"
          />
        </Grid>
      </Grid>
    </div>
  );
}

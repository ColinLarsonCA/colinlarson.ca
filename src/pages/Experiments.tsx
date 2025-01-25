import React from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { IntroCard } from "cards";
import { Crumbs } from "common";

const PREFIX = "Experiments";
const classes = {
  card: `${PREFIX}-card`,
  source: `${PREFIX}-source`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.card}`]: {
    maxWidth: theme.spacing(100),
  },

  [`& .${classes.source}`]: {
    padding: theme.spacing(1),
  },
}));

export function Experiments() {
  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/experiments", label: "Experiments" },
        ]}
      />
      <Grid container spacing={2} justifyContent="center">
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="Will-o'-Wisp"
            text={`Will-o'-Wisp is a financial planning website I created to help me plan for eventual retirement after I was inspired by the FIRE (Financial Independence, Retire Early) movement. Other retirement planners I found were either daunting spreadsheets, did not persist inputs in local storage, or required sign up/payment for their services. So I created my own and hosted it for others to use.`}
            action="Check it out ↗"
            href="https://willowisp.ca"
            external
            source="https://github.com/ColinLarsonCA/willowisp"
          />
        </Grid>
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="Flagscan"
            text={`Flagscan is a concurrent feature flag and experiment variant code scanning tool I wrote during a hackathon at 7shifts that turned into a production utility that we use to track and clean up stale flags across our web, Android, and iOS apps. The code linked here is an anonymized snapshot but could almost certainly be adapted to fit your codebases, you do have to roll your own results API and storage though, sorry!`}
            action="Source ↗"
            href="https://github.com/ColinLarsonCA/flagscan-mirror"
            external
          />
        </Grid>
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="iro2"
            text={`iro2 is my public sandbox where I experiment with new ideas. Right now I'm building a service for discovering and categorizing collab cafes and other anime promotions in Japan, because I found the online sources for that right now are mostly blogs and entirely in Japanese. My hope is to have this ready to go before I visit Japan next so I can efficiently find merch for all my favourite anime series! And of course, make it available to everyone.`}
            action="Source ↗"
            href="https://github.com/ColinLarsonCA/iro2"
            external
          />
        </Grid>
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="Hai domo"
            text={`Hai domo is a URL shortening website that I created to learn about Vue and Firebase. I had been working at Vendasta and my coworkers kept telling me about how great Firebase was but I had never heard of it, and I had also only used Angular as a framework. So, over the course of a couple weekends I created a URL shortener that generates gfycat style URLs (AdjectiveAdjectiveNoun) with anime character names as the noun.`}
            action="Source ↗"
            href="https://gitlab.com/ColinLarson/hai-domo"
            external
          />
        </Grid>
      </Grid>
    </StyledPage>
  );
}

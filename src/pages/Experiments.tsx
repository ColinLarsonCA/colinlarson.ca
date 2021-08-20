import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { IntroCard } from "cards";
import { Crumbs } from "common";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: theme.spacing(100),
  },
  source: {
    padding: theme.spacing(1),
  },
}));

export function Experiments() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/experiments", label: "Experiments" },
        ]}
      />
      <Grid container spacing={2} justify="center">
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="Will-o'-Wisp"
            text={`Will-o'-Wisp is a financial planning website I created to help me plan for eventual retirement after I was inspired by the FIRE (Finacial Independence, Retire Early) movement. Other retirement planners I found were either daunting spreadsheets, did not persist inputs in local storage, or required sign up/payment for their services. So I created my own and hosted it for others to use.`}
            action="Check it out ↗"
            href="https://willowisp.ca"
            external
          />
        </Grid>
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="Hai domo"
            text={`Hai domo is a URL shortening website that I created to learn about Vue and Firebase. I had been working at Vendasta and my coworkers kept telling me about how great Firebase was but I had never heard of it, and I had also only used Angular as a framework. So, over the course of a couple weekends I created a URL shortener that generates gfycat style URLs (AdjectiveAdjectiveNoun) with anime character names as the noun.`}
            action="Check it out ↗"
            href="https://haido.moe"
            external
            source="https://gitlab.com/ColinLarson/hai-domo"
          />
        </Grid>
        <Grid item container className={classes.card} xs={12} md={6}>
          <IntroCard
            title="OBS Random Gif"
            text={`In the past I have occasionally streamed video games on Twitch and was at the time uncomfortable with having a face cam. To have something to show in place of that I wrote a quick program to grab random gifs from my computer and display them one at a time. I don't have any plans to add to it as services like Streamlabs have similar features now, but it's a capable if simple offline solution.`}
            action="Check it out ↗"
            href="https://github.com/ColinLarsonCA/obs-random-gif"
            external
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

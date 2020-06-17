import React from "react";
import { Card, Grid, makeStyles } from "@material-ui/core";
import { Twitch, useIsLiveOnTwitch } from "twitch";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useThemeType } from "themes";
import { TwitterCard } from "cards";

const useStyles = makeStyles((theme) => ({
  twitter: {
    "& .timeline-Widget": {
      backgroundColor: theme.palette.background.default
    }
  }
}));

export function Home() {
  const classes = useStyles();
  const theme = useThemeType();
  console.log(theme);
  return (
    <React.Fragment>
      <Grid container>
        {useIsLiveOnTwitch && 
          <Grid item xs={12}>
            <Twitch />
          </Grid>
        }
        <Grid item>
          <TwitterCard />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
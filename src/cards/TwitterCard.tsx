import React from "react";
import { Card, CardContent, makeStyles } from "@material-ui/core";
import { useThemeType } from "themes";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  content: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 600,
    },
  },
}));

export function TwitterCard() {
  const classes = useStyles();
  const themeType = useThemeType();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <TwitterTimelineEmbed
          key={themeType}
          sourceType="profile"
          screenName="colintxt"
          theme={themeType}
          transparent
          noFooter
          noBorders
          noScrollbar
          autoHeight
        />
      </CardContent>
    </Card>
  );
}

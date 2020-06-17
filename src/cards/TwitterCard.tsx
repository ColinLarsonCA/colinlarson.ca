import React from "react";
import { 
  Card,
  CardContent,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useThemeType } from "themes";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const useStyles = makeStyles((theme) => ({
  card: {
//     display: "flex",
//     flexDirection: "column",
//     "& .MuiCardContent-root": {
//       flex: 1,
//    }
  }
}));

export function TwitterCard() {
  const classes = useStyles();
  const theme = useTheme();
  const themeType = useThemeType();
  return (
    <Card className={classes.card}>
      <CardContent>
        <TwitterTimelineEmbed
          key={themeType}
          sourceType="profile"
          screenName="colintxt"
          theme={themeType}
          options={{ height: theme.spacing(60) }}
          transparent
          noFooter
          noBorders
          noScrollbar
        />
      </CardContent>
    </Card>
  );
}
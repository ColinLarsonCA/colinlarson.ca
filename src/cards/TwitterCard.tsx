import React from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent } from "@mui/material";
import { useThemeMode } from "themes";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const PREFIX = "TwitterCard";
const classes = {
  card: `${PREFIX}-card`,
  content: `${PREFIX}-content`,
};
const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    width: "100%",
  },

  [`& .${classes.content}`]: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 600,
    },
  },
}));

export function TwitterCard() {
  const themeMode = useThemeMode();
  return (
    <StyledCard className={classes.card}>
      <CardContent className={classes.content}>
        <TwitterTimelineEmbed
          key={themeMode}
          sourceType="profile"
          screenName="colintxt"
          theme={themeMode}
          transparent
          noFooter
          noBorders
          noScrollbar
          autoHeight
        />
      </CardContent>
    </StyledCard>
  );
}

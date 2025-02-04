import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Brightness4 as Moon,
  BrightnessHigh as Sun,
  Email,
  Home as HomeIcon,
  WorkHistory,
  Science,
  // Book,
} from "@mui/icons-material";
import Me from "assets/me.jpeg";
import { useIsDark } from "themes";
import { socialIcon } from "./socials";
import { Colin } from "./info";

const PREFIX = "About";
const classes = {
  namebar: `${PREFIX}-namebar`,
  linkbar: `${PREFIX}-linkbar`,
  avatar: `${PREFIX}-avatar`,
  smallAvatar: `${PREFIX}-smallAvatar`,
  nameContainer: `${PREFIX}-nameContainer`,
  desc: `${PREFIX}-desc`,
};
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [`& .${classes.namebar}`]: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },

  [`& .${classes.avatar}`]: {
    display: "block",
    margin: theme.spacing(1) + " auto",
    height: 240,
    width: 240,
  },

  [`& .${classes.smallAvatar}`]: {
    marginLeft: theme.spacing(2),
    height: 60,
    width: 60,
  },

  [`& .${classes.nameContainer}`]: {
    padding: theme.spacing(2),
  },

  [`& .${classes.desc}`]: {
    color: theme.palette.text.secondary,
  },

  [`& .${classes.linkbar}`]: {
    padding: theme.spacing(1),
    paddingTop: 0,
  },

  [`& .collapsed`]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

interface Props {
  toggleTheme: () => void;
}

export function TopBar(props: Props) {
  const isDark = useIsDark();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setCollapsed(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const darkLightModeToggle = () => {
    return (
      <IconButton onClick={() => props.toggleTheme()}>
        {isDark ? <Sun /> : <Moon />}
      </IconButton>
    );
  };

  return (
    <StyledAppBar color="inherit" position="fixed">
      {!collapsed && (
        <Toolbar className={classes.namebar}>
          <Avatar
            alt={Colin.name}
            src={Me}
            className={`${classes.avatar} ${classes.smallAvatar}`}
            variant="rounded"
          />
          <Grid className={classes.nameContainer} container>
            <Grid item xs={12}>
              <Typography variant="h6">{Colin.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.desc} variant="caption">
                {Colin.title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      )}
      <Toolbar className={`${classes.linkbar} ${collapsed ? "collapsed" : ""}`}>
        <Tooltip title="Home">
          <IconButton href="/">
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Work History">
          <IconButton href="/history">
            <WorkHistory />
          </IconButton>
        </Tooltip>
        <Tooltip title="Experiments">
          <IconButton href="/experiments">
            <Science />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Blog">
          <IconButton href="/blog">
            <Book />
          </IconButton>
        </Tooltip> */}
        <Divider variant="middle" flexItem />
        {socialIcon(isDark ? "Github White" : "Github Black")}
        {socialIcon("Bluesky")}
        {socialIcon("LinkedIn")}
        <Tooltip title="Email">
          <IconButton href={Colin.mailto} target="_blank">
            <Email />
          </IconButton>
        </Tooltip>
        <div style={{ flexGrow: 1 }} />
        {darkLightModeToggle()}
      </Toolbar>
    </StyledAppBar>
  );
}

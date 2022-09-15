import React from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Brightness4 as Moon,
  BrightnessHigh as Sun,
  Email,
  Home as HomeIcon,
  WorkHistory,
  Science,
  PhotoCamera,
} from "@mui/icons-material";
import Me from "assets/me.jpeg";
import { useIsDark } from "themes";
import { socialIcon } from "./socials";
import { Colin } from "./info";

const PREFIX = "About";
const classes = {
  drawer: `${PREFIX}-drawer`,
  namebar: `${PREFIX}-namebar`,
  linkbar: `${PREFIX}-linkbar`,
  avatar: `${PREFIX}-avatar`,
  smallAvatar: `${PREFIX}-smallAvatar`,
  nameContainer: `${PREFIX}-nameContainer`,
  name: `${PREFIX}-name`,
  desc: `${PREFIX}-desc`,
  divider: `${PREFIX}-divider`,
  socials: `${PREFIX}-socials`,
  button: `${PREFIX}-button`,
  spacer: `${PREFIX}-spacer`,
  bottom: `${PREFIX}-bottom`,
};
const drawerWidth = 336;
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [`&.${classes.drawer}`]: {
    display: "flex",
    width: drawerWidth,
    flexShrink: 0,
    textAlign: "center",
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  },

  [`& .${classes.namebar}`]: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },

  [`& .${classes.linkbar}`]: {
    padding: theme.spacing(1),
    paddingTop: 0,
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

  [`& .${classes.name}`]: {
    paddingTop: theme.spacing(1),
  },

  [`& .${classes.desc}`]: {
    color: theme.palette.text.secondary,
  },

  [`& .${classes.divider}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },

  [`& .${classes.spacer}`]: {
    flexGrow: 1,
  },

  [`& .${classes.bottom}`]: {
    paddingRight: theme.spacing(2),
  },
}));

interface Props {
  toggleTheme: () => void;
}

export function SideBar(props: Props) {
  const isDark = useIsDark();
  const modeToggle = () => {
    return (
      <IconButton onClick={() => props.toggleTheme()}>
        {isDark ? <Sun /> : <Moon />}
      </IconButton>
    );
  };
  return (
    <StyledDrawer
      className={classes.drawer}
      open={true}
      variant="permanent"
      anchor="left"
    >
      <Avatar
        alt={Colin.name}
        src={Me}
        className={classes.avatar}
        variant="square"
      />
      <Typography className={classes.name} variant="h5">
        {Colin.name}
      </Typography>
      <Typography className={classes.desc} variant="caption">
        {Colin.title}
      </Typography>
      <Divider className={classes.divider} variant="middle" />
      <Grid container justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={2}>
          {socialIcon("Twitter")}
        </Grid>
        <Grid item xs={2}>
          {socialIcon("Facebook")}
        </Grid>
        <Grid item xs={2}>
          {socialIcon("Instagram")}
        </Grid>
        <Grid item xs={2}>
          {socialIcon("Twitch")}
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={3} />
        <Grid item xs={2}>
          {socialIcon(isDark ? "Github White" : "Github Black")}
        </Grid>
        <Grid item xs={2}>
          {socialIcon("LinkedIn")}
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Email">
            <IconButton href={Colin.mailto} target="_blank">
              <Email />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3} />
      </Grid>

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/"
        startIcon={<HomeIcon />}
      >
        Home
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/history"
        startIcon={<WorkHistory />}
      >
        Work History
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/experiments"
        startIcon={<Science />}
      >
        Experiments
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/photos"
        startIcon={<PhotoCamera />}
      >
        Photos
      </Button>

      <div className={classes.spacer} />
      <Divider className={classes.divider} variant="middle" />
      <Grid container className={classes.bottom}>
        <Grid item xs={2}>
          {modeToggle()}
        </Grid>
        <Grid
          container
          item
          xs={10}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <Link
              color="textSecondary"
              href="https://github.com/ColinLarsonCA/colinlarson.ca/commits/master"
              target="_blank"
              underline="hover"
            >
              Changes ↗
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </StyledDrawer>
  );
}

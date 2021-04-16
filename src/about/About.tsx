import React from "react";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import {
  Brightness4 as Moon,
  BrightnessHigh as Sun,
  Email,
} from "@material-ui/icons";
import Me from "assets/me.jpeg";
import Twitter from "assets/twitter.png";
import GithubBlack from "assets/github-black.png";
import GithubWhite from "assets/github-white.png";
import Facebook from "assets/facebook.png";
import Linkedin from "assets/linkedin.png";
import Twitch from "assets/twitch.png";
import Instagram from "assets/instagram.png";
import { ImgIcon } from "common";
import { useWidth } from "hooks";
import { useIsDark } from "themes";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    display: "flex",
    width: "24em",
    flexShrink: 0,
    textAlign: "center",
  },
  namebar: {
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
  linkbar: {
    padding: theme.spacing(1),
    paddingTop: 0,
  },
  avatar: {
    display: "block",
    margin: theme.spacing(1) + "px auto",
    height: 240,
    width: 240,
  },
  smallAvatar: {
    marginLeft: theme.spacing(2),
    height: 60,
    width: 60,
  },
  nameContainer: {
    padding: theme.spacing(2),
  },
  name: {
    paddingTop: theme.spacing(1),
  },
  desc: {
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  socials: {
    display: "flex",
    alignContent: "center",
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  bottom: {
    paddingRight: theme.spacing(2),
  },
}));

interface Props {
  toggleTheme: () => void;
}

interface IconData {
  href: string;
  src: any;
}

type Site =
  | "Twitter"
  | "Facebook"
  | "Instagram"
  | "Twitch"
  | "Github White"
  | "Github Black"
  | "LinkedIn";

const iconMap: Map<Site, IconData> = new Map([
  ["Twitter", { href: "https://twitter.com/colintxt", src: Twitter }],
  ["Facebook", { href: "https://facebook.com/ColinLarsonCA", src: Facebook }],
  [
    "Instagram",
    { href: "https://instagram.com/colinlarson.ca", src: Instagram },
  ],
  ["Twitch", { href: "https://twitch.tv/colincasts", src: Twitch }],
  [
    "Github White",
    { href: "https://github.com/ColinLarsonCA", src: GithubWhite },
  ],
  [
    "Github Black",
    { href: "https://github.com/ColinLarsonCA", src: GithubBlack },
  ],
  [
    "LinkedIn",
    { href: "https://www.linkedin.com/in/colinlarson/", src: Linkedin },
  ],
]);

export function About(props: Props) {
  const width = useWidth();
  const isDark = useIsDark();
  const classes = useStyles();
  const icon = (site: Site) => {
    return (
      <Tooltip title={site}>
        <IconButton href={iconMap.get(site)?.href || ""} target="_blank">
          <ImgIcon alt={site} src={iconMap.get(site)?.src || ""} />
        </IconButton>
      </Tooltip>
    );
  };
  const modeToggle = () => {
    return (
      <IconButton onClick={() => props.toggleTheme()}>
        {isDark ? <Sun /> : <Moon />}
      </IconButton>
    );
  };
  const isMobile = width !== "lg" && width !== "xl";
  if (isMobile) {
    return (
      <AppBar color="inherit" position="fixed">
        <Toolbar className={classes.namebar}>
          <Avatar
            alt="Colin Larson"
            src={Me}
            className={`${classes.avatar} ${classes.smallAvatar}`}
            variant={"square"}
          />
          <Grid className={classes.nameContainer} container>
            <Grid item xs={12}>
              <Typography variant="h6">Colin Larson</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.desc} variant="caption">
                Software Developer
              </Typography>
            </Grid>
          </Grid>
          {modeToggle()}
        </Toolbar>
        <Toolbar className={classes.linkbar}>
          {icon("Twitter")}
          {icon("Facebook")}
          {icon("Instagram")}
          {icon("Twitch")}
          {icon(isDark ? "Github White" : "Github Black")}
          {icon("LinkedIn")}
          <Tooltip title="Email">
            <IconButton href="mailto:hello@colinlarson.ca" target="_blank">
              <Email />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <Drawer
      className={classes.drawer}
      open={true}
      variant="permanent"
      anchor="left"
    >
      <Avatar
        alt="Colin Larson"
        src={Me}
        className={classes.avatar}
        variant="square"
      />
      <Typography className={classes.name} variant="h5">
        Colin Larson
      </Typography>
      <Typography className={classes.desc} variant="caption">
        Software Developer
      </Typography>
      <Divider className={classes.divider} variant="middle" />
      <Grid className={classes.socials} container justify="center">
        <Grid item xs={2} />
        <Grid item xs={2}>
          {icon("Twitter")}
        </Grid>
        <Grid item xs={2}>
          {icon("Facebook")}
        </Grid>
        <Grid item xs={2}>
          {icon("Instagram")}
        </Grid>
        <Grid item xs={2}>
          {icon("Twitch")}
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={3} />
        <Grid item xs={2}>
          {icon(isDark ? "Github White" : "Github Black")}
        </Grid>
        <Grid item xs={2}>
          {icon("LinkedIn")}
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Email">
            <IconButton href="mailto:hello@colinlarson.ca" target="_blank">
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
      >
        Home
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/history"
      >
        Work History
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disableElevation
        href="/experiments"
      >
        Experiments
      </Button>

      <div className={classes.spacer} />
      <Divider className={classes.divider} variant="middle" />
      <Grid container className={classes.bottom}>
        <Grid item xs={2}>
          {modeToggle()}
        </Grid>
        <Grid container item xs={10} alignItems="center" justify="flex-end">
          <Grid item>
            <Link
              color="textSecondary"
              href="https://github.com/ColinLarsonCA/colinlarson.ca/commits/master"
              target="_blank"
            >
              Changes ↗
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

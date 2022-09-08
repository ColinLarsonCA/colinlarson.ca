import React from "react";
import { styled } from '@mui/material/styles';
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
  Avatar,
} from "@mui/material";
import {
  Brightness4 as Moon,
  BrightnessHigh as Sun,
  Email,
} from "@mui/icons-material";
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

const PREFIX = 'About';
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
  bottom: `${PREFIX}-bottom`
};
const StyledDrawer = styled(Drawer)(({theme}) => ({
  [`&.${classes.drawer}`]: {
    display: "flex",
    width: "24em",
    flexShrink: 0,
    textAlign: "center",
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
    margin: theme.spacing(1) + "px auto",
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
  }
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

  const icon = (site: Site) => {
    return (
      <Tooltip title={site.split(' ')[0]}>
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
    <StyledDrawer
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
      <Grid container justifyContent="center">
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
        <Grid container item xs={10} alignItems="center" justifyContent="flex-end">
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
    </StyledDrawer>
  );
}

import React from "react";
import { AppBar, Button, Divider, Drawer, Grid, IconButton, Link, Toolbar, Tooltip, Typography, makeStyles } from "@material-ui/core";
import { Brightness4 as Moon, BrightnessHigh as Sun, Email } from "@material-ui/icons";
import Avatar from "react-avatar";
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

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: "flex",
    width: "24em",
    flexShrink: 0,
    textAlign: "center",
  },
  toolbar: {
    padding: theme.spacing(1)
  },
  avatar: {
    "& img": {
      border: theme.spacing(0.5) + "px solid " + theme.palette.primary.main,
    },
    display: "block",
    margin: theme.spacing(1) + "px auto",
  },
  smallAvatar: {
    "& img": {
      border: theme.spacing(0.3) + "px solid " + theme.palette.primary.main,
    }
  },
  nameContainer: {
    padding: theme.spacing(2)
  },
  name: {
    paddingTop: theme.spacing(1),
  },
  desc: {
    color: theme.palette.text.secondary
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
    paddingRight: theme.spacing(2)
  }
}));

interface Props {
  toggleTheme: () => void;
}

export function About(props: Props) {
  const width = useWidth();
  const isDark = useIsDark();
  const classes = useStyles();
  const icon = (site: string, href: string, src: any) => {
    return (
      <Tooltip title={site}>
        <IconButton href={href} target="_blank">
          <ImgIcon src={src} />
        </IconButton>
      </Tooltip>
    )
  }
  const modeToggle = () => {
    return (
      <IconButton onClick={() => props.toggleTheme()}>
        {isDark ? <Sun /> : <Moon />}
      </IconButton>
    )
  }
  if (width !== "lg" && width !== "xl") {
    return (
      <AppBar color="inherit" position="fixed">
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.smallAvatar} round={true} facebookId="1473156958" size="60" />
          <Grid className={classes.nameContainer} container>
            <Grid item xs={12}>
              <Typography variant="h6">Colin Larson</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.desc} variant="caption">Software Developer</Typography>
            </Grid>
          </Grid>
          {modeToggle()}
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <Drawer className={classes.drawer} open={true} variant="permanent" anchor="left">
      <Avatar className={classes.avatar} round={true} facebookId="1473156958" size="240" />
      <Typography className={classes.name} variant="h5">Colin Larson</Typography>
      <Typography className={classes.desc} variant="caption">Software Developer</Typography>
      <Divider className={classes.divider} variant="middle" />
      <Grid className={classes.socials} container justify="center">
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          {icon("Twitter", "https://twitter.com/colintxt", Twitter)}
        </Grid>
        <Grid item xs={2}>
          {icon("Facebook", "https://facebook.com/ColinLarsonCA", Facebook)}
        </Grid>
        <Grid item xs={2}>
          {icon("Instagram", "https://instagram.com/colinlarson.ca", Instagram)}
        </Grid>
        <Grid item xs={2}>
          {icon("Twitch", "https://twitch.tv/colintilts", Twitch)}
        </Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          {icon("GitHub", "https://github.com/ColinLarsonCA", isDark ? GithubWhite : GithubBlack)}
        </Grid>
        <Grid item xs={2}>
          {icon("LinkedIn", "https://www.linkedin.com/in/colinlarson/", Linkedin)}
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Email">
            <IconButton href="mailto:hello@colinlarson.ca" target="_blank">
              <Email />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <Button className={classes.button} variant="contained" color="primary" disableElevation href="/">Home</Button>
      <Button className={classes.button} variant="contained" color="primary" disableElevation href="/history">Work History</Button>
      <Button className={classes.button} variant="contained" color="primary" disableElevation href="/experiments">Experiments</Button>

      <div className={classes.spacer} />
      <Divider className={classes.divider} variant="middle" />
      <Grid container className={classes.bottom}>
        <Grid item xs={2}>
          {modeToggle()}
        </Grid>
        <Grid container item xs={10} alignItems="center" justify="flex-end">
          <Grid item>
            <Link color="textSecondary" href="https://github.com/ColinLarsonCA/colinlarson.ca/commits/master" target="_blank">Changes ↗</Link>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  )
}
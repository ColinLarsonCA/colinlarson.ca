import React from "react";
import { Icon, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  image: {
    height: "100%",
    color: theme.palette.primary.main,
  },
}));

interface Props {
  src: string;
  alt: string;
}

export function ImgIcon(props: Props) {
  const classes = useStyles();
  return (
    <Icon className={classes.root}>
      <img alt={props.alt} className={classes.image} src={props.src} />
    </Icon>
  );
}

import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: theme.spacing(100),
    "& a": {
      color: theme.palette.primary.main
    }
  }
}));

export function Job() {
  const classes = useStyles();
  const params = useParams();
  const [content, setContent] = useState("");
  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/ColinLarsonCA/work-history/master/" + params.key + ".md")
      .then((res: any) => setContent(res.data))
      .catch((err: any) => console.error(err));
  }, []);
  return (
    <Grid container justify="center">
      <Markdown className={classes.content} source={content}/>
    </Grid>
  );
}
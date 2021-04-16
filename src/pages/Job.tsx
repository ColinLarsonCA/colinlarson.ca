import React, { useEffect, useState } from "react";
import { Grid, Link, makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import axios from "axios";
import { Crumbs } from "common";

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: theme.spacing(100),
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

export function Job() {
  const classes = useStyles();
  const params = useParams();
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ColinLarsonCA/work-history/master/" +
          params.key +
          ".md"
      )
      .then((res: any) => setContent(res.data))
      .catch((err: any) => console.error(err));
  }, [params.key]);
  return (
    <React.Fragment>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/history", label: "Work History" },
          { href: "/history/" + params.key, label: params.key.toUpperCase() },
        ]}
      />
      <Grid container>
        <Markdown className={classes.content} source={content} />
      </Grid>
      <Link
        variant="caption"
        color="textSecondary"
        href={
          "https://github.com/ColinLarsonCA/work-history/blob/master/" +
          params.key +
          ".md"
        }
        target="_blank"
      >
        Source ↗
      </Link>
    </React.Fragment>
  );
}

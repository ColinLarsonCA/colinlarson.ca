import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Link } from "@mui/material";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import axios from "axios";
import { Crumbs } from "common";

const PREFIX = "Job";
const classes = {
  content: `${PREFIX}-content`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.content}`]: {
    maxWidth: theme.spacing(100),
    "& a": {
      color: theme.palette.primary.main,
    },
  },
}));

export function Job() {
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
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/history", label: "Work History" },
          {
            href: "/history/" + params.key,
            label: (params.key ?? "").toUpperCase(),
          },
        ]}
      />
      <Grid container>
        <Markdown className={classes.content} children={content} />
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
        underline="hover"
      >
        Source ↗
      </Link>
    </StyledPage>
  );
}

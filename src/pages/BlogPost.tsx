import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import { Crumbs } from "common";
import { postsBySlug } from "posts";

const PREFIX = "BlogPost";
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

export function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const [content, setContent] = useState("");
  const post = postsBySlug.get(slug ?? "");
  useEffect(() => {
    if (post) {
      fetch(post?.path)
        .then((response) => response.text())
        .then(setContent);
    }
  }, [post]);
  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          {
            href: "/blog/" + slug,
            label: post?.title ?? "",
          },
        ]}
      />
      <Grid container>
        <Markdown className={classes.content} children={content} />
      </Grid>
    </StyledPage>
  );
}

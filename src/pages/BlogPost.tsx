import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Link, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import Markdown, { Components } from "react-markdown";
import { Crumbs } from "common";
import { postsBySlug } from "blog";
import { Colin } from "about/info";
import { social } from "about/socials";

const PREFIX = "BlogPost";
const classes = {
  content: `${PREFIX}-content`,
  footer: `${PREFIX}-footer`,
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
  const mdComponents: Partial<Components> = {
    img: (props) => (
      <img
        {...props}
        loading="lazy"
        style={{ maxWidth: "100%", height: "auto" }}
        alt={props.alt ?? ""}
      />
    ),
  };
  const bluesky = social("Bluesky");
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
      <Grid container className={classes.content}>
        <Markdown
          className={classes.content}
          components={mdComponents}
          children={content}
        />
        <div>
          <Typography color="textSecondary">
            We live in a world with too many email subscriptions and comment
            sections as it is, but if you really want to talk to me you can
            email me or tag me on Bluesky.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Link
              href={`mailto:${Colin.email}?subject=${post?.title}`}
              target="_blank"
            >
              Email
            </Link>
            <Link
              href={`https://bsky.app/intent/compose?text=@${bluesky?.username} `}
              target="_blank"
            >
              Bluesky
            </Link>
          </Stack>
        </div>
      </Grid>
    </StyledPage>
  );
}

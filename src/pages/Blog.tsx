import React from "react";
import { styled } from "@mui/material/styles";
import { Crumbs } from "common";
import { posts } from "posts";
import { Link, Stack, Typography } from "@mui/material";

const PREFIX = "Blog";
const classes = {
  post: `${PREFIX}-post`,
  source: `${PREFIX}-source`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.post}`]: {
    maxWidth: theme.spacing(100),
  },

  [`& .${classes.source}`]: {
    padding: theme.spacing(1),
  },
}));

export function Blog() {
  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "blog" },
        ]}
      />
      {posts.map((post) => (
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Link href={"/blog/" + post.slug}>{post.title}</Link>
            <Typography>—</Typography>
            <Typography>{post.date}</Typography>
          </Stack>
        </Stack>
      ))}
    </StyledPage>
  );
}

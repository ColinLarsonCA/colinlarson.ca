import React from "react";
import { styled } from "@mui/material/styles";
import { Crumbs } from "common";
import { posts } from "blog";
import { Link, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

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
            <Typography color="textSecondary">—</Typography>
            <Typography color="textSecondary">
              {dayjs(post.date, "YYYY-MM-DD").format("MMMM D, YYYY")}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </StyledPage>
  );
}

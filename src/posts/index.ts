import LoremIpsum from "./lorem-ipsum.md";

export interface Post {
  date: string;
  slug: string;
  title: string;
  path: string;
}

export const posts: Post[] = [
  {
    date: "2025-01-25",
    slug: "lorem-ipsum",
    title: "Lorem Ipsum",
    path: LoremIpsum,
  },
];

export const postsBySlug: Map<string, Post> = new Map(
  posts.map((post) => [post.slug, post])
);

import LoremIpsum from "./posts/lorem-ipsum.md";
import BocchiTheRock from "./posts/bocchi-the-rock.md";

export interface Post {
  date: string;
  slug: string;
  title: string;
  path: string;
}

export const posts: Post[] = [
  {
    date: "2025-01-25",
    slug: "bocchi-the-rock",
    title: "Bocchi the Rock",
    path: BocchiTheRock,
  },
  {
    date: "2025-01-24",
    slug: "lorem-ipsum",
    title: "Lorem Ipsum",
    path: LoremIpsum,
  },
];

export const postsBySlug: Map<string, Post> = new Map(
  posts.map((post) => [post.slug, post])
);

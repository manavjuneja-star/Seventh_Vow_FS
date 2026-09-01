import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/BlogHero/BlogHero";
import { BlogList } from "@/components/blog/BlogList/BlogList";
import { BLOG_CATEGORIES, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Journal — The Seventh Vow Weddings",
  description:
    "Real celebrations we've designed, notes from the studio, and the thinking behind the details.",
};

export default function BlogPage(): React.ReactElement {
  const posts = getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const present = new Set(rest.map((p) => p.category));
  const categories = BLOG_CATEGORIES.filter((c) => present.has(c));

  return (
    <>
      <BlogHero post={featured} />
      <BlogList posts={rest} categories={categories} />
    </>
  );
}

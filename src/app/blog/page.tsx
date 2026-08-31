import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/BlogHero/BlogHero";
import { BlogList } from "@/components/blog/BlogList/BlogList";
import { getCategories, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Journal — The Seventh Vow Weddings",
  description:
    "Real celebrations we've designed, notes from the studio, and the thinking behind the details.",
};

export default function BlogPage(): React.ReactElement {
  return (
    <>
      <BlogHero />
      <BlogList posts={getPosts()} categories={getCategories()} />
    </>
  );
}

import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/BlogHero/BlogHero";
import { BlogList } from "@/components/blog/BlogList/BlogList";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal: Wedding Planning Ideas & Real Weddings",
  description:
    "Real weddings, planning guides and decor ideas from The Seventh Vow Weddings, wedding planners in Delhi. Timelines, destination weddings, guest hospitality and the thinking behind the details.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "The Journal | The Seventh Vow Weddings" },
};

export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <>
      <BlogHero post={featured} />
      <BlogList posts={rest} />
    </>
  );
}

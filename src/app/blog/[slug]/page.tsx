import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ChaptersPost } from "@/components/blog-post/ChaptersPost/ChaptersPost";
import { EditorialPost } from "@/components/blog-post/EditorialPost/EditorialPost";
import { GuidePost } from "@/components/blog-post/GuidePost/GuidePost";
import { PhotoEssayPost } from "@/components/blog-post/PhotoEssayPost/PhotoEssayPost";
import { getPost, getPosts } from "@/lib/blog";

type Params = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found — The Seventh Vow Weddings" };
  return { title: `${post.title} — The Seventh Vow Weddings`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Params): Promise<React.ReactElement> {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === post.slug) + 1;

  switch (post.format) {
    case "editorial":
      return <EditorialPost post={post} content={post.content} index={index} />;
    case "photo-essay":
      return <PhotoEssayPost post={post} content={post.content} index={index} />;
    case "guide":
      return <GuidePost post={post} content={post.content} index={index} />;
    case "chapters":
      return <ChaptersPost post={post} content={post.content} index={index} />;
  }
}

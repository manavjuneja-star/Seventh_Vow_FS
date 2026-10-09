import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ChaptersPost } from "@/components/blog-post/ChaptersPost/ChaptersPost";
import { EditorialPost } from "@/components/blog-post/EditorialPost/EditorialPost";
import { GuidePost } from "@/components/blog-post/GuidePost/GuidePost";
import { PhotoEssayPost } from "@/components/blog-post/PhotoEssayPost/PhotoEssayPost";
import { JsonLd } from "@/components/Seo/JsonLd";
import { getPost, getPosts } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structuredData";

type Params = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found" };
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.cover, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

export default async function BlogPostPage({ params }: Params): Promise<React.ReactElement> {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === post.slug) + 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  let page: React.ReactElement;
  switch (post.format) {
    case "editorial":
      page = <EditorialPost post={post} content={post.content} index={index} />;
      break;
    case "photo-essay":
      page = <PhotoEssayPost post={post} content={post.content} index={index} />;
      break;
    case "guide":
      page = <GuidePost post={post} content={post.content} index={index} />;
      break;
    case "chapters":
      page = <ChaptersPost post={post} content={post.content} index={index} />;
      break;
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "The Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {page}
    </>
  );
}

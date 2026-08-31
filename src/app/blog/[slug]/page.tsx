import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { formatDate, getPost, getPosts } from "@/lib/blog";

import styles from "./BlogPost.module.css";

type Params = { params: { slug: string } };

export function generateStaticParams(): { slug: string }[] {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found — The Seventh Vow Weddings" };
  return { title: `${post.title} — The Seventh Vow Weddings`, description: post.excerpt };
}

/**
 * Minimal article page so the Journal cards are navigable. The full post
 * template (rich blocks with different text/image placements) is designed
 * later — for now it shows the cover, headline and standfirst.
 */
export default function BlogPostPage({ params }: Params): React.ReactElement {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className={styles.article}>
      <div className={styles.cover}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" />
      </div>

      <header className={styles.head}>
        <span className={styles.category}>{post.category}</span>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          {formatDate(post.date)}
          <span className={styles.dot}>·</span>
          {post.readMinutes} min read
        </p>
      </header>

      <div className={styles.body}>
        <p className={styles.lede}>{post.excerpt}</p>
        <p className={styles.note}>
          The full article will appear here once the studio&apos;s writing tools
          are connected. This page is a placeholder so the Journal is navigable
          while the post template is being designed.
        </p>
        <a href="/blog" className={styles.back}>
          ← Back to the Journal
        </a>
      </div>
    </article>
  );
}

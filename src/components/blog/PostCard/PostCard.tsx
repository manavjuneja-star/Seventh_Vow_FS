import Link from "next/link";

import { type BlogPost, formatDate } from "@/lib/blog";

import styles from "./PostCard.module.css";

/** A card in the Journal grid. */
export function PostCard({ post }: { post: BlogPost }): React.ReactElement {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" />
        <span className={styles.category}>{post.category}</span>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.meta}>
          {formatDate(post.date)}
          <span className={styles.dot}>·</span>
          {post.readMinutes} min read
        </span>
      </div>
    </Link>
  );
}

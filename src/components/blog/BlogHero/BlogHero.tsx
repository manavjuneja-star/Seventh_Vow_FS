import Link from "next/link";

import { type BlogPost, formatDate } from "@/lib/blog";

import styles from "./BlogHero.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

/** The Journal masthead: the featured story, cover-photo led, whole banner
 *  clickable. Also gives the fixed header a dark ground to sit on. */
export function BlogHero({ post }: { post: BlogPost }): React.ReactElement {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.hero}>
      <div className={styles.bg}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" />
      </div>
      <div className={styles.scrim} />

      <svg
        className={`${styles.petal} ${styles.petal1}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>
      <svg
        className={`${styles.petal} ${styles.petal2}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" fill="#9C6660" />
      </svg>

      <div className={styles.inner}>
        <span className={styles.kicker}>The Journal</span>
        <p className={styles.meta}>
          {post.category}
          <span className={styles.dot}>·</span>
          {formatDate(post.date)}
        </p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.read}>
          Read the story <span className={styles.arrow}>→</span>
        </span>
      </div>

      <svg
        className={styles.wave}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,18 C240,64 480,0 720,26 C960,54 1200,8 1440,32 L1440,64 L0,64 Z"
          fill="var(--blush)"
          opacity="0.97"
        />
        <path
          d="M0,18 C240,64 480,0 720,26 C960,54 1200,8 1440,32"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.45"
        />
      </svg>
    </Link>
  );
}

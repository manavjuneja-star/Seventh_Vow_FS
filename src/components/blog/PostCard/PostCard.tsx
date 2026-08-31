import { type BlogPost, formatDate } from "@/lib/blog";

import styles from "./PostCard.module.css";

type PostCardProps = {
  post: BlogPost;
  feature?: boolean;
};

/** A card in the Journal grid. `feature` lays it out wide, image beside text. */
export function PostCard({ post, feature }: PostCardProps): React.ReactElement {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${feature ? styles.feature : ""}`}
    >
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" />
        {!feature && <span className={styles.category}>{post.category}</span>}
      </div>
      <div className={styles.body}>
        {feature && (
          <span className={styles.featureTag}>
            Featured · {post.category}
          </span>
        )}
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.meta}>
          {formatDate(post.date)}
          <span className={styles.dot}>·</span>
          {post.readMinutes} min read
        </span>
        {feature && <span className={styles.readMore}>Read the story</span>}
      </div>
    </a>
  );
}

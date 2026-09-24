import { type BlogPost, formatDate } from "@/lib/blogShared";

import styles from "./PostKicker.module.css";

/**
 * Shared masthead furniture for all 4 post templates: a thin-rule meta bar
 * (category / entry number), the recurring "The Journal" display mark, the
 * real post title as a smaller subtitle, then the date/read-time line. Each
 * template wraps this with its own image treatment (inset photo, full-width
 * cover, collage grid, or nothing) — this piece stays identical everywhere
 * so the four formats read as one publication, not four different sites.
 */
export function PostKicker({
  post,
  index,
  label = post.category,
  bare = false,
  center = false,
}: {
  post: BlogPost;
  index: number;
  label?: string;
  /** Drop the built-in max-width/padding so a parent layout controls placement. */
  bare?: boolean;
  /** Centre-align the mark/subtitle/meta and the meta bar's contents. */
  center?: boolean;
}): React.ReactElement {
  return (
    <div
      className={`${styles.kicker} ${bare ? styles.bare : ""} ${center ? styles.center : ""}`}
    >
      <div className={styles.metaBar}>
        <span>{label}</span>
        <span>№ {String(index).padStart(2, "0")}</span>
      </div>
      <h1 className={styles.journalMark}>The Journal</h1>
      <p className={styles.subtitle}>{post.title}</p>
      <p className={styles.meta}>
        {formatDate(post.date)}
        <span className={styles.dot}>·</span>
        {post.readMinutes} min read
      </p>
    </div>
  );
}

import type { BlogPost } from "@/lib/blogShared";

import { PostKicker } from "../PostKicker/PostKicker";
import styles from "./PostMasthead.module.css";

/**
 * The shared post hero: "The Journal" mark + real title beside a small inset
 * cover photo. Originally built for the editorial template, kept as the one
 * hero every post format uses so a reader always lands on the same masthead
 * regardless of which template the admin picked for the body.
 */
export function PostMasthead({
  post,
  index,
  label,
}: {
  post: BlogPost;
  index: number;
  label?: string;
}): React.ReactElement {
  return (
    <div className={styles.mastRow}>
      <PostKicker post={post} index={index} label={label} bare />
      <figure className={styles.insetPhoto}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" />
      </figure>
    </div>
  );
}

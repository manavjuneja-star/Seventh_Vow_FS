import type { BlogPost, PhotoEssayContent } from "@/lib/blogShared";

import { AlternatingMedia } from "../AlternatingMedia/AlternatingMedia";
import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./PhotoEssayPost.module.css";

/**
 * The photo-essay template: the shared masthead, an intro line, then the
 * story's photographs run as large alternating image/text rows — left
 * image/right text, then right image/left text, and so on. Frames are the
 * admin's repeatable unit: add as many as the essay needs and they will keep
 * alternating on their own.
 */
export function PhotoEssayPost({
  post,
  content,
  index,
}: {
  post: BlogPost;
  content: PhotoEssayContent;
  index: number;
}): React.ReactElement {
  return (
    <article className={styles.article}>
      <PostMasthead post={post} index={index} />

      <div className={styles.intro}>
        <p>{content.intro}</p>
      </div>

      <div className={styles.frames}>
        {content.frames.map((frame, i) => (
          <AlternatingMedia
            key={frame.src + i}
            image={{ src: frame.src, alt: frame.alt }}
            index={i}
          >
            <p>{frame.caption}</p>
          </AlternatingMedia>
        ))}
      </div>

      <div className={styles.footWrap}>
        <p className={styles.closing}>{content.closing}</p>
        <PostFooter />
      </div>
    </article>
  );
}

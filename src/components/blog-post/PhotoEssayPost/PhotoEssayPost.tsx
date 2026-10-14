import type { BlogPost, PhotoEssayContent } from "@/lib/blogShared";
import { splitParagraphs } from "@/lib/blogShared";

import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./PhotoEssayPost.module.css";

/**
 * The photo-essay template: pictures first. Every photograph is hung
 * together as a mosaic wall straight under the masthead (each shown whole),
 * and the writing follows below as a slim single column with the headings
 * set in the margin, so the story reads after the eye has had its fill.
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
        {splitParagraphs(content.intro).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className={styles.wall}>
        {content.frames.map((frame, i) => (
          <figure key={frame.src + i} className={styles.tile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.src} alt={frame.alt} />
          </figure>
        ))}
      </div>

      <div className={styles.read}>
        {content.frames.map((frame, i) => (
          <section key={`t${i}`} className={styles.entry}>
            {frame.title && <h2 className={styles.entryTitle}>{frame.title}</h2>}
            <div className={styles.entryBody}>
              {splitParagraphs(frame.caption).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.closing}>
          {content.closingTitle && <h2>{content.closingTitle}</h2>}
          {splitParagraphs(content.closing).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

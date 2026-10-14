import type { BlogPost, ChaptersContent } from "@/lib/blogShared";
import { splitParagraphs } from "@/lib/blogShared";

import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./ChaptersPost.module.css";

/**
 * The chapters template: a long read set in one centred column with each
 * chapter's photo floated to alternating sides so the copy wraps around it,
 * like a magazine spread. Chapters open on an oversized numeral; an optional
 * closing note ends the piece.
 */
export function ChaptersPost({
  post,
  content,
  index,
}: {
  post: BlogPost;
  content: ChaptersContent;
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

      <div className={styles.chapters}>
        {content.chapters.map((chapter, i) => (
          <section key={chapter.title} className={styles.chapter}>
            <header className={styles.chapterHead}>
              <span className={styles.numeral}>{i + 1}</span>
              <h2 className={styles.chapterTitle}>{chapter.title}</h2>
            </header>
            <figure className={`${styles.photo} ${i % 2 === 0 ? styles.left : styles.right}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={chapter.image.src} alt={chapter.image.alt} />
            </figure>
            {splitParagraphs(chapter.body).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}

        {content.closing && (
          <section className={styles.closing}>
            <h2>{content.closing.title}</h2>
            {splitParagraphs(content.closing.body).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        )}
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

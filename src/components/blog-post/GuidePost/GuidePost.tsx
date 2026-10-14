import type { BlogPost, GuideContent } from "@/lib/blogShared";
import { splitParagraphs } from "@/lib/blogShared";

import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./GuidePost.module.css";

/**
 * The guide template: a card grid. Each numbered step is its own card, photo
 * on top (shown whole) and the numeral, title and copy beneath; the first
 * two cards run wide and the rest sit three to a row. An optional closing
 * note ("The Takeaway") sits below as a centred band.
 */
export function GuidePost({
  post,
  content,
  index,
}: {
  post: BlogPost;
  content: GuideContent;
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

      <div className={styles.grid}>
        {content.steps.map((step, i) => (
          <section key={step.title} className={styles.card}>
            <div className={styles.photo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.image.src} alt={step.image.alt} />
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className={styles.cardText}>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              {splitParagraphs(step.body).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {content.closing && (
        <aside className={styles.closing}>
          <h2>{content.closing.title}</h2>
          {splitParagraphs(content.closing.body).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </aside>
      )}

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

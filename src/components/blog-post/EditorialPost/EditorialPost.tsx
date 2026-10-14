import type { BlogPost, EditorialContent } from "@/lib/blogShared";

import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./EditorialPost.module.css";

/**
 * The feature template: the shared masthead, a horizontal strip of facts,
 * then the read itself, set left-aligned in a wide column. A section with an
 * `image` hangs it in a narrow rail on the right beside its text, shown
 * whole; sections without one run the full measure. Sections are the
 * admin's repeatable unit: add as many as the feature needs.
 */
export function EditorialPost({
  post,
  content,
  index,
}: {
  post: BlogPost;
  content: EditorialContent;
  index: number;
}): React.ReactElement {
  return (
    <article className={styles.article}>
      <PostMasthead post={post} index={index} label={post.featured ? "Featured Story" : undefined} />

      <div className={styles.standfirst}>
        <p className={styles.standfirstInner}>{content.standfirst}</p>
      </div>

      <dl className={styles.factsStrip}>
        {content.facts.map((f) => (
          <div key={f.label} className={styles.fact}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.body}>
        {content.sections.map((section, i) => (
          <section
            key={section.heading ?? `s${i}`}
            className={`${styles.entry} ${section.image ? styles.withRail : ""}`}
          >
            <div className={styles.copy}>
              {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
              {section.paragraphs.map((p, j) => (
                <p key={j} className={i === 0 && j === 0 ? styles.dropCap : undefined}>
                  {p}
                </p>
              ))}
              {section.pullQuote && (
                <blockquote className={styles.pullQuote}>{section.pullQuote}</blockquote>
              )}
            </div>
            {section.image && (
              <figure className={styles.rail}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={section.image.src} alt={section.image.alt} />
                {section.image.caption && <figcaption>{section.image.caption}</figcaption>}
              </figure>
            )}
          </section>
        ))}
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

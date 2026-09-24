import type { BlogPost, EditorialContent } from "@/lib/blogShared";

import { AlternatingMedia } from "../AlternatingMedia/AlternatingMedia";
import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./EditorialPost.module.css";

/**
 * The feature template: the shared masthead, a horizontal strip of facts,
 * then the read itself — plain text sections for prose, and any section
 * carrying an `image` breaks out to a full-width alternating image/text row
 * instead (side auto-alternates by position unless the section sets
 * `imageRight` explicitly). Sections are the admin's repeatable unit: add as
 * many as the feature needs, with or without an image.
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
  let mediaCount = 0;

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
        {content.sections.map((section, i) => {
          const text = (
            <>
              {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
              {section.paragraphs.map((p, j) => (
                <p key={j} className={i === 0 && j === 0 ? styles.dropCap : undefined}>
                  {p}
                </p>
              ))}
              {section.pullQuote && (
                <blockquote className={styles.pullQuote}>{section.pullQuote}</blockquote>
              )}
            </>
          );

          if (!section.image) {
            return (
              <div key={section.heading ?? `s${i}`} className={styles.textSection}>
                {text}
              </div>
            );
          }

          const reversed = section.imageRight ?? mediaCount % 2 === 1;
          mediaCount += 1;

          return (
            <AlternatingMedia
              key={section.heading ?? `s${i}`}
              image={section.image}
              index={reversed ? 1 : 0}
            >
              {text}
            </AlternatingMedia>
          );
        })}
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

import type { BlogPost, GuideContent } from "@/lib/blogShared";

import { AlternatingMedia } from "../AlternatingMedia/AlternatingMedia";
import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./GuidePost.module.css";

/**
 * The guide template: each numbered step is a large alternating image/text
 * row — left image/right text, then right image/left text, and so on. The
 * step list is the admin's repeatable unit: add as many steps as the guide
 * needs and they will keep alternating on their own.
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
        <p>{content.intro}</p>
      </div>

      <div className={styles.steps}>
        {content.steps.map((step, i) => (
          <AlternatingMedia key={step.title} image={step.image} index={i}>
            <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p>{step.body}</p>
          </AlternatingMedia>
        ))}
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

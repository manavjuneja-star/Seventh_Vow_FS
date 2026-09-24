import type { BlogPost, ChaptersContent } from "@/lib/blogShared";

import { AlternatingMedia } from "../AlternatingMedia/AlternatingMedia";
import { PostFooter } from "../PostFooter/PostFooter";
import { PostMasthead } from "../PostMasthead/PostMasthead";
import styles from "./ChaptersPost.module.css";

/**
 * The chapters template: the shared masthead, then the story told as large
 * alternating image/text chapters — left image/right text, then right
 * image/left text, and so on. Chapters are the admin's repeatable unit: add
 * as many as the story needs and they will keep alternating on their own.
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
        <p>{content.intro}</p>
      </div>

      <div className={styles.chapters}>
        {content.chapters.map((chapter, i) => (
          <AlternatingMedia key={chapter.title} image={chapter.image} index={i}>
            <span className={styles.chapterNumber}>Chapter {i + 1}</span>
            <h2 className={styles.chapterTitle}>{chapter.title}</h2>
            <p>{chapter.body}</p>
          </AlternatingMedia>
        ))}
      </div>

      <div className={styles.footWrap}>
        <PostFooter />
      </div>
    </article>
  );
}

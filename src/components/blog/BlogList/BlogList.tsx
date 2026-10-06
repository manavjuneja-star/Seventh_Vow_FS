import type { BlogPost } from "@/lib/blogShared";
import { PostCard } from "@/components/blog/PostCard/PostCard";

import styles from "./BlogList.module.css";

type BlogListProps = {
  posts: BlogPost[];
};

/** The Journal grid. The featured post lives in the hero, so it isn't in
 *  `posts`. */
export function BlogList({ posts }: BlogListProps): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No stories here yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}

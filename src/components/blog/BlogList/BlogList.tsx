"use client";

import { useMemo, useState } from "react";

import type { BlogPost } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard/PostCard";

import styles from "./BlogList.module.css";

const ALL = "All";

type BlogListProps = {
  posts: BlogPost[];
  categories: string[];
};

/** The Journal grid with category filtering. The featured post lives in the
 *  hero, so it isn't in `posts`. */
export function BlogList({
  posts,
  categories,
}: BlogListProps): React.ReactElement {
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.filters} role="tablist" aria-label="Filter posts">
          {[ALL, ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`${styles.filter} ${
                active === cat ? styles.filterActive : ""
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No stories here yet — check back soon.</p>
        )}
      </div>
    </section>
  );
}

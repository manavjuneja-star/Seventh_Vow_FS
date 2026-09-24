import Link from "next/link";

import { BlogDeleteButton } from "@/components/admin/BlogDeleteButton/BlogDeleteButton";
import { formatDate, getPosts } from "@/lib/blog";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminBlogList(): Promise<React.ReactElement> {
  const posts = await getPosts();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>Blog</h1>
        <Link href="/admin/blog/new" className={styles.btn}>
          + New post
        </Link>
      </div>
      <div className={styles.list}>
        {posts.map((post) => (
          <div key={post.slug} className={styles.listRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt="" className={styles.listThumb} />
            <Link href={`/admin/blog/${post.slug}`} className={styles.listBody}>
              <div className={styles.listTitle}>
                {post.title}
                {post.featured && <span className={styles.badge}>Featured</span>}
              </div>
              <div className={styles.listMeta}>
                {post.format} · {formatDate(post.date)}
              </div>
            </Link>
            <div className={styles.listActions}>
              <BlogDeleteButton slug={post.slug} title={post.title} />
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className={styles.empty}>No posts yet.</p>}
      </div>
    </>
  );
}

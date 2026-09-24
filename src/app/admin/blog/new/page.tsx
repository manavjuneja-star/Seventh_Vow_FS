import Link from "next/link";

import { BlogPostForm } from "@/components/admin/BlogPostForm/BlogPostForm";
import { POST_FORMATS, type PostFormat } from "@/lib/blog";

import styles from "@/app/admin/admin.module.css";

const FORMAT_INFO: Record<PostFormat, { title: string; body: string }> = {
  editorial: {
    title: "Editorial",
    body: "Magazine feature: a facts strip plus prose, with any section carrying an image breaking into an alternating row.",
  },
  "photo-essay": {
    title: "Photo essay",
    body: "A full-width cover, then every frame as an alternating image/text row — captions become the text side.",
  },
  guide: {
    title: "Guide",
    body: "Numbered steps, each one an alternating image/text row.",
  },
  chapters: {
    title: "Chapters",
    body: "A narrative told across alternating chapters.",
  },
};

export default function AdminBlogNew({
  searchParams,
}: {
  searchParams: { format?: string };
}): React.ReactElement {
  const format = searchParams.format as PostFormat | undefined;

  if (!format || !POST_FORMATS.includes(format)) {
    return (
      <>
        <div className={styles.pageHead}>
          <h1 className={styles.h1}>New post — choose a format</h1>
        </div>
        <div className={styles.formatGrid}>
          {POST_FORMATS.map((f) => (
            <Link key={f} href={`/admin/blog/new?format=${f}`} className={styles.formatCard}>
              <h2 className={styles.formatCardTitle}>{FORMAT_INFO[f].title}</h2>
              <p className={styles.formatCardBody}>{FORMAT_INFO[f].body}</p>
            </Link>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>New {FORMAT_INFO[format].title.toLowerCase()} post</h1>
        <Link href="/admin/blog/new" className={styles.back}>
          ← Choose a different format
        </Link>
      </div>
      <BlogPostForm format={format} />
    </>
  );
}

import { notFound } from "next/navigation";

import { BlogPostForm } from "@/components/admin/BlogPostForm/BlogPostForm";
import { getPost } from "@/lib/blog";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminBlogEdit({
  params,
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>{post.title}</h1>
      </div>
      <BlogPostForm format={post.format} initial={post} />
    </>
  );
}

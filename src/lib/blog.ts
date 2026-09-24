/**
 * Blog data access — backed by `content/blog.json` (see
 * `src/lib/repo/store.ts` for the persistence caveat). Server-only: this
 * file imports the `fs`-based repo layer, so client components must import
 * types/constants/`formatDate` from `blogShared.ts` directly, not here —
 * see that file's header comment for why.
 *
 * The admin panel at `/admin/blog` has full create/edit/delete; on create,
 * the admin picks one of the four formats and fills that format's fields —
 * the format is locked after creation (switching formats mid-post would
 * mean re-authoring the content anyway, so there's nothing an "edit format"
 * control would actually do short of discarding what's there).
 *
 * All four formats share one repeatable building block, rendered by
 * `AlternatingMedia`: a large image on one side and text on the other, sides
 * auto-alternating by position — the admin adds as many of these as a post
 * needs and they always read left/right/left/right without any per-item
 * config:
 *  - "editorial"   — magazine feature: facts strip + prose, where any section
 *                    with an `image` breaks out into an alternating row.
 *  - "photo-essay" — a full-width cover, then every frame as an alternating
 *                    image/text row (caption becomes the text side).
 *  - "guide"       — numbered steps, each one an alternating row.
 *  - "chapters"    — a narrative told across alternating chapters.
 */

import { readJson, writeJson } from "@/lib/repo/store";
import { slugify, uniqueSlug } from "@/lib/slug";

const FILE = "blog.json";

export {
  BLOG_CATEGORIES,
  POST_FORMATS,
  formatDate,
  type BlogPost,
  type ChaptersContent,
  type EditorialContent,
  type GuideContent,
  type PhotoEssayContent,
  type PostFormat,
} from "@/lib/blogShared";
import type { BlogPost } from "@/lib/blogShared";

async function readAll(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>(FILE, []);
}

export async function getPosts(): Promise<BlogPost[]> {
  const all = await readAll();
  return [...all].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const all = await readAll();
  return all.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const { BLOG_CATEGORIES } = await import("@/lib/blogShared");
  const all = await readAll();
  const present = new Set(all.map((p) => p.category));
  return BLOG_CATEGORIES.filter((c) => present.has(c));
}

export async function createPost(input: Omit<BlogPost, "slug">): Promise<BlogPost> {
  const all = await readAll();
  const slug = uniqueSlug(slugify(input.title), new Set(all.map((p) => p.slug)));
  const post = { ...input, slug } as BlogPost;
  all.push(post);
  await writeJson(FILE, all);
  return post;
}

export async function updatePost(
  slug: string,
  patch: Partial<Omit<BlogPost, "slug" | "format">>,
): Promise<BlogPost | null> {
  const all = await readAll();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const merged = { ...all[i], ...patch } as BlogPost;
  all[i] = merged;
  await writeJson(FILE, all);
  return merged;
}

export async function deletePost(slug: string): Promise<boolean> {
  const all = await readAll();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) return false;
  await writeJson(FILE, next);
  return true;
}

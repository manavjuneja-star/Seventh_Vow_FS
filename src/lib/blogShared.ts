/**
 * Types, format constants and the `formatDate` helper for blog posts — split
 * out of `blog.ts` because that file also imports the `fs`-based repo layer
 * (`@/lib/repo/store`), which breaks webpack's client bundle the moment any
 * client component (or a server component reachable from one) imports even
 * a runtime value from it. Nothing here touches the filesystem, so it's safe
 * for both client and server components. `blog.ts` re-exports all of this
 * for server-side callers; import directly from here in client components.
 */

export const BLOG_CATEGORIES = ["Wedding & Planning", "Decor & Styling"] as const;

export const POST_FORMATS = ["editorial", "photo-essay", "guide", "chapters"] as const;
export type PostFormat = (typeof POST_FORMATS)[number];

export type EditorialContent = {
  standfirst: string;
  facts: { label: string; value: string }[];
  sections: {
    heading?: string;
    paragraphs: string[];
    pullQuote?: string;
    image?: { src: string; alt: string; caption?: string };
    imageRight?: boolean;
  }[];
};

export type PhotoEssayContent = {
  intro: string;
  frames: { src: string; alt: string; caption: string }[];
  closing: string;
};

export type GuideContent = {
  intro: string;
  steps: { title: string; body: string; image: { src: string; alt: string } }[];
};

export type ChaptersContent = {
  intro: string;
  chapters: { title: string; body: string; image: { src: string; alt: string } }[];
};

type PostBase = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  /** ISO date, e.g. "2026-05-18" */
  date: string;
  readMinutes: number;
  featured?: boolean;
};

export type BlogPost =
  | (PostBase & { format: "editorial"; content: EditorialContent })
  | (PostBase & { format: "photo-essay"; content: PhotoEssayContent })
  | (PostBase & { format: "guide"; content: GuideContent })
  | (PostBase & { format: "chapters"; content: ChaptersContent });

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

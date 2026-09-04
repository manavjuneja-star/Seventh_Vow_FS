/**
 * Blog content.
 *
 * These posts are placeholders so the Journal page can be designed and reviewed
 * now. When the admin panel + database land, replace the `POSTS` array with a
 * query — the `BlogPost` shape is the contract the rest of the site relies on.
 */

/** Filter order shown on the Journal listing. "All" is added by the UI. */
export const BLOG_CATEGORIES = [
  "Weddings",
  "Planning",
  "Décor & Styling",
] as const;

export type BlogPost = {
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

const POSTS: BlogPost[] = [
  {
    slug: "aranya-and-kabir-a-lakeside-vow-in-udaipur",
    title: "Aranya & Kabir — a lakeside vow in Udaipur",
    excerpt:
      "Three days on the water, a mandap built to catch the evening light, and four hundred guests who never once had to ask where to be.",
    cover: "/images/mandap.webp",
    category: "Weddings",
    date: "2026-06-02",
    readMinutes: 7,
    featured: true,
  },
  {
    slug: "building-a-timeline-that-holds",
    title: "Building a wedding timeline that actually holds",
    excerpt:
      "The difference between a day that flows and a day that drags is usually forty minutes hidden in the wrong place. Here is how we map it.",
    cover: "/images/banquet.webp",
    category: "Planning",
    date: "2026-05-19",
    readMinutes: 6,
  },
  {
    slug: "one-flower-six-tiers",
    title: "One flower, six tiers: designing a cake as a centrepiece",
    excerpt:
      "When the cake has to carry a whole room, it stops being dessert and starts being architecture. Notes from a collaboration with the pastry team.",
    cover: "/images/cake.webp",
    category: "Décor & Styling",
    date: "2026-04-28",
    readMinutes: 5,
  },
  {
    slug: "the-roka-ceremony-explained",
    title: "The Roka ceremony, and why we start planning here",
    excerpt:
      "A small gathering that sets the tone for everything after it. What it means, who it is for, and how to make it feel like the beginning it is.",
    cover: "/images/bouquet.webp",
    category: "Planning",
    date: "2026-04-11",
    readMinutes: 4,
  },
  {
    slug: "choosing-a-destination-for-a-winter-wedding",
    title: "Choosing a destination for a winter wedding",
    excerpt:
      "Palaces, coastlines and hidden gardens read very differently in December. A short guide to scouting for the season you are actually marrying in.",
    cover: "/images/gazebo.webp",
    category: "Planning",
    date: "2026-03-22",
    readMinutes: 8,
  },
  {
    slug: "meher-and-dev-a-monsoon-morning-in-goa",
    title: "Meher & Dev — a monsoon morning in Goa",
    excerpt:
      "They handed us a folder of half-ideas and asked for a weekend that felt like it had always existed. The rain, it turned out, was on our side.",
    cover: "/images/vows.webp",
    category: "Weddings",
    date: "2026-02-14",
    readMinutes: 6,
  },
  {
    slug: "hosting-a-guest-list-of-four-hundred",
    title: "Hospitality at scale: hosting four hundred guests well",
    excerpt:
      "Travel, stay and welcome experiences that make a large celebration feel intimate. The systems we run behind the scenes so no one feels like a number.",
    cover: "/images/banquet.webp",
    category: "Planning",
    date: "2026-01-30",
    readMinutes: 7,
  },
];

export function getPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const present = new Set(POSTS.map((p) => p.category));
  return BLOG_CATEGORIES.filter((c) => present.has(c));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

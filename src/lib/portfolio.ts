/**
 * Portfolio content — one page per celebration, plus the featured/regular
 * split the homepage `Portfolio` section renders.
 *
 * Backed by `content/portfolio.json` (see `src/lib/repo/store.ts` for the
 * important caveat about where this actually persists). The admin panel at
 * `/admin/portfolio` edits these 4 entries in place — it does not add or
 * remove entries, per the spec: rename regenerates the slug, images and
 * text are freely editable, and exactly one entry carries `featured: true`
 * (the homepage's bigger card).
 */

import { readJson, writeJson } from "@/lib/repo/store";
import { slugify } from "@/lib/slug";

const FILE = "portfolio.json";

export type PhotoSize = "sm" | "md" | "tall" | "wide" | "lg";

export type PortfolioPhoto = {
  src: string;
  alt: string;
  size: PhotoSize;
  width?: number;
  height?: number;
};

export type PortfolioEntry = {
  slug: string;
  coupleNames: string;
  location: string;
  date: string;
  duration: string;
  heroImage: string;
  heroAlt: string;
  featured: boolean;
  description: string;
  photos: PortfolioPhoto[];
};

async function readAll(): Promise<PortfolioEntry[]> {
  return readJson<PortfolioEntry[]>(FILE, []);
}

export async function getPortfolioEntries(): Promise<PortfolioEntry[]> {
  return readAll();
}

export async function getFeaturedPortfolioEntry(): Promise<PortfolioEntry | undefined> {
  const all = await readAll();
  return all.find((e) => e.featured) ?? all[0];
}

export async function getPortfolioEntry(slug: string): Promise<PortfolioEntry | undefined> {
  const all = await readAll();
  return all.find((e) => e.slug === slug);
}

/** The next entry in sequence (wraps around), and the two remaining ones. */
export async function getPortfolioNeighbours(
  slug: string,
): Promise<{ next: PortfolioEntry; others: PortfolioEntry[] }> {
  const all = await readAll();
  const i = all.findIndex((e) => e.slug === slug);
  const next = all[(i + 1) % all.length];
  const others = all.filter((e) => e.slug !== slug && e.slug !== next.slug);
  return { next, others };
}

/**
 * Updates one entry, keyed by its *current* slug. If `coupleNames` changed,
 * the slug is regenerated from the new name (existing links to the old slug
 * break — no redirect layer yet, matching the "not yet decided" flag in the
 * admin-panel spec). Returns the saved entry (with its possibly-new slug),
 * or `null` if `currentSlug` doesn't exist.
 */
export async function updatePortfolioEntry(
  currentSlug: string,
  patch: Partial<Omit<PortfolioEntry, "slug">>,
): Promise<PortfolioEntry | null> {
  const all = await readAll();
  const i = all.findIndex((e) => e.slug === currentSlug);
  if (i === -1) return null;

  const merged: PortfolioEntry = { ...all[i], ...patch };

  if (patch.coupleNames && patch.coupleNames !== all[i].coupleNames) {
    const taken = new Set(all.filter((_, j) => j !== i).map((e) => e.slug));
    let candidate = slugify(patch.coupleNames);
    if (taken.has(candidate)) {
      let n = 2;
      while (taken.has(`${candidate}-${n}`)) n++;
      candidate = `${candidate}-${n}`;
    }
    merged.slug = candidate;
  }

  // Exactly one featured entry: setting this one true un-sets every other.
  if (patch.featured === true) {
    all.forEach((e, j) => {
      if (j !== i) e.featured = false;
    });
  }

  all[i] = merged;
  await writeJson(FILE, all);
  return merged;
}

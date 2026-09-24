/**
 * Destinations content — one entry per place the studio works in. Backed by
 * `content/destinations.json` (see `src/lib/repo/store.ts` for the
 * persistence caveat).
 *
 * The admin panel at `/admin/destinations` is two-level CRUD: destinations
 * themselves (add/edit/delete, name rename regenerates the slug same as
 * portfolio) and, nested under each one, its venues (add/edit/delete). Venue
 * photos are `public/images/venue-*.webp` (see the destinations-page
 * memory) — admin-uploaded images land in `public/images/uploads/` instead
 * via the shared upload endpoint.
 */

import { readJson, writeJson } from "@/lib/repo/store";
import { slugify, uniqueSlug } from "@/lib/slug";

const FILE = "destinations.json";

export type DestinationCategory = "domestic" | "international";

export type Venue = {
  name: string;
  image: string;
};

export type MonthClimate = {
  month: string;
  tempC: number;
  rain: number;
};

export type Weather = {
  bestWindow: string;
  summary: string;
  months: MonthClimate[];
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  category: DestinationCategory;
  image: string;
  blurb: string;
  whyChoose?: string[];
  venues?: Venue[];
  weather?: Weather;
};

async function readAll(): Promise<Destination[]> {
  return readJson<Destination[]>(FILE, []);
}

export async function getDestinations(): Promise<Destination[]> {
  return readAll();
}

export async function getDestination(slug: string): Promise<Destination | undefined> {
  const all = await readAll();
  return all.find((d) => d.slug === slug);
}

export async function createDestination(
  input: Omit<Destination, "slug">,
): Promise<Destination> {
  const all = await readAll();
  const slug = uniqueSlug(slugify(input.name), new Set(all.map((d) => d.slug)));
  const destination: Destination = { ...input, slug };
  all.push(destination);
  await writeJson(FILE, all);
  return destination;
}

/** Renaming regenerates the slug, same rule as portfolio entries. */
export async function updateDestination(
  currentSlug: string,
  patch: Partial<Omit<Destination, "slug">>,
): Promise<Destination | null> {
  const all = await readAll();
  const i = all.findIndex((d) => d.slug === currentSlug);
  if (i === -1) return null;

  const merged: Destination = { ...all[i], ...patch };
  if (patch.name && patch.name !== all[i].name) {
    const taken = new Set(all.filter((_, j) => j !== i).map((d) => d.slug));
    merged.slug = uniqueSlug(slugify(patch.name), taken);
  }

  all[i] = merged;
  await writeJson(FILE, all);
  return merged;
}

export async function deleteDestination(slug: string): Promise<boolean> {
  const all = await readAll();
  const next = all.filter((d) => d.slug !== slug);
  if (next.length === all.length) return false;
  await writeJson(FILE, next);
  return true;
}

// --- Venues (nested under a destination, addressed by index) ---------------

export async function addVenue(destSlug: string, venue: Venue): Promise<Destination | null> {
  const all = await readAll();
  const i = all.findIndex((d) => d.slug === destSlug);
  if (i === -1) return null;
  all[i].venues = [...(all[i].venues ?? []), venue];
  await writeJson(FILE, all);
  return all[i];
}

export async function updateVenue(
  destSlug: string,
  index: number,
  patch: Partial<Venue>,
): Promise<Destination | null> {
  const all = await readAll();
  const i = all.findIndex((d) => d.slug === destSlug);
  if (i === -1 || !all[i].venues?.[index]) return null;
  all[i].venues![index] = { ...all[i].venues![index], ...patch };
  await writeJson(FILE, all);
  return all[i];
}

export async function deleteVenue(destSlug: string, index: number): Promise<Destination | null> {
  const all = await readAll();
  const i = all.findIndex((d) => d.slug === destSlug);
  if (i === -1 || !all[i].venues?.[index]) return null;
  all[i].venues = all[i].venues!.filter((_, j) => j !== index);
  await writeJson(FILE, all);
  return all[i];
}

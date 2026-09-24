/** Derives a URL slug from a display name — used whenever the admin panel
 *  renames something whose slug isn't independently editable (portfolio
 *  couples, destinations). Lowercases, strips accents, replaces "&" with
 *  "and" so couple names read naturally, then collapses everything else
 *  to hyphens. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Appends `-2`, `-3`, ... until `candidate` doesn't collide with `taken`. */
export function uniqueSlug(candidate: string, taken: Set<string>): string {
  if (!taken.has(candidate)) return candidate;
  let i = 2;
  while (taken.has(`${candidate}-${i}`)) i++;
  return `${candidate}-${i}`;
}

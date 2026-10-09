/** Single source of truth for site-wide SEO facts (metadata, JSON-LD, sitemap).
 *  Set NEXT_PUBLIC_SITE_URL in Vercel to the live domain; the fallback is the
 *  studio's own domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.theseventhvowweddings.com"
).replace(/\/$/, "");

export const SITE = {
  name: "The Seventh Vow Weddings",
  shortName: "The Seventh Vow",
  tagline: "The celebration beyond the seven vows.",
  description:
    "The Seventh Vow Weddings is a wedding planning company in New Delhi planning weddings across India and abroad, from Udaipur, Jaipur and Goa to Bali, Thailand and Dubai. Bespoke planning, design, hospitality and on-ground execution.",
  email: "info@theseventhvowweddings.com",
  phone: "+918384081013",
  instagram: "https://www.instagram.com/theseventhvow_weddings",
  locality: "New Delhi",
  country: "IN",
  ogImage: "/og-image.jpg",
  keywords: [
    "The Seventh Vow Weddings",
    "Seventh Vow Weddings",
    "wedding planners in India",
    "wedding planner in Delhi",
    "wedding planners in Delhi NCR",
    "luxury wedding planners India",
    "destination wedding planners India",
    "destination wedding planner",
    "wedding planners in Udaipur",
    "wedding planners in Jaipur",
    "wedding planners in Goa",
    "wedding planners in Jim Corbett",
    "international destination wedding planner",
    "wedding planners in Bali",
    "wedding planners in Thailand",
    "wedding planners in Dubai",
    "wedding planners in Sri Lanka",
    "wedding planning company",
    "wedding management company",
    "event management for weddings",
    "wedding decor and styling",
    "wedding hospitality and guest management",
  ],
} as const;

export const absoluteUrl = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Portfolio content — one page per celebration.
 *
 * Photos are placeholders (the site's six stock wedding images, reused with
 * different sizes and ordering per couple) so the layout can be designed and
 * reviewed now. Swap `photos` for the client's real gallery per couple when it
 * lands — the `PortfolioPhoto` shape is the contract the gallery relies on.
 */

export type PhotoSize = "sm" | "md" | "tall" | "wide" | "lg";

export type PortfolioPhoto = {
  src: string;
  alt: string;
  size: PhotoSize;
  /** Intrinsic pixel dimensions — lets the masonry reserve space before the
   *  image loads (no layout shift). Required with the client's real photos;
   *  the placeholder gallery falls back to the known stock-image sizes. */
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
  description: string;
  photos: PortfolioPhoto[];
};

const STOCK = {
  banquet: "/images/banquet.webp",
  bouquet: "/images/bouquet.webp",
  cake: "/images/cake.webp",
  gazebo: "/images/gazebo.webp",
  mandap: "/images/mandap.webp",
  vows: "/images/vows.webp",
};

const ENTRIES: PortfolioEntry[] = [
  {
    slug: "ira-rohan",
    coupleNames: "Ira & Rohan",
    location: "Jaisalmer, Rajasthan",
    date: "2024",
    duration: "Three days",
    heroImage: STOCK.banquet,
    description:
      "Four hundred guests carried across three cities, ending with dinner for all of them under one desert sky.",
    photos: [
      { src: STOCK.banquet, alt: "Long banquet table with chandelier", size: "lg" },
      { src: STOCK.mandap, alt: "Floral mandap at dusk", size: "tall" },
      { src: STOCK.bouquet, alt: "Bridal bouquet detail", size: "sm" },
      { src: STOCK.cake, alt: "Six-tier wedding cake", size: "sm" },
      { src: STOCK.gazebo, alt: "Desert gazebo ceremony", size: "wide" },
      { src: STOCK.vows, alt: "Vows at golden hour", size: "md" },
      { src: STOCK.bouquet, alt: "Floral centrepiece", size: "sm" },
      { src: STOCK.banquet, alt: "Guests at the long table", size: "md" },
      { src: STOCK.mandap, alt: "Mandap detail", size: "sm" },
      { src: STOCK.cake, alt: "Cake and florals", size: "tall" },
      { src: STOCK.vows, alt: "First look", size: "sm" },
      { src: STOCK.gazebo, alt: "Evening light over the gazebo", size: "wide" },
    ],
  },
  {
    slug: "aranya-kabir",
    coupleNames: "Aranya & Kabir",
    location: "Udaipur, Rajasthan",
    date: "2025",
    duration: "Four days",
    heroImage: STOCK.mandap,
    description:
      "A mandap built to catch the evening light on the water, and a lakeside vow four hundred guests never once had to ask where to be for.",
    photos: [
      { src: STOCK.mandap, alt: "Lakeside mandap", size: "lg" },
      { src: STOCK.vows, alt: "Exchanging vows", size: "wide" },
      { src: STOCK.bouquet, alt: "Bouquet study", size: "sm" },
      { src: STOCK.gazebo, alt: "Ceremony gazebo", size: "sm" },
      { src: STOCK.cake, alt: "Wedding cake", size: "md" },
      { src: STOCK.banquet, alt: "Reception banquet", size: "tall" },
      { src: STOCK.vows, alt: "A quiet moment", size: "sm" },
      { src: STOCK.mandap, alt: "Mandap florals", size: "sm" },
      { src: STOCK.gazebo, alt: "Golden hour at the gazebo", size: "wide" },
      { src: STOCK.bouquet, alt: "Bridal details", size: "md" },
      { src: STOCK.banquet, alt: "The long table, lit for dinner", size: "sm" },
      { src: STOCK.cake, alt: "Cutting the cake", size: "sm" },
    ],
  },
  {
    slug: "meher-dev",
    coupleNames: "Meher & Dev",
    location: "Goa",
    date: "2025",
    duration: "A weekend",
    heroImage: STOCK.gazebo,
    description:
      "A folder of half-ideas and a weekend that felt like it had always existed — the rain, it turned out, was on our side.",
    photos: [
      { src: STOCK.gazebo, alt: "Monsoon gazebo ceremony", size: "wide" },
      { src: STOCK.vows, alt: "Vows in the rain-light", size: "lg" },
      { src: STOCK.bouquet, alt: "Bouquet in hand", size: "sm" },
      { src: STOCK.banquet, alt: "Dinner under string lights", size: "sm" },
      { src: STOCK.mandap, alt: "Floral mandap", size: "tall" },
      { src: STOCK.cake, alt: "Cake table", size: "sm" },
      { src: STOCK.gazebo, alt: "The gazebo, from the aisle", size: "sm" },
      { src: STOCK.vows, alt: "A shared look", size: "md" },
      { src: STOCK.bouquet, alt: "Floral detail", size: "sm" },
      { src: STOCK.banquet, alt: "The reception table", size: "wide" },
      { src: STOCK.mandap, alt: "Mandap at dusk", size: "sm" },
      { src: STOCK.cake, alt: "Six tiers, one flower", size: "md" },
    ],
  },
  {
    slug: "naina-arjun",
    coupleNames: "Naina & Arjun",
    location: "Tuscany, Italy",
    date: "2024",
    duration: "Five days",
    heroImage: STOCK.vows,
    description:
      "A destination wedding scouted and staged from scratch — hidden gardens, a villa reception, and a week the families still talk about.",
    photos: [
      { src: STOCK.vows, alt: "Vows among the vineyards", size: "wide" },
      { src: STOCK.bouquet, alt: "Garden bouquet", size: "lg" },
      { src: STOCK.gazebo, alt: "Villa ceremony", size: "sm" },
      { src: STOCK.cake, alt: "Wedding cake", size: "sm" },
      { src: STOCK.banquet, alt: "Reception dinner", size: "md" },
      { src: STOCK.mandap, alt: "Floral arch", size: "sm" },
      { src: STOCK.bouquet, alt: "Bridal florals", size: "sm" },
      { src: STOCK.vows, alt: "First dance", size: "tall" },
      { src: STOCK.gazebo, alt: "Evening at the villa", size: "wide" },
      { src: STOCK.cake, alt: "Cake detail", size: "sm" },
      { src: STOCK.banquet, alt: "The long table", size: "sm" },
      { src: STOCK.mandap, alt: "Arch at golden hour", size: "md" },
    ],
  },
];

export function getPortfolioEntries(): PortfolioEntry[] {
  return ENTRIES;
}

export function getPortfolioEntry(slug: string): PortfolioEntry | undefined {
  return ENTRIES.find((e) => e.slug === slug);
}

/** The next entry in sequence (wraps around), and the two remaining ones. */
export function getPortfolioNeighbours(slug: string): {
  next: PortfolioEntry;
  others: PortfolioEntry[];
} {
  const i = ENTRIES.findIndex((e) => e.slug === slug);
  const next = ENTRIES[(i + 1) % ENTRIES.length];
  const others = ENTRIES.filter((e) => e.slug !== slug && e.slug !== next.slug);
  return { next, others };
}

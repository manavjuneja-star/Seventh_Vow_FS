import { SITE, SITE_URL, absoluteUrl } from "@/lib/site";

const AREAS = [
  "India",
  "New Delhi",
  "Delhi NCR",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Jim Corbett",
  "Thailand",
  "Bali",
  "Dubai",
  "Abu Dhabi",
  "Sri Lanka",
];

/** The studio as a local business: this is what lets Google connect searches
 *  like "wedding planners in Delhi" to the brand. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    alternateName: ["Seventh Vow Weddings", "The Seventh Vow"],
    description: SITE.description,
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    slogan: SITE.tagline,
    priceRange: "\u20b9\u20b9\u20b9\u20b9",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: "Delhi",
      addressCountry: SITE.country,
    },
    areaServed: AREAS.map((name) => ({ "@type": name === "India" ? "Country" : "Place", name })),
    knowsAbout: [
      "Wedding planning",
      "Destination weddings",
      "Wedding decor and styling",
      "Wedding hospitality and guest management",
      "Event management",
      "Vendor and artist management",
    ],
    sameAs: [SITE.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

export function servicesJsonLd(
  services: Array<{ title: string; blurb: string; slug: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.blurb,
        url: absoluteUrl(`/services#${s.slug}`),
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "India",
      },
    })),
  };
}

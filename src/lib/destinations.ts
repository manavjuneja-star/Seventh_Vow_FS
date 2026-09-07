/**
 * Destinations content — one entry per place the studio works in.
 *
 * Card / hero photos are 1600x1000 WebP crops of Unsplash photos (public/images/
 * dest-*.webp), free under the Unsplash License. Each destination will later
 * carry a list of partnered venues/hotels/resorts for its own
 * `/destinations/[slug]` page — the `Destination` shape is the seam the admin
 * panel will write to.
 */

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string;
  blurb: string;
};

const DESTINATIONS: Destination[] = [
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    image: "/images/dest-jaipur.webp",
    blurb:
      "Palace courtyards and fort ramparts, block-printed canopies and marigold by the truckload. Jaipur gives a wedding scale and colour without ever asking it to leave the walled city.",
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    region: "Rajasthan",
    image: "/images/dest-udaipur.webp",
    blurb:
      "A baraat that arrives by boat and a mandap that catches the lake at dusk. Island venues, hilltop palaces and a skyline that does half the work for you.",
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West Coast",
    image: "/images/dest-goa.webp",
    blurb:
      "Portuguese villas, beach lawns and a light that turns gold an hour before sunset. Best in the shoulder months, when the crowds have thinned and the sea has calmed.",
  },
  {
    slug: "agra",
    name: "Agra",
    region: "Uttar Pradesh",
    image: "/images/dest-agra.webp",
    blurb:
      "Mughal gardens, riverside terraces and, if you plan the sightlines carefully, the Taj in the frame. A destination for couples who want one unmistakable backdrop.",
  },
  {
    slug: "jim-corbett",
    name: "Jim Corbett",
    region: "Uttarakhand",
    image: "/images/dest-jim-corbett.webp",
    blurb:
      "Forest resorts and riverside lawns a few hours from Delhi. The right choice for a smaller guest list and a weekend that feels genuinely away from the city.",
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    region: "National Capital Region",
    image: "/images/dest-delhi-ncr.webp",
    blurb:
      "Heritage havelis, sprawling farmhouses and hotel ballrooms that can hold any number. The practical choice when most of the guest list already lives in town.",
  },
];

export function getDestinations(): Destination[] {
  return DESTINATIONS;
}

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

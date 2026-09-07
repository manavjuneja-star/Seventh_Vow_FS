/**
 * Services shown on `/services` and linked from the footer. Ordered by what
 * matters most to a couple choosing a planner. One source of truth: the page
 * and the footer both import `SERVICES`. Photography is placeholder (reuses the
 * wedding set) until the studio supplies its own.
 */

export type Offering = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
};

export const SERVICES: Offering[] = [
  {
    slug: "end-to-end-wedding-planning",
    title: "End-to-End Wedding Planning",
    blurb:
      "From the first mood board to the last farewell, one team holds every moving part — budgets, timelines, vendors, and the thousand small decisions in between. You make the choices that matter; we carry the rest, so the months before feel as calm as the day itself.",
    image: "/images/banquet.webp",
  },
  {
    slug: "creative-concepts-innovation",
    title: "Creative Concepts & Innovation",
    blurb:
      "Every celebration begins with a single question: what is true about this couple that no template could capture? From that answer comes the palette, the staging, and ideas you haven't seen at another wedding — because we don't repeat them.",
    image: "/images/mandap.webp",
  },
  {
    slug: "event-design",
    title: "Event Design",
    blurb:
      "Mandaps, tablescapes, florals, and lighting composed as one continuous visual language — not a collection of rented pieces. We design to the couple, then build every layer to hold together from the entrance to the last table.",
    image: "/images/bouquet.webp",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    blurb:
      "Travel, stay, and welcome experiences that make every guest feel expected. From the airport pickup to the note on the pillow, the details that turn attendees into people who felt looked after.",
    image: "/images/gazebo.webp",
  },
  {
    slug: "event-flow",
    title: "Event Flow",
    blurb:
      "A minute-by-minute plan, and a team who runs it so quietly you never see the work. Cues, contingencies, and a single point of contact on the day — so the couple is a guest at their own celebration.",
    image: "/images/vows.webp",
  },
  {
    slug: "vendor-coordination",
    title: "Vendor Coordination",
    blurb:
      "A curated bench of artisans, caterers, and craftsmen — briefed, managed, and held to a standard. One team speaks to all of them, so nothing falls between the gaps.",
    image: "/images/cake.webp",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    blurb:
      "Musicians, performers, and hosts chosen for the room and the moment, not a standard package. We brief every act to the arc of the evening so the energy builds exactly where it should.",
    image: "/images/banquet.webp",
  },
];

/**
 * Additional occasions the studio takes on beyond the core wedding work. Shown
 * only in the footer, and only as plain links to `/services` — they have no
 * section of their own on the page.
 */
export const FOOTER_EXTRA: string[] = [
  "Wedding Planning",
  "Roka & Engagement Ceremonies",
  "Wedding Anniversaries",
  "Birthday Celebrations",
  "Corporate Events",
  "Hospitality & Logistics Management",
];

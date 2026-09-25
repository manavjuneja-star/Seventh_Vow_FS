/**
 * Services shown on `/services` and linked from the footer. Ordered by what
 * matters most to a couple choosing a planner. One source of truth: the page
 * and the footer both import `SERVICES`. Photography is placeholder (reuses the
 * wedding set) until the studio supplies its own.
 */

export type Offering = {
  slug: string;
  title: string;
  /** One-line headline shown above the description. */
  tagline: string;
  blurb: string;
  image: string;
};

export const SERVICES: Offering[] = [
  {
    slug: "wedding-planning-management",
    title: "Wedding Planning & Management",
    tagline: "Your vision stays yours. The complexity becomes ours.",
    blurb:
      "We build the structure behind your celebration, managing budgets, timelines, venues, vendors, schedules and the countless decisions that keep everything moving. You remain involved where it matters, while we take responsibility for making the pieces work together.",
    image: "/images/banquet.webp",
  },
  {
    slug: "concept-experience-curation",
    title: "Concept & Experience Curation",
    tagline: "A celebration should feel like you before it looks like you.",
    blurb:
      "We begin with your story, personality and the experience you want your guests to have. From the overall celebration concept to the details that shape each event, we develop ideas that feel personal, purposeful and considered, crafted exclusively around you.",
    image: "/images/mandap.webp",
  },
  {
    slug: "event-design-styling",
    title: "Event Design & Styling",
    tagline: "Every element belongs to the same story.",
    blurb:
      "From mandaps and florals to tablescapes, lighting, stationery and styling, we create a visual language for each celebration. Every element is considered in relation to the space, the occasion and the experience, creating environments that feel cohesive rather than assembled.",
    image: "/images/bouquet.webp",
  },
  {
    slug: "guest-hospitality-experience",
    title: "Guest Hospitality & Experience",
    tagline: "The celebration begins the moment your guests arrive.",
    blurb:
      "We look after the journey around the wedding, from invitations, RSVP management and travel to accommodation, airport transfers, rooming, welcomes and on-ground assistance. Every interaction is planned to make your guests feel expected, comfortable and genuinely looked after.",
    image: "/images/gazebo.webp",
  },
  {
    slug: "event-management-execution",
    title: "Event Management & Execution",
    tagline: "When the day arrives, every detail needs to know its place.",
    blurb:
      "Our on-ground team manages schedules, rehearsals, guest movement, vendor coordination, production, transitions and last-minute changes in real time. The work happens around you, allowing you to be present in the celebration rather than managing what happens next.",
    image: "/images/vows.webp",
  },
  {
    slug: "vendor-curation-management",
    title: "Vendor Curation & Management",
    tagline: "The right celebration starts with the right people.",
    blurb:
      "We curate and manage the specialists behind your wedding, from décor and catering to photography, production and florals. Every partner is briefed around your vision, coordinated throughout the planning process and managed as part of one larger team.",
    image: "/images/cake.webp",
  },
  {
    slug: "entertainment-artist-management",
    title: "Entertainment & Artist Management",
    tagline: "Entertainment should belong to the celebration, not interrupt it.",
    blurb:
      "We curate artists, musicians, DJs, performers and hosts based on your audience, setting and the energy you want to create. From artist selection and negotiations to schedules, technical requirements and on-ground coordination, we manage the details behind every performance.",
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

/**
 * Services and specializations shown on `/services` and linked from the footer.
 * Ordered by what matters most to a couple choosing a planner. Photography is
 * placeholder (reuses the wedding set) until the studio supplies its own.
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
    image: "/images/banquet.jpg",
  },
  {
    slug: "creative-concepts-innovation",
    title: "Creative Concepts & Innovation",
    blurb:
      "Every celebration begins with a single question: what is true about this couple that no template could capture? From that answer comes the palette, the staging, and ideas you haven't seen at another wedding — because we don't repeat them.",
    image: "/images/mandap.jpg",
  },
  {
    slug: "roka-engagement-ceremonies",
    title: "Roka & Engagement Ceremonies",
    blurb:
      "The first gathering sets the tone for everything after it. We design these early moments with the same care as the wedding — an intimate room, a considered menu, and a look your families remember long before the vows.",
    image: "/images/bouquet.jpg",
  },
  {
    slug: "wedding-anniversaries",
    title: "Wedding Anniversaries",
    blurb:
      "A quieter occasion, and often a more personal one. We create anniversary celebrations that feel like a private return to what mattered — for the two of you, or for the hundred people who were there the first time.",
    image: "/images/vows.jpg",
  },
  {
    slug: "birthday-celebrations",
    title: "Birthday Celebrations",
    blurb:
      "A milestone birthday deserves more than a booking. We bring the same design language and on-ground precision to a landmark year — a room that feels like the person, and an evening that runs without a single visible seam.",
    image: "/images/cake.jpg",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    blurb:
      "Launches, off-sites, and awards nights staged with the polish of a private celebration. Clear brand expression, tight logistics, and a guest experience your team and clients actually talk about afterwards.",
    image: "/images/gazebo.jpg",
  },
];

export const SPECIALIZATIONS: Offering[] = [
  {
    slug: "event-design-styling",
    title: "Event Design & Styling",
    blurb:
      "Mandaps, tablescapes, florals, and lighting composed as one continuous visual language — not a collection of rented pieces. We design to the couple, then build every layer to hold together from the entrance to the last table.",
    image: "/images/mandap.jpg",
  },
  {
    slug: "hospitality-guest-experience",
    title: "Hospitality & Guest Experience",
    blurb:
      "Travel, stay, and welcome experiences that make every guest feel expected. From the airport pickup to the note on the pillow, the details that turn attendees into people who felt looked after.",
    image: "/images/gazebo.jpg",
  },
  {
    slug: "event-flow-on-ground-execution",
    title: "Event Flow & On-Ground Execution",
    blurb:
      "A minute-by-minute plan, and a team who runs it so quietly you never see the work. Cues, contingencies, and a single point of contact on the day — so the couple is a guest at their own celebration.",
    image: "/images/banquet.jpg",
  },
  {
    slug: "entertainment-curation",
    title: "Entertainment Curation",
    blurb:
      "Musicians, performers, and hosts chosen for the room and the moment, not a standard package. We brief every act to the arc of the evening so the energy builds exactly where it should.",
    image: "/images/cake.jpg",
  },
  {
    slug: "vendor-partner-coordination",
    title: "Vendor & Partner Coordination",
    blurb:
      "A curated bench of artisans, caterers, and craftsmen — briefed, managed, and held to a standard. One team speaks to all of them, so nothing falls between the gaps.",
    image: "/images/bouquet.jpg",
  },
  {
    slug: "travel-logistics-management",
    title: "Travel & Logistics Management",
    blurb:
      "Guest movements across cities, permits, transport, and the schedule that ties it together. The invisible infrastructure that lets a three-day, multi-venue celebration feel effortless.",
    image: "/images/vows.jpg",
  },
];

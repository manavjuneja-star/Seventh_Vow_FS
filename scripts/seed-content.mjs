// One-time migration: dumps the hardcoded arrays that used to live in
// src/lib/{portfolio,blog,destinations}.ts into content/*.json, which the
// admin panel now reads/writes. Safe to delete once content/ has real data
// in it — this is only useful for re-seeding from scratch.
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");

const STOCK = {
  banquet: "/images/banquet.webp",
  bouquet: "/images/bouquet.webp",
  cake: "/images/cake.webp",
  gazebo: "/images/gazebo.webp",
  mandap: "/images/mandap.webp",
  vows: "/images/vows.webp",
};

const PORTFOLIO = [
  {
    slug: "ira-rohan",
    coupleNames: "Ira & Rohan",
    location: "Jaisalmer, Rajasthan",
    date: "2024",
    duration: "Three days",
    heroImage: STOCK.banquet,
    heroAlt: "Long banquet table with chandelier",
    featured: true,
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
    heroAlt: "Wedding cake with floral arrangement",
    featured: false,
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
    heroAlt: "Wedding gazebo venue",
    featured: false,
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
    heroAlt: "Wedding floral bouquet detail",
    featured: false,
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

const BLOG = [
  {
    slug: "aranya-and-kabir-a-lakeside-vow-in-udaipur",
    title: "Aranya & Kabir — a lakeside vow in Udaipur",
    excerpt:
      "Three days on the water, a mandap built to catch the evening light, and four hundred guests who never once had to ask where to be.",
    cover: "/images/mandap.webp",
    category: "Wedding & Planning",
    date: "2026-06-02",
    readMinutes: 7,
    featured: true,
    format: "editorial",
    content: {
      standfirst:
        "Three days on the water, a mandap built to catch the evening light, and four hundred guests who never once had to ask where to be.",
      facts: [
        { label: "Couple", value: "Aranya & Kabir" },
        { label: "Location", value: "Udaipur, Rajasthan" },
        { label: "Guests", value: "400" },
        { label: "Duration", value: "Three days" },
        { label: "Season", value: "Early monsoon" },
      ],
      sections: [
        {
          paragraphs: [
            "Aranya's only brief, in the first call, was a single sentence: she wanted the lake to feel like a guest at her own wedding, not scenery behind it. That sentence shaped everything that followed — where we built, which way every chair faced, and why the mandap went up on a jetty instead of the lawn everyone assumed we'd use.",
            "Kabir's family had hosted in Udaipur before, decades ago, and remembered a city of hard light and harder heat. We planned instead for the week the monsoon first softens the air — cooler evenings, a sky that changes every twenty minutes, water that catches every one of those changes and throws it back twice as bright.",
          ],
        },
        {
          heading: "The mandap",
          paragraphs: [
            "Four hundred guests is a lot of sightlines to protect. We raised the structure on the jetty rather than the palace lawn specifically so that every row — not just the front ones — had open water behind the couple instead of a wall of other guests' backs. It meant building a temporary jetty extension strong enough for the structure and the weight of a full baraat procession, engineered and load-tested three weeks out.",
          ],
          pullQuote: "The lake does the work a chandelier can't — it never stops moving.",
          image: { src: "/images/mandap.webp", alt: "Mandap structure over the lake at dusk" },
          imageRight: true,
        },
        {
          paragraphs: [
            "Every panel of the structure was cut and dry-fitted off-site first, then reassembled on the jetty itself over two days — there was no room to improvise once the barges carrying it were out on the water.",
          ],
          image: { src: "/images/mandap.webp", alt: "Mandap panels assembled on the jetty" },
          imageRight: false,
        },
        {
          paragraphs: [
            "By the morning of, the crew had run the full weight test twice: once empty, once with sandbags standing in for four hundred guests' worth of movement across the boards.",
          ],
          image: { src: "/images/banquet.webp", alt: "Jetty structure prepared ahead of the ceremony" },
          imageRight: true,
        },
        {
          heading: "The last night",
          paragraphs: [
            "The final evening was deliberately unstaged: no assigned seating, no stage, low tables scattered across the terrace so conversations could drift the way they do at a real dinner party rather than a production. Aranya changed out of her wedding lehenga for the first time in three days and, by her account, didn't sit down once.",
          ],
        },
      ],
    },
  },
  {
    slug: "building-a-timeline-that-holds",
    title: "Building a wedding timeline that actually holds",
    excerpt:
      "The difference between a day that flows and a day that drags is usually forty minutes hidden in the wrong place. Here is how we map it.",
    cover: "/images/banquet.webp",
    category: "Wedding & Planning",
    date: "2026-05-19",
    readMinutes: 6,
    format: "guide",
    content: {
      intro:
        "Most wedding-day timelines fail in the same handful of places — not because the plan was wrong, but because nobody built in room for the day to breathe. Here's the order we actually work in.",
      steps: [
        {
          title: "Start from the exit, not the entrance",
          body: "We build every timeline backward from the last guest's departure, not forward from the first arrival. Fixing the end point first — when the venue's noise curfew hits, when the last transport leaves — is what tells you how much room the middle of the day actually has.",
          image: { src: "/images/banquet.webp", alt: "Long banquet table set for the evening" },
        },
        {
          title: "Protect the golden hour twice",
          body: "Couples plan for one golden-hour photo window and lose it to a delayed ceremony. We schedule two: a buffer window earlier in case the first slips, and we tell the photography team which one is expendable before the day starts, not during it.",
          image: { src: "/images/gazebo.webp", alt: "Gazebo venue in warm evening light" },
        },
        {
          title: "Build in forty minutes you don't announce",
          body: "Every timeline gets a hidden forty-minute cushion, placed right after the segment most likely to run long — usually the couple's entrance or the family photographs. Nobody on the guest list ever knows it's there. That's the point.",
          image: { src: "/images/vows.webp", alt: "Couple exchanging vows" },
        },
        {
          title: "Brief the vendors on the day, not just the plan",
          body: "A written timeline means nothing if the catering lead and the band find out about a schedule change from each other. We run a ten-minute stand-up with every vendor lead on the morning of, even when nothing has changed — it's when the small adjustments actually surface.",
          image: { src: "/images/mandap.webp", alt: "Mandap set up before the ceremony" },
        },
      ],
    },
  },
  {
    slug: "one-flower-six-tiers",
    title: "One flower, six tiers: designing a cake as a centrepiece",
    excerpt:
      "When the cake has to carry a whole room, it stops being dessert and starts being architecture. Notes from a collaboration with the pastry team.",
    cover: "/images/cake.webp",
    category: "Decor & Styling",
    date: "2026-04-28",
    readMinutes: 5,
    format: "photo-essay",
    content: {
      intro:
        "The brief was one flower, repeated at six different scales, from a single bloom pressed into the base tier to a sugar sculpture large enough to be seen from the back of the room. Six weeks and four failed armatures later, here's what actually held.",
      frames: [
        {
          src: "/images/cake.webp",
          alt: "Six-tier wedding cake with floral detailing",
          caption: "The final structure, photographed before the reception opened — every tier is load-bearing, not just decorative.",
        },
        {
          src: "/images/bouquet.webp",
          alt: "Reference bouquet used for the cake's floral motif",
          caption: "The bouquet that set the brief. Every sugar petal on the cake traces back to a bloom in this arrangement.",
        },
        {
          src: "/images/banquet.webp",
          alt: "Cake positioned as the centrepiece of the banquet room",
          caption: "Placed at the room's sightline centre rather than off to one side — the whole layout was planned around it.",
        },
      ],
      closing:
        "The armature that finally held was steel dowel, not the wooden supports we started with — obvious in hindsight, expensive to learn in week two. Worth it: guests spent as long photographing the cake as they did the couple's entrance.",
    },
  },
  {
    slug: "the-roka-ceremony-explained",
    title: "The Roka ceremony, and why we start planning here",
    excerpt:
      "A small gathering that sets the tone for everything after it. What it means, who it is for, and how to make it feel like the beginning it is.",
    cover: "/images/bouquet.webp",
    category: "Wedding & Planning",
    date: "2026-04-11",
    readMinutes: 4,
    format: "guide",
    content: {
      intro:
        "The Roka is usually the first event we plan for a couple, and often the one that gets the least attention — treated as a formality before the \"real\" planning starts. We'd argue it deserves the opposite treatment.",
      steps: [
        {
          title: "What a Roka actually is",
          body: "A Roka marks the formal agreement between two families that a wedding will happen — traditionally an intimate, families-only affair, exchanging rings or sweets as a mark of the commitment. It has no fixed rituals the way a wedding ceremony does, which is exactly what makes it worth designing intentionally rather than defaulting to a living-room gathering.",
          image: { src: "/images/bouquet.webp", alt: "Floral arrangement at an intimate family gathering" },
        },
        {
          title: "Who it's for",
          body: "Unlike the wedding itself, the guest list is almost entirely immediate family — which means the room can be smaller, closer, and far more personal than anything that follows. We treat it as the one event in the whole calendar where scale is a design constraint worth keeping small on purpose.",
          image: { src: "/images/banquet.webp", alt: "Small gathering set for a family celebration" },
        },
        {
          title: "How we plan around it",
          body: "Because it's the first event, the Roka is where we test a couple's actual taste against the mood board — colour palette, floral style, even the tone of the invitations. Whatever works here becomes the throughline for the wedding months later, so we treat every choice as a preview, not a one-off.",
          image: { src: "/images/mandap.webp", alt: "Decor detail carried through from an early celebration" },
        },
      ],
    },
  },
  {
    slug: "choosing-a-destination-for-a-winter-wedding",
    title: "Choosing a destination for a winter wedding",
    excerpt:
      "Palaces, coastlines and hidden gardens read very differently in December. A short guide to scouting for the season you are actually marrying in.",
    cover: "/images/gazebo.webp",
    category: "Wedding & Planning",
    date: "2026-03-22",
    readMinutes: 8,
    format: "photo-essay",
    content: {
      intro:
        "Every venue photographs beautifully in the season its brochure was shot in. Scouting for a winter date means asking a different question at every stop: what does this place look like when the light is low and the evenings turn cold at 6pm, not 9?",
      frames: [
        {
          src: "/images/gazebo.webp",
          alt: "Gazebo venue framed by winter light",
          caption: "A gazebo venue we scouted in December — the low winter sun cuts across the structure instead of overhead, changing every shadow in the space.",
        },
        {
          src: "/images/bouquet.webp",
          alt: "Winter floral arrangement",
          caption: "Winter florals lean heavier and warmer — deep garnets and amber instead of the pastels that read better in summer light.",
        },
        {
          src: "/images/banquet.webp",
          alt: "Indoor banquet setup prepared for a cold evening",
          caption: "Heating and flow matter more than décor in a winter venue — this layout was chosen for how guests move between warmed zones, not just for how it photographs.",
        },
        {
          src: "/images/vows.webp",
          alt: "Evening ceremony setup with warm lighting",
          caption: "Ceremony time moved two hours earlier than a summer date would need, simply to catch any daylight at all.",
        },
      ],
      closing:
        "The venues that hold up in winter are rarely the ones that look best in their own marketing photos — they're the ones with good indoor flow, real heating, and a layout that doesn't depend on a 7pm sunset to work.",
    },
  },
  {
    slug: "meher-and-dev-a-monsoon-morning-in-goa",
    title: "Meher & Dev — a monsoon morning in Goa",
    excerpt:
      "They handed us a folder of half-ideas and asked for a weekend that felt like it had always existed. The rain, it turned out, was on our side.",
    cover: "/images/vows.webp",
    category: "Wedding & Planning",
    date: "2026-02-14",
    readMinutes: 6,
    format: "chapters",
    content: {
      intro:
        "Meher and Dev came to the first meeting with a shared folder of screenshots — no theme, no colour palette, just a feeling they couldn't quite name. It took three conversations to realise what they actually wanted: a wedding that felt found, not built.",
      chapters: [
        {
          title: "The folder of half-ideas",
          body: "Sixty saved posts, no two in the same style. What connected them, once we laid them all out, was texture — worn wood, damp stone, candlelight instead of string lights. Nothing curated or camera-ready. We built the entire weekend around that instinct rather than asking them to pick a theme they didn't have.",
          image: { src: "/images/vows.webp", alt: "Intimate ceremony setup at dusk" },
        },
        {
          title: "The rain",
          body: "The forecast called for rain on the ceremony morning, three days out, with no realistic way to move the date. Rather than fight it with a backup indoor plan that would have hidden the coastline entirely, we opened one side of the gazebo structure to the weather on purpose — guests could hear the rain through the whole ceremony.",
          image: { src: "/images/gazebo.webp", alt: "Gazebo venue during a monsoon morning" },
        },
        {
          title: "The morning after",
          body: "The closing brunch was the one moment we didn't plan a single detail for beyond the food and the table settings — deliberately unstyled, because by day three, Meher told us, they didn't want anything left to look at. Just the people who'd flown in for it.",
          image: { src: "/images/banquet.webp", alt: "Relaxed morning brunch setting" },
        },
      ],
    },
  },
  {
    slug: "hosting-a-guest-list-of-four-hundred",
    title: "Hospitality at scale: hosting four hundred guests well",
    excerpt:
      "Travel, stay and welcome experiences that make a large celebration feel intimate. The systems we run behind the scenes so no one feels like a number.",
    cover: "/images/banquet.webp",
    category: "Wedding & Planning",
    date: "2026-01-30",
    readMinutes: 7,
    format: "guide",
    content: {
      intro:
        "Four hundred guests is easy to plan for as a headcount and very hard to plan for as four hundred individual experiences. The systems below are what keep a large wedding from ever feeling like one.",
      steps: [
        {
          title: "Travel, mapped before invitations go out",
          body: "We build the full travel matrix — who's flying from where, on what dates, into which airport — before a single invitation is sent, not after RSVPs start arriving. It's the only way to negotiate group flight blocks and airport transfers at a price that makes sense.",
          image: { src: "/images/gazebo.webp", alt: "Destination venue guests travel to" },
        },
        {
          title: "A welcome that starts at the airport",
          body: "Every guest is met at arrivals by name, not by a generic signboard — a small detail that costs almost nothing and does more to set the tone of a four-hundred-guest weekend than anything that happens at the venue itself.",
          image: { src: "/images/banquet.webp", alt: "Guests arriving to a warm welcome" },
        },
        {
          title: "Systems no guest ever sees",
          body: "A wedding this size runs on a guest-services desk staffed in shifts, a shared tracker for every dietary and mobility need collected at RSVP, and a same-day issue line that routes straight to whoever can actually fix the problem — never a general inbox.",
          image: { src: "/images/vows.webp", alt: "Behind-the-scenes coordination at a large wedding" },
        },
        {
          title: "The hospitality desk",
          body: "A physical desk, staffed the entire weekend, that exists for one purpose: so that a guest with a question never has to find a planner in a crowd. It's the single change that gets mentioned most often in the thank-you notes afterward.",
          image: { src: "/images/cake.webp", alt: "Reception detail at a large-scale celebration" },
        },
      ],
    },
  },
];

const DESTINATIONS = [
  {
    slug: "jaipur", name: "Jaipur", region: "Rajasthan", category: "domestic",
    image: "/images/dest-jaipur.webp",
    blurb: "Palace courtyards and fort ramparts, block-printed canopies and marigold by the truckload. Jaipur gives a wedding scale and colour without ever asking it to leave the walled city.",
    whyChoose: [
      "Jaipur is the destination that looks like a wedding before a single flower is hung. Sandstone ramparts, mirrored durbar halls and courtyards built for a maharaja's procession do most of the visual work — your decorator is finishing a room, not building one.",
      "It is also, practically, the easiest big Rajasthan wedding to run: an international airport, a deep bench of palace hotels used to hosting three-day affairs back to back, and artisans — block printers, marigold traders, brass bandsmen — a phone call away.",
    ],
    venues: [
      { name: "Fairmont Jaipur", image: "/images/venue-jaipur-1.webp" },
      { name: "Rambagh Palace", image: "/images/venue-jaipur-2.webp" },
      { name: "The Leela Palace Jaipur", image: "/images/venue-jaipur-3.webp" },
      { name: "Jaipur Marriott (Westin)", image: "/images/venue-jaipur-4.webp" },
      { name: "Jai Mahal Palace", image: "/images/venue-jaipur-5.webp" },
    ],
    weather: {
      bestWindow: "October – March",
      summary: "Rajasthan's summer runs hot and dry; the wedding season begins as it breaks. Evenings from November to February are crisp enough for a shawl and perfect for a lawn or rooftop ceremony.",
      months: [
        { month: "Jan", tempC: 19, rain: 5 }, { month: "Feb", tempC: 23, rain: 4 }, { month: "Mar", tempC: 29, rain: 6 },
        { month: "Apr", tempC: 36, rain: 3 }, { month: "May", tempC: 40, rain: 8 }, { month: "Jun", tempC: 38, rain: 22 },
        { month: "Jul", tempC: 33, rain: 55 }, { month: "Aug", tempC: 31, rain: 60 }, { month: "Sep", tempC: 32, rain: 30 },
        { month: "Oct", tempC: 30, rain: 8 }, { month: "Nov", tempC: 24, rain: 3 }, { month: "Dec", tempC: 20, rain: 4 },
      ],
    },
  },
  {
    slug: "udaipur", name: "Udaipur", region: "Rajasthan", category: "domestic",
    image: "/images/dest-udaipur.webp",
    blurb: "A baraat that arrives by boat and a mandap that catches the lake at dusk. Island venues, hilltop palaces and a skyline that does half the work for you.",
    whyChoose: [
      "Udaipur is built around water, and every good venue here uses it — a mandap on an island reached only by boat, a sundowner terrace where the Aravallis turn pink, a courtyard that reflects itself in Lake Pichola. Few destinations hand a photographer this much for free.",
      "It reads as romantic without trying and grand without shouting, which is why it remains the first answer for couples who want one unforgettable frame and are happy to let the city provide it.",
    ],
    venues: [
      { name: "Fairmont Udaipur", image: "/images/venue-udaipur-1.webp" },
      { name: "The Oberoi Udaivilas", image: "/images/venue-udaipur-2.webp" },
      { name: "Raffles Udaipur", image: "/images/venue-udaipur-3.webp" },
      { name: "Radisson Blu Udaipur Palace Resort", image: "/images/venue-udaipur-4.webp" },
      { name: "The Leela Palace Udaipur", image: "/images/venue-udaipur-5.webp" },
    ],
    weather: {
      bestWindow: "September – March",
      summary: "Cooler and greener than Jaipur thanks to the lakes and the Aravalli hills. September's post-monsoon light is a favourite of photographers; December and January are the coolest, most comfortable months for a full-day celebration.",
      months: [
        { month: "Jan", tempC: 20, rain: 4 }, { month: "Feb", tempC: 24, rain: 3 }, { month: "Mar", tempC: 29, rain: 5 },
        { month: "Apr", tempC: 34, rain: 4 }, { month: "May", tempC: 37, rain: 10 }, { month: "Jun", tempC: 34, rain: 30 },
        { month: "Jul", tempC: 29, rain: 70 }, { month: "Aug", tempC: 28, rain: 75 }, { month: "Sep", tempC: 29, rain: 40 },
        { month: "Oct", tempC: 28, rain: 10 }, { month: "Nov", tempC: 24, rain: 3 }, { month: "Dec", tempC: 21, rain: 3 },
      ],
    },
  },
  {
    slug: "goa", name: "Goa", region: "West Coast", category: "domestic",
    image: "/images/dest-goa.webp",
    blurb: "Portuguese villas, beach lawns and a light that turns gold an hour before sunset. Best in the shoulder months, when the crowds have thinned and the sea has calmed.",
    whyChoose: [
      "Goa gives you a wedding without a dress code — barefoot on the sand at golden hour, or black-tie in a whitewashed Portuguese villa an hour later. Few Indian destinations move this easily between casual and formal within the same weekend.",
      "It is also the destination that guests actually extend their trip for: a beach for the day after, a laid-back food scene, and short flights from most of the country, which keeps attendance high even for a Tuesday wedding.",
    ],
    venues: [
      { name: "St. Regis Goa Resort", image: "/images/venue-goa-1.webp" },
      { name: "W Goa", image: "/images/venue-goa-2.webp" },
      { name: "Taj Fort Aguada Resort & Spa", image: "/images/venue-goa-3.webp" },
      { name: "Taj Holiday Village Resort & Spa", image: "/images/venue-goa-4.webp" },
      { name: "Taj Exotica Resort & Spa", image: "/images/venue-goa-5.webp" },
    ],
    weather: {
      bestWindow: "November – February",
      summary: "The monsoon owns June to September; skip it entirely. November through February brings dry air, calm seas and warm-not-scorching days — the window nearly every Goa beach wedding books into.",
      months: [
        { month: "Jan", tempC: 31, rain: 2 }, { month: "Feb", tempC: 32, rain: 1 }, { month: "Mar", tempC: 33, rain: 3 },
        { month: "Apr", tempC: 33, rain: 8 }, { month: "May", tempC: 33, rain: 25 }, { month: "Jun", tempC: 29, rain: 90 },
        { month: "Jul", tempC: 27, rain: 100 }, { month: "Aug", tempC: 27, rain: 85 }, { month: "Sep", tempC: 28, rain: 55 },
        { month: "Oct", tempC: 30, rain: 20 }, { month: "Nov", tempC: 31, rain: 4 }, { month: "Dec", tempC: 31, rain: 2 },
      ],
    },
  },
  {
    slug: "agra", name: "Agra", region: "Uttar Pradesh", category: "domestic",
    image: "/images/dest-agra.webp",
    blurb: "Mughal gardens, riverside terraces and, if you plan the sightlines carefully, the Taj in the frame. A destination for couples who want one unmistakable backdrop.",
  },
  {
    slug: "jim-corbett", name: "Jim Corbett", region: "Uttarakhand", category: "domestic",
    image: "/images/dest-jim-corbett.webp",
    blurb: "Forest resorts and riverside lawns a few hours from Delhi. The right choice for a smaller guest list and a weekend that feels genuinely away from the city.",
    whyChoose: [
      "Jim Corbett trades scale for atmosphere — sal forest instead of a ballroom, a riverside lawn instead of a banquet hall, the sound of the Kosi replacing a sound system nobody asked for. It suits a couple who wants their wedding to feel like a retreat their guests were personally invited on.",
      "Close enough to Delhi NCR for a long weekend, far enough to feel like an escape, it's become the studio's answer for intimate, nature-forward celebrations of 80–150 guests.",
    ],
    venues: [
      { name: "JW Marriott Jim Corbett", image: "/images/venue-corbett-1.webp" },
      { name: "Namah Resort", image: "/images/venue-corbett-2.webp" },
      { name: "Aahana — The Corbett Wilderness", image: "/images/venue-corbett-3.webp" },
      { name: "Taj Corbett Resort & Spa", image: "/images/venue-corbett-4.webp" },
      { name: "The Hridayesh Resort", image: "/images/venue-corbett-5.webp" },
    ],
    weather: {
      bestWindow: "October – March",
      summary: "Monsoon-fed forest through the summer, then cool, clear winters that suit a bonfire reception. October and February–March, either side of the coldest weeks, are the most comfortable for an outdoor ceremony.",
      months: [
        { month: "Jan", tempC: 17, rain: 15 }, { month: "Feb", tempC: 20, rain: 12 }, { month: "Mar", tempC: 26, rain: 10 },
        { month: "Apr", tempC: 32, rain: 8 }, { month: "May", tempC: 36, rain: 15 }, { month: "Jun", tempC: 35, rain: 45 },
        { month: "Jul", tempC: 30, rain: 90 }, { month: "Aug", tempC: 29, rain: 85 }, { month: "Sep", tempC: 29, rain: 40 },
        { month: "Oct", tempC: 27, rain: 12 }, { month: "Nov", tempC: 22, rain: 5 }, { month: "Dec", tempC: 18, rain: 8 },
      ],
    },
  },
  {
    slug: "delhi-ncr", name: "Delhi NCR", region: "National Capital Region", category: "domestic",
    image: "/images/dest-delhi-ncr.webp",
    blurb: "Heritage havelis, sprawling farmhouses and hotel ballrooms that can hold any number. The practical choice when most of the guest list already lives in town.",
    whyChoose: [
      "Delhi NCR is the destination that isn't one — no flights, no logistics chain, no guest dropping out because of the travel. What it offers instead is range: a restored haveli for 150, a farmhouse lawn for 400, a five-star ballroom for a thousand, often within twenty minutes of each other.",
      "It's the right call whenever the guest list is the priority and the setting needs to simply be excellent, not exotic.",
    ],
    venues: [
      { name: "The Heritage Village Resort & Spa", image: "/images/venue-delhi-1.webp" },
      { name: "Westin Sohna Resort & Spa", image: "/images/venue-delhi-2.webp" },
      { name: "ITC Grand Bharat", image: "/images/venue-delhi-3.webp" },
      { name: "Aravali Resort Marriott", image: "/images/venue-delhi-4.webp" },
      { name: "Grand Hyatt Gurgaon", image: "/images/venue-delhi-5.webp" },
    ],
    weather: {
      bestWindow: "October – March",
      summary: "Delhi's summer is punishing and best avoided entirely. From late October through March the air clears and cools — December and January call for a heated tent or an indoor ballroom by evening, but the daylight hours are ideal.",
      months: [
        { month: "Jan", tempC: 15, rain: 5 }, { month: "Feb", tempC: 19, rain: 4 }, { month: "Mar", tempC: 26, rain: 3 },
        { month: "Apr", tempC: 33, rain: 2 }, { month: "May", tempC: 39, rain: 5 }, { month: "Jun", tempC: 39, rain: 18 },
        { month: "Jul", tempC: 34, rain: 60 }, { month: "Aug", tempC: 33, rain: 55 }, { month: "Sep", tempC: 33, rain: 30 },
        { month: "Oct", tempC: 29, rain: 5 }, { month: "Nov", tempC: 22, rain: 2 }, { month: "Dec", tempC: 16, rain: 4 },
      ],
    },
  },
  {
    slug: "thailand", name: "Thailand", region: "Phuket & Hua Hin", category: "international",
    image: "/images/dest-thailand.webp",
    blurb: "Beach pavilions, palm-lined lawns and a hospitality culture built around getting a three-day wedding right. An easy first international destination for guests and planners alike.",
    whyChoose: [
      "Thailand is the international destination that removes the risk from going international. Direct flights, visa-on-arrival for most passports, resorts that run destination weddings every week of the season, and a beach-and-pavilion aesthetic that photographs beautifully in almost any light.",
      "It suits couples who want the romance of a beach wedding abroad without the guesswork — the infrastructure here has been built, refined and rebuilt around exactly this kind of celebration.",
    ],
    venues: [
      { name: "Anantara Hua Hin Resort", image: "/images/venue-thailand-1.webp" },
      { name: "Sheraton Hua Hin Resort & Spa", image: "/images/venue-thailand-2.webp" },
      { name: "Avani+ Khao Lak Resort", image: "/images/venue-thailand-3.webp" },
      { name: "Dusit Thani Hua Hin", image: "/images/venue-thailand-4.webp" },
      { name: "JW Marriott Phuket Resort & Spa", image: "/images/venue-thailand-5.webp" },
    ],
    weather: {
      bestWindow: "November – February",
      summary: "The cool, dry season runs November to February — lower humidity, calm seas and consistently sunny days on both coasts. March onward turns hot; the monsoon (May–October) is best avoided for an outdoor ceremony.",
      months: [
        { month: "Jan", tempC: 31, rain: 5 }, { month: "Feb", tempC: 32, rain: 4 }, { month: "Mar", tempC: 33, rain: 10 },
        { month: "Apr", tempC: 34, rain: 20 }, { month: "May", tempC: 33, rain: 45 }, { month: "Jun", tempC: 32, rain: 40 },
        { month: "Jul", tempC: 31, rain: 45 }, { month: "Aug", tempC: 31, rain: 45 }, { month: "Sep", tempC: 31, rain: 60 },
        { month: "Oct", tempC: 30, rain: 55 }, { month: "Nov", tempC: 29, rain: 25 }, { month: "Dec", tempC: 30, rain: 8 },
      ],
    },
  },
  {
    slug: "bali", name: "Bali", region: "Indonesia", category: "international",
    image: "/images/dest-bali.webp",
    blurb: "Clifftop chapels, rice-terrace lawns and a light at dusk that every couple asks for by name. Bali's resorts have staged more destination weddings than almost anywhere else on earth.",
    whyChoose: [
      "Bali built its hospitality industry around the destination wedding, and it shows — clifftop glass chapels over the Indian Ocean, terraced rice-paddy lawns, and wedding teams who plan multi-day itineraries as a matter of routine rather than as a special request.",
      "It gives a couple the most dramatic natural backdrops of any destination on this list, without sacrificing the polish of five-star execution.",
    ],
    venues: [
      { name: "Mandapa, a Ritz-Carlton Reserve", image: "/images/venue-bali-1.webp" },
      { name: "InterContinental Bali Resort", image: "/images/venue-bali-2.webp" },
      { name: "Anantara Uluwatu Bali Resort", image: "/images/venue-bali-3.webp" },
      { name: "Hilton Bali Resort", image: "/images/venue-bali-4.webp" },
      { name: "Conrad Bali", image: "/images/venue-bali-5.webp" },
    ],
    weather: {
      bestWindow: "May – September",
      summary: "Bali's dry season runs April to October, with May–September the sweet spot — sunny, low humidity, minimal rain. The wet season (November–March) still has clear mornings, but afternoon downpours are common.",
      months: [
        { month: "Jan", tempC: 30, rain: 80 }, { month: "Feb", tempC: 30, rain: 75 }, { month: "Mar", tempC: 31, rain: 60 },
        { month: "Apr", tempC: 31, rain: 35 }, { month: "May", tempC: 30, rain: 15 }, { month: "Jun", tempC: 29, rain: 10 },
        { month: "Jul", tempC: 29, rain: 6 }, { month: "Aug", tempC: 29, rain: 4 }, { month: "Sep", tempC: 30, rain: 8 },
        { month: "Oct", tempC: 30, rain: 20 }, { month: "Nov", tempC: 30, rain: 45 }, { month: "Dec", tempC: 30, rain: 65 },
      ],
    },
  },
  {
    slug: "abu-dhabi", name: "Abu Dhabi", region: "United Arab Emirates", category: "international",
    image: "/images/dest-abu-dhabi.webp",
    blurb: "Marble courtyards, gold-lit domes and skyline terraces built for a wedding that reads as a state occasion. A destination for couples who want scale without compromise.",
    whyChoose: [
      "Abu Dhabi does grandeur better than almost anywhere — white marble courtyards, gilded domes, ballrooms with double-height ceilings built for exactly this kind of occasion. It's the destination for a couple whose guest list runs into the hundreds and whose vision runs to opulent.",
      "It's also the most convenient international option for a largely South Asian and Gulf guest list, with connecting flights that make it feel closer than the itinerary suggests.",
    ],
    venues: [
      { name: "Emirates Palace Mandarin Oriental", image: "/images/venue-abudhabi-1.webp" },
      { name: "Fairmont Ajman", image: "/images/venue-abudhabi-2.webp" },
      { name: "Le Royal Méridien Abu Dhabi", image: "/images/venue-abudhabi-3.webp" },
      { name: "The Ritz-Carlton Abu Dhabi", image: "/images/venue-abudhabi-4.webp" },
      { name: "St. Regis Saadiyat Island Resort", image: "/images/venue-abudhabi-5.webp" },
    ],
    weather: {
      bestWindow: "November – March",
      summary: "The Gulf summer is extreme and effectively rules out an outdoor ceremony from May to September. November through March brings warm, dry, comfortable days and cool evenings — the entire wedding season lives in this window.",
      months: [
        { month: "Jan", tempC: 24, rain: 5 }, { month: "Feb", tempC: 25, rain: 4 }, { month: "Mar", tempC: 29, rain: 3 },
        { month: "Apr", tempC: 34, rain: 1 }, { month: "May", tempC: 39, rain: 0 }, { month: "Jun", tempC: 41, rain: 0 },
        { month: "Jul", tempC: 42, rain: 0 }, { month: "Aug", tempC: 42, rain: 0 }, { month: "Sep", tempC: 39, rain: 0 },
        { month: "Oct", tempC: 35, rain: 1 }, { month: "Nov", tempC: 29, rain: 3 }, { month: "Dec", tempC: 25, rain: 5 },
      ],
    },
  },
  {
    slug: "sri-lanka", name: "Sri Lanka", region: "Southern Coast", category: "international",
    image: "/images/dest-sri-lanka.webp",
    blurb: "Colonial-era beach hotels, turtle coves and a coastline built for a slower, sun-drenched wedding weekend. Close enough to feel easy, unfamiliar enough to feel like a real escape.",
    whyChoose: [
      "Sri Lanka's southern coast pairs colonial-era architecture — verandahs, courtyards, high-ceilinged halls — with a beach a few steps away, giving a wedding weekend two very different moods without changing venues.",
      "It's a short flight from most of India, visa-friendly, and priced kindly compared to Bali or Thailand, which makes it the studio's recommendation for couples who want an international beach wedding without an international beach-wedding budget.",
    ],
    venues: [
      { name: "Anantara Kalutara Resort", image: "/images/venue-srilanka-1.webp" },
      { name: "Cinnamon Bentota Beach", image: "/images/venue-srilanka-2.webp" },
      { name: "Shangri-La Colombo", image: "/images/venue-srilanka-3.webp" },
      { name: "Sheraton Kosgoda Turtle Beach Resort", image: "/images/venue-srilanka-4.webp" },
      { name: "Radisson Blu Resort Galle", image: "/images/venue-srilanka-5.webp" },
    ],
    weather: {
      bestWindow: "December – March",
      summary: "The southwest coast's dry season runs December to March — the calmest seas, least humidity and most reliable sun of the year, and the window nearly every beach wedding on this coast books into.",
      months: [
        { month: "Jan", tempC: 30, rain: 8 }, { month: "Feb", tempC: 30, rain: 6 }, { month: "Mar", tempC: 31, rain: 15 },
        { month: "Apr", tempC: 31, rain: 30 }, { month: "May", tempC: 30, rain: 45 }, { month: "Jun", tempC: 29, rain: 40 },
        { month: "Jul", tempC: 29, rain: 30 }, { month: "Aug", tempC: 29, rain: 30 }, { month: "Sep", tempC: 29, rain: 35 },
        { month: "Oct", tempC: 29, rain: 55 }, { month: "Nov", tempC: 29, rain: 40 }, { month: "Dec", tempC: 29, rain: 20 },
      ],
    },
  },
];

writeFileSync(path.join(CONTENT_DIR, "portfolio.json"), JSON.stringify(PORTFOLIO, null, 2));
writeFileSync(path.join(CONTENT_DIR, "blog.json"), JSON.stringify(BLOG, null, 2));
writeFileSync(path.join(CONTENT_DIR, "destinations.json"), JSON.stringify(DESTINATIONS, null, 2));
console.log("Seeded content/portfolio.json, content/blog.json, content/destinations.json");

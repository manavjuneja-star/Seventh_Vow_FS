/**
 * Destinations content — one entry per place the studio works in.
 *
 * Card / hero photos are 1600x1000 WebP crops of Unsplash photos (public/images/
 * dest-*.webp), free under the Unsplash License. Venue photos are 1200x900 WebP
 * crops (public/images/venue-*.webp), same source and licence — representative
 * imagery of the property style, not verified official photography, standing in
 * until the studio supplies its own shoots. The `Destination` shape (including
 * `venues`, `whyChoose` and `weather`) is the seam the admin panel will write to;
 * see the destinations-page memory for the two-level CRUD this implies.
 */

export type DestinationCategory = "domestic" | "international";

export type Venue = {
  name: string;
  image: string;
};

export type MonthClimate = {
  /** Three-letter month label. */
  month: string;
  /** Average daytime temperature in Celsius. */
  tempC: number;
  /** Relative rainfall, 0–100, used only to size the diagram's rain band. */
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

const DESTINATIONS: Destination[] = [
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    category: "domestic",
    image: "/images/dest-jaipur.webp",
    blurb:
      "Palace courtyards and fort ramparts, block-printed canopies and marigold by the truckload. Jaipur gives a wedding scale and colour without ever asking it to leave the walled city.",
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
      summary:
        "Rajasthan's summer runs hot and dry; the wedding season begins as it breaks. Evenings from November to February are crisp enough for a shawl and perfect for a lawn or rooftop ceremony.",
      months: [
        { month: "Jan", tempC: 19, rain: 5 },
        { month: "Feb", tempC: 23, rain: 4 },
        { month: "Mar", tempC: 29, rain: 6 },
        { month: "Apr", tempC: 36, rain: 3 },
        { month: "May", tempC: 40, rain: 8 },
        { month: "Jun", tempC: 38, rain: 22 },
        { month: "Jul", tempC: 33, rain: 55 },
        { month: "Aug", tempC: 31, rain: 60 },
        { month: "Sep", tempC: 32, rain: 30 },
        { month: "Oct", tempC: 30, rain: 8 },
        { month: "Nov", tempC: 24, rain: 3 },
        { month: "Dec", tempC: 20, rain: 4 },
      ],
    },
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    region: "Rajasthan",
    category: "domestic",
    image: "/images/dest-udaipur.webp",
    blurb:
      "A baraat that arrives by boat and a mandap that catches the lake at dusk. Island venues, hilltop palaces and a skyline that does half the work for you.",
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
      summary:
        "Cooler and greener than Jaipur thanks to the lakes and the Aravalli hills. September's post-monsoon light is a favourite of photographers; December and January are the coolest, most comfortable months for a full-day celebration.",
      months: [
        { month: "Jan", tempC: 20, rain: 4 },
        { month: "Feb", tempC: 24, rain: 3 },
        { month: "Mar", tempC: 29, rain: 5 },
        { month: "Apr", tempC: 34, rain: 4 },
        { month: "May", tempC: 37, rain: 10 },
        { month: "Jun", tempC: 34, rain: 30 },
        { month: "Jul", tempC: 29, rain: 70 },
        { month: "Aug", tempC: 28, rain: 75 },
        { month: "Sep", tempC: 29, rain: 40 },
        { month: "Oct", tempC: 28, rain: 10 },
        { month: "Nov", tempC: 24, rain: 3 },
        { month: "Dec", tempC: 21, rain: 3 },
      ],
    },
  },
  {
    slug: "goa",
    name: "Goa",
    region: "West Coast",
    category: "domestic",
    image: "/images/dest-goa.webp",
    blurb:
      "Portuguese villas, beach lawns and a light that turns gold an hour before sunset. Best in the shoulder months, when the crowds have thinned and the sea has calmed.",
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
      summary:
        "The monsoon owns June to September; skip it entirely. November through February brings dry air, calm seas and warm-not-scorching days — the window nearly every Goa beach wedding books into.",
      months: [
        { month: "Jan", tempC: 31, rain: 2 },
        { month: "Feb", tempC: 32, rain: 1 },
        { month: "Mar", tempC: 33, rain: 3 },
        { month: "Apr", tempC: 33, rain: 8 },
        { month: "May", tempC: 33, rain: 25 },
        { month: "Jun", tempC: 29, rain: 90 },
        { month: "Jul", tempC: 27, rain: 100 },
        { month: "Aug", tempC: 27, rain: 85 },
        { month: "Sep", tempC: 28, rain: 55 },
        { month: "Oct", tempC: 30, rain: 20 },
        { month: "Nov", tempC: 31, rain: 4 },
        { month: "Dec", tempC: 31, rain: 2 },
      ],
    },
  },
  {
    slug: "agra",
    name: "Agra",
    region: "Uttar Pradesh",
    category: "domestic",
    image: "/images/dest-agra.webp",
    blurb:
      "Mughal gardens, riverside terraces and, if you plan the sightlines carefully, the Taj in the frame. A destination for couples who want one unmistakable backdrop.",
  },
  {
    slug: "jim-corbett",
    name: "Jim Corbett",
    region: "Uttarakhand",
    category: "domestic",
    image: "/images/dest-jim-corbett.webp",
    blurb:
      "Forest resorts and riverside lawns a few hours from Delhi. The right choice for a smaller guest list and a weekend that feels genuinely away from the city.",
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
      summary:
        "Monsoon-fed forest through the summer, then cool, clear winters that suit a bonfire reception. October and February–March, either side of the coldest weeks, are the most comfortable for an outdoor ceremony.",
      months: [
        { month: "Jan", tempC: 17, rain: 15 },
        { month: "Feb", tempC: 20, rain: 12 },
        { month: "Mar", tempC: 26, rain: 10 },
        { month: "Apr", tempC: 32, rain: 8 },
        { month: "May", tempC: 36, rain: 15 },
        { month: "Jun", tempC: 35, rain: 45 },
        { month: "Jul", tempC: 30, rain: 90 },
        { month: "Aug", tempC: 29, rain: 85 },
        { month: "Sep", tempC: 29, rain: 40 },
        { month: "Oct", tempC: 27, rain: 12 },
        { month: "Nov", tempC: 22, rain: 5 },
        { month: "Dec", tempC: 18, rain: 8 },
      ],
    },
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    region: "National Capital Region",
    category: "domestic",
    image: "/images/dest-delhi-ncr.webp",
    blurb:
      "Heritage havelis, sprawling farmhouses and hotel ballrooms that can hold any number. The practical choice when most of the guest list already lives in town.",
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
      summary:
        "Delhi's summer is punishing and best avoided entirely. From late October through March the air clears and cools — December and January call for a heated tent or an indoor ballroom by evening, but the daylight hours are ideal.",
      months: [
        { month: "Jan", tempC: 15, rain: 5 },
        { month: "Feb", tempC: 19, rain: 4 },
        { month: "Mar", tempC: 26, rain: 3 },
        { month: "Apr", tempC: 33, rain: 2 },
        { month: "May", tempC: 39, rain: 5 },
        { month: "Jun", tempC: 39, rain: 18 },
        { month: "Jul", tempC: 34, rain: 60 },
        { month: "Aug", tempC: 33, rain: 55 },
        { month: "Sep", tempC: 33, rain: 30 },
        { month: "Oct", tempC: 29, rain: 5 },
        { month: "Nov", tempC: 22, rain: 2 },
        { month: "Dec", tempC: 16, rain: 4 },
      ],
    },
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Phuket & Hua Hin",
    category: "international",
    image: "/images/dest-thailand.webp",
    blurb:
      "Beach pavilions, palm-lined lawns and a hospitality culture built around getting a three-day wedding right. An easy first international destination for guests and planners alike.",
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
      summary:
        "The cool, dry season runs November to February — lower humidity, calm seas and consistently sunny days on both coasts. March onward turns hot; the monsoon (May–October) is best avoided for an outdoor ceremony.",
      months: [
        { month: "Jan", tempC: 31, rain: 5 },
        { month: "Feb", tempC: 32, rain: 4 },
        { month: "Mar", tempC: 33, rain: 10 },
        { month: "Apr", tempC: 34, rain: 20 },
        { month: "May", tempC: 33, rain: 45 },
        { month: "Jun", tempC: 32, rain: 40 },
        { month: "Jul", tempC: 31, rain: 45 },
        { month: "Aug", tempC: 31, rain: 45 },
        { month: "Sep", tempC: 31, rain: 60 },
        { month: "Oct", tempC: 30, rain: 55 },
        { month: "Nov", tempC: 29, rain: 25 },
        { month: "Dec", tempC: 30, rain: 8 },
      ],
    },
  },
  {
    slug: "bali",
    name: "Bali",
    region: "Indonesia",
    category: "international",
    image: "/images/dest-bali.webp",
    blurb:
      "Clifftop chapels, rice-terrace lawns and a light at dusk that every couple asks for by name. Bali's resorts have staged more destination weddings than almost anywhere else on earth.",
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
      summary:
        "Bali's dry season runs April to October, with May–September the sweet spot — sunny, low humidity, minimal rain. The wet season (November–March) still has clear mornings, but afternoon downpours are common.",
      months: [
        { month: "Jan", tempC: 30, rain: 80 },
        { month: "Feb", tempC: 30, rain: 75 },
        { month: "Mar", tempC: 31, rain: 60 },
        { month: "Apr", tempC: 31, rain: 35 },
        { month: "May", tempC: 30, rain: 15 },
        { month: "Jun", tempC: 29, rain: 10 },
        { month: "Jul", tempC: 29, rain: 6 },
        { month: "Aug", tempC: 29, rain: 4 },
        { month: "Sep", tempC: 30, rain: 8 },
        { month: "Oct", tempC: 30, rain: 20 },
        { month: "Nov", tempC: 30, rain: 45 },
        { month: "Dec", tempC: 30, rain: 65 },
      ],
    },
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    region: "United Arab Emirates",
    category: "international",
    image: "/images/dest-abu-dhabi.webp",
    blurb:
      "Marble courtyards, gold-lit domes and skyline terraces built for a wedding that reads as a state occasion. A destination for couples who want scale without compromise.",
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
      summary:
        "The Gulf summer is extreme and effectively rules out an outdoor ceremony from May to September. November through March brings warm, dry, comfortable days and cool evenings — the entire wedding season lives in this window.",
      months: [
        { month: "Jan", tempC: 24, rain: 5 },
        { month: "Feb", tempC: 25, rain: 4 },
        { month: "Mar", tempC: 29, rain: 3 },
        { month: "Apr", tempC: 34, rain: 1 },
        { month: "May", tempC: 39, rain: 0 },
        { month: "Jun", tempC: 41, rain: 0 },
        { month: "Jul", tempC: 42, rain: 0 },
        { month: "Aug", tempC: 42, rain: 0 },
        { month: "Sep", tempC: 39, rain: 0 },
        { month: "Oct", tempC: 35, rain: 1 },
        { month: "Nov", tempC: 29, rain: 3 },
        { month: "Dec", tempC: 25, rain: 5 },
      ],
    },
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "Southern Coast",
    category: "international",
    image: "/images/dest-sri-lanka.webp",
    blurb:
      "Colonial-era beach hotels, turtle coves and a coastline built for a slower, sun-drenched wedding weekend. Close enough to feel easy, unfamiliar enough to feel like a real escape.",
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
      summary:
        "The southwest coast's dry season runs December to March — the calmest seas, least humidity and most reliable sun of the year, and the window nearly every beach wedding on this coast books into.",
      months: [
        { month: "Jan", tempC: 30, rain: 8 },
        { month: "Feb", tempC: 30, rain: 6 },
        { month: "Mar", tempC: 31, rain: 15 },
        { month: "Apr", tempC: 31, rain: 30 },
        { month: "May", tempC: 30, rain: 45 },
        { month: "Jun", tempC: 29, rain: 40 },
        { month: "Jul", tempC: 29, rain: 30 },
        { month: "Aug", tempC: 29, rain: 30 },
        { month: "Sep", tempC: 29, rain: 35 },
        { month: "Oct", tempC: 29, rain: 55 },
        { month: "Nov", tempC: 29, rain: 40 },
        { month: "Dec", tempC: 29, rain: 20 },
      ],
    },
  },
];

export function getDestinations(): Destination[] {
  return DESTINATIONS;
}

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

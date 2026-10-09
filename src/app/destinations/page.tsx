import type { Metadata } from "next";

import { DestinationsHero } from "@/components/destinations-page/DestinationsHero/DestinationsHero";
import { DestinationsList } from "@/components/destinations-page/DestinationsList/DestinationsList";
import { JsonLd } from "@/components/Seo/JsonLd";
import { getDestinations } from "@/lib/destinations";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destination Wedding Venues in India & Abroad",
  description:
    "Plan a destination wedding in Udaipur, Jaipur, Goa, Jim Corbett, Delhi NCR, Bali, Thailand, Dubai, Abu Dhabi or Sri Lanka. Palaces, beachfront resorts, villas and hotels, with expert planning from The Seventh Vow Weddings.",
  alternates: { canonical: "/destinations" },
  openGraph: { url: "/destinations", title: "Destination Wedding Venues in India & Abroad | The Seventh Vow Weddings" },
};

export default async function DestinationsPage(): Promise<React.ReactElement> {
  const destinations = await getDestinations();
  const domestic = destinations.filter((d) => d.category === "domestic");
  const international = destinations.filter((d) => d.category === "international");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Destinations", path: "/destinations" }])} />
      <DestinationsHero
        images={destinations.slice(0, 6).map((d) => d.image)}
      />

      <DestinationsList
        eyebrow="Every destination has a story."
        heading="We know how to make it part of yours."
        destinations={domestic}
      />

      <DestinationsList
        eyebrow="Beyond the border, the same care."
        heading="When the right place is across the sea"
        destinations={international}
        tinted
      />
    </>
  );
}
import type { Metadata } from "next";

import { DestinationsHero } from "@/components/destinations-page/DestinationsHero/DestinationsHero";
import { DestinationsList } from "@/components/destinations-page/DestinationsList/DestinationsList";
import { getDestinations } from "@/lib/destinations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destination & Venues — The Seventh Vow Weddings",
  description:
    "From iconic palaces and beachfront resorts to private villas and hidden retreats, we help you find the right setting for your celebration.",
};

export default async function DestinationsPage(): Promise<React.ReactElement> {
  const destinations = await getDestinations();
  const domestic = destinations.filter((d) => d.category === "domestic");
  const international = destinations.filter((d) => d.category === "international");

  return (
    <>
      <DestinationsHero
        images={destinations.slice(0, 6).map((d) => d.image)}
      />

      <DestinationsList
        eyebrow="Every destination has a story."
        heading="We know how to make it part of yours."
        destinations={domestic}
      />

      <DestinationsList
        eyebrow="International"
        heading="For a wedding that begins with a flight"
        destinations={international}
        tinted
      />
    </>
  );
}
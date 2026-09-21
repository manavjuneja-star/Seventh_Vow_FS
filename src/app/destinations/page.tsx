import type { Metadata } from "next";

import { DestinationsHero } from "@/components/destinations-page/DestinationsHero/DestinationsHero";
import { DestinationsList } from "@/components/destinations-page/DestinationsList/DestinationsList";
import { getDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destination & Venues — The Seventh Vow Weddings",
  description:
    "Palaces, villas, farmhouses and forest lawns across India — the destinations we scout, negotiate and stage weddings in.",
};

export default function DestinationsPage(): React.ReactElement {
  const destinations = getDestinations();
  const domestic = destinations.filter((d) => d.category === "domestic");
  const international = destinations.filter((d) => d.category === "international");

  return (
    <>
      <DestinationsHero images={destinations.slice(0, 6).map((d) => d.image)} />
      <DestinationsList
        eyebrow="Where we work, in India"
        heading="Every destination has its own reasons"
        destinations={domestic}
      />
      <DestinationsList
        eyebrow="Further afield"
        heading="For a wedding that begins with a flight"
        destinations={international}
        tinted
      />
    </>
  );
}

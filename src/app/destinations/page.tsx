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

  return (
    <>
      <DestinationsHero images={destinations.slice(0, 6).map((d) => d.image)} />
      <DestinationsList destinations={destinations} />
    </>
  );
}

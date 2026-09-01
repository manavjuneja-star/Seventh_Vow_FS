import type { Metadata } from "next";

import { ServiceGroup } from "@/components/service-page/ServiceGroup/ServiceGroup";
import { ServicesHero } from "@/components/service-page/ServicesHero/ServicesHero";
import { Threshold } from "@/components/Threshold/Threshold";
import { SERVICES, SPECIALIZATIONS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — The Seventh Vow Weddings",
  description:
    "End-to-end wedding planning, creative direction, and the specialisations that hold a celebration together.",
};

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      <ServicesHero />
      <ServiceGroup
        eyebrow="Services"
        heading="The occasions we plan"
        intro="Each one taken on from the first conversation and carried to the last farewell — the same team, the same standard, whether it's a Roka for forty or a wedding for four hundred."
        items={SERVICES}
      />
      <ServiceGroup
        eyebrow="Specializations"
        heading="How every day holds together"
        intro="The disciplines that run beneath the celebration. On their own or woven into full planning, this is the craft that makes a large, moving event feel effortless."
        items={SPECIALIZATIONS}
        garland
      />
      <Threshold />
    </>
  );
}

import type { Metadata } from "next";

import { ServiceGroup } from "@/components/service-page/ServiceGroup/ServiceGroup";
import { ServicesHero } from "@/components/service-page/ServicesHero/ServicesHero";
import { Threshold } from "@/components/Threshold/Threshold";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — The Seventh Vow Weddings",
  description:
    "End-to-end wedding planning, creative direction, design, hospitality, and the on-ground craft that holds a celebration together.",
};

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      <ServicesHero />
      <ServiceGroup items={SERVICES} />
      <Threshold />
    </>
  );
}

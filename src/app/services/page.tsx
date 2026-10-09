import type { Metadata } from "next";

import { ServiceGroup } from "@/components/service-page/ServiceGroup/ServiceGroup";
import { ServicesHero } from "@/components/service-page/ServicesHero/ServicesHero";
import { Threshold } from "@/components/Threshold/Threshold";
import { JsonLd } from "@/components/Seo/JsonLd";
import { SERVICES } from "@/lib/services";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Wedding Planning Services in India",
  description:
    "Wedding planning and management, concept curation, event design and styling, guest hospitality, on-ground execution, vendor curation and artist management from The Seventh Vow Weddings, wedding planners in Delhi and across India.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Wedding Planning Services in India | The Seventh Vow Weddings" },
};

export default function ServicesPage(): React.ReactElement {
  return (
    <>
      <JsonLd data={servicesJsonLd(SERVICES)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <ServicesHero />
      <ServiceGroup items={SERVICES} />
      <Threshold />
    </>
  );
}

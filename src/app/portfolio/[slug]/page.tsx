import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NextPortfolio } from "@/components/portfolio-page/NextPortfolio/NextPortfolio";
import { PortfolioGallery } from "@/components/portfolio-page/PortfolioGallery/PortfolioGallery";
import { PortfolioHero } from "@/components/portfolio-page/PortfolioHero/PortfolioHero";
import { JsonLd } from "@/components/Seo/JsonLd";
import { Threshold } from "@/components/Threshold/Threshold";
import {
  getPortfolioEntries,
  getPortfolioEntry,
  getPortfolioNeighbours,
} from "@/lib/portfolio";
import { breadcrumbJsonLd } from "@/lib/structuredData";

import styles from "./page.module.css";

type PortfolioPageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const entries = await getPortfolioEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const entry = await getPortfolioEntry(params.slug);
  if (!entry) return { title: "Portfolio" };
  const url = `/portfolio/${entry.slug}`;
  const title = `${entry.coupleNames}: Wedding in ${entry.location}`;
  return {
    title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: { url, title: `${title} | The Seventh Vow Weddings`, description: entry.description, images: [{ url: entry.heroImage, alt: entry.heroAlt }] },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioPageProps): Promise<React.ReactElement> {
  const entry = await getPortfolioEntry(params.slug);
  if (!entry) notFound();

  const { next, others } = await getPortfolioNeighbours(entry.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/#portfolio" },
          { name: entry.coupleNames, path: `/portfolio/${entry.slug}` },
        ])}
      />
      <PortfolioHero entry={entry} />
      <PortfolioGallery photos={entry.photos} />
      <NextPortfolio next={next} others={others} />
      <div className={styles.threshold}>
        <Threshold />
      </div>
    </>
  );
}

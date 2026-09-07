import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NextPortfolio } from "@/components/portfolio-page/NextPortfolio/NextPortfolio";
import { PortfolioGallery } from "@/components/portfolio-page/PortfolioGallery/PortfolioGallery";
import { PortfolioHero } from "@/components/portfolio-page/PortfolioHero/PortfolioHero";
import { Threshold } from "@/components/Threshold/Threshold";
import {
  getPortfolioEntries,
  getPortfolioEntry,
  getPortfolioNeighbours,
} from "@/lib/portfolio";

import styles from "./page.module.css";

type PortfolioPageProps = {
  params: { slug: string };
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getPortfolioEntries().map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: PortfolioPageProps): Metadata {
  const entry = getPortfolioEntry(params.slug);
  if (!entry) return { title: "Portfolio — The Seventh Vow Weddings" };
  return {
    title: `${entry.coupleNames} — The Seventh Vow Weddings`,
    description: entry.description,
  };
}

export default function PortfolioDetailPage({
  params,
}: PortfolioPageProps): React.ReactElement {
  const entry = getPortfolioEntry(params.slug);
  if (!entry) notFound();

  const { next, others } = getPortfolioNeighbours(entry.slug);

  return (
    <>
      <PortfolioHero entry={entry} />
      <PortfolioGallery photos={entry.photos} />
      <NextPortfolio next={next} others={others} />
      <div className={styles.threshold}>
        <Threshold />
      </div>
    </>
  );
}

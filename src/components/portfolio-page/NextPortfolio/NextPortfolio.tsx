import Link from "next/link";

import type { PortfolioEntry } from "@/lib/portfolio";

import styles from "./NextPortfolio.module.css";

function PortfolioCard({
  entry,
  badge,
}: {
  entry: PortfolioEntry;
  badge?: string;
}): React.ReactElement {
  return (
    <Link href={`/portfolio/${entry.slug}`} className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={entry.heroImage} alt="" />
      <div className={styles.cardScrim} />
      <div className={styles.cardText}>
        {badge && <span className={styles.cardBadge}>{badge}</span>}
        <span className={styles.cardLoc}>{entry.location}</span>
        <h3 className={styles.cardName}>{entry.coupleNames}</h3>
        <span className={styles.cue}>
          View the story <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Closes a portfolio page: the next celebration (cyclic) plus the two
 *  remaining ones, side by side, so a visitor can move between all four
 *  without going back to the homepage. */
export function NextPortfolio({
  next,
  others,
}: {
  next: PortfolioEntry;
  others: PortfolioEntry[];
}): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>Keep Exploring</span>
          <h2 className={styles.heading}>More celebrations we&apos;ve carried</h2>
        </div>

        <div data-reveal=".08" className={styles.grid}>
          <PortfolioCard entry={next} badge="View next portfolio" />
          {others.map((entry) => (
            <PortfolioCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

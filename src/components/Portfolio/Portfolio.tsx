import Link from "next/link";

import { getPortfolioEntries, type PortfolioEntry } from "@/lib/portfolio";

import styles from "./Portfolio.module.css";

function StoryCard({
  entry,
  index,
}: {
  entry: PortfolioEntry;
  index: number;
}): React.ReactElement {
  const rounded = index % 2 === 0 ? "cardA" : "cardB";
  return (
    <Link
      data-tilt="1"
      href={`/portfolio/${entry.slug}`}
      className={`${styles.card} ${styles[rounded]}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={entry.heroImage} alt={entry.heroAlt} />
      <div className={styles.cardScrim} />
      <div className={styles.cardBorder} />
      <div className={styles.cardText}>
        <span className={styles.cardLoc}>
          {entry.location} / {entry.date}
        </span>
        <h3 className={styles.cardName}>{entry.coupleNames}</h3>
        <span data-cue="1" className={styles.cue}>
          View the story <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Recent celebrations: one cinematic feature plus a trio of stories.
 *  Reads straight from the portfolio data the admin panel edits — the
 *  featured entry (admin-flagged) gets the big card, the rest fill the
 *  grid in their stored order. */
export async function Portfolio(): Promise<React.ReactElement> {
  const entries = await getPortfolioEntries();
  const featured = entries.find((e) => e.featured) ?? entries[0];
  const rest = entries.filter((e) => e.slug !== featured?.slug);

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>Recent Celebrations</span>
          <h2 className={styles.heading}>
            A few stories we&apos;ve had the honour of planning, shaping and bringing to life.
          </h2>
        </div>

        {featured && (
          <Link
            data-tilt="1"
            data-reveal=".05"
            href={`/portfolio/${featured.slug}`}
            className={styles.feature}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.heroImage} alt={featured.heroAlt} />
            <div className={styles.featureScrim} />
            <div className={styles.featureBorder} />
            <div className={styles.featureText}>
              <span className={styles.featureLoc}>
                {featured.location} / {featured.date} / {featured.duration}
              </span>
              <h3 className={styles.featureName}>{featured.coupleNames}</h3>
              <p className={styles.featureBody}>{featured.description}</p>
              <span data-cue="1" className={styles.cue}>
                View the story <span className={styles.arrow}>→</span>
              </span>
            </div>
          </Link>
        )}

        <div data-port-grid="1" data-reveal=".12" className={styles.grid}>
          {rest.map((entry, i) => (
            <StoryCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import type { Destination } from "@/lib/destinations";

import styles from "./DestinationsList.module.css";

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}): React.ReactElement {
  return (
    <Link
      data-reveal={String((index % 3) * 0.06)}
      href={`/destinations/${destination.slug}`}
      className={styles.card}
    >
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.image}
          alt=""
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.region}>{destination.region}</span>
        <h2 className={styles.name}>{destination.name}</h2>
        <p className={styles.blurb}>{destination.blurb}</p>
        <span className={styles.cue}>
          See the venues <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
}

/** A grid of destinations — each card opens that place's own page. */
export function DestinationsList({
  destinations,
  eyebrow = "Every destination has a story.",
  heading = "We know how to make it part of yours.",
  tinted = false,
  twoColumns = false,
}: {
  destinations: Destination[];
  eyebrow?: string;
  heading?: string;
  tinted?: boolean;
  /** Lay the cards out two across (for a group of four). */
  twoColumns?: boolean;
}): React.ReactElement {
  return (
    <section
      className={tinted ? `${styles.section} ${styles.tinted}` : styles.section}
    >
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div
          className={
            twoColumns ? `${styles.grid} ${styles.gridTwo}` : styles.grid
          }
        >
          {destinations.map((destination, i) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

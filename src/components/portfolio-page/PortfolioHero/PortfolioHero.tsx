import Link from "next/link";

import type { PortfolioEntry } from "@/lib/portfolio";

import styles from "./PortfolioHero.module.css";

/** Masthead for a single celebration: the couple's photo, their names, and a
 *  short line on the day. */
export function PortfolioHero({
  entry,
}: {
  entry: PortfolioEntry;
}): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entry.heroImage} alt="" />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <Link href="/#portfolio" className={styles.back}>
          ← All celebrations
        </Link>
        <span className={styles.eyebrow}>
          {entry.location} · {entry.date} · {entry.duration}
        </span>
        <h1 className={styles.title}>{entry.coupleNames}</h1>
        <p className={styles.sub}>{entry.description}</p>
      </div>

      <svg
        className={styles.wave}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,18 C240,64 480,0 720,26 C960,54 1200,8 1440,32 L1440,64 L0,64 Z"
          fill="var(--blush)"
          opacity="0.97"
        />
        <path
          d="M0,18 C240,64 480,0 720,26 C960,54 1200,8 1440,32"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </section>
  );
}

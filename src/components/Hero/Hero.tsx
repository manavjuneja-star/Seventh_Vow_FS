import { LogoLockup } from "@/components/LogoLockup/LogoLockup";

import styles from "./Hero.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

/** Full-viewport hero: crossfading photography behind the brand lockup. */
export function Hero(): React.ReactElement {
  return (
    <section data-hero="1" className={styles.hero}>
      <div className={styles.bg}>
        <div data-hs="1" className={`${styles.slide} ${styles.slide1}`} />
        <div data-hs="1" className={`${styles.slide} ${styles.slide2}`} />
        <div data-hs="1" className={`${styles.slide} ${styles.slide3}`} />
        <div data-hs="1" className={`${styles.slide} ${styles.slide4}`} />
        <div className={styles.scrim} />
      </div>

      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal1}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>
      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal2}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="5" fill="#A9782B" />
      </svg>
      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal3}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="5" fill="#9C6660" />
      </svg>
      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal4}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>

      <h1 className={styles.lockupWrap}>
        <LogoLockup className={styles.lockup} priority />
      </h1>

      <p className={styles.sub}>
        A bespoke wedding design house crafting cinematic, deeply personal
        celebrations, one union at a time, never repeated twice.
      </p>
      <div data-note="1" className={styles.actions}>
        <a data-enquiry-open="1" href="#enquiry" className={styles.btnPrimary}>
          Begin Your Story
        </a>
        <a href="#portfolio" className={styles.btnGhost}>
          View Portfolio
        </a>
      </div>

      <div className={styles.cue}>
        <div className={styles.cueLine} />
      </div>

      <svg
        className={styles.wave}
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C240,70 480,0 720,30 C960,60 1200,10 1440,35 L1440,70 L0,70 Z"
          fill="var(--blush)"
          opacity="0.97"
        />
        <path
          d="M0,20 C240,70 480,0 720,30 C960,60 1200,10 1440,35"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </section>
  );
}

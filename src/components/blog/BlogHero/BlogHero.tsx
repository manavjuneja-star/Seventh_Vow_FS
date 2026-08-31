import styles from "./BlogHero.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

/** Dark banner for the Journal index — gives the fixed header a ground to sit on
 *  and melts into the blush content below with a wave. */
export function BlogHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <svg viewBox="0 0 600 600" className={styles.rings} aria-hidden="true">
        <circle
          cx="300"
          cy="300"
          r="286"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="300"
          cy="300"
          r="200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="300"
          cy="300"
          r="114"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <svg
        className={`${styles.petal} ${styles.petal1}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>
      <svg
        className={`${styles.petal} ${styles.petal2}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" fill="#9C6660" />
      </svg>
      <svg
        className={`${styles.petal} ${styles.petal3}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>The Journal</span>
        <h1 className={styles.title}>
          Weddings, gatherings, and everything <em>in between</em>
        </h1>
        <p className={styles.sub}>
          Real celebrations we&apos;ve designed, notes from the studio, and the
          thinking behind the details — written as we go.
        </p>
        <span className={styles.rule} />
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
          opacity="0.45"
        />
      </svg>
    </section>
  );
}

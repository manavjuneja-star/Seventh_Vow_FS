import styles from "./ContactHero.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

/** A small centred leaf sprig. */
function Sprig(): React.ReactElement {
  return (
    <svg className={styles.sprig} viewBox="0 0 48 18" aria-hidden="true">
      <path
        d="M3 9 C16 9 30 7 45 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M15 8 C15 4 17 1 21 0 C20 4 18 7 15 8 Z" fill="currentColor" />
      <path d="M23 7 C23 11 25 14 29 15 C28 11 26 8 23 7 Z" fill="currentColor" />
      <path d="M32 5 C32 2 34 -1 38 -2 C37 2 35 4 32 5 Z" fill="currentColor" />
    </svg>
  );
}

/** Contact masthead — small, centred, calm. */
export function ContactHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <svg
        className={styles.arch}
        viewBox="0 0 520 560"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          d="M40 560 L40 236 C40 78 168 34 260 34 C352 34 480 78 480 236 L480 560"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M66 560 L66 244 C66 104 178 62 260 62 C342 62 454 104 454 244 L454 560"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.45"
        />
        <circle cx="260" cy="24" r="2.6" fill="currentColor" stroke="none" />
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
        <path d={PETAL_LEAF} fill="#9C6660" />
      </svg>

      <div className={styles.inner}>
        <span className={styles.kicker}>Come and say hello</span>
        <h1 className={styles.title}>
          We would <em>love</em> to hear from you
        </h1>
        <p className={styles.sub}>
          Tell us as much or as little as you like — the planner who would run
          your day writes back within two working days.
        </p>

        <div className={styles.flourish} aria-hidden="true">
          <span className={styles.line} />
          <Sprig />
          <span className={`${styles.line} ${styles.lineRight}`} />
        </div>

        <p className={styles.quick}>
          Rather write straight away?{" "}
          <a href="mailto:hello@theseventhvow.com" className={styles.quickLink}>
            hello@theseventhvow.com
          </a>
        </p>
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

import styles from "./ServicesHero.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

/** Photographic masthead for the services page — a warm image behind a mauve
 *  wash, with the typographic intro and a ground for the fixed header. */
export function ServicesHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/banquet.jpg" alt="" />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <svg viewBox="0 0 600 600" className={styles.rings} aria-hidden="true">
        <circle cx="300" cy="300" r="286" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="300" r="114" fill="none" stroke="currentColor" strokeWidth="1" />
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
        <circle cx="12" cy="12" r="5" fill="#C9A25C" />
      </svg>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Our Services</span>
        <h1 className={styles.title}>
          Everything your celebration needs, <em>under one roof</em>
        </h1>
        <p className={styles.sub}>
          From the first idea to the last farewell, here is every way we can plan,
          design, and run your day — the services that shape it, and the
          specialisations that hold it together.
        </p>
        <div className={styles.jump}>
          <a href="#end-to-end-wedding-planning" className={styles.jumpLink}>
            Services
          </a>
          <span className={styles.jumpDot} />
          <a href="#event-design-styling" className={styles.jumpLink}>
            Specializations
          </a>
        </div>
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

import styles from "./DestinationsHero.module.css";

/** Landscape photos of the destinations crossfading behind a fixed line about
 *  destination weddings — the copy stays put while the background cycles. */
const SECONDS_PER_SLIDE = 6;

export function DestinationsHero({
  images,
}: {
  images: string[];
}): React.ReactElement {
  const total = Math.max(images.length, 1) * SECONDS_PER_SLIDE;

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={styles.slide}
            style={{
              backgroundImage: `url(${src})`,
              animationDuration: `${total}s`,
              animationDelay: `${-i * SECONDS_PER_SLIDE}s`,
            }}
          />
        ))}
        <div className={styles.scrim} />
      </div>

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Destinations &amp; Venues</span>

        <h1 className={styles.title}>
          The right place sets the tone for everything that follows.
        </h1>

        <p className={styles.sub}>
          From iconic palaces and beachfront resorts to private villas and
          hidden retreats, we help you find the right setting for your
          celebration.
        </p>

        <p className={styles.sub}>
          Choosing a venue is about more than beautiful spaces. We consider the
          guest experience, accommodation, events, logistics, food, service and
          everything the destination makes possible, helping you explore options
          and build the right plan around the place you choose.
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

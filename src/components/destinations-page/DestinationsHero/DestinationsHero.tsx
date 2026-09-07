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
        <span className={styles.eyebrow}>Destination &amp; Venues</span>
        <h1 className={styles.title}>
          A wedding that belongs to the place it&apos;s held
        </h1>
        <p className={styles.sub}>
          We scout, negotiate and stage weddings across India&apos;s most
          photographed cities and its quietest corners — the venue found first,
          everything else built around it. Choose a destination to see the
          palaces, villas and forest lawns we work with there.
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

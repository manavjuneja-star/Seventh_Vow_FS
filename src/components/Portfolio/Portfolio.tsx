import Link from "next/link";

import styles from "./Portfolio.module.css";

type Story = {
  slug: string;
  loc: string;
  name: string;
  image: string;
  alt: string;
  rounded: "a" | "b";
};

const STORIES: Story[] = [
  {
    slug: "aranya-kabir",
    loc: "Udaipur / 2025",
    name: "Aranya & Kabir",
    image: "/images/cake.webp",
    alt: "Wedding cake with floral arrangement",
    rounded: "a",
  },
  {
    slug: "meher-dev",
    loc: "Goa / 2025",
    name: "Meher & Dev",
    image: "/images/gazebo.webp",
    alt: "Wedding gazebo venue",
    rounded: "b",
  },
  {
    slug: "naina-arjun",
    loc: "Tuscany / 2024",
    name: "Naina & Arjun",
    image: "/images/bouquet.webp",
    alt: "Wedding floral bouquet detail",
    rounded: "a",
  },
];

function StoryCard({ slug, loc, name, image, alt, rounded }: Story) {
  return (
    <Link
      data-tilt="1"
      href={`/portfolio/${slug}`}
      className={`${styles.card} ${rounded === "a" ? styles.cardA : styles.cardB}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} />
      <div className={styles.cardScrim} />
      <div className={styles.cardBorder} />
      <div className={styles.cardText}>
        <span className={styles.cardLoc}>{loc}</span>
        <h3 className={styles.cardName}>{name}</h3>
        <span data-cue="1" className={styles.cue}>
          View the story <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Recent celebrations: one cinematic feature plus a trio of stories. */
export function Portfolio(): React.ReactElement {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>Recent Celebrations</span>
          <h2 className={styles.heading}>
            A few stories we&apos;ve had the honour of designing.
          </h2>
        </div>

        <Link
          data-tilt="1"
          data-reveal=".05"
          href="/portfolio/ira-rohan"
          className={styles.feature}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/banquet.webp"
            alt="Long banquet table with chandelier"
          />
          <div className={styles.featureScrim} />
          <div className={styles.featureBorder} />
          <div className={styles.featureText}>
            <span className={styles.featureLoc}>
              Jaisalmer / 2024 / Three days
            </span>
            <h3 className={styles.featureName}>Ira &amp; Rohan</h3>
            <p className={styles.featureBody}>
              Four hundred guests carried across three cities, ending with dinner
              for all of them under one desert sky.
            </p>
            <span data-cue="1" className={styles.cue}>
              View the story <span className={styles.arrow}>→</span>
            </span>
          </div>
        </Link>

        <div data-port-grid="1" data-reveal=".12" className={styles.grid}>
          {STORIES.map((s) => (
            <StoryCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

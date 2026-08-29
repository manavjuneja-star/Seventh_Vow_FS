import styles from "./Portfolio.module.css";

type Story = {
  loc: string;
  name: string;
  image: string;
  alt: string;
  rounded: "a" | "b";
};

const STORIES: Story[] = [
  {
    loc: "Udaipur / 2025",
    name: "Aranya & Kabir",
    image: "/images/cake.jpg",
    alt: "Wedding cake with floral arrangement",
    rounded: "a",
  },
  {
    loc: "Goa / 2025",
    name: "Meher & Dev",
    image: "/images/gazebo.jpg",
    alt: "Wedding gazebo venue",
    rounded: "b",
  },
  {
    loc: "Tuscany / 2024",
    name: "Naina & Arjun",
    image: "/images/bouquet.jpg",
    alt: "Wedding floral bouquet detail",
    rounded: "a",
  },
];

function StoryCard({ loc, name, image, alt, rounded }: Story) {
  return (
    <a
      data-tilt="1"
      href="#portfolio"
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
    </a>
  );
}

/** Recent celebrations: one cinematic feature plus a trio of stories. */
export function Portfolio(): React.ReactElement {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <div>
            <span className={styles.eyebrow}>Recent Celebrations</span>
            <h2 className={styles.heading}>
              A few stories we&apos;ve had the honour of designing.
            </h2>
          </div>
          <a
            data-enquiry-open="1"
            href="#enquiry"
            className={styles.headLink}
          >
            View Full Portfolio
          </a>
        </div>

        <a
          data-tilt="1"
          data-reveal=".05"
          href="#portfolio"
          className={styles.feature}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/banquet.jpg"
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
        </a>

        <div data-port-grid="1" data-reveal=".12" className={styles.grid}>
          {STORIES.map((s) => (
            <StoryCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

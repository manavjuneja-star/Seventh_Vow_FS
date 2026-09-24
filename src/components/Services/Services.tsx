import Link from "next/link";

import styles from "./Services.module.css";

type Service = {
  num: string;
  title: string;
  body: string;
  image: string;
  lowered?: boolean;
};

const SERVICES: Service[] = [
  {
    num: "I",
    title: "Destination Weddings",
    body: "Palaces, coastlines, and hidden gardens across the world, scouted and staged for you.",
    image: "/images/gazebo.webp",
  },
  {
    num: "II",
    title: "Event Design & Styling",
    body: "Mandaps, tablescapes, and florals designed as one continuous visual language.",
    image: "/images/bouquet.webp",
    lowered: true,
  },
  {
    num: "III",
    title: "Hospitality & Guest Management",
    body: "Travel, stay, and welcome experiences that make every guest feel expected.",
    image: "/images/banquet.webp",
  },
];

function ServiceCard({ num, title, body, image, lowered }: Service) {
  return (
    <div
      className={`${styles.card} ${
        lowered ? styles.cardLowered : styles.cardRaised
      }`}
    >
      <div className={styles.archWrap}>
        <div className={styles.archFrame} />
        <div data-arch="1" className={styles.arch}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" />
          <div className={styles.archVeil} />
          <span className={styles.archNum}>{num}</span>
        </div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardBody}>{body}</p>
    </div>
  );
}

/** "Three disciplines, one vision" — arch-framed service portraits. */
export function Services(): React.ReactElement {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>What We Do</span>
          <h2 className={styles.heading}>
            From the first conversation to the final farewell, we&apos;re there for every detail.
          </h2>
        </div>

        <div data-services-grid="1" data-reveal=".1" className={styles.grid}>
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>

        <div data-reveal=".15" className={styles.more}>
          <Link href="/services" className={styles.moreLink}>
            Explore All Services <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

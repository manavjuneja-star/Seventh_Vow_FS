import Link from "next/link";

import styles from "./Services.module.css";

/** Seconds each photo stays up; keep in step with the fadeN keyframes in the CSS. */
const SLIDE_SECONDS = 5;

type Service = {
  num: string;
  title: string;
  body: string;
  /** One image shows static; two or more crossfade as a slideshow. */
  images: string[];
  lowered?: boolean;
};

const SERVICES: Service[] = [
  {
    num: "I",
    title: "Destination Weddings",
    body: "Palaces, coastlines, and hidden gardens across the world, scouted and staged for you.",
    images: [1, 2, 3].map((n) => `/images/services/dest-${n}.webp`),
  },
  {
    num: "II",
    title: "Event Design & Styling",
    body: "Mandaps, tablescapes, and florals designed as one continuous visual language.",
    images: [1, 2, 3, 4, 5, 6].map((n) => `/images/services/event-${n}.webp`),
    lowered: true,
  },
  {
    num: "III",
    title: "Hospitality & Guest Management",
    body: "Travel, stay, and welcome experiences that make every guest feel expected.",
    images: ["/images/banquet.webp"],
  },
];

function ServiceCard({ num, title, body, images, lowered }: Service) {
  const slides = images.length > 1;
  return (
    <div
      className={`${styles.card} ${
        lowered ? styles.cardLowered : styles.cardRaised
      }`}
    >
      <div className={styles.archWrap}>
        <div className={styles.archFrame} />
        <div data-arch="1" className={styles.arch}>
          {images.map((src, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              loading={k === 0 ? undefined : "lazy"}
              decoding="async"
              className={slides ? `${styles.slide} ${styles[`fade${images.length}`] ?? ""}` : undefined}
              style={slides ? { animationDelay: `${k * SLIDE_SECONDS}s` } : undefined}
            />
          ))}
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

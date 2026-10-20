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
  /** object-position for each image, so its subject stays in the arch. */
  positions?: string[];
  /** Indexes of images shown zoomed out: matted on a blurred copy of themselves. */
  matted?: number[];
  lowered?: boolean;
};

const SERVICES: Service[] = [
  {
    num: "I",
    title: "Destination Weddings",
    body: "Palaces, coastlines, and hidden gardens across the world, scouted and staged for you.",
    images: [1, 2, 3].map((n) => `/images/services/dest-v2-${n}.webp`),
    positions: ["50% 40%", "72% 50%", "50% 50%"],
  },
  {
    num: "II",
    title: "Event Design & Styling",
    body: "Mandaps, tablescapes, and florals designed as one continuous visual language.",
    images: [1, 2, 4].map((n) => `/images/services/event-v2-${n}.webp`),
    positions: ["50% 55%", "56% 50%", "60% 50%"],
    lowered: true,
  },
  {
    num: "III",
    title: "Hospitality & Guest Management",
    body: "Travel, stay, and welcome experiences that make every guest feel expected.",
    images: ["/images/banquet.webp"],
  },
];

function ServiceCard({ num, title, body, images, positions, matted, lowered }: Service) {
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
          {images.map((src, k) => {
            const animation = slides
              ? `${styles.slide} ${styles[`fade${images.length}`] ?? ""}`
              : undefined;
            const delay = slides ? { animationDelay: `${k * SLIDE_SECONDS}s` } : {};
            const objectPosition = positions?.[k];

            if (matted?.includes(k)) {
              return (
                <div key={src} className={`${styles.slideBox} ${animation ?? ""}`} style={delay}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" aria-hidden="true" className={styles.backdrop} style={{ objectPosition }} loading="lazy" decoding="async" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className={styles.matted} style={{ objectPosition }} loading="lazy" decoding="async" />
                </div>
              );
            }

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                loading={k === 0 ? undefined : "lazy"}
                decoding="async"
                className={animation}
                style={{ objectPosition, ...delay }}
              />
            );
          })}
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

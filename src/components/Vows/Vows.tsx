import Link from "next/link";

import styles from "./Vows.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";

type Vow = {
  num: string;
  title: string;
  desc: string;
  reveal: string;
  rotate: string;
  tone: "light" | "deep";
  place: string;
};

const VOWS: Vow[] = [
  {
    num: "I",
    title: "Originality",
    desc: "No wedding of ours is ever repeated.",
    reveal: "0.00",
    rotate: "rotate(-1.6deg)",
    tone: "light",
    place: styles.note1,
  },
  {
    num: "II",
    title: "Continuity",
    desc: "One planner, from first sketch to farewell.",
    reveal: "0.08",
    rotate: "rotate(1.3deg)",
    tone: "deep",
    place: styles.note2,
  },
  {
    num: "III",
    title: "Transparency",
    desc: "Every number shown in full, always.",
    reveal: "0.16",
    rotate: "rotate(-1deg)",
    tone: "light",
    place: styles.note3,
  },
  {
    num: "IV",
    title: "Precision",
    desc: "Nothing stands that we did not place.",
    reveal: "0.24",
    rotate: "rotate(1.6deg)",
    tone: "deep",
    place: styles.note4,
  },
];

function VowNote({ num, title, desc, reveal, rotate, tone, place }: Vow) {
  const tint = tone === "light" ? styles.noteLight : styles.noteDeep;
  return (
    <div
      data-note="1"
      data-reveal={reveal}
      className={`${styles.note} ${tint} ${place}`}
      style={{ transform: rotate }}
    >
      <span className={styles.noteNum}>{num}</span>
      <span>
        <span className={styles.noteTitle}>{title}</span>
        <span className={styles.noteDesc}>{desc}</span>
      </span>
    </div>
  );
}

/** "Our vows to you" — the studio's promises as pinned paper notes. */
export function Vows(): React.ReactElement {
  return (
    <section className={styles.section}>
      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal1}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>
      <svg
        data-petal="1"
        className={`${styles.petal} ${styles.petal2}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d={PETAL_LEAF} fill="#9C6660" />
      </svg>

      <div data-grid2="1" className={styles.grid}>
        <div data-reveal="0">
          <span className={styles.eyebrow}>Our Craft</span>
          <h2 className={styles.heading}>
            Our vows <em>to you</em>, before you make yours.
          </h2>
          <p className={styles.body}>
            Written down, kept on the wall of the studio, and read back to every
            couple we take on.
          </p>
          <div className={styles.signRow}>
            <span className={styles.signScript}>The Seventh Vow Weddings</span>
            <span className={styles.signLine} />
          </div>
          <Link href="/services" className={styles.moreLink}>
            Explore all services <span className={styles.arrow}>→</span>
          </Link>
        </div>

        <div className={styles.stack}>
          {VOWS.map((v) => (
            <VowNote key={v.num} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

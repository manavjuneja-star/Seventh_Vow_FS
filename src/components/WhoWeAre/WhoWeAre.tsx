import styles from "./WhoWeAre.module.css";

/** "Who We Are": the mirror of About's split, text on the left, photo on the right. */
export function WhoWeAre(): React.ReactElement {
  return (
    <section id="who-we-are" className={styles.section}>
      <div data-grid2="1" className={styles.grid}>
        <div data-reveal="0">
          <span className={styles.eyebrow}>Who We Are</span>
          <h2 className={styles.heading}>
            Built from experience. Driven by your <em>vision</em>.
          </h2>
          <p className={styles.body}>
            The Seventh Vow Weddings was built on a simple belief: great
            celebrations need both imagination and experience. Years in
            weddings, hospitality and event operations have shown us what
            happens beyond the photographs, from how venues work to how guests
            move and how timelines change.
          </p>
          <p className={styles.lead}>
            We don&apos;t start with a template. <em>We start with you.</em>
          </p>
        </div>

        <div data-reveal=".12" className={styles.collageWrap}>
          <div className={styles.frameBack} />
          <div className={styles.collage}>
            <div className={`${styles.tile} ${styles.tileTall}`} />
            <div className={`${styles.tile} ${styles.tileTop}`} />
            <div className={`${styles.tile} ${styles.tileBottom}`} />
          </div>
          <div className={styles.frameFront} />
        </div>
      </div>
    </section>
  );
}

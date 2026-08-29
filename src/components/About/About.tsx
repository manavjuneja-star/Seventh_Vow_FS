import styles from "./About.module.css";

/** Editorial "Our Philosophy" split: rotated photo figure and the manifesto. */
export function About(): React.ReactElement {
  return (
    <section id="about" className={styles.section}>
      <div data-grid2="1" className={styles.grid}>
        <div data-reveal="0" className={styles.figureWrap}>
          <div className={styles.frameBack} />
          <div data-note="1" className={styles.figure}>
            <div data-is-a="1" className={`${styles.slide} ${styles.slide1}`} />
            <div data-is-a="1" className={`${styles.slide} ${styles.slide2}`} />
            <div data-is-a="1" className={`${styles.slide} ${styles.slide3}`} />
            <div className={styles.figureVeil} />
          </div>
          <div className={styles.frameFront} />
        </div>

        <div data-reveal=".12">
          <span className={styles.eyebrow}>Our Philosophy</span>
          <h2 className={styles.heading}>
            We don&apos;t design weddings.
            <br />
            We design <em>the seventh promise</em>, the one made in front of
            everyone you love.
          </h2>
          <p className={styles.body}>
            Every celebration we build begins with a single question: what is
            true about this couple that no template could ever capture? From that
            answer comes the palette, the setting, the smallest detail on the
            table. Nothing borrowed, nothing repeated.
          </p>
          <div className={styles.sign}>
            <span className={styles.role}>Founder &amp; Creative Director</span>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            Your wedding should feel like <em>your story</em>, and nobody
            else&apos;s.
          </h2>
          <p className={styles.body}>
            There will be moments on your wedding day that you&apos;ll remember
            forever. Those are the moments you should be thinking about, not
            the vendor who&apos;s late or the timeline that&apos;s changing. We
            take care of the planning, so you can be present for what&apos;s in
            front of you. Because {" "}
            <em>your wedding deserves to be lived, not managed.</em>
          </p>
          <div className={styles.sign}>
            <span className={styles.name}>Manav Juneja</span>
            <span className={styles.role}>Founder &amp; Creative Director</span>
          </div>
        </div>
      </div>
    </section>
  );
}

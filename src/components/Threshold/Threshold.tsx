import styles from "./Threshold.module.css";

/** The doorway CTA: an arched threshold inviting the first conversation. */
export function Threshold(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div data-reveal="0" className={styles.wrap}>
        <div className={styles.arch}>
          <span className={styles.baseline} />
          <div className={styles.panel}>
            <span className={styles.script}>Let&apos;s begin</span>
            <h2 className={styles.heading}>
              Every love story deserves a celebration that could only ever be
              theirs.
            </h2>
            <p className={styles.body}>
              Twelve weddings a year, and each one starts with a conversation,
              with no forms and no pitch.
            </p>
            <a
              data-threshold="1"
              data-enquiry-open="1"
              href="#enquiry"
              className={styles.cta}
            >
              Begin an enquiry{" "}
              <span data-threshold-cue="1" className={styles.arrow}>
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import styles from "./MandapSketch.module.css";

/** The services hero backdrop: a faint gold wedding illustration (mandap, seated
 *  couple, guests) centred behind the type. No wash — the hero keeps the same
 *  gradient as the contact hero; the illustration only adds light gold marks. */
export function MandapSketch(): React.ReactElement {
  return (
    <div className={styles.bg} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/indian_wedding_mandap_gold_lineart.svg"
        alt=""
        className={styles.img}
      />
    </div>
  );
}

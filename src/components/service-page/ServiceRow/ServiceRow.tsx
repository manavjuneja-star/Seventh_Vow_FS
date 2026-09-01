import type { Offering } from "@/lib/services";
import { Sprig } from "@/components/service-page/Sprig/Sprig";

import styles from "./ServiceRow.module.css";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

type ServiceRowProps = {
  offering: Offering;
  index: number;
};

/** One offering: a photo and a short case for it, sides alternating. The `id`
 *  is the anchor the footer links jump to. A freehand vine segment trails down
 *  the outer margin, switching sides row to row so the sketch reads as one
 *  continuous trailing plant down the page. */
export function ServiceRow({
  offering,
  index,
}: ServiceRowProps): React.ReactElement {
  const reversed = index % 2 === 1;
  return (
    <article
      id={offering.slug}
      data-reveal={reversed ? ".08" : "0"}
      className={`${styles.row} ${reversed ? styles.reversed : ""}`}
    >
      <Sprig variant={index} className={styles.vine} />
      <div className={styles.mediaWrap}>
        <div className={styles.frame} aria-hidden="true" />
        <div className={styles.media}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={offering.image} alt="" />
        </div>
      </div>
      <div className={styles.text}>
        <span className={styles.num}>{ROMAN[index] ?? String(index + 1)}</span>
        <h3 className={styles.title}>{offering.title}</h3>
        <p className={styles.blurb}>{offering.blurb}</p>
      </div>
    </article>
  );
}

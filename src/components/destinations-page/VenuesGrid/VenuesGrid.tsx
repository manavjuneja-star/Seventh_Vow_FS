import type { Venue } from "@/lib/destinations";

import styles from "./VenuesGrid.module.css";

export function VenuesGrid({ venues }: { venues: Venue[] }): React.ReactElement {
  return (
    <div className={styles.grid}>
      {venues.map((venue, i) => (
        <figure key={venue.name} data-reveal={String((i % 3) * 0.06)} className={styles.card}>
          <div className={styles.media}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={venue.image} alt="" loading={i < 3 ? "eager" : "lazy"} />
          </div>
          <figcaption className={styles.name}>{venue.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

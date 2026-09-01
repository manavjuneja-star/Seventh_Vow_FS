import type { Offering } from "@/lib/services";
import { ServiceRow } from "@/components/service-page/ServiceRow/ServiceRow";

import styles from "./ServiceGroup.module.css";

type ServiceGroupProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: Offering[];
  garland?: boolean;
};

/** A titled band of alternating offering rows. */
export function ServiceGroup({
  eyebrow,
  heading,
  intro,
  items,
  garland,
}: ServiceGroupProps): React.ReactElement {
  return (
    <section className={styles.section}>
      {garland && (
        <div className={styles.garland} aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 C200,10 300,110 500,60 C700,10 800,110 1000,60 C1100,35 1150,70 1200,55"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.intro}>{intro}</p>
        </div>
        {items.map((offering, i) => (
          <ServiceRow key={offering.slug} offering={offering} index={i} />
        ))}
      </div>
    </section>
  );
}

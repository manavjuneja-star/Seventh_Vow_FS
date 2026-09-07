import type { Offering } from "@/lib/services";
import { ServiceRow } from "@/components/service-page/ServiceRow/ServiceRow";

import styles from "./ServiceGroup.module.css";

type ServiceGroupProps = {
  /** Optional titled header. Omit it entirely when the hero already covers the
   *  intro and there's only one group on the page. */
  head?: { id?: string; eyebrow: string; heading: string; intro: string };
  items: Offering[];
};

/** A band of alternating offering rows, optionally headed. */
export function ServiceGroup({ head, items }: ServiceGroupProps): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {head && (
          <div id={head.id} data-reveal="0" className={styles.head}>
            <span className={styles.eyebrow}>{head.eyebrow}</span>
            <h2 className={styles.heading}>{head.heading}</h2>
            <p className={styles.intro}>{head.intro}</p>
          </div>
        )}
        {items.map((offering, i) => (
          <ServiceRow key={offering.slug} offering={offering} index={i} />
        ))}
      </div>
    </section>
  );
}

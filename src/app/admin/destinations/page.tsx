import Link from "next/link";

import { DestinationCreateForm } from "@/components/admin/DestinationCreateForm/DestinationCreateForm";
import { getDestinations } from "@/lib/destinations";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDestinationsList(): Promise<React.ReactElement> {
  const destinations = await getDestinations();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>Destinations</h1>
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Add a destination</h2>
        <DestinationCreateForm />
      </div>

      <div className={styles.list}>
        {destinations.map((d) => (
          <Link key={d.slug} href={`/admin/destinations/${d.slug}`} className={styles.listRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image} alt="" className={styles.listThumb} />
            <div className={styles.listBody}>
              <div className={styles.listTitle}>
                {d.name}
                <span className={styles.badge}>{d.category}</span>
              </div>
              <div className={styles.listMeta}>
                {d.region} · {d.venues?.length ?? 0} venues
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

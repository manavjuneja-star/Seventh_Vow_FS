import Link from "next/link";

import { getPortfolioEntries } from "@/lib/portfolio";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioList(): Promise<React.ReactElement> {
  const entries = await getPortfolioEntries();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>Portfolio</h1>
      </div>
      <p className={styles.hint} style={{ marginBottom: 20 }}>
        These 4 pages are fixed — edit any of them below. Renaming the couple
        changes the page&apos;s URL.
      </p>
      <div className={styles.list}>
        {entries.map((entry) => (
          <Link key={entry.slug} href={`/admin/portfolio/${entry.slug}`} className={styles.listRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.heroImage} alt="" className={styles.listThumb} />
            <div className={styles.listBody}>
              <div className={styles.listTitle}>
                {entry.coupleNames}
                {entry.featured && <span className={styles.badge}>Featured</span>}
              </div>
              <div className={styles.listMeta}>
                {entry.location} · {entry.photos.length} photos
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

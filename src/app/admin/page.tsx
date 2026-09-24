import Link from "next/link";

import styles from "./admin.module.css";

export default function AdminDashboard(): React.ReactElement {
  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>Dashboard</h1>
      </div>
      <div className={styles.formatGrid}>
        <Link href="/admin/portfolio" className={styles.formatCard}>
          <h2 className={styles.formatCardTitle}>Portfolio</h2>
          <p className={styles.formatCardBody}>
            Edit the 4 celebration pages — text, images, and which one is
            featured on the homepage.
          </p>
        </Link>
        <Link href="/admin/blog" className={styles.formatCard}>
          <h2 className={styles.formatCardTitle}>Blog</h2>
          <p className={styles.formatCardBody}>
            Add, edit or remove Journal posts across the four layout formats.
          </p>
        </Link>
        <Link href="/admin/destinations" className={styles.formatCard}>
          <h2 className={styles.formatCardTitle}>Destinations</h2>
          <p className={styles.formatCardBody}>
            Add, edit or remove destinations, and the venues listed under
            each one.
          </p>
        </Link>
      </div>
    </>
  );
}

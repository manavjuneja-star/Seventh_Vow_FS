import Link from "next/link";

import { LogoutButton } from "@/components/admin/LogoutButton/LogoutButton";

import styles from "./admin.module.css";

/** Shell for every /admin page except /admin/login (that one renders its
 *  own bare page — no point showing nav for a page you're not logged in
 *  yet to use). Auth itself is enforced by middleware.ts, not here. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <span className={styles.brand}>Seventh Vow — Studio Admin</span>
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/admin/portfolio" className={styles.navLink}>
            Portfolio
          </Link>
          <Link href="/admin/blog" className={styles.navLink}>
            Blog
          </Link>
          <Link href="/admin/destinations" className={styles.navLink}>
            Destinations
          </Link>
        </nav>
        <div className={styles.logoutForm}>
          <LogoutButton />
        </div>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

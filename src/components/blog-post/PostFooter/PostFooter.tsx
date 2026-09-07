import Link from "next/link";

import styles from "./PostFooter.module.css";

/** Closing signature line + back-link, shared by all 4 post templates. */
export function PostFooter(): React.ReactElement {
  return (
    <div className={styles.foot}>
      <span className={styles.signature}>— The Seventh Vow Weddings</span>
      <Link href="/blog" className={styles.back}>
        ← Back to the Journal
      </Link>
    </div>
  );
}

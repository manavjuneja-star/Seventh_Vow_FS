import { Logo } from "@/components/Logo/Logo";

import styles from "./Veil.module.css";

/** Full-screen intro veil: the monogram settles in, then the veil lifts. */
export function Veil(): React.ReactElement {
  return (
    <>
      <div data-veil="1" className={styles.veil} />
      <div data-veilmark="1" className={styles.mark}>
        <Logo className={styles.markLogo} priority />
      </div>
    </>
  );
}

import { LogoLockup } from "@/components/LogoLockup/LogoLockup";

import styles from "./Veil.module.css";

/** Full-screen intro loading veil: the brand lockup settles in, then it lifts. */
export function Veil(): React.ReactElement {
  return (
    <>
      <div data-veil="1" className={styles.veil} />
      <div data-veilmark="1" className={styles.mark}>
        <LogoLockup className={styles.markLogo} priority />
      </div>
    </>
  );
}

import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { VeilGate } from "@/components/Veil/VeilGate";

import styles from "./Veil.module.css";

/**
 * Full-screen intro loading veil: the brand lockup settles in, then it lifts.
 * Plays once per session — `VeilGate` sets `data-veil-seen` on later visits and
 * the layout head script does the same before paint on a hard reload; CSS then
 * keeps it hidden.
 */
export function Veil(): React.ReactElement {
  return (
    <>
      <VeilGate />
      <div data-veil="1" className={styles.veil} />
      <div data-veilmark="1" className={styles.mark}>
        <LogoLockup className={styles.markLogo} priority />
      </div>
    </>
  );
}

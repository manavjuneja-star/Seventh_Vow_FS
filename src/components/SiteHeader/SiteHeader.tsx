import { Logo } from "@/components/Logo/Logo";

import styles from "./SiteHeader.module.css";

function Diamond(): React.ReactElement {
  return <span className={styles.diamond} />;
}

/** Fixed site header: brand centred, nav split either side, enquire CTA. */
export function SiteHeader(): React.ReactElement {
  return (
    <header data-header="1" className={styles.header}>
      <button data-navtoggle="1" aria-label="Menu" className={styles.toggle}>
        <span />
        <span />
      </button>
      <span data-navspacer="1" className={styles.spacer} />

      <nav data-nav="1" className={`${styles.nav} ${styles.navLeft}`}>
        <a data-navtext="1" href="#about" className={styles.link}>
          About
        </a>
        <Diamond />
        <a data-navtext="1" href="#services" className={styles.link}>
          Services
        </a>
        <Diamond />
        <a
          data-navtext="1"
          href="#"
          className={`${styles.link} ${styles.linkNowrap}`}
        >
          Destination &amp; Venues
        </a>
      </nav>

      <a data-brand="1" href="#" className={styles.brand}>
        <Logo className={styles.brandLogo} priority />
        <span className={styles.brandName}>The Seventh Vow</span>
      </a>

      <nav data-nav="1" className={`${styles.nav} ${styles.navRight}`}>
        <a data-navtext="1" href="#portfolio" className={styles.link}>
          Portfolio
        </a>
        <Diamond />
        <a data-navtext="1" href="#" className={styles.link}>
          Blogs
        </a>
        <Diamond />
        <a
          data-navtext="1"
          data-enquiry-open="1"
          href="#enquiry"
          className={styles.link}
        >
          Contact
        </a>
      </nav>

      <a
        data-navcta="1"
        data-enquiry-open="1"
        href="#enquiry"
        className={styles.cta}
      >
        Enquire
      </a>
      <span data-navrule="1" className={styles.rule} />
    </header>
  );
}

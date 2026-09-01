import Link from "next/link";

import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";

import styles from "./SiteHeader.module.css";

function Diamond(): React.ReactElement {
  return <span className={styles.diamond} />;
}

/** Fixed site header: brand centred, nav split either side, enquire CTA. */
export function SiteHeader(): React.ReactElement {
  return (
    <header data-header="1" className={styles.header}>
      <MobileMenu />
      <span data-navspacer="1" className={styles.spacer} />

      <nav data-nav="1" className={`${styles.nav} ${styles.navLeft}`}>
        <Link data-navtext="1" href="/#about" className={styles.link}>
          About
        </Link>
        <Diamond />
        <Link data-navtext="1" href="/services" className={styles.link}>
          Services
        </Link>
        <Diamond />
        <a
          data-navtext="1"
          href="#"
          className={`${styles.link} ${styles.linkNowrap}`}
        >
          Destination &amp; Venues
        </a>
      </nav>

      <Link
        data-brand="1"
        href="/"
        aria-label="The Seventh Vow Weddings"
        className={styles.brand}
      >
        <LogoLockup className={styles.brandLogo} variant="ivory" priority />
      </Link>

      <nav data-nav="1" className={`${styles.nav} ${styles.navRight}`}>
        <Link data-navtext="1" href="/#portfolio" className={styles.link}>
          Portfolio
        </Link>
        <Diamond />
        <Link data-navtext="1" href="/blog" className={styles.link}>
          Blogs
        </Link>
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";

import styles from "./SiteHeader.module.css";

function Diamond(): React.ReactElement {
  return <span className={styles.diamond} />;
}

/** True when `href` is the page currently open (or a section of it). */
function routeActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The single site header, rendered once in the root layout so every page shares
 * it. The link for the page you're on is marked with `aria-current` and a gold
 * underline.
 */
export function SiteHeader(): React.ReactElement {
  const pathname = usePathname();

  const pageLink = (href: string, label: string): React.ReactElement => {
    const active = routeActive(pathname, href);
    return (
      <Link
        data-navtext="1"
        href={href}
        aria-current={active ? "page" : undefined}
        className={`${styles.link} ${active ? styles.linkActive : ""}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header data-header="1" className={styles.header}>
      <MobileMenu />
      <span data-navspacer="1" className={styles.spacer} />

      <nav data-nav="1" className={`${styles.nav} ${styles.navLeft}`}>
        <Link data-navtext="1" href="/#about" className={styles.link}>
          About
        </Link>
        <Diamond />
        {pageLink("/services", "Services")}
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
        {pageLink("/blog", "Blogs")}
        <Diamond />
        {pageLink("/contact", "Contact")}
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

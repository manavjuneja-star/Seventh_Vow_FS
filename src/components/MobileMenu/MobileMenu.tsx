"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo/Logo";

import styles from "./MobileMenu.module.css";

type MenuLink = { label: string; href: string; enquiry?: boolean };

const LINKS: MenuLink[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Destination & Venues", href: "#" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "#enquiry", enquiry: true },
];

/** True while the enquiry overlay has taken over the page (and the scroll lock). */
function enquiryIsOpen(): boolean {
  const ov = document.querySelector<HTMLElement>("[data-enquiry]");
  return ov?.style.pointerEvents === "auto";
}

/**
 * Phone navigation: a hamburger in the header that opens a full-viewport panel
 * — the monogram watermarking the background, the links dealing themselves in
 * one after another, an enquiry CTA and the studio's contact line at the foot.
 *
 * The links that point at the enquiry form carry `data-enquiry-open`, so
 * `support.ts` opens the form for them too; tapping one closes the menu and
 * hands the scroll lock over to the overlay.
 */
export function MobileMenu(): React.ReactElement {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (!enquiryIsOpen()) document.body.style.overflow = "";
    };
  }, [open]);

  const close = (): void => setOpen(false);

  return (
    <>
      <button
        type="button"
        data-navtoggle="1"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <div
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        aria-hidden={!open}
      >
        <span className={styles.topRule} />
        <div className={styles.watermark}>
          <Logo className={styles.watermarkLogo} />
        </div>

        <nav className={styles.nav}>
          {LINKS.map((link, i) => {
            const inner = (
              <>
                <span className={styles.index}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.linkText}>{link.label}</span>
              </>
            );
            return link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className={styles.link}
                onClick={close}
              >
                {inner}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                data-enquiry-open={link.enquiry ? "1" : undefined}
                className={styles.link}
                onClick={close}
              >
                {inner}
              </a>
            );
          })}
        </nav>

        <div className={styles.foot}>
          <a
            href="#enquiry"
            data-enquiry-open="1"
            className={styles.enquire}
            onClick={close}
          >
            Begin an enquiry
          </a>
          <a
            href="mailto:hello@theseventhvow.com"
            className={styles.contact}
            onClick={close}
          >
            hello@theseventhvow.com
          </a>
          <span className={styles.place}>New Delhi, India</span>
        </div>
      </div>
    </>
  );
}

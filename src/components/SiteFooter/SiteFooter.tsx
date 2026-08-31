import { LogoLockup } from "@/components/LogoLockup/LogoLockup";

import styles from "./SiteFooter.module.css";

const SERVICES = [
  "Wedding Planning",
  "Destination Weddings",
  "Event Design & Styling",
  "Vendor Coordination",
  "Hospitality & Guest Management",
  "Roka Ceremony",
  "Engagement Party",
  "Complete Wedding Ceremony",
  "Anniversaries",
  "Birthday Parties",
  "Corporate Events",
];

function Divider(): React.ReactElement {
  return (
    <div data-reveal="0" className={styles.divider}>
      <svg viewBox="0 0 620 90" fill="none" className={styles.dividerSvg}>
        <path
          d="M8 58 C70 58 96 30 132 30 C168 30 176 62 208 62 C236 62 246 26 278 26 C300 26 308 46 310 56 C312 46 320 26 342 26 C374 26 384 62 412 62 C444 62 452 30 488 30 C524 30 550 58 612 58"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M310 56 C304 66 296 72 288 74 C296 78 306 78 310 88 C314 78 324 78 332 74 C324 72 316 66 310 56 Z"
          stroke="var(--mauve)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="60" cy="58" r="1.8" fill="currentColor" />
        <circle cx="560" cy="58" r="1.8" fill="currentColor" />
        <circle cx="310" cy="14" r="1.8" fill="var(--mauve)" />
      </svg>
    </div>
  );
}

/** Closing garland divider and the full studio footer. */
export function SiteFooter(): React.ReactElement {
  return (
    <>
      <Divider />
      <footer className={styles.footer}>
        <svg viewBox="0 0 600 600" className={styles.rings}>
          <circle
            cx="300"
            cy="300"
            r="290"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="300"
            cy="300"
            r="206"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="300"
            cy="300"
            r="122"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <div data-grid2="1" className={styles.grid}>
          <div>
            <div className={styles.brand}>
              <LogoLockup
                className={styles.brandLogo}
                variant="ivory"
                priority
              />
            </div>
            <p className={styles.blurb}>
              A bespoke wedding design house in New Delhi, taking on twelve
              celebrations a year, each one drawn from scratch and never
              repeated.
            </p>
            <a
              data-enquiry-open="1"
              href="#enquiry"
              className={styles.inlineLink}
            >
              Begin an enquiry <span className={styles.arrow}>→</span>
            </a>
          </div>

          <div>
            <span className={styles.colTitle}>Services</span>
            <div className={styles.linkCol}>
              {SERVICES.map((s) => (
                <a key={s} href="services.html" className={styles.navLink}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className={styles.colTitle}>Studio</span>
            <div className={styles.studioCol}>
              <a
                href="mailto:hello@theseventhvow.com"
                className={styles.studioLink}
              >
                hello@theseventhvow.com
              </a>
              <a href="tel:+919800000000" className={styles.studioLink}>
                +91 98XXX XXXXX
              </a>
              <span className={styles.studioPlace}>New Delhi, India</span>
            </div>
            <a href="https://wa.me/919800000000" className={styles.whatsapp}>
              Message on WhatsApp
            </a>
            <div className={styles.social}>
              <a
                data-enquiry-open="1"
                href="#enquiry"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle
                    cx="17.2"
                    cy="6.8"
                    r="1.1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                data-enquiry-open="1"
                href="#enquiry"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <span className={styles.socialGlyph}>f</span>
              </a>
              <a
                data-enquiry-open="1"
                href="#enquiry"
                aria-label="Pinterest"
                className={styles.socialLink}
              >
                <span className={styles.socialGlyph}>P</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © 2026 The Seventh Vow Weddings. All rights reserved.
          </span>
          <span className={styles.signoff}>Designed one union at a time</span>
        </div>
      </footer>
    </>
  );
}

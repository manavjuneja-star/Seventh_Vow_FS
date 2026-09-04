"use client";

import { type FormEvent, useState } from "react";

import styles from "./ContactForm.module.css";

const EVENT_TYPES = [
  "Wedding",
  "Engagement / Roka",
  "Sangeet / Mehndi",
  "Reception",
  "Anniversary",
  "Other celebration",
];

const TIMELINES = [
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than a year away",
  "Date not decided",
];

const BUDGETS = [
  "Under ₹25 lakh",
  "₹25 – 50 lakh",
  "₹50 lakh – 1 crore",
  "Above ₹1 crore",
  "Not decided yet",
];

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}): React.ReactElement {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select className={styles.select}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function ThankYou(): React.ReactElement {
  return (
    <div className={styles.thanks}>
      <span className={styles.thanksScript}>Thank you</span>
      <p className={styles.thanksBody}>
        Your note is with the studio. We will write back within two working days
        — usually sooner.
      </p>
    </div>
  );
}

/** The contact page enquiry form. Self-contained: no overlay, its own submit
 *  state. Swap the `onSubmit` body for a real endpoint when the backend lands. */
export function ContactForm(): React.ReactElement {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trap = new FormData(e.currentTarget).get("company");
    if (typeof trap === "string" && trap.length > 0) return;
    setSent(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.kicker}>Enquiry</span>
        <h2 className={styles.title}>Tell us about your celebration</h2>
      </div>

      {sent ? (
        <ThankYou />
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Your name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Aranya &amp; Kabir"
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Phone</span>
            <input
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              placeholder="+91 98XXX XXXXX"
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Guest count</span>
            <input
              type="number"
              name="guests"
              placeholder="250"
              className={styles.input}
            />
          </label>
          <SelectField label="Event type" options={EVENT_TYPES} />
          <SelectField label="Event timeline" options={TIMELINES} />
          <SelectField label="Budget (INR)" options={BUDGETS} />
          <label className={styles.field}>
            <span className={styles.label}>Preferred location</span>
            <input
              type="text"
              name="location"
              placeholder="Udaipur, or open to suggestions"
              className={styles.input}
            />
          </label>
          <label className={`${styles.field} ${styles.fieldWide}`}>
            <span className={styles.label}>Anything we should know</span>
            <textarea
              name="message"
              rows={3}
              placeholder="How you met, what you are imagining, what you would rather avoid."
              className={styles.textarea}
            />
          </label>

          <label className={styles.honeypot} aria-hidden="true">
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>

          <div className={styles.foot}>
            <span className={styles.footNote}>
              Prefer email? Write straight to{" "}
              <a href="mailto:hello@theseventhvow.com" className={styles.footLink}>
                hello@theseventhvow.com
              </a>
              .
            </span>
            <button type="submit" className={styles.submit}>
              Send Enquiry
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

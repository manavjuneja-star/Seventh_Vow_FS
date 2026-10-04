"use client";

import { type FormEvent, useState } from "react";

import styles from "./ContactForm.module.css";

const BUDGETS = [
  "₹50 lakh – 1 crore",
  "₹1 – 2 crore",
  "Above ₹2 crore",
  "Not decided yet",
];

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}): React.ReactElement {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select name={name} className={styles.select}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TimelineField(): React.ReactElement {
  const [undecided, setUndecided] = useState(false);
  return (
    <div className={styles.field}>
      <span className={styles.label}>Event timeline</span>
      <input
        type="date"
        name="timeline"
        disabled={undecided}
        required={!undecided}
        className={styles.input}
      />
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={undecided}
          onChange={(e) => setUndecided(e.target.checked)}
        />
        Date not decided yet
      </label>
      {undecided && <input type="hidden" name="timeline" value="Not decided yet" />}
    </div>
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
 *  state. Posts to `/api/enquiry`, which emails the studio. */
export function ContactForm(): React.ReactElement {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const trap = data.get("company");
    if (typeof trap === "string" && trap.length > 0) return;

    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          eventType: data.get("eventType"),
          timeline: data.get("timeline"),
          budget: data.get("budget"),
          guests: data.get("guests"),
          location: data.get("location"),
          message: data.get("message"),
          company: trap,
          source: "contact-page",
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
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
            <span className={styles.label}>Your name or couple name</span>
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
          <label className={styles.field}>
            <span className={styles.label}>Event type</span>
            <input
              type="text"
              name="eventType"
              required
              placeholder="Wedding, Sangeet, Reception..."
              className={styles.input}
            />
          </label>
          <TimelineField />
          <SelectField label="Budget (INR)" name="budget" options={BUDGETS} />
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

          {error && (
            <p className={styles.formError} role="alert">
              Something went wrong sending that — please try again, or write
              straight to{" "}
              <a href="mailto:info@theseventhvowweddings.com" className={styles.footLink}>
                info@theseventhvowweddings.com
              </a>
              .
            </p>
          )}

          <div className={styles.foot}>
            <span className={styles.footNote}>
              Prefer email? Write straight to{" "}
              <a href="mailto:info@theseventhvowweddings.com" className={styles.footLink}>
                info@theseventhvowweddings.com
              </a>
              .
            </span>
            <button type="submit" className={styles.submit} disabled={sending}>
              {sending ? "Sending…" : "Send Enquiry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

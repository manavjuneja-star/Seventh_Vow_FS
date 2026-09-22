import { Resend } from "resend";

/**
 * Enquiry form email delivery.
 *
 * Requires `RESEND_API_KEY` (server-only env var) — sign up at resend.com,
 * verify the sending domain (theseventhvowweddings.com) there, then set
 * `ENQUIRY_FROM_EMAIL` to an address on that verified domain (e.g.
 * enquiries@theseventhvowweddings.com). Until the domain is verified, Resend
 * will only deliver to the account's own login email, using their shared
 * `onboarding@resend.dev` sender — fine for testing, not for production.
 *
 * `ENQUIRY_TO_EMAIL` defaults to the studio inbox given for this feature;
 * override it in the environment rather than editing code if it ever changes.
 */

const TO_EMAIL = process.env.ENQUIRY_TO_EMAIL || "manavjuneja@theseventhvowweddings.com";
const FROM_EMAIL = process.env.ENQUIRY_FROM_EMAIL || "onboarding@resend.dev";

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  eventType?: string;
  timeline?: string;
  budget?: string;
  guests?: string;
  location?: string;
  message?: string;
  source: "contact-page" | "modal";
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#6E4642;font-size:13px;white-space:nowrap;vertical-align:top;"><strong>${label}</strong></td><td style="padding:6px 0;color:#2B2422;font-size:14px;">${escapeHtml(value)}</td></tr>`;
}

function buildHtml(payload: EnquiryPayload): string {
  const rows = [
    row("Name", payload.name),
    row("Phone", payload.phone),
    row("Email", payload.email),
    row("Event type", payload.eventType),
    row("Timeline", payload.timeline),
    row("Budget", payload.budget),
    row("Guest count", payload.guests),
    row("Preferred location", payload.location),
  ]
    .filter(Boolean)
    .join("");

  const messageBlock = payload.message
    ? `<p style="margin:18px 0 0;color:#2B2422;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`
    : "";

  return `
    <div style="font-family:Georgia,serif;max-width:520px;">
      <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#A9782B;margin:0 0 10px;">
        New enquiry — ${payload.source === "modal" ? "site-wide form" : "contact page"}
      </p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
      ${messageBlock}
    </div>
  `;
}

function buildText(payload: EnquiryPayload): string {
  return [
    `New enquiry (${payload.source})`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.eventType ? `Event type: ${payload.eventType}` : "",
    payload.timeline ? `Timeline: ${payload.timeline}` : "",
    payload.budget ? `Budget: ${payload.budget}` : "",
    payload.guests ? `Guest count: ${payload.guests}` : "",
    payload.location ? `Preferred location: ${payload.location}` : "",
    payload.message ? `\n${payload.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendEnquiryEmail(payload: EnquiryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set — see src/lib/email.ts for setup notes.",
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `The Seventh Vow — Enquiries <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.name}`,
    html: buildHtml(payload),
    text: buildText(payload),
  });

  if (error) {
    throw new Error(error.message);
  }
}

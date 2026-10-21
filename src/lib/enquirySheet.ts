import type { EnquiryPayload } from "@/lib/email";

/**
 * Permanent backup of every enquiry: a row in a Google Sheet, written through a
 * small Google Apps Script web app (free; script and steps are in
 * `docs/ENQUIRY_SHEET_SETUP.md`).
 *
 * Set two server-only env vars to switch it on; with either missing this does
 * nothing and returns false:
 *   ENQUIRY_SHEET_URL     the Apps Script "web app" URL
 *   ENQUIRY_SHEET_SECRET  any long random text, the same one pasted into the script
 */
export async function saveEnquiryToSheet(payload: EnquiryPayload): Promise<boolean> {
  const url = process.env.ENQUIRY_SHEET_URL;
  const secret = process.env.ENQUIRY_SHEET_SECRET;
  if (!url || !secret) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...payload }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    return res.ok;
  } catch (err) {
    console.error("enquiry sheet backup failed", err);
    return false;
  }
}

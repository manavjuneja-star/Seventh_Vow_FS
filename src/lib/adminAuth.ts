import { randomInt, timingSafeEqual } from "crypto";

import { readJson, writeJson } from "@/lib/repo/store";

/**
 * Basic email + OTP admin auth — no password, one allowed email
 * (`ADMIN_EMAIL`), a 6-digit code emailed via Resend and checked against
 * `content/_admin-otp.json` (same JSON-file caveat as the rest of the repo
 * layer: local-dev only until this becomes Cognito, per the admin-panel
 * spec). This file uses Node's `crypto` and is only ever imported from API
 * routes (Node runtime) — the Edge-safe session-cookie signing that
 * `middleware.ts` needs lives in `adminSession.ts` instead.
 */

import { isAllowedAdminEmail } from "@/lib/adminSession";

export { ADMIN_SESSION_COOKIE, createSessionCookieValue, isAllowedAdminEmail } from "@/lib/adminSession";

const OTP_FILE = "_admin-otp.json";
const OTP_TTL_MS = 10 * 60 * 1000;

type OtpRecord = { email: string; code: string; expiresAt: number };

export async function requestOtp(email: string): Promise<void> {
  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const record: OtpRecord = {
    email: email.toLowerCase(),
    code,
    expiresAt: Date.now() + OTP_TTL_MS,
  };
  await writeJson(OTP_FILE, record);

  const { sendOtpEmail } = await import("@/lib/email");
  await sendOtpEmail(email, code);
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  if (!isAllowedAdminEmail(email)) return false;

  const record = await readJson<OtpRecord | null>(OTP_FILE, null);
  if (!record) return false;
  if (record.email !== email.toLowerCase()) return false;
  if (Date.now() > record.expiresAt) return false;

  const a = Buffer.from(record.code);
  const b = Buffer.from(code);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  // One-time use.
  await writeJson(OTP_FILE, null);
  return true;
}

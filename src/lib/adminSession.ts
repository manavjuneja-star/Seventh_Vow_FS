/**
 * Session-cookie signing — split out from `adminAuth.ts` because this file
 * is imported by `middleware.ts`, which runs on the Edge runtime and can't
 * bundle Node's `crypto` module. Web Crypto (`crypto.subtle`) works in both
 * Edge and Node 20+, so everything here uses that instead.
 */

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const ADMIN_SESSION_COOKIE = "sv_admin_session";

export function isAllowedAdminEmail(email: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false;
  return email.trim().toLowerCase() === adminEmail.toLowerCase();
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return secret;
}

async function getKey(): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export async function createSessionCookieValue(email: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const value = `${email.toLowerCase()}:${expiresAt}`;
  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return `${value}:${toHex(signature)}`;
}

/** For `/api/admin/*` route handlers — `middleware.ts` only gates `/admin`
 *  pages, not the API routes those pages call, so every mutation route
 *  checks this itself. Reads the cookie straight off the request rather
 *  than via `next/headers` so it works the same in any route handler. */
export async function requireAdminSession(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const value = match ? decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1)) : undefined;
  return verifySessionCookieValue(value);
}

export async function verifySessionCookieValue(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;
  const parts = cookieValue.split(":");
  if (parts.length !== 3) return false;
  const [email, expiresAtRaw, signatureHex] = parts;

  const signatureBytes = fromHex(signatureHex);
  if (!signatureBytes) return false;

  const key = await getKey();
  const value = `${email}:${expiresAtRaw}`;
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    new TextEncoder().encode(value),
  );
  if (!valid) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return isAllowedAdminEmail(email);
}

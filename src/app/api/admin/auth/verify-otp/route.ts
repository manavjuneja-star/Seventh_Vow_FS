import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  createSessionCookieValue,
  isAllowedAdminEmail,
  verifyOtp,
} from "@/lib/adminAuth";

export async function POST(request: Request): Promise<NextResponse> {
  let body: { email?: unknown; code?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!email || !code) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!isAllowedAdminEmail(email) || !(await verifyOtp(email, code))) {
    return NextResponse.json({ error: "invalid_code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, await createSessionCookieValue(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

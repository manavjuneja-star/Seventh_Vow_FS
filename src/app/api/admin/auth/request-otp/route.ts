import { NextResponse } from "next/server";

import { isAllowedAdminEmail, requestOtp } from "@/lib/adminAuth";

export async function POST(request: Request): Promise<NextResponse> {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return NextResponse.json({ error: "missing_email" }, { status: 400 });
  }

  // Same response whether or not the email is the admin's — don't let this
  // endpoint be used to probe which email is valid.
  if (isAllowedAdminEmail(email)) {
    try {
      await requestOtp(email);
    } catch (err) {
      console.error("admin otp send failed", err);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

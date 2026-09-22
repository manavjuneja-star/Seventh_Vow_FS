import { NextResponse } from "next/server";

import { sendEnquiryEmail, type EnquiryPayload } from "@/lib/email";

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function isHoneypotFilled(body: Record<string, unknown>): boolean {
  return typeof body.company === "string" && body.company.trim().length > 0;
}

function parsePayload(body: Record<string, unknown>): EnquiryPayload | null {
  const name = asString(body.name);
  const phone = asString(body.phone);
  const email = asString(body.email);
  if (!name || !phone || !email) return null;

  return {
    name,
    phone,
    email,
    eventType: asString(body.eventType),
    timeline: asString(body.timeline),
    budget: asString(body.budget),
    guests: asString(body.guests),
    location: asString(body.location),
    message: asString(body.message),
    source: body.source === "modal" ? "modal" : "contact-page",
  };
}

/** Both enquiry forms (the site-wide modal and the /contact page) POST here.
 *  Public route — no auth, this is the front door for a stranger's first
 *  message to the studio. */
export async function POST(request: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: a real visitor never fills this hidden field.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  try {
    await sendEnquiryEmail(payload);
  } catch (err) {
    console.error("enquiry email failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

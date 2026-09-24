import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { addVenue, type Venue } from "@/lib/destinations";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let venue: Venue;
  try {
    venue = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!venue.name || !venue.image) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const destination = await addVenue(params.slug, venue);
  if (!destination) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ destination });
}

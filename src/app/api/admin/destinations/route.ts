import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { createDestination, type Destination } from "@/lib/destinations";

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let input: Omit<Destination, "slug">;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!input.name || !input.region || !input.category || !input.image || !input.blurb) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const destination = await createDestination(input);
  return NextResponse.json({ destination });
}

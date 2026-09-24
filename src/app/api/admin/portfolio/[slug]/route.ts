import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { updatePortfolioEntry } from "@/lib/portfolio";

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let patch: Record<string, unknown>;
  try {
    patch = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const updated = await updatePortfolioEntry(params.slug, patch);
  if (!updated) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ entry: updated });
}

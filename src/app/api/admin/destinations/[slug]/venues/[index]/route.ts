import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { deleteVenue, updateVenue, type Venue } from "@/lib/destinations";

type Params = { params: { slug: string; index: string } };

export async function PATCH(request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let patch: Partial<Venue>;
  try {
    patch = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const index = Number(params.index);
  const destination = await updateVenue(params.slug, index, patch);
  if (!destination) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ destination });
}

export async function DELETE(request: Request, { params }: Params): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const index = Number(params.index);
  const destination = await deleteVenue(params.slug, index);
  if (!destination) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ destination });
}

import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { deletePost, updatePost } from "@/lib/blog";

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

  const updated = await updatePost(params.slug, patch);
  if (!updated) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ post: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const ok = await deletePost(params.slug);
  if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

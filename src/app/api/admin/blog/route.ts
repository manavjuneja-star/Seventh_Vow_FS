import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";
import { createPost, type BlogPost } from "@/lib/blog";

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let input: Omit<BlogPost, "slug">;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!input.title || !input.format || !input.content) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const post = await createPost(input);
  return NextResponse.json({ post });
}

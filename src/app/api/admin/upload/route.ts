import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/adminSession";

/** Shared image upload for all three admin sections. Saves into
 *  `public/images/uploads/` and returns the public URL to store on the
 *  entry/venue/post. Same filesystem caveat as `repo/store.ts`: this is a
 *  local-dev stand-in for S3 — writes here don't persist on Vercel. */

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 10 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requireAdminSession(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const ext = EXT_BY_TYPE[file.type];
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "images", "uploads");
  await fs.mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/images/uploads/${filename}` });
}

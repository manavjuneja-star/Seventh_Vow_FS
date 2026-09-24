import { promises as fs } from "fs";
import path from "path";

/**
 * Generic JSON-file content store — the stand-in data layer until the AWS
 * backend (DynamoDB, per the admin-panel spec) is wired up. Reads/writes
 * `content/<file>.json` at the repo root.
 *
 * IMPORTANT — this only works where the filesystem is writable and
 * persistent: local dev, or a traditional always-on server. **It will not
 * persist writes on Vercel** (or any serverless host) — the filesystem
 * there is read-only outside `/tmp`, and `/tmp` itself is wiped between
 * invocations/deploys. Admin edits made against a Vercel deployment will
 * appear to succeed and then vanish. This is expected and fine for
 * developing/demoing the admin panel locally; swap these functions for
 * DynamoDB calls (same signatures) before relying on it in production.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(CONTENT_DIR, file);
  const tmpPath = `${filePath}.${Date.now()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}

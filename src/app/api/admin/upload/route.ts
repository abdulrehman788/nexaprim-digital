import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import sharp from "sharp";

import {
  assertAdminApi,
  assertRateLimit,
} from "@/lib/security/guards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

function sniffMime(buf: Buffer): string | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (
    buf.length >= 6 &&
    (buf.toString("ascii", 0, 6) === "GIF87a" || buf.toString("ascii", 0, 6) === "GIF89a")
  ) {
    return "image/gif";
  }
  return null;
}

/** Re-encode to strip EXIF / polyglots. Animated GIF kept as sanitized WebP still. */
async function sanitizeImage(buffer: Buffer, mime: string): Promise<{ data: Buffer; ext: string; mime: string }> {
  if (mime === "image/gif") {
    // Convert GIF to WebP to neutralize scriptable GIF payloads while keeping a web-safe format.
    const data = await sharp(buffer, { animated: true })
      .rotate()
      .webp({ quality: 82 })
      .toBuffer();
    return { data, ext: "webp", mime: "image/webp" };
  }

  const pipeline = sharp(buffer).rotate().resize({
    width: 2400,
    height: 2400,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (mime === "image/png") {
    const data = await pipeline.png({ compressionLevel: 8 }).toBuffer();
    return { data, ext: "png", mime: "image/png" };
  }

  if (mime === "image/webp") {
    const data = await pipeline.webp({ quality: 82 }).toBuffer();
    return { data, ext: "webp", mime: "image/webp" };
  }

  const data = await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  return { data, ext: "jpg", mime: "image/jpeg" };
}

export async function POST(request: Request) {
  const denied = await assertAdminApi();
  if (denied) return denied;

  const limited = assertRateLimit(request, "admin-upload", 20, 15 * 60 * 1000);
  if (limited) return limited;

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "Missing image file" }, { status: 400 });
    }

    // Some browsers omit File.type for certain formats — still accept Blobs with size.
    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const declared =
      file.type && ALLOWED.has(file.type) ? file.type : null;
    const sniffed = sniffMime(buffer) ?? declared;
    if (!sniffed || !ALLOWED.has(sniffed)) {
      return NextResponse.json(
        {
          error:
            "Only JPEG, PNG, WebP, or GIF images are allowed. Convert HEIC/AVIF to JPG or PNG first.",
        },
        { status: 400 },
      );
    }

    const sanitized = await sanitizeImage(buffer, sniffed);
    const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${sanitized.ext}`;
    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, name), sanitized.data);

    const url = `/images/uploads/${name}`;
    return NextResponse.json({
      url,
      mime: sanitized.mime,
      size: sanitized.data.byteLength,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to upload image" }, { status: 500 });
  }
}

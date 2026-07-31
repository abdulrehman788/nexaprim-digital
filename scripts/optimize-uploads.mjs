/**
 * Re-encode existing public/images/uploads to WebP and rewrite DB references.
 * Run: node scripts/optimize-uploads.mjs
 */
import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaClient } from "@prisma/client";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const uploadsDir = path.join(root, "public", "images", "uploads");
const MAX_EDGE = 1600;
const WEBP_QUALITY = 74;

const prisma = new PrismaClient();

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext)) return null;

  const base = path.basename(filePath, ext);
  const outName = `${base}.webp`;
  const outPath = path.join(uploadsDir, outName);
  const input = await readFile(filePath);

  const data = await sharp(input, { animated: false, failOn: "none" })
    .rotate()
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer();

  await writeFile(outPath, data);

  const oldUrl = `/images/uploads/${path.basename(filePath)}`;
  const newUrl = `/images/uploads/${outName}`;

  if (filePath !== outPath) {
    try {
      await unlink(filePath);
    } catch {
      // ignore
    }
  }

  return {
    oldUrl,
    newUrl,
    before: input.byteLength,
    after: data.byteLength,
  };
}

function rewrite(text, map) {
  if (!text) return text ?? null;
  let next = text;
  for (const [from, to] of map) {
    if (from !== to) next = next.split(from).join(to);
  }
  return next;
}

async function main() {
  const files = (await readdir(uploadsDir)).filter((f) => !f.startsWith("."));
  const map = new Map();
  let saved = 0;

  for (const file of files) {
    const result = await optimizeFile(path.join(uploadsDir, file));
    if (!result) continue;
    map.set(result.oldUrl, result.newUrl);
    const delta = result.before - result.after;
    saved += Math.max(0, delta);
    console.log(
      `${path.basename(result.oldUrl)} → ${path.basename(result.newUrl)} ` +
        `(${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB)`,
    );
  }

  if (map.size === 0) {
    console.log("No images to optimize.");
    return;
  }

  const posts = await prisma.blogPost.findMany();
  for (const post of posts) {
    const coverImage = rewrite(post.coverImage, map);
    const content = rewrite(post.content, map);
    if (coverImage !== post.coverImage || content !== post.content) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { coverImage, content },
      });
      console.log(`Updated blog post ${post.slug}`);
    }
  }

  const stories = await prisma.caseStudy.findMany();
  for (const story of stories) {
    const image = rewrite(story.image, map);
    if (image !== story.image) {
      await prisma.caseStudy.update({
        where: { id: story.id },
        data: { image },
      });
      console.log(`Updated story ${story.slug}`);
    }
  }

  console.log(`Done. Saved ~${(saved / 1024).toFixed(0)}KB on disk.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

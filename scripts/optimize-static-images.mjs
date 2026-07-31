/**
 * Compress static public images (industries, clients, hero extras) to WebP.
 * Does not rewrite imports — keeps original files and writes .webp siblings
 * when a conversion target is listed below. Prefer updating data paths after.
 *
 * Run: node scripts/optimize-static-images.mjs
 */
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

/** [relativePath, maxEdge, quality] */
const TARGETS = [
  ["images/industries/ecommerce.jpg", 1200, 72],
  ["images/industries/education.jpg", 1200, 72],
  ["images/industries/healthcare.jpg", 1200, 72],
  ["images/industries/hospitality.jpg", 1200, 72],
  ["images/industries/real-estate.jpg", 1200, 72],
  ["images/industries/restaurants.jpg", 1200, 72],
  ["images/hero/mountain-landscape.jpg", 1200, 72],
  ["images/hero/hero-devices-hd.png", 1400, 72],
  ["images/clients/opportunity-station.png", 800, 70],
  ["images/clients/opportunity-station-transparent.png", 800, 70],
  ["images/clients/opportunity-station-light.png", 800, 70],
  ["images/clients/nexus-light.png", 800, 70],
  ["images/clients/nexus.png", 800, 70],
  ["images/clients/wlpi-hd.png", 800, 70],
  ["images/clients/wlpi-light.png", 800, 70],
  ["images/clients/wlpi.png", 800, 70],
  ["images/clients/unity-circle.png", 600, 70],
];

async function convert(rel, maxEdge, quality) {
  const inputPath = path.join(publicDir, rel);
  const outRel = rel.replace(/\.(jpe?g|png)$/i, ".webp");
  const outPath = path.join(publicDir, outRel);

  try {
    await stat(inputPath);
  } catch {
    console.log(`skip missing ${rel}`);
    return;
  }

  const input = await readFile(inputPath);
  await mkdir(path.dirname(outPath), { recursive: true });
  const data = await sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toBuffer();

  await writeFile(outPath, data);
  console.log(
    `${rel} → ${outRel} (${(input.byteLength / 1024).toFixed(0)}KB → ${(data.byteLength / 1024).toFixed(0)}KB)`,
  );
}

async function main() {
  for (const [rel, maxEdge, quality] of TARGETS) {
    await convert(rel, maxEdge, quality);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

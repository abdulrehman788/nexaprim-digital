import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const files = [
  "hero-devices.png",
  "hero-devices-hd.png",
  "hero-devices-hd@2x.png",
];

function isBackgroundPixel(r, g, b, tolerance = 28) {
  return r <= tolerance && g <= tolerance && b <= tolerance;
}

function removeBlackBackground(buffer, width, height, channels) {
  const pixels = Buffer.from(buffer);
  const visited = new Uint8Array(width * height);
  const queue = [];

  for (const [x, y] of [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ]) {
    queue.push([x, y]);
  }

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const index = y * width + x;

    if (x < 0 || y < 0 || x >= width || y >= height || visited[index]) {
      continue;
    }

    const offset = index * channels;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];

    if (!isBackgroundPixel(r, g, b)) {
      continue;
    }

    visited[index] = 1;
    pixels[offset + 3] = 0;

    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  return pixels;
}

for (const file of files) {
  const inputPath = path.join(rootDir, "public/images/hero", file);

  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping missing file: ${file}`);
    continue;
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cleaned = removeBlackBackground(
    data,
    info.width,
    info.height,
    info.channels,
  );

  await sharp(cleaned, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png({ compressionLevel: 2, effort: 9 })
    .toFile(inputPath);

  const meta = await sharp(inputPath).metadata();
  console.log(`Updated ${file}: ${meta.width}x${meta.height}, hasAlpha=${meta.hasAlpha}`);
}

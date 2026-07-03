import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const inputPath = path.join(rootDir, "public/images/hero/hero-composition.png");
const outputPng = path.join(rootDir, "public/images/hero/hero-composition-hd.png");

const UPSCALE = 2;

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function isBackground(r, g, b, a) {
  return a < 8 || luminance(r, g, b) < 22;
}

function isHaloPixel(r, g, b, a) {
  const lum = luminance(r, g, b);
  const sat = saturation(r, g, b);

  if (lum > 228 && sat < 0.1) {
    return true;
  }

  if (lum > 145 && sat < 0.11 && a < 252) {
    return true;
  }

  return lum > 105 && sat < 0.07 && a < 235;
}

function index(x, y, width, channels) {
  return (y * width + x) * channels;
}

function readPixel(pixels, x, y, width, height, channels) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return null;
  }

  const i = index(x, y, width, channels);
  return {
    r: pixels[i],
    g: pixels[i + 1],
    b: pixels[i + 2],
    a: pixels[i + 3],
  };
}

function touchesBackground(pixels, x, y, width, height, channels) {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const pixel = readPixel(pixels, x + dx, y + dy, width, height, channels);
      if (!pixel) {
        return true;
      }

      if (isBackground(pixel.r, pixel.g, pixel.b, pixel.a)) {
        return true;
      }
    }
  }

  return false;
}

function removeHalos(buffer, width, height, channels) {
  const pixels = Buffer.from(buffer);
  const cleaned = Buffer.from(buffer);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = index(x, y, width, channels);
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (!isHaloPixel(r, g, b, a)) {
        continue;
      }

      if (!touchesBackground(pixels, x, y, width, height, channels)) {
        continue;
      }

      cleaned[i] = 0;
      cleaned[i + 1] = 0;
      cleaned[i + 2] = 0;
      cleaned[i + 3] = 255;
    }
  }

  return cleaned;
}

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const cleaned = removeHalos(
  removeHalos(data, info.width, info.height, info.channels),
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
  .median(1)
  .resize(info.width * UPSCALE, info.height * UPSCALE, {
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.85, m1: 0.6, m2: 0.3 })
  .normalise()
  .png({ compressionLevel: 2, effort: 9 })
  .toFile(outputPng);

const pngMeta = await sharp(outputPng).metadata();
const pngSize = fs.statSync(outputPng).size;

console.log(
  `HD PNG: ${info.width}x${info.height} -> ${pngMeta.width}x${pngMeta.height} (${Math.round(pngSize / 1024)} KB)`,
);

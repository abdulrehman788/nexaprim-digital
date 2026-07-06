/**
 * Run Lighthouse against the production server.
 * Usage: npm run build && npm run start (in one terminal), then npm run lighthouse
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.LIGHTHOUSE_URL ?? "http://localhost:3000";
const paths = ["/", "/services", "/reviews", "/book", "/contact"];

const urls = paths.map((path) => `${baseUrl}${path}`);

const result = spawnSync(
  "npx",
  [
    "lighthouse",
    ...urls,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless",
    "--output=html",
    "--output-path=./lighthouse-report",
    "--quiet",
  ],
  {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true,
  },
);

process.exit(result.status ?? 1);

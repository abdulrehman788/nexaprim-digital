import { rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.PORT ?? "3000";
const shouldClean =
  process.argv.includes("--clean") || process.env.DEV_CLEAN === "1";
const useWebpack = process.argv.includes("--webpack");

for (const port of [3000, 3001, 3002, 3003]) {
  try {
    execSync(
      `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
      { stdio: "ignore" },
    );
  } catch {
    // Port was not in use.
  }
}

function removeDir(relativePath) {
  try {
    rmSync(join(projectRoot, relativePath), { recursive: true, force: true });
  } catch {
    // Directory did not exist.
  }
}

if (shouldClean) {
  removeDir(".next");
  console.log("Cleared .next cache");
} else {
  // Drop stale webpack/turbopack artifacts that cause "reading 'call'" chunk errors.
  removeDir(".next/cache");
  removeDir(".next/static/chunks");
  removeDir(".next/static/webpack");
}

const nextCli = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const devArgs = ["dev", "-p", PORT];

if (!useWebpack) {
  devArgs.push("--turbo");
}

console.log(`Starting Next.js on http://localhost:${PORT}`);
if (shouldClean) {
  console.log("Clean start: close ALL localhost:3000 tabs, wait for Ready, then open a new tab.");
} else if (useWebpack) {
  console.log("Webpack dev server. Close old tabs after restarts or hard-refresh (Ctrl+Shift+R).");
} else {
  console.log("Turbopack dev server. Close old tabs after restarts or hard-refresh (Ctrl+Shift+R).");
}

const child = spawn(process.execPath, [nextCli, ...devArgs], {
  stdio: "inherit",
  cwd: projectRoot,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

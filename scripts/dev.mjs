import { rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.PORT ?? "3000";
const shouldClean =
  process.argv.includes("--clean") || process.env.DEV_CLEAN === "1";

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

if (shouldClean) {
  try {
    rmSync(join(projectRoot, ".next"), { recursive: true, force: true });
    console.log("Cleared .next cache");
  } catch {
    // No cache to clear.
  }
}

const nextCli = join(projectRoot, "node_modules", "next", "dist", "bin", "next");

console.log(`Starting Next.js on http://localhost:${PORT}`);
if (shouldClean) {
  console.log("Clean start: close ALL localhost:3000 tabs, wait for Ready, then open a new tab.");
} else {
  console.log("Wait for Ready before opening the site. Stale tabs cause 404/MIME errors.");
}

const child = spawn(process.execPath, [nextCli, "dev", "-p", PORT], {
  stdio: "inherit",
  cwd: projectRoot,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

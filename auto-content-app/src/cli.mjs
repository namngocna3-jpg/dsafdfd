// Chay tay: node src/cli.mjs <duong-dan-file> [title]
import path from "node:path";
import fs from "node:fs";
import { generateWithFallback } from "./orchestrator.mjs";

const file = process.argv[2];
if (!file) {
  console.error("Dung: node src/cli.mjs <duong-dan-file> [title]");
  process.exit(1);
}
const title = process.argv[3] || path.basename(file).replace(/\.[^.]+$/, "");
// moi job 1 thu muc rieng de chay hang loat khong de nhau
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(process.env.OUT_DIR || "./out", stamp);
fs.mkdirSync(outDir, { recursive: true });

try {
  const res = await generateWithFallback({ filePath: path.resolve(file), title, outDir });
  console.log("\n=== KET QUA ===");
  console.log(JSON.stringify(res, null, 2));
} catch (e) {
  console.error("\n❌ " + e.message);
  process.exit(1);
}

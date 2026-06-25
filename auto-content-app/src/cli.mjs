// Chay tay:
//   node src/cli.mjs <file> [title] [--kinds=video,mindmap,pptx,pdf,image]
// Vi du:
//   node src/cli.mjs bai.pdf "Bai 1" --kinds=video
//   node src/cli.mjs giaotrinh.txt --kinds=pptx,pdf,mindmap   (file co marker -> chay hang loat)
import path from "node:path";
import fs from "node:fs";
import { generateBatch } from "./orchestrator.mjs";

const argv = process.argv.slice(2);
const flags = argv.filter((a) => a.startsWith("--"));
const pos = argv.filter((a) => !a.startsWith("--"));

const file = pos[0];
if (!file) {
  console.error("Dung: node src/cli.mjs <file> [title] [--kinds=video,mindmap,pptx,pdf,image]");
  process.exit(1);
}
const title = pos[1] || path.basename(file).replace(/\.[^.]+$/, "");
const kindsFlag = (flags.find((f) => f.startsWith("--kinds=")) || "").slice("--kinds=".length);

// moi job 1 thu muc rieng de chay hang loat khong de nhau
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(process.env.OUT_DIR || "./out", stamp);
fs.mkdirSync(outDir, { recursive: true });

try {
  const res = await generateBatch({
    filePath: path.resolve(file),
    title,
    kinds: kindsFlag || undefined,
    outDir,
  });
  console.log("\n=== KET QUA ===");
  console.log(JSON.stringify(res, null, 2));
  if (!res.ok) {
    console.error(`\n⚠ Con thieu: ${res.missing.join(", ")}`);
    process.exit(2);
  }
} catch (e) {
  console.error("\n❌ " + e.message);
  process.exit(1);
}

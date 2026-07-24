// Tien ich dung chung: chay tien trinh con (CLI), timeout, log, tai file ve local.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export const log = (...a) => console.log(`[${new Date().toISOString()}]`, ...a);

/** Chay 1 lenh CLI, tra ve {stdout, stderr}. Reject neu exit code != 0 hoac timeout. */
export function run(cmd, args, { cwd, env, timeoutMs = 0, input } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, env: { ...process.env, ...env } });
    let stdout = "";
    let stderr = "";
    let timer;
    if (timeoutMs) {
      timer = setTimeout(() => {
        child.kill("SIGKILL");
        reject(new Error(`Timeout ${timeoutMs}ms: ${cmd} ${args.join(" ")}`));
      }, timeoutMs);
    }
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("error", (e) => {
      if (timer) clearTimeout(timer);
      reject(new Error(`Khong chay duoc '${cmd}': ${e.message} (da cai chua? co trong PATH chua?)`));
    });
    child.on("close", (code) => {
      if (timer) clearTimeout(timer);
      if (code === 0) resolve({ stdout, stderr, code });
      else reject(new Error(`${cmd} thoat code ${code}: ${(stderr || stdout).slice(0, 500)}`));
    });
    if (input) child.stdin.end(input);
  });
}

/** Boc 1 promise voi timeout. */
export function withTimeout(promise, ms, label = "op") {
  if (!ms) return promise;
  let timer;
  const t = new Promise((_, rej) => {
    timer = setTimeout(() => rej(new Error(`${label} timeout ${ms}ms`)), ms);
  });
  return Promise.race([promise.finally(() => clearTimeout(timer)), t]);
}

/** Tim 1 id (uuid hoac chuoi dai) trong output CLI. Best-effort, chinh lai theo version neu can. */
export function parseId(text) {
  const uuid = text.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuid) return uuid[0];
  const labeled = text.match(/(?:notebook|artifact|id)[^\w]{0,3}([\w-]{8,})/i);
  return labeled ? labeled[1] : null;
}

/**
 * Bao dam co 1 file tren local de dua cho provider A/B (chay qua CLI, can file that).
 * - Neu da co filePath -> dung luon.
 * - Neu chi co fileUrl  -> tai ve outDir.
 * Tra ve duong dan file local (hoac null neu chi co driveFileId ma khong co cach tai).
 */
export async function ensureLocalFile({ filePath, fileUrl, title, outDir }) {
  if (filePath) return filePath;
  if (!fileUrl) return null; // chi co driveFileId: provider make tu lo, A/B se bao thieu file
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Tai file tu fileUrl loi HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = guessExt(res.headers.get("content-type"), fileUrl);
  const dest = path.join(outDir, `${sanitize(title) || "source"}${ext}`);
  await writeFile(dest, buf);
  log(`  da tai file nguon ve: ${dest} (${buf.length} bytes)`);
  return dest;
}

export function sanitize(s) {
  return (s || "").replace(/[^\w.-]+/g, "_").slice(0, 80);
}

function guessExt(contentType, url) {
  const fromUrl = (url.match(/\.(pdf|docx?|txt|md|pptx?)(?:[?#]|$)/i) || [])[1];
  if (fromUrl) return "." + fromUrl.toLowerCase();
  if (/pdf/i.test(contentType || "")) return ".pdf";
  if (/word|docx/i.test(contentType || "")) return ".docx";
  return ".bin";
}

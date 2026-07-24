// Bo nao: tach file -> segment, moi segment sinh cac kinds duoc chon, FALLBACK theo TUNG LOAI.
// Provider nao lam duoc loai nao thi lam; loai con thieu rot sang provider ke tiep.
import fs from "node:fs";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { withTimeout, ensureLocalFile, sanitize, log } from "./util.mjs";
import { normalizeKinds } from "./kinds.mjs";
import { loadSegments } from "./segments.mjs";
import notebooklmPy from "./providers/notebooklmPy.mjs";
import nlmCli from "./providers/nlmCli.mjs";
import surfsense from "./providers/surfsense.mjs";

const ALL = {
  "notebooklm-py": notebooklmPy,
  "notebooklm-mcp-cli": nlmCli,
  surfsense,
};

// Thu tu mac dinh: 2 ban NotebookLM (chat luong cao, de gay) truoc, SurfSense (on dinh) chot.
const ORDER = (process.env.PROVIDER_ORDER || "notebooklm-py,notebooklm-mcp-cli,surfsense")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const HEALTH_TIMEOUT = Number(process.env.HEALTH_TIMEOUT_MS || 30_000);
const GEN_TIMEOUT = Number(process.env.GEN_TIMEOUT_MS || 2_400_000); // 40 phut tong/provider

/** Health check 1 lan / provider / batch (cache lai cho cac segment sau). */
function makeHealthChecker() {
  const cache = new Map();
  return async (name) => {
    if (!cache.has(name)) {
      try {
        cache.set(name, await withTimeout(ALL[name].healthCheck(), HEALTH_TIMEOUT, `${name} health`));
      } catch {
        cache.set(name, false);
      }
    }
    return cache.get(name);
  };
}

/** Sinh 1 segment: lap qua provider, moi provider lam cac kind con thieu ma no ho tro. */
async function generateOne({ filePath, fileUrl, driveFileId, title, kinds, outDir }, healthy) {
  const remaining = new Set(kinds);
  const produced = {};
  const errors = [];

  for (const name of ORDER) {
    if (!remaining.size) break;
    const p = ALL[name];
    if (!p) {
      log(`⚠ khong co provider ten '${name}' — bo qua`);
      continue;
    }
    if (!p.enabled) continue;
    const want = [...remaining].filter((k) => p.supports(k));
    if (!want.length) continue;
    if (!(await healthy(name))) {
      log(`  ✗ ${name} khong khoe → bo qua (kinds: ${want.join(",")})`);
      errors.push(`${name}: unhealthy`);
      continue;
    }
    log(`→ ${name} sinh: ${want.join(", ")}`);
    try {
      const res = await withTimeout(
        p.generate({ filePath, fileUrl, driveFileId, title, outDir, kinds: want }),
        GEN_TIMEOUT,
        `${name} generate`
      );
      for (const [k, v] of Object.entries(res?.outputs || {})) {
        if (remaining.has(k)) {
          produced[k] = { provider: name, output: v };
          remaining.delete(k);
        }
      }
      const got = Object.keys(res?.outputs || {}).filter((k) => kinds.includes(k));
      log(`  ✓ ${name} xong: ${got.join(", ") || "(khong loai nao)"}`);
    } catch (e) {
      log(`  ✗ ${name} loi: ${e.message} → cac loai con thieu se thu provider ke tiep`);
      errors.push(`${name}: ${e.message}`);
    }
  }
  return { produced, missing: [...remaining], errors };
}

/**
 * Entry point: nhan { filePath|fileUrl|driveFileId, title, kinds, outDir }.
 * Tu tach segment (neu file text co marker) va chay tung segment.
 */
export async function generateBatch(input) {
  const kinds = normalizeKinds(input.kinds);
  const baseOut = input.outDir;

  // Tai file nguon ve local 1 lan (A/B + tach segment can file that).
  let localFile = null;
  try {
    localFile = await ensureLocalFile(input);
  } catch (e) {
    log(`⚠ khong tai duoc file nguon ve local: ${e.message} (make/rest van chay duoc qua fileUrl/driveFileId)`);
  }

  const segs = await loadSegments(localFile, { title: input.title, kinds });
  const multi = segs.length > 1;
  log(`Tong ${segs.length} segment, kinds yeu cau: ${kinds.join(", ")}`);

  const healthy = makeHealthChecker();
  const results = [];
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const segOut = multi ? path.join(baseOut, `seg-${String(i + 1).padStart(2, "0")}-${sanitize(s.title)}`) : baseOut;
    fs.mkdirSync(segOut, { recursive: true });

    let filePath = s.filePath || localFile;
    if (s.content != null) {
      filePath = path.join(segOut, "source.txt");
      await writeFile(filePath, s.content);
    }

    log(`\n=== Segment ${i + 1}/${segs.length}: "${s.title}" (kinds: ${s.kinds.join(", ")}) ===`);
    const one = await generateOne(
      { filePath, fileUrl: input.fileUrl, driveFileId: input.driveFileId, title: s.title, kinds: s.kinds, outDir: segOut },
      healthy
    );
    results.push({ title: s.title, requested: s.kinds, ...one });
  }

  const missing = results.flatMap((r) => r.missing.map((k) => `${r.title}:${k}`));
  return { ok: missing.length === 0, segments: results.length, kinds, results, missing };
}

// Tuong thich nguoc: ten cu.
export const generateWithFallback = generateBatch;

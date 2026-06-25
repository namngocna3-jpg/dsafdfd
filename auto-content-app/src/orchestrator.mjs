// Bo nao fallback: thu lan luot cac provider, cai nao loi -> nhay sang cai ke tiep.
import { withTimeout, ensureLocalFile, log } from "./util.mjs";
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

export async function generateWithFallback(input) {
  const errors = [];
  // Tai san file nguon ve local 1 lan (A/B can file that; che do make/surfsense dung fileUrl/driveFileId).
  let localFilePath = input.filePath;
  try {
    localFilePath = await ensureLocalFile(input);
  } catch (e) {
    log(`⚠ khong tai duoc file nguon ve local: ${e.message} (A/B se bao thieu file, make/rest van chay tiep)`);
  }
  const jobInput = { ...input, filePath: localFilePath };

  for (const name of ORDER) {
    const p = ALL[name];
    if (!p) {
      log(`⚠ khong co provider ten '${name}' — bo qua`);
      continue;
    }
    if (!p.enabled) {
      log(`• bo qua ${name} (ENABLE_* = false)`);
      continue;
    }
    log(`→ Thu provider: ${name}`);
    try {
      const healthy = await withTimeout(p.healthCheck(), HEALTH_TIMEOUT, `${name} health`);
      if (!healthy) {
        log(`  ✗ ${name} khong khoe (auth/host loi) → fallback`);
        errors.push(`${name}: unhealthy`);
        continue;
      }
      const res = await withTimeout(p.generate(jobInput), GEN_TIMEOUT, `${name} generate`);
      if (res?.ok) {
        log(`  ✓ ${name} THANH CONG`);
        return { provider: name, ...res };
      }
      errors.push(`${name}: tra ve not-ok`);
    } catch (e) {
      log(`  ✗ ${name} loi: ${e.message} → fallback`);
      errors.push(`${name}: ${e.message}`);
    }
  }
  const err = new Error("Tat ca provider deu that bai:\n - " + errors.join("\n - "));
  err.details = errors;
  throw err;
}

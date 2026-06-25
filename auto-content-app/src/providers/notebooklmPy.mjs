// Provider A: teng-lin/notebooklm-py  (goi qua CLI `notebooklm`)
// Yeu cau: pip install notebooklm-py + da `notebooklm login` (cookie Google) tren host co browser.
import path from "node:path";
import { run, parseId, log } from "../util.mjs";

const BIN = process.env.NOTEBOOKLM_PY_BIN || "notebooklm";
const GEN_TIMEOUT = Number(process.env.NLPY_GEN_TIMEOUT_MS || 1_800_000); // 30 phut/loai

// canonical kind -> { token CLI, duoi file tai ve }
const MAP = {
  video: { token: "video", ext: "mp4" },
  audio: { token: "audio", ext: "mp3" },
  mindmap: { token: "mind-map", ext: "json" },
  pptx: { token: "slide-deck", ext: "pptx" },
  pdf: { token: "slide-deck", ext: "pdf" }, // slide-deck tai ve dang pdf (best-effort, xem TODO)
  // image: NotebookLM khong sinh anh minh hoa rieng -> khong ho tro
};

export default {
  name: "notebooklm-py",
  get enabled() {
    return process.env.ENABLE_NOTEBOOKLM_PY !== "false";
  },
  supports(kind) {
    return !!MAP[kind];
  },

  async healthCheck() {
    try {
      const { stdout, stderr } = await run(BIN, ["auth", "check", "--test"], { timeoutMs: 30_000 });
      return /ok|valid|success|authenticated|logged/i.test(stdout + stderr);
    } catch (e) {
      log(`  notebooklm-py health fail: ${e.message}`);
      return false;
    }
  },

  // Sinh cac kinds duoc yeu cau trong 1 notebook. Loi tung kind -> bo qua kind do
  // (orchestrator se thu provider khac cho kind con thieu). Loi setup -> throw ca provider.
  async generate({ filePath, title, outDir, kinds }) {
    if (!filePath) throw new Error("notebooklm-py can filePath local (chua tai file nguon ve duoc)");
    const createOut = (await run(BIN, ["create", title], { timeoutMs: 60_000 })).stdout;
    const nbId = parseId(createOut);
    if (!nbId) throw new Error("Khong parse duoc notebook id: " + createOut.slice(0, 200));
    await run(BIN, ["use", nbId], { timeoutMs: 30_000 });
    await run(BIN, ["source", "add", filePath], { timeoutMs: 300_000 }); // index xong moi sinh

    const outputs = {};
    for (const kind of kinds) {
      const m = MAP[kind];
      if (!m) continue;
      try {
        await run(BIN, ["generate", m.token, "--wait"], { timeoutMs: GEN_TIMEOUT });
        const out = path.join(outDir, `${kind}.${m.ext}`);
        await run(BIN, ["download", m.token, out], { timeoutMs: 600_000 });
        outputs[kind] = out;
      } catch (e) {
        log(`    notebooklm-py bo qua kind '${kind}': ${e.message}`);
      }
    }
    return { ok: true, outputs };
  },
};

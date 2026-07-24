// Provider B: jacob-bd/notebooklm-mcp-cli  (goi qua CLI `nlm` — KHONG co REST)
// Yeu cau: cai nlm + da `nlm login` (cookie Google) tren host co browser.
import path from "node:path";
import { run, parseId, log } from "../util.mjs";

const BIN = process.env.NLM_BIN || "nlm";
const GEN_TIMEOUT = Number(process.env.NLM_GEN_TIMEOUT_MS || 1_800_000);

// canonical kind -> { token --type cua nlm, downloadable?, ext }
const MAP = {
  video: { token: "video", downloadable: true, ext: "mp4" },
  audio: { token: "audio", downloadable: true, ext: "mp3" },
  mindmap: { token: "mindmap", downloadable: false },
  pptx: { token: "slide", downloadable: false },
  pdf: { token: "slide", downloadable: false },
  // image: khong ho tro
};

export default {
  name: "notebooklm-mcp-cli",
  get enabled() {
    return process.env.ENABLE_NLM !== "false";
  },
  supports(kind) {
    return !!MAP[kind];
  },

  async healthCheck() {
    try {
      const { stdout, stderr } = await run(BIN, ["login", "--check"], { timeoutMs: 30_000 });
      return /ok|valid|logged in|authenticated/i.test(stdout + stderr);
    } catch (e) {
      log(`  nlm health fail: ${e.message}`);
      return false;
    }
  },

  async generate({ filePath, title, outDir, kinds }) {
    if (!filePath) throw new Error("notebooklm-mcp-cli can filePath local (chua tai file nguon ve duoc)");
    const nbOut = (await run(BIN, ["notebook", "create", title], { timeoutMs: 60_000 })).stdout;
    const nb = parseId(nbOut) || title; // nlm cho dung ten notebook lam tham chieu
    await run(BIN, ["source", "add", nb, "--file", filePath], { timeoutMs: 300_000 });

    const outputs = {};
    for (const kind of kinds) {
      const m = MAP[kind];
      if (!m) continue;
      try {
        const studioOut = (await run(BIN, ["studio", "create", nb, "--type", m.token], { timeoutMs: GEN_TIMEOUT })).stdout;
        const artifactId = parseId(studioOut);
        if (m.downloadable) {
          const out = path.join(outDir, `${kind}.${m.ext}`);
          await run(BIN, ["download", m.token, nb, artifactId, out], { timeoutMs: 600_000 });
          outputs[kind] = out;
        } else {
          // mindmap/slide: nlm chua chac co lenh download truc tiep -> giu artifact id de lay sau
          outputs[kind] = `artifact:${artifactId}`;
        }
      } catch (e) {
        log(`    nlm bo qua kind '${kind}': ${e.message}`);
      }
    }
    return { ok: true, outputs };
  },
};

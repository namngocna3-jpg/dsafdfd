// Provider A: teng-lin/notebooklm-py  (goi qua CLI `notebooklm`)
// Yeu cau: pip install notebooklm-py + da `notebooklm login` (cookie Google) tren host co browser.
import path from "node:path";
import { run, parseId, log } from "../util.mjs";

const BIN = process.env.NOTEBOOKLM_PY_BIN || "notebooklm";
const GEN_TIMEOUT = Number(process.env.NLPY_GEN_TIMEOUT_MS || 1_800_000); // 30 phut/loai

// canonical kind -> { gen: args lenh `generate`, dl: subcommand `download`, ext: duoi file }
// CLI 0.7.x: generate KHONG co --wait. mind-map note-backed la dong bo; video/audio/slide-deck
// tu poll den khi xong. image lay qua `infographic`.
const MAP = {
  video: { gen: ["video"], dl: "video", ext: "mp4" },
  audio: { gen: ["audio"], dl: "audio", ext: "mp3" },
  // pin note-backed (JSON dong bo); mac dinh se doi sang 'interactive' o v0.8.0
  mindmap: { gen: ["mind-map", "--kind", "note-backed"], dl: "mind-map", ext: "json" },
  pptx: { gen: ["slide-deck"], dl: "slide-deck", ext: "pptx" },
  pdf: { gen: ["slide-deck"], dl: "slide-deck", ext: "pdf" }, // download tu nhan dinh dang theo duoi file
  image: { gen: ["infographic"], dl: "infographic", ext: "png" }, // NotebookLM sinh anh qua infographic
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
      // `auth check` thoat code 0 khi da dang nhap (run() reject neu code != 0).
      const { stdout, stderr } = await run(BIN, ["auth", "check"], { timeoutMs: 30_000 });
      const out = stdout + stderr;
      // Chay duoc + khong co dau hieu loi ro rang = khoe.
      return !/not (authenticated|logged|signed)|no .*cookie|expired|invalid|fail/i.test(out);
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
        await run(BIN, ["generate", ...m.gen], { timeoutMs: GEN_TIMEOUT });
        const out = path.join(outDir, `${kind}.${m.ext}`);
        await run(BIN, ["download", m.dl, out], { timeoutMs: 600_000 });
        outputs[kind] = out;
      } catch (e) {
        log(`    notebooklm-py bo qua kind '${kind}': ${e.message}`);
      }
    }
    return { ok: true, outputs };
  },
};

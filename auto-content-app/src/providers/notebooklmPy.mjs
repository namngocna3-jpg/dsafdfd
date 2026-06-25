// Provider A: teng-lin/notebooklm-py  (goi qua CLI `notebooklm`)
// Yeu cau: pip install notebooklm-py + da `notebooklm login` (cookie Google) tren host co browser.
import path from "node:path";
import { run, parseId, log } from "../util.mjs";
import { renderMindmapHtml, renderMindmapMedia } from "../mindmaphtml.mjs";

const BIN = process.env.NOTEBOOKLM_PY_BIN || "notebooklm";
const GEN_TIMEOUT = Number(process.env.NLPY_GEN_TIMEOUT_MS || 1_800_000); // 30 phut/loai
// Ngon ngu dau ra (mac dinh NotebookLM la 'en' -> ep 'vi'). Cung set NOTEBOOKLM_HL=vi trong .env
// de cac loai khac (video/audio/slide) cung ra tieng Viet.
const LANG = process.env.NLM_LANG || process.env.NOTEBOOKLM_HL || "vi";

// Ten file ket qua dat theo title (= ten file input) de de phan biet khi automation.
// Bo duoi file nguon + ky tu pha duong dan, giu unicode/tieng Viet.
function baseName(title) {
  return (
    String(title || "ket-qua")
      .replace(/\.[a-z0-9]{1,5}$/i, "") // bo duoi .docx/.pdf/.txt...
      .replace(/[\/\\\n\r\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100) || "ket-qua"
  );
}

// canonical kind -> { gen: args lenh `generate`, dl: args lenh `download` (truoc duong dan), ext }
// CLI 0.7.x: generate mac dinh --no-wait -> phai them --wait de cho sinh xong moi download.
// mind-map note-backed la dong bo (khong can --wait). slide-deck download can --format.
const WT = process.env.NLM_WAIT_TIMEOUT || "1500"; // giay cho video/audio
const WS = process.env.NLM_WAIT_TIMEOUT_SHORT || "600"; // giay cho slide/infographic
const MAP = {
  video: { gen: ["video", "--wait", "--timeout", WT], dl: ["video"], ext: "mp4" },
  audio: { gen: ["audio", "--wait", "--timeout", WT], dl: ["audio"], ext: "mp3" },
  // note-backed (JSON dong bo); mac dinh se doi sang 'interactive' o v0.8.0
  mindmap: { gen: ["mind-map", "--kind", "note-backed", "--language", LANG], dl: ["mind-map"], ext: "json" },
  pptx: { gen: ["slide-deck", "--wait", "--timeout", WS, "--language", LANG], dl: ["slide-deck", "--format", "pptx"], ext: "pptx" },
  pdf: { gen: ["slide-deck", "--wait", "--timeout", WS, "--language", LANG], dl: ["slide-deck", "--format", "pdf"], ext: "pdf" },
  image: { gen: ["infographic", "--wait", "--timeout", WS, "--language", LANG], dl: ["infographic"], ext: "png" },
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

    const base = baseName(title);
    const outputs = {};
    for (const kind of kinds) {
      const m = MAP[kind];
      if (!m) continue;
      try {
        await run(BIN, ["generate", ...m.gen], { timeoutMs: GEN_TIMEOUT });
        let out = path.join(outDir, `${base} - ${kind}.${m.ext}`);
        await run(BIN, ["download", ...m.dl, out], { timeoutMs: 600_000 });
        // mindmap: NotebookLM chi cho JSON -> render HTML + PNG + file .xmind (mo bang Xmind).
        if (kind === "mindmap") {
          const jsonPath = out;
          try {
            const htmlPath = await renderMindmapHtml(jsonPath);
            const files = [htmlPath];
            try {
              const media = await renderMindmapMedia(htmlPath);
              if (media.pdf) files.unshift(media.pdf); // PDF mindmap (yeu cau chinh)
              if (media.png) files.unshift(media.png); // PNG xem truoc trong Drive
              log(`    notebooklm-py: mindmap html${media.png ? " + png" : ""}${media.pdf ? " + pdf" : ""}`);
            } catch (e3) {
              log(`    notebooklm-py: render PNG/PDF loi (${e3.message}) -> chi co HTML`);
            }
            out = files.length > 1 ? files : htmlPath; // mang neu co nhieu file
          } catch (e2) {
            log(`    notebooklm-py: render mindmap HTML loi (${e2.message}) -> giu JSON`);
          }
        }
        outputs[kind] = out;
      } catch (e) {
        log(`    notebooklm-py bo qua kind '${kind}': ${e.message}`);
      }
    }
    return { ok: true, outputs };
  },
};

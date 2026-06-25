// Provider Gamma: tao "ebook"/slide dep qua Gamma Generations API -> xuat PDF.
// Can GAMMA_API_KEY trong .env. Luong: POST /generations -> poll GET -> tai exportUrl ve.
// Tham so cau hinh qua .env (GAMMA_*). Mac dinh theo yeu cau: tieng Viet, theme Peach,
// anh illustration moi trang, nhieu icon, khong dung gach ngang.
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { log } from "../util.mjs";

const API = "https://public-api.gamma.app/v1.0/generations";
const POLL_MS = 10_000;
const POLL_MAX = Number(process.env.GAMMA_POLL_MAX || 30); // 30 x 10s = 5 phut

const DEFAULT_INSTR =
  "Toan bo noi dung bang TIENG VIET. Giong dieu than thien, khuyen khich, de hieu. " +
  "Moi trang deu co anh minh hoa kieu illustration, dung nhieu icon nhat co the. " +
  "KHONG dung dau gach ngang. Trinh bay sinh dong, dep mat kieu ebook hoc tap. " +
  "Dan trai noi dung day du, chi tiet.";

function baseName(title) {
  return (
    String(title || "ebook")
      .replace(/\.[a-z0-9]{1,5}$/i, "")
      .replace(/[\/\\\n\r\t]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100) || "ebook"
  );
}

// Bo ky tu dieu khien (nhi phan) khoi text nguon.
function cleanText(s) {
  let out = "";
  for (const ch of String(s)) {
    const c = ch.codePointAt(0);
    if (c === 9 || c === 10 || c === 13 || c >= 32) out += ch;
    else out += " ";
  }
  return out.trim();
}

export default {
  name: "gamma",
  get enabled() {
    return process.env.ENABLE_GAMMA !== "false" && !!process.env.GAMMA_API_KEY;
  },
  supports(kind) {
    return kind === "ebook";
  },
  async healthCheck() {
    return !!process.env.GAMMA_API_KEY;
  },

  async generate({ filePath, fileUrl, title, outDir, kinds }) {
    if (!kinds.includes("ebook")) return { ok: true, outputs: {} };
    const KEY = process.env.GAMMA_API_KEY;
    if (!KEY) throw new Error("Thieu GAMMA_API_KEY");

    // Noi dung nguon -> inputText
    let inputText = "";
    if (filePath) {
      try {
        inputText = await readFile(filePath, "utf8");
      } catch {}
    }
    if (!inputText && fileUrl) {
      try {
        inputText = await (await fetch(fileUrl)).text();
      } catch {}
    }
    inputText = cleanText(inputText).slice(0, 40000);
    if (inputText.length < 20) inputText = title || "Bai hoc"; // qua ngan/nhi phan -> dung title

    const exportAs = process.env.GAMMA_EXPORT || "pdf";
    const body = {
      inputText,
      textMode: process.env.GAMMA_TEXT_MODE || "generate",
      format: process.env.GAMMA_FORMAT || "presentation",
      themeName: process.env.GAMMA_THEME || "Peach",
      exportAs,
      additionalInstructions: process.env.GAMMA_INSTRUCTIONS || DEFAULT_INSTR,
    };
    const nc = Number(process.env.GAMMA_NUM_CARDS || 0);
    if (nc > 0) body.numCards = nc;

    const res = await fetch(API, {
      method: "POST",
      headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Gamma POST ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const { generationId } = await res.json();
    if (!generationId) throw new Error("Gamma: khong nhan duoc generationId");
    log(`  gamma: dang sinh (id ${generationId})...`);

    let exportUrl = null;
    for (let i = 0; i < POLL_MAX; i++) {
      await new Promise((r) => setTimeout(r, POLL_MS));
      const g = await fetch(`${API}/${generationId}`, { headers: { "X-API-KEY": KEY } });
      if (!g.ok) continue;
      const d = await g.json();
      if (d.status === "completed") {
        exportUrl = d.exportUrl;
        log(`  gamma: xong (-${d.credits?.deducted ?? "?"} credits, con ${d.credits?.remaining ?? "?"})`);
        break;
      }
      if (d.status === "failed") throw new Error("Gamma failed: " + JSON.stringify(d).slice(0, 200));
    }
    if (!exportUrl) throw new Error("Gamma: het luot poll, chua co exportUrl");

    const ext = exportAs === "pptx" ? "pptx" : "pdf";
    const out = path.join(outDir, `${baseName(title)} - ebook.${ext}`);
    const fr = await fetch(exportUrl);
    if (!fr.ok) throw new Error(`Gamma tai file export loi ${fr.status}`);
    await writeFile(out, Buffer.from(await fr.arrayBuffer()));
    return { ok: true, outputs: { ebook: out } };
  },
};

// Nap bien moi truong tu file .env TRUOC khi cac module khac doc process.env.
// PHAI import dau tien trong server.mjs / cli.mjs.
// GHI DE (override) bien da co san -> .env luon la nguon su that, mien nhiem voi
// env cu ma pm2/he thong co the truyen vao (vd ENABLE_NOTEBOOKLM_PY=false ton dong).
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
try {
  if (fs.existsSync(envPath)) {
    const txt = fs.readFileSync(envPath, "utf8");
    let n = 0;
    for (const line of txt.split(/\r?\n/)) {
      if (/^\s*#/.test(line) || !line.trim()) continue;
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      let [, k, v] = m;
      v = v.replace(/\s+#.*$/, "").trim(); // bo comment cuoi dong
      if (/^".*"$|^'.*'$/.test(v)) v = v.slice(1, -1); // bo nhay bao quanh
      process.env[k] = v; // GHI DE
      n++;
    }
    console.log(`[loadenv] da nap (override) ${n} bien tu ${envPath}`);
  } else {
    console.log(`[loadenv] khong thay .env tai ${envPath} — dung mac dinh`);
  }
} catch (e) {
  console.error("[loadenv] loi nap .env:", e.message);
}

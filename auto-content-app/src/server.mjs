// HTTP server cho Make/Drive goi vao.
//   GET  /health          -> { ok: true }
//   GET  /kinds           -> danh sach loai output ho tro
//   GET  /files/<relpath> -> tai file ket qua (de Make upload lai len Drive)
//   POST /generate        -> sinh hoc lieu (fallback + chay hang loat theo segment)
//        Header: Authorization: Bearer <APP_TOKEN>
//        2 cach gui:
//        (a) JSON: { filePath | fileUrl | driveFileId, title, kinds }
//        (b) RAW BODY (Make tai file Drive roi POST thang):
//            POST /generate?title=...&kinds=...&filename=bai.pdf
//            Content-Type: application/octet-stream, body = bytes cua file
//        Response co them `files`: [{ segment, kind, name, url }] de Make upload len Drive.
import "./loadenv.mjs"; // PHAI dau tien: nap .env truoc khi module khac doc process.env
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { generateBatch } from "./orchestrator.mjs";
import { CANONICAL } from "./kinds.mjs";
import { sanitize, log } from "./util.mjs";

const PORT = Number(process.env.PORT || 8787);
const TOKEN = process.env.APP_TOKEN;
const OUT_ROOT = path.resolve(process.env.OUT_DIR || "./out");
const PUBLIC_BASE = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");

const MIME = {
  ".mp4": "video/mp4", ".mp3": "audio/mpeg", ".json": "application/json",
  ".pdf": "application/pdf", ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".txt": "text/plain",
  ".html": "text/html; charset=utf-8",
};

function json(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

// Gom cac file ket qua co that (duoi OUT_ROOT) thanh URL tai duoc.
// info.output co the la 1 chuoi (1 file) hoac 1 mang (vd mindmap -> [png, html]).
function collectFiles(result) {
  const files = [];
  for (const seg of result.results || []) {
    for (const [kind, info] of Object.entries(seg.produced || {})) {
      const outs = Array.isArray(info?.output) ? info.output : [info?.output];
      for (const out of outs) {
        if (typeof out !== "string") continue; // "make" / artifact ref -> bo qua
        const abs = path.resolve(out);
        if (!abs.startsWith(OUT_ROOT) || !fs.existsSync(abs)) continue;
        const rel = path.relative(OUT_ROOT, abs);
        files.push({
          segment: seg.title,
          kind,
          provider: info.provider,
          name: path.basename(abs),
          url: `${PUBLIC_BASE}/files/${rel.split(path.sep).map(encodeURIComponent).join("/")}`,
        });
      }
    }
  }
  return files;
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "GET" && u.pathname === "/health") return json(res, 200, { ok: true });
  if (req.method === "GET" && u.pathname === "/kinds") return json(res, 200, { kinds: CANONICAL });

  // --- Phuc vu file ket qua ---
  if (req.method === "GET" && u.pathname.startsWith("/files/")) {
    const rel = decodeURIComponent(u.pathname.slice("/files/".length));
    const abs = path.resolve(OUT_ROOT, rel);
    if (!abs.startsWith(OUT_ROOT) || !fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
      return json(res, 404, { error: "file not found" });
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(abs).toLowerCase()] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${path.basename(abs)}"`,
    });
    return fs.createReadStream(abs).pipe(res);
  }

  if (req.method === "POST" && u.pathname === "/generate") {
    if (TOKEN && req.headers.authorization !== `Bearer ${TOKEN}`) {
      return json(res, 401, { error: "unauthorized" });
    }

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outDir = path.join(OUT_ROOT, stamp);
    fs.mkdirSync(outDir, { recursive: true });

    const ct = (req.headers["content-type"] || "").toLowerCase();
    let jobInput;

    if (ct.includes("application/json")) {
      // (a) JSON
      let body = "";
      for await (const c of req) body += c;
      let data;
      try {
        data = JSON.parse(body || "{}");
      } catch {
        return json(res, 400, { error: "body khong phai JSON hop le" });
      }
      if (!data.filePath && !data.fileUrl && !data.driveFileId) {
        return json(res, 400, { error: "can filePath | fileUrl | driveFileId (hoac gui raw body kem ?filename=)" });
      }
      jobInput = {
        filePath: data.filePath,
        fileUrl: data.fileUrl,
        driveFileId: data.driveFileId,
        title: data.title || "content",
        filename: data.filename || data.title,
        kinds: data.kinds,
        outDir,
      };
    } else {
      // (b) RAW BODY: ghi bytes ra file
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const buf = Buffer.concat(chunks);
      if (!buf.length) return json(res, 400, { error: "body rong; can file bytes hoac JSON" });
      const filename = sanitize(u.searchParams.get("filename") || "source.bin") || "source.bin";
      const dest = path.join(outDir, filename);
      fs.writeFileSync(dest, buf);
      jobInput = {
        filePath: dest,
        title: u.searchParams.get("title") || filename.replace(/\.[^.]+$/, ""),
        filename: u.searchParams.get("filename") || filename,
        kinds: u.searchParams.get("kinds") || undefined,
        outDir,
      };
    }

    try {
      const result = await generateBatch(jobInput);
      const files = collectFiles(result);
      return json(res, result.ok ? 200 : 207, { ...result, files });
    } catch (e) {
      return json(res, 500, { error: e.message, details: e.details });
    }
  }

  json(res, 404, { error: "not found" });
});

server.listen(PORT, () => log(`auto-content-app nghe o :${PORT} (files: ${PUBLIC_BASE}/files/...)`));

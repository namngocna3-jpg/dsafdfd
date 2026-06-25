// HTTP server cho Make/Drive goi vao.
//   GET  /health        -> { ok: true }
//   GET  /kinds         -> danh sach loai output ho tro
//   POST /generate      -> sinh hoc lieu (co fallback + chay hang loat theo segment)
//        Header: Authorization: Bearer <APP_TOKEN>
//        Body JSON: { filePath | fileUrl | driveFileId, title, kinds }
//          kinds: "video,mindmap"  hoac  ["video","pptx","pdf","image"]  (chon nhieu)
//                 bo trong -> dung DEFAULT_KINDS (mac dinh video,mindmap)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { generateBatch } from "./orchestrator.mjs";
import { CANONICAL } from "./kinds.mjs";
import { log } from "./util.mjs";

const PORT = Number(process.env.PORT || 8787);
const TOKEN = process.env.APP_TOKEN;

function json(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") return json(res, 200, { ok: true });
  if (req.method === "GET" && req.url === "/kinds") return json(res, 200, { kinds: CANONICAL });

  if (req.method === "POST" && req.url === "/generate") {
    if (TOKEN && req.headers.authorization !== `Bearer ${TOKEN}`) {
      return json(res, 401, { error: "unauthorized" });
    }
    let body = "";
    for await (const c of req) body += c;
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return json(res, 400, { error: "body khong phai JSON hop le" });
    }
    if (!data.filePath && !data.fileUrl && !data.driveFileId) {
      return json(res, 400, { error: "can filePath | fileUrl | driveFileId" });
    }
    // moi job 1 thu muc rieng de chay hang loat khong de nhau
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outDir = path.join(process.env.OUT_DIR || "./out", stamp);
    fs.mkdirSync(outDir, { recursive: true });
    try {
      const result = await generateBatch({
        filePath: data.filePath,
        fileUrl: data.fileUrl,
        driveFileId: data.driveFileId,
        title: data.title || "content",
        kinds: data.kinds, // string | array | undefined
        outDir,
      });
      return json(res, result.ok ? 200 : 207, result); // 207: xong 1 phan (con loai thieu)
    } catch (e) {
      return json(res, 500, { error: e.message, details: e.details });
    }
  }

  json(res, 404, { error: "not found" });
});

server.listen(PORT, () => log(`auto-content-app nghe o :${PORT}`));

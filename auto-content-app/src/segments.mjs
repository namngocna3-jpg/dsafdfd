// Tach 1 file text thanh nhieu "segment" theo marker bat dau/ket thuc => chay hang loat tu 1 file.
//
// Mau file (vd .txt / .md / Google Doc xuat text):
//
//   === BEGIN | title: Chuong 1 | kinds: video, mindmap
//   ...noi dung ly thuyet chuong 1...
//   === END
//
//   === BEGIN | title: Chuong 2 | kinds: pptx, pdf, image
//   ...noi dung chuong 2...
//   === END
//
// - title / kinds la TUY CHON tren dong BEGIN. Khong khai bao -> dung kinds mac dinh cua request.
// - File KHONG co marker  -> coi nhu 1 segment duy nhat (ca file).
// - File nhi phan (pdf/docx) -> khong tach, 1 segment (chinh NotebookLM/SurfSense tu doc).
import { readFile } from "node:fs/promises";
import { normalizeKinds } from "./kinds.mjs";

// Cho phep BEGIN/START/BAT DAU, END/STOP/KET THUC; bao quanh boi = # [ @ tuy thich.
const BEGIN_RE = /^\s*[=#@[\]]*\s*(?:BEGIN|START|B[AẮ]T\s*[DĐ][AẦ]U)\b[:=]?\s*(.*?)\s*[=#@[\]]*\s*$/iu;
const END_RE = /^\s*[=#@[\]]*\s*(?:END|STOP|K[EẾ]T\s*TH[UÚ]C)\b\s*[=#@[\]]*\s*$/iu;

function parseAttrs(str) {
  const attrs = {};
  for (const part of String(str || "").split("|")) {
    const m = part.match(/^\s*(\w+)\s*[:=]\s*(.+?)\s*$/);
    if (m) attrs[m[1].toLowerCase()] = m[2];
  }
  return attrs;
}

/** Tach text -> mang segment, hoac null neu khong tim thay marker nao. */
export function parseSegments(text, { defaultKinds, baseTitle }) {
  const lines = String(text).split(/\r?\n/);
  const segments = [];
  let cur = null;
  for (const line of lines) {
    const b = line.match(BEGIN_RE);
    if (b) {
      if (cur) segments.push(cur); // auto-close neu thieu END
      const a = parseAttrs(b[1]);
      cur = {
        title: a.title || `${baseTitle}-${segments.length + 1}`,
        kinds: a.kinds ? normalizeKinds(a.kinds) : defaultKinds,
        lines: [],
      };
      continue;
    }
    if (END_RE.test(line) && cur) {
      segments.push(cur);
      cur = null;
      continue;
    }
    if (cur) cur.lines.push(line);
  }
  if (cur) segments.push(cur);
  if (!segments.length) return null;
  return segments.map((s) => ({ title: s.title, kinds: s.kinds, content: s.lines.join("\n").trim() }));
}

/**
 * Tra ve mang segment de chay. Moi phan tu: { title, kinds, content|null, filePath|null }.
 * - content != null  -> orchestrator se ghi ra file rieng truoc khi sinh.
 * - content == null  -> dung filePath (file goc) hoac fileUrl/driveFileId.
 */
export async function loadSegments(localFilePath, { title, kinds }) {
  const single = [{ title, kinds, content: null, filePath: localFilePath || null }];
  if (!localFilePath) return single;
  const isText = /\.(txt|md|markdown|text)$/i.test(localFilePath);
  if (!isText) return single; // pdf/docx: khong tach
  let text;
  try {
    text = await readFile(localFilePath, "utf8");
  } catch {
    return single;
  }
  const segs = parseSegments(text, { defaultKinds: kinds, baseTitle: title });
  if (!segs || segs.length <= 1) return single;
  return segs.map((s) => ({ ...s, filePath: null }));
}

// Chuan hoa danh sach loai output (kinds). Cho phep chon nhieu loai cung luc.
// Canonical: video, audio, mindmap, pptx, pdf, image
export const CANONICAL = ["video", "audio", "mindmap", "pptx", "pdf", "image"];

// Alias than thien voi nguoi dung / Make -> ten chuan
const ALIASES = {
  video: "video",
  audio: "audio",
  podcast: "audio",
  mindmap: "mindmap",
  "mind-map": "mindmap",
  mind_map: "mindmap",
  "so-do-tu-duy": "mindmap",
  pptx: "pptx",
  slide: "pptx",
  slides: "pptx",
  "slide-deck": "pptx",
  powerpoint: "pptx",
  pdf: "pdf",
  "slide-pdf": "pdf",
  "pdf-slide": "pdf",
  "pptx-pdf": "pdf",
  report: "pdf",
  image: "image",
  images: "image",
  anh: "image",
  "anh-minh-hoa": "image",
  illustration: "image",
};

/**
 * Nhan vao string ("video,mindmap"), mang, hoac undefined -> tra ve mang canonical da loc trung.
 * fallback: dung khi khong truyen gi (mac dinh tu DEFAULT_KINDS hoac video+mindmap).
 */
// Map 1 chuoi/mang -> mang canonical, KHONG ap fallback (co the rong).
function toCanonical(input) {
  let arr = input;
  if (typeof arr === "string") arr = arr.split(/[,;\s]+/);
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const raw of arr) {
    const key = String(raw || "").trim().toLowerCase();
    if (!key) continue;
    const canon = ALIASES[key];
    if (canon && !out.includes(canon)) out.push(canon);
  }
  return out;
}

export function normalizeKinds(input, fallback) {
  const fb = fallback || (process.env.DEFAULT_KINDS || "video,mindmap");
  const out = input == null || input === "" ? [] : toCanonical(input);
  if (out.length) return out;
  return toCanonical(fb).length ? toCanonical(fb) : ["video", "mindmap"];
}

/**
 * Doc kinds tu ten file, vd: "Bai 1 [video,pptx].pdf" hoac "Bai 1 __video+mindmap.pdf".
 * Tra ve chuoi "video,pptx" (de dua vao normalizeKinds) hoac null neu khong thay.
 */
export function kindsFromName(name) {
  if (!name) return null;
  const m =
    String(name).match(/[\[(](?:kinds[:=])?\s*([a-z0-9,+\s_-]+?)\s*[\])]/i) ||
    String(name).match(/__\s*kinds[:=]?\s*([a-z0-9,+_-]+)/i);
  if (!m) return null;
  const found = toCanonical(m[1].replace(/\+/g, ","));
  return found.length ? found.join(",") : null; // null neu trong ngoac khong co loai hop le
}

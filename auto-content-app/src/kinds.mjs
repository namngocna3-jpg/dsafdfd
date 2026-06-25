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
export function normalizeKinds(input, fallback) {
  const fb = fallback || (process.env.DEFAULT_KINDS || "video,mindmap");
  let arr = input;
  if (arr == null || arr === "") arr = fb;
  if (typeof arr === "string") arr = arr.split(/[,;\s]+/);
  const out = [];
  for (const raw of arr) {
    const key = String(raw || "").trim().toLowerCase();
    if (!key) continue;
    const canon = ALIASES[key];
    if (canon && !out.includes(canon)) out.push(canon);
  }
  if (!out.length) return normalizeKinds(fb, "video,mindmap");
  return out;
}

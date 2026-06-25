// Tao file .xmind THAT tu cay mindmap {name, children:[...]} (vd JSON cua NotebookLM).
// .xmind = file ZIP chua content.json (+ manifest/metadata). Mo & chinh sua duoc bang Xmind.
// Dung jszip (dynamic import) -> neu chua cai 'jszip' thi bo qua, khong lam sap app.
import { readFile, writeFile } from "node:fs/promises";

let _seq = 0;
const nid = () => `t${Date.now().toString(36)}${(_seq++).toString(36)}`;
const nameOf = (n) => n?.name ?? n?.title ?? n?.label ?? n?.topic ?? "";
const kidsOf = (n) => n?.children ?? n?.nodes ?? n?.subtopics ?? n?.items ?? [];

function toTopic(node) {
  const t = { id: nid(), class: "topic", title: String(nameOf(node) || "").slice(0, 300) };
  const cs = kidsOf(node);
  if (cs.length) t.children = { attached: cs.map(toTopic) };
  return t;
}

/**
 * Tao file .xmind tu cay JSON (duong dan file JSON hoac object). Tra ve duong dan .xmind,
 * hoac null neu chua cai jszip.
 */
export async function renderXmindFile(jsonOrTree, outPath, sheetTitle = "Mindmap") {
  let JSZip;
  try {
    JSZip = (await import("jszip")).default;
  } catch {
    return null; // chua cai jszip -> bo qua .xmind
  }
  const tree = typeof jsonOrTree === "string" ? JSON.parse(await readFile(jsonOrTree, "utf8")) : jsonOrTree;
  const rootTopic = toTopic(tree);
  const content = [
    { id: nid(), class: "sheet", title: String(sheetTitle).slice(0, 200), rootTopic },
  ];
  const zip = new JSZip();
  zip.file("content.json", JSON.stringify(content));
  zip.file("metadata.json", JSON.stringify({ creator: { name: "auto-content-app" } }));
  zip.file(
    "manifest.json",
    JSON.stringify({ "file-entries": { "content.json": {}, "metadata.json": {} } })
  );
  const buf = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  await writeFile(outPath, buf);
  return outPath;
}

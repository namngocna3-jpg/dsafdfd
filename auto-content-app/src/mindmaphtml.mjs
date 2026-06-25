// Chuyen mind-map JSON cua NotebookLM ({name, children:[...]}) thanh 1 file HTML
// mindmap tuong tac (markmap): mo bang trinh duyet la thay so do cay, click xo/thu nhanh.
// Luu y: HTML dung markmap tu CDN -> can mang khi mo (mo tren may co internet la duoc).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const name = (n) => n?.name ?? n?.title ?? n?.label ?? n?.topic ?? n?.text ?? "";
const kids = (n) => n?.children ?? n?.nodes ?? n?.subtopics ?? n?.items ?? [];

// JSON cay -> markdown outline (root = H1, cac cap con = bullet long nhau).
export function mindmapJsonToMarkdown(root) {
  const lines = [];
  const rootName = name(root) || "Mindmap";
  lines.push(`# ${rootName.replace(/\n+/g, " ").trim()}`);
  const walk = (node, depth) => {
    const indent = "  ".repeat(depth);
    const label = name(node).replace(/\n+/g, " ").trim();
    if (label) lines.push(`${indent}- ${label}`);
    for (const c of kids(node)) walk(c, depth + (label ? 1 : 0));
  };
  for (const c of kids(root)) walk(c, 0);
  return lines.join("\n");
}

export function buildMindmapHtml(markdown, title = "Mindmap") {
  // chong vo template neu noi dung lo co </script>
  const safeMd = markdown.replace(/<\/script>/gi, "<\\/script>");
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${title.replace(/[<>]/g, "")}</title>
<style>html,body{margin:0;height:100%}.markmap{position:fixed;inset:0}.markmap>svg{width:100%;height:100%}</style>
</head>
<body>
<div class="markmap"><script type="text/template">
${safeMd}
</script></div>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18"></script>
</body>
</html>
`;
}

/**
 * Doc file mind-map JSON, render thanh <ten>.html ben canh, tra ve duong dan HTML.
 */
export async function renderMindmapHtml(jsonPath) {
  const raw = await readFile(jsonPath, "utf8");
  const data = JSON.parse(raw);
  const md = mindmapJsonToMarkdown(data);
  const title = name(data) || "Mindmap";
  const html = buildMindmapHtml(md, title);
  const htmlPath = jsonPath.replace(/\.json$/i, ".html");
  await writeFile(htmlPath, html, "utf8");
  return htmlPath;
}

// Chuyen mind-map JSON cua NotebookLM ({name, children:[...]}) thanh 1 file HTML
// mindmap tuong tac (markmap): mo bang trinh duyet la thay so do cay, click xo/thu nhanh.
// Luu y: HTML dung markmap tu CDN -> can mang khi mo (mo tren may co internet la duoc).
import { readFile, writeFile } from "node:fs/promises";
import fs from "node:fs";
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

// Tim Chromium (Playwright tai san khi cai notebooklm-py). Cho phep override bang CHROME_BIN.
function findChrome() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  const base = path.join(process.env.HOME || "/root", ".cache", "ms-playwright");
  try {
    for (const d of fs.readdirSync(base)) {
      if (!d.startsWith("chromium-") || d.includes("headless")) continue;
      const p = path.join(base, d, "chrome-linux64", "chrome");
      if (fs.existsSync(p)) return p;
    }
  } catch {}
  return null;
}

/**
 * Chup mindmap HTML thanh PNG bang chromium (puppeteer-core).
 * Tra ve duong dan PNG, hoac null neu thieu puppeteer-core/chromium (bo qua, khong loi).
 */
export async function renderMindmapMedia(htmlPath) {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer-core")).default;
  } catch {
    return { png: null, pdf: null }; // chua cai puppeteer-core
  }
  const exec = findChrome();
  if (!exec) return { png: null, pdf: null };
  const pngPath = htmlPath.replace(/\.html$/i, ".png");
  const pdfPath = htmlPath.replace(/\.html$/i, ".pdf");
  const browser = await puppeteer.launch({
    executablePath: exec,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
    await page.goto("file://" + htmlPath, { waitUntil: "networkidle0", timeout: 60_000 });
    await page.waitForSelector(".markmap svg g", { timeout: 30_000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500)); // doi markmap fit xong
    await page.screenshot({ path: pngPath });
    let pdfOk = false;
    try {
      await page.pdf({
        path: pdfPath,
        landscape: true,
        printBackground: true,
        width: "1600px",
        height: "1000px",
        pageRanges: "1",
      });
      pdfOk = true;
    } catch (e) {
      console.error(`[mindmap] xuat PDF loi: ${e.message}`);
    }
    return { png: pngPath, pdf: pdfOk ? pdfPath : null };
  } finally {
    await browser.close();
  }
}

# HANDOFF_2 — auto-content-app: trạng thái hiện tại & việc tiếp theo

> Dùng để mở Claude Code (PowerShell) làm tiếp khi gần hết credit.
> Gói TẤT CẢ: đã làm gì, đang kẹt ở đâu, IDs cần dùng, MCP nào cần kết nối, và blueprint Make sẵn sàng dán.

---

## 0. TL;DR — đang ở đâu

- **App `auto-content-app`**: ĐÃ XONG code, đã test, đã merge vào `main`. Sinh video/audio/mindmap/pptx/pdf/image
  từ file học liệu, fallback 3 provider, chọn nhiều loại, chạy hàng loạt từ 1 file theo marker.
- **Make scenario** (watch Drive → /generate → upload Drive → Gmail): blueprint ĐÃ DỰNG XONG và đúng,
  nhưng **CHƯA tạo được** vì kẹt 1 thứ: connection Google Drive hiện tại sai loại (xem mục 3).
- **Vercel deploy 404**: SAI NỀN TẢNG. App này KHÔNG chạy được trên Vercel (xem mục 2). Cần VPS.
- **Thư mục Drive**: đã tạo sẵn input/output (mục 4).

---

## 1. Repo & nhánh

- Repo: `namngocna3-jpg/dsafdfd`
- Nhánh phát triển: `claude/wizardly-bell-fxnsal` (đã push)
- `main`: đã tạo, **PR #1 đã merge** → `main` chứa toàn bộ app hoàn chỉnh.
- Code app nằm trong thư mục `auto-content-app/`.

Lấy code: `git clone` repo, `git checkout main` (hoặc nhánh trên).

---

## 2. ⚠️ VỤ VERCEL 404 — đọc kỹ

Màn hình Vercel báo `404 NOT_FOUND` vì **app này không phải web tĩnh/serverless** — nó là **Node HTTP
server chạy nền dài hạn**, và 2/3 provider (NotebookLM A & B) cần **gọi CLI subprocess + trình duyệt thật
(Chrome) + cookie Google**, mỗi job chạy hàng chục phút. Vercel (serverless, timeout ngắn, không có browser,
không chạy được `child_process` kiểu này) **không thể chạy app**. Vì vậy Vercel chỉ build xong rồi 404 ở `/`.

**Phải deploy lên host chạy server dài hạn có Chrome:**
- VPS (Ubuntu) cài Node ≥18 + Chrome + `xvfb-run`, chạy `xvfb-run -a node src/server.mjs`.
- Hoặc Railway/Render/Fly.io với Docker (cài chromium). NotebookLM vẫn cần browser → ưu tiên VPS.
- Đặt sau domain/Cloudflare Tunnel để có URL public HTTPS cho Make gọi vào.

> Nếu chỉ muốn test nhanh KHÔNG cần A/B: chạy với `SURFSENSE_MODE=make` hoặc `rest` — nhưng vẫn nên là
> host server dài hạn, không phải Vercel.

Cần đặt ENV khi deploy (xem `auto-content-app/.env.example`), QUAN TRỌNG:
- `APP_TOKEN` = chuỗi bí mật (Make gửi kèm `Authorization: Bearer <APP_TOKEN>`).
- `PUBLIC_BASE_URL` = URL public của app (để tạo link `/files/...` cho Make tải kết quả).
- `PROVIDER_ORDER`, `ENABLE_*`, `SURFSENSE_MODE`, `MAKE_WEBHOOK_URL` (nếu mode=make), v.v.

---

## 3. ⛔ BLOCKER DUY NHẤT của Make scenario: connection Google Drive sai loại

Khi gọi tạo scenario, Make báo:
```
Provided account '5812910' is not compatible with 'google-drive:watchFilesInAFolder' module.
```
**Nguyên nhân:** module `google-drive@4` cần connection **loại `google-restricted`** (hoặc `google-drive`),
trong khi connection sẵn có (`5812910`, `5815303`) là loại `google` chung (đang dùng cho Forms/Sheets).

**Cách xử lý (PHẢI làm trên giao diện Make, OAuth — không tạo qua API/headless được):**
1. Vào Make → Connections → **Add** → chọn **Google Drive** (sẽ là loại `google-restricted`).
2. Đăng nhập `namngocna3@gmail.com`, cấp quyền Drive.
3. Ghi lại **connection id mới** (gọi nó là `DRIVE_CONN_ID`).
4. Tạo scenario bằng blueprint ở mục 5, thay tất cả `__IMTCONN__: 5812910` → `DRIVE_CONN_ID`.

> Gmail connection `5813497` (google-email) có thể vẫn OK cho module gửi mail; nếu báo không tương thích
> thì tạo thêm connection Gmail mới tương tự.

---

## 4. IDs cần dùng (đã có sẵn)

| Thứ | Giá trị |
|---|---|
| Make Organization | `6869768` |
| Make Team ("My Team") | `1212779` |
| Connection Google (namngocna3) — **SAI loại cho Drive v4** | `5812910` |
| Connection Google (pdanh025) | `5815303` |
| Connection Gmail (google-email, trogiangthaytung) | `5813497` |
| Drive folder cha `auto-content` | `1RGtrwezO8eAedEF6gvASTRdyFOrbSoOc` |
| Drive folder **input** (thả file vào) | `1sehwRLTzeXetHk5_HzpLHW9IGuEWlyc3` |
| Drive folder **output** (lưu kết quả) | `1NBBPa1FXwZ-tTlNmcmlg-3Mw469-EPvT` |
| Email nhận thông báo | `pdanh025@gmail.com` |
| Google Drive MCP account | `namngocna3@gmail.com` (trùng connection 5812910) |

---

## 5. BLUEPRINT MAKE (đã đúng, chỉ cần thay connection + URL rồi tạo)

Luồng 7 module: `watch Drive(1) → download(2) → POST /generate(3) → Gmail báo(4) → iterate files(5) →
download từng file kết quả(6) → upload Drive output(7)`.

Tạo qua Make MCP: `scenarios_create` với `teamId=1212779`, `scheduling={"type":"indefinitely","interval":900}`,
`confirmed=true`, và `blueprint` dưới đây. **Trước khi tạo: thay `5812910`→DRIVE_CONN_ID mới (mục 3),
thay `https://YOUR-APP-DOMAIN`→URL app thật, thay `YOUR_APP_TOKEN`→APP_TOKEN đã đặt khi deploy.**

```json
{
  "name": "auto-content — Drive → /generate → Drive",
  "flow": [
    {"id":1,"module":"google-drive:watchFilesInAFolder","version":4,
     "parameters":{"__IMTCONN__":5812910,"select":"create","destination":"drive","folderId":"1sehwRLTzeXetHk5_HzpLHW9IGuEWlyc3","mimeType":"all","limit":2},"mapper":{}},
    {"id":2,"module":"google-drive:getAFile","version":4,
     "parameters":{"__IMTCONN__":5812910},"mapper":{"select":"map","file":"{{1.id}}"}},
    {"id":3,"module":"http:ActionSendData","version":3,
     "parameters":{"handleErrors":true,"useNewZLibDeCompress":true},
     "mapper":{"url":"https://YOUR-APP-DOMAIN/generate","method":"post",
       "headers":[{"name":"Authorization","value":"Bearer YOUR_APP_TOKEN"}],
       "qs":[{"name":"filename","value":"{{1.name}}"},{"name":"title","value":"{{1.name}}"}],
       "bodyType":"raw","contentType":"custom","customContentType":"application/octet-stream",
       "data":"{{2.data}}","parseResponse":true}},
    {"id":4,"module":"google-email:ActionSendEmail","version":1,
     "parameters":{"account":5813497},
     "mapper":{"to":["pdanh025@gmail.com"],"subject":"auto-content xong: {{1.name}}",
       "html":"File: {{1.name}}<br>Segments: {{3.data.segments}}<br>Kinds: {{join(3.data.kinds; \", \")}}<br>Missing: {{join(3.data.missing; \", \")}}"}},
    {"id":5,"module":"builtin:BasicFeeder","version":1,"mapper":{"array":"{{3.data.files}}"}},
    {"id":6,"module":"http:ActionSendData","version":3,
     "parameters":{"handleErrors":true,"useNewZLibDeCompress":true},
     "mapper":{"url":"{{5.url}}","method":"get","bodyType":"","parseResponse":false}},
    {"id":7,"module":"google-drive:uploadAFile","version":4,
     "parameters":{"__IMTCONN__":5812910},
     "mapper":{"select":"map","folderId":"1NBBPa1FXwZ-tTlNmcmlg-3Mw469-EPvT","filename":"{{5.name}}","data":"{{6.data}}"}}
  ],
  "metadata":{"version":1}
}
```

**Lưu ý về luồng:**
- Module 3 gửi file dạng **raw body** kèm query `?filename=&title=`. App đọc `kinds` từ tên file
  (vd `Bai 1 [video,pptx].pdf`) hoặc từ marker trong file text, hoặc dùng `DEFAULT_KINDS`. Muốn ép loại
  thì thêm `{"name":"kinds","value":"video,pptx"}` vào `qs` module 3.
- Module 4 (Gmail) đặt TRƯỚC iterator nên gửi **1 email tổng kết/file** (không spam mỗi loại).
- Iterator (5) lặp qua `files[]` mà app trả về → mỗi file: tải (6) rồi upload vào output (7).
- **Khi app dùng `SURFSENSE_MODE=make`**: `files[]` sẽ RỖNG (SurfSense/Make tự sinh & giao), nên iterator
  không upload gì — đó là chủ ý. Lúc đó việc giao file do scenario SurfSense riêng lo (chưa dựng).
  Để scenario này upload được file thật, app phải sinh bằng provider A/B hoặc SurfSense `rest`.

---

## 6. App đã làm gì (tóm tắt code đã có trong repo)

Thư mục `auto-content-app/`:
- `src/server.mjs` — HTTP: `GET /health`, `GET /kinds`, `GET /files/<relpath>` (phục vụ file kết quả),
  `POST /generate` (nhận **JSON** {filePath|fileUrl|driveFileId,title,kinds} HOẶC **raw body** kèm
  `?filename=&title=&kinds=`). Response thêm `files[]` {segment,kind,provider,name,url} để Make upload.
- `src/cli.mjs` — chạy tay: `node src/cli.mjs <file> [title] [--kinds=video,pptx]`.
- `src/orchestrator.mjs` — tách segment + **fallback theo TỪNG LOẠI** (provider nào làm được loại nào thì làm,
  loại thiếu rớt sang provider kế), trả `missing`.
- `src/kinds.mjs` — chuẩn hoá loại (video/audio/mindmap/pptx/pdf/image) + alias EN/VI + `kindsFromName`.
- `src/segments.mjs` — tách 1 file text thành nhiều job theo marker `BEGIN/END` (hỗ trợ `BẮT ĐẦU/KẾT THÚC`),
  mỗi mục tự khai báo `title` + `kinds`.
- `src/providers/{notebooklmPy,nlmCli,surfsense}.mjs` — 3 provider, mỗi cái có `supports(kind)` + `generate()`.
- `src/util.mjs` — run CLI, timeout, parseId, ensureLocalFile, sanitize.
- `.env.example`, `README.md`.

**Đã test (mock):** kindsFromName, parseSegments (EN+VI marker), end-to-end 1 file→3 segment→Make webhook
nhận đúng kinds, raw upload + /files serving (mime đúng, chặn path traversal).

**CHƯA verify (cần host thật có Chrome + cookie Google + SurfSense):**
1. Regex `parseId()` của output CLI NotebookLM (A & B) — chạy thật rồi chỉnh; ưu tiên cờ `--json` nếu có.
2. Lệnh `nlm download` cho mindmap/pptx (có thể chỉ hỗ trợ audio/video).
3. SurfSense mode=rest: mở `/docs` của instance điền `SS_GENERATE_PATH` + `SS_GENERATE_BODY`.
4. Tên gói npm provider B (`notebooklm-mcp-cli`) + binary `nlm`.

---

## 7. VIỆC TIẾP THEO (thứ tự nên làm)

1. **Deploy app lên VPS** (KHÔNG Vercel — mục 2). Đặt `APP_TOKEN`, `PUBLIC_BASE_URL`, `SURFSENSE_MODE`.
   Test: `curl https://<app>/health` → `{ok:true}`.
2. **Tạo connection Google Drive (`google-restricted`) trong Make** (mục 3) → lấy `DRIVE_CONN_ID`.
3. **Tạo Make scenario** bằng blueprint mục 5 (thay connection + URL + token). Bật scenario.
4. **Test**: thả 1 file (vd `Bai 1 [mindmap].txt` có marker) vào Drive folder input
   `1sehwRLTzeXetHk5_HzpLHW9IGuEWlyc3` → chờ poll 15 phút (hoặc Run once) → kiểm tra output folder + email.
5. Cài & cấu hình provider A/B trên VPS (cookie Google) nếu muốn chất lượng NotebookLM; chỉnh `parseId()`.
6. (Tuỳ chọn) Dựng scenario SurfSense riêng nếu chạy `SURFSENSE_MODE=make`.

---

## 8. MCP CẦN KẾT NỐI (khi mở Claude Code bên PowerShell)

| MCP | Dùng để | Ghi chú |
|---|---|---|
| **GitHub** | đọc/sửa/push code repo `namngocna3-jpg/dsafdfd`, PR | bản remote dùng `mcp__github__*`; bản local PowerShell có thể dùng `git` + `gh` CLI |
| **Make** | tạo/sửa/bật scenario (`scenarios_create`, `scenarios_activate`, `app-module_get`...) | org `6869768`, team `1212779` |
| **Google Drive** | tạo/kiểm tra thư mục, kiểm tra file kết quả | account `namngocna3@gmail.com` |
| (Vercel — bỏ) | KHÔNG dùng để chạy app | chỉ gây hiểu nhầm; app cần VPS |

> Nếu PowerShell Claude Code không có sẵn các MCP này: cấu hình trong `~/.claude.json` / settings, hoặc
> thao tác Make/Drive bằng tay trên giao diện web (blueprint mục 5 dán trực tiếp khi tạo scenario:
> "Create a new scenario" → menu → Import Blueprint).

---

## 9. CÂU MỞ CHAT MỚI (dán vào Claude Code PowerShell)

> "Tôi có repo `namngocna3-jpg/dsafdfd`, thư mục `auto-content-app` (Node orchestrator sinh học liệu,
> fallback NotebookLM→SurfSense, đã merge `main`). Đọc `auto-content-app/HANDOFF_2.md` để biết trạng thái.
> Việc cần: deploy app lên VPS (KHÔNG Vercel), tạo connection Google Drive google-restricted trong Make,
> rồi tạo Make scenario theo blueprint mục 5. Giúp tôi [bước số ...]."

# auto-content-app

Orchestrator sinh học liệu (video / mindmap / slide) từ 1 file lý thuyết (PDF/Docx/Doc),
có **fallback 3 provider**. File mới vào Google Drive → Make gọi `POST /generate` → app thử
lần lượt các provider, cái nào lỗi thì nhảy sang cái kế tiếp → kết quả lưu về Drive.

## Thứ tự fallback (mặc định: ưu tiên chất lượng)

```
notebooklm-py (CLI)  →  notebooklm-mcp-cli (CLI)  →  SurfSense (REST hoặc Make)
   chất lượng cao            ~50 query/ngày              ổn định nhất → chốt
```

Đổi thứ tự / bật-tắt qua `PROVIDER_ORDER`, `ENABLE_*` trong `.env`.

## Yêu cầu

- **Node >= 18** (dùng `fetch`, `FormData`, `Blob` native — không cần `npm install`).
- Provider A & B cần **cookie Google + browser thật** → chạy trên host có Chrome
  (VPS + `xvfb-run`). Provider C (SurfSense mode=make) chỉ cần webhook URL.

## Chạy

```bash
cp .env.example .env          # sửa theo môi trường của bạn

# Cài 2 tool NotebookLM (provider A, B) — host có Python + Node + Chrome
pip install notebooklm-py && notebooklm login
npm i -g notebooklm-mcp-cli  && nlm login

# Test tay 1 file
node src/cli.mjs ./bai-ly-thuyet-1.pdf "Ly thuyet 1"

# Chạy server cho Make gọi vào
node src/server.mjs
# host headless: xvfb-run -a node src/server.mjs
```

## Chọn loại output (kinds) — chọn nhiều cùng lúc

Hỗ trợ: `video`, `audio`, `mindmap`, `pptx`, `pdf` (pptx dạng pdf), `image` (ảnh minh hoạ).
Chấp nhận alias tiếng Việt/EN: `slide`→pptx, `podcast`→audio, `anh`/`anh-minh-hoa`→image,
`pdf-slide`→pdf, `mind-map`→mindmap... Bỏ trống → dùng `DEFAULT_KINDS`.

```bash
node src/cli.mjs bai.pdf "Bai 1" --kinds=video          # chỉ video
node src/cli.mjs bai.pdf --kinds=pptx,pdf,mindmap,image # nhiều loại
```

**Fallback theo từng loại:** mỗi loại được thử lần lượt qua các provider; loại nào provider
hiện tại không làm được/ lỗi thì rớt sang provider kế. Provider nào hỗ trợ loại nào:

| kind | notebooklm-py | nlm | surfsense (make) | surfsense (rest) |
|------|:--:|:--:|:--:|:--:|
| video, audio | ✅ | ✅ | ✅ | ✅ |
| mindmap, pptx, pdf | ✅ | ✅ (artifact) | ✅ | pptx/pdf ✅ |
| image | ❌ | ❌ | ✅ | ✅ |

## Chạy hàng loạt từ 1 file (marker bắt đầu/kết thúc)

1 file text (`.txt`/`.md`, hoặc Google Doc xuất text) chứa nhiều mục, mỗi mục bọc giữa
`BEGIN`/`END` (hoặc `BẮT ĐẦU`/`KẾT THÚC`). Mỗi mục tự khai báo `title` + `kinds` riêng →
app tách thành nhiều job, mỗi job ghi vào `out/<timestamp>/seg-NN-<title>/`.

```
=== BEGIN | title: Chuong 1 | kinds: video, mindmap
...nội dung lý thuyết chương 1...
=== END

=== BEGIN | title: Chuong 2 | kinds: pptx, pdf, image
...nội dung chương 2...
=== END
```

File **không có marker** (hoặc PDF/Docx) → xử lý như 1 job duy nhất với `kinds` của request.

## API

| Method | Path        | Mô tả |
|--------|-------------|-------|
| GET    | `/health`   | `{ ok: true }` |
| GET    | `/kinds`    | Danh sách loại output hỗ trợ |
| POST   | `/generate` | Header `Authorization: Bearer <APP_TOKEN>`. Body JSON: `{ filePath \| fileUrl \| driveFileId, title, kinds }` |

`kinds`: chuỗi `"video,mindmap"` hoặc mảng `["pptx","pdf","image"]` (tuỳ chọn).
Trả `200` nếu sinh đủ; `207` nếu sinh được một phần (`missing` liệt kê loại còn thiếu).

App tự tải `fileUrl` về local trước khi đưa cho provider A/B (cần file thật).
Mỗi job ghi vào 1 thư mục con `out/<timestamp>/` riêng.

## Cấu trúc

```
src/
├── util.mjs            # run CLI, timeout, parseId, ensureLocalFile, sanitize
├── kinds.mjs           # chuẩn hoá loại output + alias
├── segments.mjs        # tách 1 file thành nhiều job theo marker
├── orchestrator.mjs    # bộ não: tách segment + fallback theo từng loại
├── cli.mjs             # chạy tay
├── server.mjs          # HTTP cho Make
└── providers/
    ├── notebooklmPy.mjs   # A
    ├── nlmCli.mjs         # B
    └── surfsense.mjs      # C (make | rest)
```

## TODO khi chạy thật (xem HANDOFF gốc, mục 7)

1. Verify tên gói npm provider B + binary `nlm`.
2. `parseId()` là best-effort — chạy thử CLI xem stdout thật rồi chỉnh regex (ưu tiên cờ `--json`).
3. `nlm download` có thể chỉ hỗ trợ audio/video — kiểm tra `nlm download --help`.
4. SurfSense mode=rest: mở `/docs` của instance, điền `SS_GENERATE_PATH` + `SS_GENERATE_BODY`.
5. Cookie Google A & B hết hạn 2–4 tuần → cron refresh; healthCheck tự loại provider hỏng auth.

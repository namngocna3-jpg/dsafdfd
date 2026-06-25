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

## API

| Method | Path        | Mô tả |
|--------|-------------|-------|
| GET    | `/health`   | `{ ok: true }` |
| POST   | `/generate` | Header `Authorization: Bearer <APP_TOKEN>`. Body JSON: `{ filePath \| fileUrl \| driveFileId, title }` |

App tự tải `fileUrl` về local trước khi đưa cho provider A/B (cần file thật).
Mỗi job ghi vào 1 thư mục con `out/<timestamp>/` riêng.

## Cấu trúc

```
src/
├── util.mjs            # run CLI, timeout, parseId, ensureLocalFile
├── orchestrator.mjs    # bộ não fallback
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

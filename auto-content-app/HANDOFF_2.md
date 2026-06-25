# HANDOFF — auto-content-app (TRẠNG THÁI: ĐANG CHẠY HOÀN CHỈNH)

> Cập nhật liên tục. Mở Claude Code (PowerShell/web) ở bất kỳ tài khoản nào → đọc file này là tiếp tục được.
> Repo: `namngocna3-jpg/dsafdfd`, nhánh `claude/wizardly-bell-fxnsal`, code trong `auto-content-app/`.

## ⭐ KHI QUAY LẠI LÀM TIẾP (đọc trước tiên)
App chạy bằng **systemd** trên VPS → đóng cmd/SSH KHÔNG tắt app; job async đang chạy vẫn xong & tự đẩy lên Drive.

**Việc dở đang chờ nghiệm thu:** test `kinds=pptx,video` (job tên "test full") để xác nhận:
- pptx ra file (lần trước hỏng do 2 job đè nhau — ĐÃ thêm queue, cần xác nhận lại).
- video ra `.mp4` (CHƯA verify end-to-end lần nào).

**Khi quay lại, làm theo thứ tự:**
1. SSH vào VPS: `ssh root@103.72.57.56`.
2. Xem job "test full" đã xong chưa: `journalctl -u autocontent -n 60 --no-pager | grep -iE "test full|xong|callback|bo qua|video|pptx"`.
3. Kiểm tra Drive output có `test full - pptx.pptx` + `test full - video.mp4` chưa.
   - Nếu CÓ cả 2 → **đủ 6/6 loại, xong hẳn** → đánh dấu hoàn thành.
   - Nếu thiếu/chưa chạy → chạy lại test (lệnh ở mục 1 "Test nhanh", kinds=pptx,video) và chờ ~10–13'.
4. (Tùy chọn còn lại ở mục 8.)

---

## 0. TÓM TẮT — hệ thống làm gì & đang ở đâu

Tự động: **thả file học liệu vào Google Drive → sinh video/audio/mindmap/pptx/pdf/ảnh bằng NotebookLM → trả file về Drive + email.**

**TRẠNG THÁI: CHẠY ĐƯỢC A→Z.** Đã nghiệm thu: mindmap (png+html), pptx, image qua chế độ async.

### TIẾN ĐỘ (nhật ký — mới nhất ở cuối)
- ✅ Hạ tầng: VPS + systemd (xvfb + autocontent), NotebookLM đăng nhập pdanh025, .env override.
- ✅ 6 loại sinh được: mindmap(png+html), pptx, pdf, image, video*, audio* (*video/audio đã có lệnh đúng, ĐANG nghiệm thu thực tế).
- ✅ Tiếng Việt, tên file theo input, mindmap ra PNG+HTML.
- ✅ Async + webhook + 2 Make scenario (Make hết timeout).
- ✅ **Hàng đợi (queue)**: NotebookLM CLI chỉ chạy 1 job/lúc → các file xếp hàng chạy lần lượt (sửa lỗi 2 job đè nhau làm timeout pptx). Đã push (commit 6f2e4ef).
- ✅ Đã giao Drive thực tế: mindmap.png + mindmap.html + image.png (từ file "Bài 1").
- ⏳ CHƯA verify: **pptx** (lần trước timeout do bị đè — chờ test lại với queue) và **video .mp4** (chưa chạy xong lần nào). → job "test full" (kinds=pptx,video) đang/để chờ nghiệm thu (xem mục ⭐ đầu file).
- ⚠️ Nhớ: sau khi `git pull`, PHẢI `systemctl restart autocontent` thì code queue mới có hiệu lực.

### VIỆC TIẾP THEO (làm gì tiếp)
1. **Test lại video** sau khi deploy queue: thả/curl 1 file `[video]` ĐƠN LẺ (đừng chạy song song) → chờ 5–10' → xác nhận `test - video.mp4` vào Drive output.
2. Test lại **pptx** đơn lẻ (lần trước bị job video đè → timeout). Với queue giờ sẽ không bị nữa.
3. (Tùy chọn) thêm loại `report` (text), đổi APP_TOKEN dài hơn, xử lý .docx→PDF.

### LỖI ĐÃ GẶP & CÁCH XỬ (quan trọng cho người tiếp nhận)
- 2 job chạy song song → NotebookLM `use` đè notebook → job kia timeout/missing. **ĐÃ SỬA bằng queue** (chạy lần lượt). Đừng bỏ queue.

### Luồng (async)
```
Drive input ──watch──> Make Scenario 1 ──POST /generate?async=1──> VPS app (tra ve 202 ngay)
                                                                      │ sinh o nen (vai phut)
                                                                      ▼
Drive output + email <── Make Scenario 2 <──webhook callback (files[])── VPS app
```

---

## 1. VPS (nơi chạy app + NotebookLM)

- IP: **103.72.57.56**, Ubuntu 24.04, user `root`. SSH: `ssh root@103.72.57.56`.
- ⚠️ Mật khẩu root từng bị lộ trong chat → NÊN đổi (`passwd`). (Mật khẩu cũ user cấp: `6nu3#4#vmNPwbbC`).
- App đặt tại `/root/dsafdfd/auto-content-app` (clone từ GitHub, đang ở nhánh `claude/wizardly-bell-fxnsal`).
- Node `/usr/bin/node` (v22), npm deps đã cài (gồm `puppeteer-core`).

### Chạy bằng systemd (KHÔNG dùng pm2 nữa — pm2 để lại tiến trình mồ côi gây EADDRINUSE)
2 service:
- `/etc/systemd/system/xvfb.service` — màn hình ảo `:99` (NotebookLM + chromium cần).
- `/etc/systemd/system/autocontent.service` — chạy `node src/server.mjs`, `Environment=DISPLAY=:99`, `HOME=/root`, `Restart=always`, WorkingDirectory=app dir.
- Cả 2 `enable --now` → **tự chạy lại sau reboot**.

Lệnh vận hành:
```bash
systemctl restart autocontent          # sau khi git pull
systemctl status autocontent
journalctl -u autocontent -f            # xem log realtime
journalctl -u autocontent -n 50 --no-pager
```

### NotebookLM CLI (provider chính)
- Cài: `pipx install "notebooklm-py[browser]"` (binary `notebooklm` tại `/root/.local/bin/notebooklm`, v0.7.2).
- Chromium của Playwright: `~/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome` (đã `playwright install --with-deps chromium`).
- **Đã đăng nhập Google `pdanh025@gmail.com`** (auth lưu ở `/root/.notebooklm/profiles/default/storage_state.json`).
  - Cách đăng nhập (khi cookie hết hạn): tạo VNC tạm xem màn hình ảo rồi `DISPLAY=:99 notebooklm login`:
    ```bash
    apt install -y x11vnc xvfb fluxbox
    Xvfb :99 -screen 0 1280x800x24 & DISPLAY=:99 fluxbox &
    x11vnc -display :99 -localhost -forever -rfbport 5900 -nopw -xkb &
    # tu Windows: ssh -L 5900:localhost:5900 root@103.72.57.56 ; mo VNC Viewer -> localhost:5900
    DISPLAY=:99 notebooklm login        # dang nhap Google trong VNC; neu khong go duoc: dung xdotool type
    DISPLAY=:99 notebooklm doctor        # "All checks passed" = OK
    pkill x11vnc                         # tat VNC sau khi xong (Xvfb giu lai cho systemd)
    ```
  - Kiểm tra auth: `DISPLAY=:99 notebooklm auth check`; `DISPLAY=:99 notebooklm doctor`.

### File `.env` (tại `/root/dsafdfd/auto-content-app/.env`) — các biến quan trọng
```
PORT=8787
APP_TOKEN=11261320                         # Make gui Bearer 11261320 (NEN doi dai hon)
PUBLIC_BASE_URL=http://103.72.57.56:8787   # de tao link file cho Make tai
OUT_DIR=./out
DEFAULT_KINDS=video,mindmap                 # khi ten file khong khai [..]
PROVIDER_ORDER=notebooklm-py,surfsense
ENABLE_NOTEBOOKLM_PY=true
NOTEBOOKLM_PY_BIN=/root/.local/bin/notebooklm
NOTEBOOKLM_HL=vi                            # NGON NGU dau ra = tieng Viet
RESULT_WEBHOOK_URL=https://hook.eu1.make.com/xofr9322lmuq62gdg5lhh5buv2wkejxs   # callback async
SURFSENSE_MODE=make                         # surfsense chi la fallback (chua dung)
```
> App đọc `.env` qua `src/loadenv.mjs` (GHI ĐÈ process.env — miễn nhiễm env tồn đọng).

### Test nhanh trên VPS
```bash
curl -s http://localhost:8787/health    # {"ok":true}
# dong bo (cho ket qua trong response):
curl -s -X POST "http://localhost:8787/generate" -H "Authorization: Bearer 11261320" -H "Content-Type: application/json" -d '{"filePath":"/root/test.txt","title":"t","kinds":"mindmap"}'
# async (tra ve 202 ngay, callback webhook khi xong):
curl -s -X POST "http://localhost:8787/generate?async=1" -H "Authorization: Bearer 11261320" -H "Content-Type: application/json" -d '{"filePath":"/root/test.txt","title":"t","kinds":"mindmap,pptx,image"}'
```

---

## 2. Make (orchestration) — team `1212779`, org `6869768`

### Scenario 1 — id `6325429` "auto-content 1 — Drive → VPS /generate (async)" (ACTIVE)
- Module 1 `google-drive:watchFilesInAFolder` (conn 8523077, folder input) — quét mỗi 900s.
- Module 2 `google-drive:getAFile` — tải bytes file.
- Module 3 `http:ActionSendData` POST `http://103.72.57.56:8787/generate` với qs `async=1`, `filename={{1.name}}`, `title={{1.name}}`, header `Authorization: Bearer 11261320`, body raw `{{2.data}}`. Trả 202 ngay → KHÔNG timeout.

### Scenario 2 — id `6327587` "auto-content 2 — webhook ket qua → Drive" (ACTIVE)
- Module 1 `gateway:CustomWebHook` (hook `3292485`, URL `https://hook.eu1.make.com/xofr9322lmuq62gdg5lhh5buv2wkejxs`).
- Module 2 `google-email:ActionSendEmail` (conn 5815303) → email tóm tắt tới `pdanh025@gmail.com`.
- Module 3 `builtin:BasicFeeder` lặp `{{1.files}}`.
- Module 4 `http:ActionSendData` GET `{{3.url}}` tải từng file.
- Module 5 `google-drive:uploadAFile` (conn 8523077) → upload vào folder output, filename `{{3.name}}`, data `{{4.data}}`.

> Lưu ý module HTTP (legacy) BẮT BUỘC có đủ cờ bool: serializeUrl, shareCookies, rejectUnauthorized, followRedirect, followAllRedirects, useQuerystring, gzip, useMtls (đều false trừ rejectUnauthorized/followRedirect/gzip=true). timeout=300.

### IDs Make
| Thứ | Giá trị |
|---|---|
| Team / Org | `1212779` / `6869768` |
| Connection Google Drive (pdanh025) | `8523077` |
| Connection Google email (pdanh025, type google) | `5815303` |
| Connection Gmail (google-email) | `5813497` *(KHÔNG dùng cho ActionSendEmail — module cần type `google`)* |
| Webhook hook id / URL | `3292485` / `https://hook.eu1.make.com/xofr9322lmuq62gdg5lhh5buv2wkejxs` |
| Drive folder **input** | `1ErjgXd1K8kTRtxGJIJ-ZHGThHknyN9G0` (trong Drive pdanh025) |
| Drive folder **output** | `152CFCrPKhyE_xhEkNfGgg5viNxFVF_i6` (trong Drive pdanh025) |
| Email nhận | `pdanh025@gmail.com` |

---

## 3. Cách dùng hằng ngày
1. Thả file (txt/pdf — KHÔNG nên .docx) vào Drive **input**.
2. Đặt tên kèm loại: `Tên bài [mindmap,pptx,video].pdf` (loại: video, audio, mindmap, pptx, pdf, image).
   - Không khai → dùng `DEFAULT_KINDS`.
3. Scenario 1 quét mỗi 15 phút (hoặc bấm **Run once**) → app sinh ở nền → vài phút sau file vào Drive **output** + email.
- Thời gian: mindmap ~1', pptx/image ~3' mỗi loại, video/audio 5–15'. Nhiều loại = cộng dồn.

## 4. Code (trong `auto-content-app/src/`)
- `server.mjs` — HTTP: `/health`, `/kinds`, `/files/<rel>` (phục vụ file, có xử lý lỗi stream + Content-Length), `POST /generate` (JSON hoặc raw body; `?async=1` → 202 + chạy nền `runJobAsync` → callback `RESULT_WEBHOOK_URL`). Có `uncaughtException/unhandledRejection` guard.
- `loadenv.mjs` — nạp `.env` GHI ĐÈ (import đầu tiên).
- `orchestrator.mjs` — tách segment + fallback theo TỪNG loại qua các provider.
- `providers/notebooklmPy.mjs` — provider chính. MAP loại→lệnh CLI:
  - generate có `--wait --timeout` cho video/audio/slide-deck/infographic (mặc định CLI là `--no-wait`!).
  - mindmap: `generate mind-map --kind note-backed --language vi` (đồng bộ); download `mind-map`.
  - slide-deck: download cần `--format pptx|pdf`.
  - image = `infographic`.
  - **mindmap tự render thêm HTML + PNG** (qua `mindmaphtml.mjs` + puppeteer-core/chromium); output là MẢNG [png, html].
  - Tên file kết quả = `<tên file input> - <loại>.<ext>` (hàm baseName).
- `mindmaphtml.mjs` — JSON mindmap → markdown → HTML markmap (`renderMindmapHtml`) + chụp PNG (`renderMindmapPng` dùng chromium).
- `kinds.mjs`, `segments.mjs`, `util.mjs` — chuẩn hoá loại, tách marker, chạy CLI.
- `providers/{nlmCli,surfsense}.mjs` — provider B (chưa cài) / C (surfsense, chỉ fallback).

## 5. Các bản vá đã làm (lịch sử quan trọng)
1. healthCheck dùng `auth check` (không phải `--test`).
2. Bỏ `--wait` sai cho mind-map; thêm `--wait`+`--format` đúng cho các loại khác.
3. `loadenv` ghi đè `.env` (sửa lỗi ENABLE bị kẹt false do env tồn đọng).
4. `/files` xử lý lỗi stream → hết crash/ECONNRESET; guard uncaughtException.
5. Đổi pm2 → **systemd** (hết tiến trình mồ côi/EADDRINUSE, sống lại sau reboot).
6. Ngôn ngữ `vi`; tên file theo input; mindmap ra PNG+HTML.
7. **Async** + webhook + Scenario 2 (Make không timeout với job dài/nhiều loại).

## 6. Sự cố thường gặp
- **App không lên / EADDRINUSE**: `systemctl restart autocontent`; nếu kẹt cổng: `fuser -k 8787/tcp; pkill -9 -f server.mjs` rồi restart.
- **Sinh ra tiếng Anh**: kiểm tra `NOTEBOOKLM_HL=vi` trong `.env` + restart.
- **NotebookLM lỗi auth**: đăng nhập lại qua VNC (mục 1).
- **Make timeout**: phải dùng `?async=1` (scenario 1 đã cấu hình). Đừng quay lại đồng bộ cho video.
- **.docx lỗi source**: đổi sang PDF.
- **Không thấy output**: chờ đủ thời gian sinh; xem `journalctl -u autocontent` có dòng `async xong` + `da callback webhook`; kiểm tra Scenario 2 History trên Make.

## 7. MCP cần kết nối (khi mở Claude Code chỗ khác)
- **GitHub** (hoặc git+gh) — repo `namngocna3-jpg/dsafdfd`.
- **Make** — org `6869768`, team `1212779` (sửa scenario/hook).
- **Google Drive** — account `namngocna3@gmail.com` (tạo/kiểm thư mục) — LƯU Ý: folder app dùng nằm trong Drive `pdanh025`, MCP namngocna3 không thấy; thao tác folder pdanh025 làm tay.
- Không dùng Vercel (app cần server dài hạn + chromium, không chạy serverless).

## 8. Tùy chọn còn lại
- Thêm loại **`report`** (NotebookLM `generate report` → markdown) vào `kinds.mjs` + MAP.
- Đổi `APP_TOKEN` dài hơn (sửa cả `.env` VPS lẫn header Bearer trong Scenario 1 module 3).
- Xuất video/audio đã verify lệnh nhưng CHƯA chạy thực tế end-to-end (mới test mindmap/pptx/image). Nên test 1 lần `[video]` để chắc regex/lệnh.

## 9. Câu mở khi tiếp tục ở phiên mới
> "Đọc `auto-content-app/HANDOFF_2.md` repo `namngocna3-jpg/dsafdfd`. Hệ thống auto-content (Drive→VPS NotebookLM→Drive, async qua 2 Make scenario) đang chạy. VPS 103.72.57.56 (systemd: autocontent + xvfb). Giúp tôi [việc cần]."

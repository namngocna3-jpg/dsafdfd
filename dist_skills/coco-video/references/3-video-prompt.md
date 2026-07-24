# BƯỚC 3 · SINH PROMPT VIDEO (chuyển động / camera / timing)

> Nhiệm vụ: với mỗi block, biến ảnh khung-đầu (bước 2) thành 1 **prompt video**. Prompt video CHỈ tả **chuyển động** — không tả lại frame tĩnh (model đã có ảnh khung đầu).
>
> **Tách lời nói khỏi video (Higgsfield):** prompt video KHÔNG chứa thoại/narration. Clip chỉ có âm môi trường/SFX. Lời dẫn sinh riêng (bước 1) để tránh lip-sync giả.

---

## A. NGUYÊN TẮC IMAGE-TO-VIDEO (từ Higgsfield)

```
Khung đầu (start-image) → khóa frame đầu tiên (ảnh bước 2)
Prompt video           → CHỈ mô tả MOTION, không tả lại cảnh tĩnh
```

- **Camera verbs:** zooms in, dollies left/forward, sweeping pan, slow push-in, fast whip, orbit around, tracking shot, crane rising, static shot, shallow depth of field.
- **Subject motion:** "the dancer spins", "smoke rises slowly", "water droplets splash outward", "cape flutters in the wind".

---

## B. KHỐI PROMPT VIDEO 5 TRƯỜNG (từ Higgsfield — công thức lõi)

Dùng cho mỗi block. Đây là khung chống style-drift + tách âm mạnh nhất:

```
Block N
STYLE REFERENCE: Match the attached reference image EXACTLY. Replicate its look precisely: {STYLE tokens}. Every element rendered in that identical style.
SCENE: {đúng MỘT hành động rõ ràng, khớp mô tả hình của block N}.
MOTION: {chuyển động camera + hành vi animation — slow push-in, drift, scale shock, hard contrast cut}.
AUDIO: {âm môi trường/SFX/nhạc-tính — KHÔNG voice, dialogue, narration}.
NEGATIVE: color drift, photorealism (nếu phi-thực), 3D render, lip-sync, captions, on-screen text, logos, watermark{, cấm riêng theo style}.
```

Giải thích 5 trường:
- **STYLE REFERENCE** — lặp lại y hệt STYLE tokens ở MỌI block để chống trôi phong cách. (STYLE lấy từ `references/style-library.md` hoặc bước 4.)
- **SCENE** — đúng 1 hành động, khớp block. Không thêm sự kiện.
- **MOTION** — camera + animation. Cụ thể tốc độ ("very slow push-in", "grain by grain").
- **AUDIO** — chỉ ambient/SFX. **Cấm tuyệt đối voice/dialogue/narration.**
- **NEGATIVE** — cấm style drift + realism sai + lip-sync/caption/text/logo/watermark.

---

## C. KHUNG PROMPT VIDEO GỌN (từ Topview — khi model đơn giản)

Nếu render bằng model chỉ nhận prompt phẳng (không cần 5 trường):
```
Structure: Subject + Action + Environment + Style + Camera
```
VD: `The perfume bottle rotates slowly on wet black stone, water droplets splash outward in slow motion, dark premium studio, cinematic, camera orbits 180 degrees around it`

---

## D. THAM SỐ THEO LOẠI TASK (từ Topview)

| Loại | Khi nào | Tham số then chốt |
|---|---|---|
| **i2v** (image-to-video) | có ảnh khung đầu (mặc định ở pipeline này) | `first-frame` = ảnh bước 2; option `end-frame` cho chuyển cảnh |
| **t2v** (text-to-video) | không có ảnh, tả thẳng từ text | chỉ prompt + model |
| **omni** (reference) | áp style từ ảnh/video tham chiếu | tham chiếu bằng `<<<Image1>>>` / `<<<Video1>>>` trùng tên input |

**Cú pháp omni (Topview):** `"Apply the color style from <<<Image1>>> to <<<Video1>>>"`.

**Neo frame (Higgsfield):** `--start-image` (frame đầu), `--end-image` (frame cuối) để neo chuyển cảnh mượt giữa 2 block.

---

## E. TIMING & THỜI LƯỢNG

- Mỗi block ~10s (hoặc theo thời lượng chốt). Ràng buộc duration theo model — xem `references/model-catalog.md`.
- Seedance 2.0: 4–15s. Kling: 3–15s. Veo 3.1: chỉ 4/6/8s. Grok: 2–15s.
- Nếu clip render ngắn hơn block → khâu dựng căn giữa; dài hơn → tăng tốc nhẹ (không kéo giãn hình).

---

## F. BẢNG ÁNH XẠ (Việt → tag EN, khi cần)

**Cỡ cảnh:** toàn cảnh → wide/establishing shot · trung → medium shot · cận → close-up · đặc tả → extreme close-up.
**Chuyển động máy:** đẩy chậm → slow push-in/dolly in · lùi → dolly out · lia → pan · quét → sweeping pan · xoay quanh → orbit/arc · bám → tracking shot · cẩu lên → crane up · tĩnh → static/locked shot.
**Nhịp cắt:** cắt cứng → hard cut · chuyển mờ → dissolve · sốc phóng to → scale shock.

---

## G. TEMPLATE XUẤT (mỗi block 1 prompt video)

```
BLOCK N — Prompt VIDEO (EN):
STYLE REFERENCE: ...
SCENE: ...
MOTION: ...
AUDIO: ...
NEGATIVE: ...
[loại: i2v · first-frame: ảnh block N · duration: 10s · model: <X>]
```

Với model phẳng, thay bằng dòng gọn mục C + ghi rõ loại/duration/model.

---

→ Xong bước 3. Kiểm tra tính nhất quán xuyên block bằng `references/4-consistency.md`.

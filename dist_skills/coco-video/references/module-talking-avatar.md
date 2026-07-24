# MODULE · TALKING AVATAR (ảnh chân dung + text → video người nói)

> Gọi bằng `--module talking`. Nhiệm vụ: từ 1 ảnh chân dung (hoặc mô tả người mẫu) + 1 đoạn lời → sinh bộ sản phẩm cho video **người nói trực diện** (presenter/avatar). Hợp tab **Real Human** (Coco) và khóa **CONTENT & VIDEO**.
>
> Học từ Topview avatar4 (talking head, segment ≤120s) + Higgsfield (tách lời khỏi hình, lipsync ở khâu render).

---

## A. KHÁC GÌ PIPELINE LÕI

| | Pipeline lõi (4 bước) | Talking avatar |
|---|---|---|
| Trung tâm | cảnh/sản phẩm chuyển động | **1 người nói**, ít chuyển động |
| Lời | narration đọc ngoài (voice-over) | **lời khớp miệng** người trên hình (lipsync render) |
| Số block | ⌈giây/10⌉ | cắt theo **segment ≤120s**/lần, mỗi segment 1 đoạn lời |
| Ảnh | khung đầu mỗi cảnh | **1 ảnh chân dung khóa mặt** (dùng lại mọi segment) |

---

## B. WIZARD MODULE (cổng chốt riêng)

1. **Nguồn mặt:** có ảnh chân dung sẵn không, hay tả người mẫu để sinh ảnh? (nếu người thật cần eKYC ở Coco — Real Face).
2. **Kịch bản lời:** đưa text sẵn hay để tôi viết theo Hook→Body→CTA? (nếu viết → gọi `module-voice-sales.md`).
3. **Bối cảnh & khung:** nền gì (studio/văn phòng/ngoài trời) · tỉ lệ (9:16 social / 16:9) · cỡ cảnh (bán thân/cận).
4. **Giọng:** đọc thật hay TTS? giới tính/tông giọng? (chi tiết `module-voice-sales.md`).

Chốt đủ 4 → sinh.

---

## C. SINH GÌ

### 1. Prompt ẢNH chân dung khóa mặt (dùng lại mọi segment)
```
<a [Vietnamese] [female/male] presenter, [mô tả tuổi/trang phục/thần thái]>, <bối cảnh: clean studio background>, medium close-up, eye-level, soft even lighting, catchlight in eyes, photorealistic, natural skin texture, tack sharp
```
- Đây là **ảnh neo identity** — mọi segment dùng LẠI ảnh này (hoặc reference_id nếu train soul-id).
- Không đổi trang phục/tóc/nền giữa các segment.

### 2. Kịch bản lời chia SEGMENT
- Cắt lời thành các segment ≤120s (thực tế social nên 15–60s).
- Mỗi segment: 1 ý trọn vẹn, câu nói ngắn, đọc tự nhiên.
- Verbatim: lời render 100% khớp text (không thêm bớt khi lipsync).

### 3. Prompt VIDEO talking (mỗi segment)
```
SEGMENT N (talking head)
STYLE REFERENCE: match attached portrait EXACTLY, same face/outfit/background.
SCENE: the presenter speaks to camera, natural facial expression, subtle head movement, occasional hand gesture.
MOTION: mostly static framing, gentle breathing motion, natural blinking, lips synced to provided audio.
AUDIO: <voice-over segment N — nối từ file lời/TTS>.
NEGATIVE: face morphing, identity drift, background change, extra people, on-screen text, distorted hands.
[loại: talking-avatar · portrait: ảnh mục 1 · audio: segment N · duration: <giây>]
```

---

## D. LUẬT GIỮ MẶT (quan trọng nhất)

- **1 ảnh chân dung = 1 identity**, dùng lại toàn bộ. Nếu cần chắc hơn → train soul-id (reference_id) khi render thật.
- NEGATIVE luôn có: `face morphing, identity drift`.
- Trang phục/tóc/nền **khóa cứng** — mô tả 1 lần, không đổi.
- Cỡ cảnh giữ ổn định (talking head không nên đổi góc liên tục).

---

## E. RÀNG BUỘC & GHI CHÚ

- Segment ≤120s/lần (Topview avatar4). Video dài → nhiều segment nối ở khâu dựng.
- Coco tab Real Human: cần **eKYC (Real Face)** với người thật; người mẫu AI thì không.
- Lipsync render ở model đích (Coco/Topview avatar) — skill chỉ sinh prompt + tách lời + ảnh neo.
- Audio: xem `module-voice-sales.md` để viết lời + chọn giọng.

→ Cần lời bán hàng → `module-voice-sales.md`. Cần khóa mặt sâu → `4-consistency.md` (Lớp 1 soul-id).

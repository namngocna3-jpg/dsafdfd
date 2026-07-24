# BƯỚC 2 · SINH PROMPT ẢNH KHUNG-ĐẦU (first frame)

> Nhiệm vụ: với mỗi block trong kịch bản (bước 1), sinh 1 **prompt ảnh** làm **khung hình đầu tiên** của clip. Ảnh này là điểm neo để bước 3 (video) làm động.
>
> Nguyên tắc tối cao (Toonflow): **"Sinh prompt = chuyển format, không sáng tác."** Bảng phân cảnh là nguồn DUY NHẤT. Không thêm yếu tố không có trong kịch bản.

---

## A. NHẬN DIỆN "KHUNG ĐẦU" (từ Toonflow)

Ảnh phân cảnh = **frame đầu** của video. Xử lý theo loại mô tả trong block:

| Loại mô tả trong block | Cách lấy khung đầu |
|---|---|
| Khoảnh khắc tĩnh (đứng nhìn, dừng lại) | Sinh thẳng theo mô tả |
| Quá trình động (chém kiếm, quay đi, orbit) | Lấy **trạng thái đông cứng của khoảnh khắc KHỞI ĐẦU** động tác |
| Có chuyển động máy (đẩy tới trung cảnh) | Lấy **cỡ cảnh ĐẦU** làm khung đầu |

VD block "orbit 180° quanh chai" → khung đầu = chai nhìn từ góc bắt đầu orbit, tĩnh.

---

## B. KHUNG PROMPT ẢNH (từ Higgsfield — 4 trường)

```
<Subject + Setting + Style>, <Camera>, <Lighting>, <Medium/Quality>
```

| Trường | Chở gì | Ví dụ |
|---|---|---|
| **Subject + Setting + Style** | chủ thể + bối cảnh + không khí (dài nhất, thân chính) | "a luxury glass perfume bottle on a wet reflective black stone surface, moody premium atmosphere" |
| **Camera** | ống kính, góc, cỡ cảnh | "85mm, low angle, medium close-up" |
| **Lighting** | không khí ánh sáng (đoạn RIÊNG) | "dramatic golden rim light, soft highlights" |
| **Medium/Quality** | chất liệu + từ chất lượng | "high-end commercial photograph, hyper-detailed, tack sharp, 1080p" |

**Phân bổ (Toonflow):** đoạn Subject dài nhất, đoạn Style/Quality ngắn nhất. Nếu từ phong cách dài hơn mô tả nội dung → prompt hỏng.

---

## C. LUẬT VÀNG PROMPT ẢNH

1. **< 200 token.** Prompt quá dài làm model distort.
2. **Cụ thể, giác quan** (concrete, sensory). Model thưởng chi tiết cảm quan thật.
3. **Negative diễn đạt DƯƠNG** (đa số model ảnh không có negative field):
   - "no blur" → **"tack sharp"**
   - "no people" → **"uninhabited"**
   - "not dark" → **"bright, well-lit"**
4. **KHÔNG viết ngoại hình nhân vật vào đây nếu có tài sản/ảnh tham chiếu** — dùng `@ref` (mục D). Nếu nhân vật MỚI chưa có ảnh, mới tả ngoại hình 1 lần rồi khóa (xem bước 4).
5. **Giữ đủ mọi yếu tố thị giác** của "mô tả hình" trong block. Sinh xong so lại: thiếu 1 yếu tố = prompt vô hiệu.
6. **Từ cấm làm mờ ảnh** (dùng gây xuống cấp chất lượng): tránh `film grain`, `imperfect focus`, lạm dụng `blurry background`. Nội dung có thể "không hoàn hảo" nhưng ẢNH phải sắc nét.
7. **Aspect ratio:** 16:9 cinematic/landscape · 9:16 vertical/social · 1:1 profile · dán theo tham số đã chốt.

---

## D. GÁN ẢNH THAM CHIẾU `@ref` (giữ nhất quán — từ Toonflow `@图N`)

Khi block có nhân vật/cảnh đã có ảnh tài sản (hoặc dùng lại từ block trước):
- Mở prompt bằng tiền tố gán: `@ref1 = <tên nhân vật/cảnh>, @ref2 = <...>`
- Trong thân prompt, **mọi chỗ đáng lẽ ghi tên nhân vật → thay bằng `@ref1`**.
- Mục đích: buộc trực tiếp ảnh tham chiếu với chủ thể, tránh mơ hồ khi model tự bịa mặt mới.

VD: `@ref1 = nữ chính Lan. @ref1 stands at the window, soft smile, looking left, medium close-up, warm window light, cinematic photo, tack sharp`

> Chi tiết cơ chế nhất quán ở `references/4-consistency.md`.

---

## E. HAI CHẾ ĐỘ THEO MODEL (từ Toonflow)

| Chế độ | Model | Ngôn ngữ prompt | Negative | Ảnh ref |
|---|---|---|---|---|
| **A — Seedream/Seedance (doubao)** | Seedance, Doubao | Tiếng Trung hoặc Anh | Không có negative field | Dùng `@图N` / `@refN` trong prompt |
| **B — Nano Banana (Gemini) / GPT Image 2** | Nano Banana, GPT Image 2 | Tiếng Anh (có thể JSON) | Có field `negative` | Ảnh ref là input đa phương thức |

Mặc định xuất **tiếng Anh** để dùng được cả 2. Nếu người dùng render bằng Seedance thuần Trung → tôi dịch prompt sang tiếng Trung khi họ yêu cầu.

---

## F. IMAGE-TO-IMAGE (nếu chỉnh từ ảnh có sẵn — từ Higgsfield)

Khi đầu vào là 1 ảnh cần biến đổi → **mô tả CÁI THAY ĐỔI, đừng tả lại ảnh gốc**:
- Sai: "a man with brown hair in a leather jacket, made into anime"
- Đúng: "transform into anime style, vibrant colors, soft cel shading"

---

## G. AN TOÀN (tránh bị chặn)

Tránh: người nổi tiếng thật (tên riêng), nội dung nhạy cảm, thương hiệu/nhân vật có bản quyền. Với Real Human/eKYC (tab Coco 6): mô tả người mẫu chung ("a Vietnamese female model"), khâu render thật cần consent + eKYC.

---

## H. TEMPLATE XUẤT (mỗi block 1 prompt ảnh)

```
BLOCK N — Prompt ẢNH (EN):
[@ref bindings nếu có]
<Subject + Setting + Style>, <Camera>, <Lighting>, <Medium/Quality>
[negative: <nếu model có field negative>]
```

---

→ Xong bước 2, chuyển sang `references/3-video-prompt.md` để làm ảnh khung-đầu này CHUYỂN ĐỘNG.

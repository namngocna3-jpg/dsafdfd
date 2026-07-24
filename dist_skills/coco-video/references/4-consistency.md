# BƯỚC 4 · GIỮ NHẤT QUÁN NHÂN VẬT & PHONG CÁCH (xuyên mọi block)

> Nhiệm vụ: đảm bảo nhân vật KHÔNG "nhảy mặt", phong cách KHÔNG trôi, vị trí KHÔNG nhảy chỗ qua các block. Đây là thứ tách "video AI trông giả" khỏi "video AI dùng được".
>
> Có **3 lớp anchor**, chọn theo bài toán: (1) Soul-ID train identity, (2) Style-key + STYLE lặp, (3) `@ref` binding + khóa vị trí.

---

## LỚP 1 · SOUL-ID — train 1 identity từ khuôn mặt (từ Higgsfield)

Dùng khi cần **cùng một khuôn mặt** xuất hiện nhiều video (nhân vật thương hiệu, founder, người mẫu lặp).

**Quy trình (cần API render thật — ghi ra để người dùng làm trên Coco/Higgsfield):**
1. **Name** — 1 từ để tham chiếu về sau (VD "lan", "founder").
2. **Photos** — 5–20 ảnh khuôn mặt, đa dạng góc + ánh sáng.
3. **Variant** — bản cho ảnh (soul-2) hoặc bản cinematic (cho video/talking-head dài).
4. Submit → nhận **`reference_id`** (dùng lại vĩnh viễn).
5. Mọi lần cần mặt đó: truyền `reference_id` vào prompt/generate.

**Triết lý:** "Train identity once, reuse forever." Ở v1 (chưa nối API), skill sẽ **đánh dấu chỗ cần soul-id** và mô tả nhân vật đủ chi tiết để khóa (Lớp 3), sẵn sàng thay bằng reference_id khi render.

---

## LỚP 2 · STYLE-KEY + STYLE DESCRIPTOR LẶP (từ Higgsfield)

Giữ **phong cách** nhất quán (đặc biệt video phi-thực: anime, vector, illustration).

**2 thứ dán vào MỌI block:**
1. **1 style-key image** — 1 ảnh mẫu phong cách, đính (attach) vào mọi clip làm reference.
2. **1 STYLE descriptor y hệt** — chuỗi token phong cách, dán nguyên văn vào trường STYLE của mọi block.

**Template STYLE descriptor** (viết 1 lần, luôn kết bằng chuỗi khóa loại nếu phi-thực):
```
<style tokens>, non-photorealistic, illustrated, not a photo, no live-action, no realism
```
Ví dụ có sẵn ở `references/style-library.md`. Nếu video là thực (Real Human, TVC sản phẩm) thì BỎ chuỗi non-realism, thay bằng `photorealistic, cinematic, commercial grade`.

**Chống drift:** không được đổi 1 từ nào trong STYLE giữa các block. Sao chép nguyên văn.

---

## LỚP 3 · `@ref` BINDING + KHÓA VỊ TRÍ/HƯỚNG NHÌN (từ Toonflow)

Dùng cho mọi video có nhân vật, kể cả chưa train soul-id.

### 3a. Gán `@ref` (buộc ảnh ↔ chủ thể)
- Mỗi block mở bằng tiền tố: `@ref1 = <tên nhân vật>, @ref2 = <cảnh/đạo cụ>`
- Trong thân prompt, mọi chỗ ghi tên nhân vật → thay bằng `@ref1`.
- Nhân vật tái xuất ở block sau → dùng LẠI đúng `@ref1` + đúng mô tả khóa.

### 3b. Bảng khóa nhân vật (CAST — viết 1 lần, dùng mọi block)
```
CAST:
- @ref1 (Lan): nữ, tóc đen dài ngang vai, áo blazer be, mắt nâu — GIỮ CỨNG mọi block
- @ref2 (Minh): nam, tóc ngắn, áo sơ mi trắng — GIỮ CỨNG
```
Đặc điểm khóa: giới tính, kiểu tóc/màu tóc, trang phục chính, dấu hiệu nhận diện. **Không đổi giữa các block.**

### 3c. Khóa VỊ TRÍ & HƯỚNG NHÌN (chống nhảy chỗ/xoay mặt vô lý)
- **Hướng nhìn** lấy theo ưu tiên: mô tả block ghi rõ → quan hệ không gian 2 nhân vật (giữ đường trục 180°) → gợi ý cỡ cảnh → logic cảm xúc.
- **Khóa trái/giữa/phải:** cùng nhân vật trong cùng cảnh giữ nguyên vị trí, không nhảy bên. Đổi bên phải có động tác quay người/di chuyển kèm theo.
- **Gương/mặt nước:** ảnh phản chiếu lật trái-phải so với thực thể — ghi rõ quan hệ khi có.

---

## QUY TẮC CHỌN LỚP NÀO

| Bài toán | Lớp dùng |
|---|---|
| Video sản phẩm/cảnh vật, không có người | Lớp 2 (STYLE lặp) |
| Có nhân vật nhưng chỉ trong 1 video này | Lớp 2 + Lớp 3 |
| Nhân vật thương hiệu lặp qua nhiều video | Lớp 1 (soul-id) + Lớp 2 + Lớp 3 |
| Phong cách phi-thực (anime/vector) | Lớp 2 bắt buộc (STYLE + style-key) |

---

## XUẤT KHỐI NHẤT QUÁN (dán đầu bộ sản phẩm, trước Block 1)

```
#### NHẤT QUÁN (dán vào mọi block)
STYLE: <STYLE descriptor — copy nguyên văn vào trường STYLE mọi block>
STYLE-KEY: <mô tả/đường dẫn ảnh mẫu phong cách, nếu có>
CAST:
- @ref1 (<tên>): <đặc điểm khóa cứng>
SOUL-ID: <đánh dấu nhân vật nào cần train reference_id khi render thật>
```

---

## CHECKLIST TỰ KIỂM (chạy cuối, trước khi giao)

- [ ] STYLE giống HỆT nhau ở mọi block? (không lệch 1 từ)
- [ ] Mỗi nhân vật giữ đúng đặc điểm khóa (tóc/trang phục/giới) mọi block?
- [ ] `@ref` gán nhất quán, không đổi số giữa các block?
- [ ] Vị trí trái/giữa/phải nhân vật không nhảy vô cớ?
- [ ] Video phi-thực: mọi block có chuỗi non-realism trong NEGATIVE?
- [ ] Nhân vật ở trường không tự biến mất giữa các block?

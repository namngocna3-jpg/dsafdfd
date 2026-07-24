# BƯỚC 1 · IDEAL → KỊCH BẢN PHÂN CẢNH + NARRATION

> Nhiệm vụ: đóng vai **đạo diễn kể chuyện**, cắt 1 *ideal* (concept) thành kịch bản phân cảnh có cấu trúc + viết lời dẫn (narration) từng block. Đây là "bản thiết kế" cho bước 2 (ảnh) và bước 3 (video).

---

## A. CẤU TRÚC ĐẦU RA 3 TẦNG (từ Toonflow)

```
## CẢNH N: <tên cảnh> ｜ Vai: <A, B...>        ← CẢNH (theo địa điểm/thời gian/không khí)
   ### Block N (~10s)                           ← BLOCK = đơn vị 10 giây, khớp 1 narration ↔ 1 clip
   - Tài sản tham chiếu: [tên nhân vật/cảnh, id]  ← để ở cấp block (không phải từng dòng)
   - Mô tả hình: <ai làm gì, tư thế, biểu cảm, biến hóa trạng thái>
   - Cỡ cảnh: <toàn/trung/cận/đặc tả>
   - Chuyển động máy: <đẩy chậm/lia/orbit/tĩnh>
   - Narration (lời dẫn): "<20–24 từ>"
   - Âm hiệu: <âm môi trường / SFX — KHÔNG nhạc nền>
```

**Block 10 giây là xương sống** (Higgsfield). Công thức: `N block = ⌈thời lượng / 10⌉`. Map cứng: **Block N narration ↔ Block N clip**, không lệch.

---

## B. THIẾT QUÂN LUẬT (ưu tiên khi xung đột — từ Toonflow)

> Narration không sửa **>** Nhân vật xuất hiện đầy đủ **>** Chỉ mô tả hành động-trạng thái **>** Quy tắc tách block

1. **Mỗi block ≤10 giây.** Quá tải nội dung → cắt thêm block.
2. **1 block = 1 hành động rõ ràng.** Không nhồi 2-3 sự kiện vào 1 block (model video sẽ rối, mặt/tay lỗi).
3. **Narration ~20–24 từ/block** (150 từ/phút, 10s ≈ 8–9s đọc). Số viết ra chữ ("một trăm" không phải "100"). Không bao giờ nói "trong video này".
4. **Narration là văn NÓI, không phải văn viết.** Câu ngắn, ngắt nghỉ tự nhiên, hook → build → payoff.
5. **Nhân vật tại trường không được biến mất.** Ideal không viết "X rời đi" thì X vẫn ở đó (nền/bóng mờ/cảnh phản ứng).
6. **Ngoại hình nhân vật KHÔNG viết vào mô tả block** — giao cho bước 4 (nhất quán) + tài sản ảnh. Ở đây chỉ tả *hành động/tư thế/biểu cảm/trạng thái* (mồ hôi, áo xộc xệch...).
7. **Âm thanh chỉ 2 loại: âm môi trường + âm hiệu (SFX).** CẤM BGM/nhạc nền trong mô tả clip (nhạc ghép ở khâu dựng).
8. **Cỡ cảnh/góc máy 2 block kề nhau nên lệch nhau** (tránh nhàm): cận → trung → toàn xen kẽ.
9. **"Cho xem, đừng kể"** — ưu tiên hành động thị giác thay vì narration giải thích. Narration bổ sung cảm xúc/thông tin, không mô tả lại y hệt hình.

---

## C. CHUYỂN TIẾP GIỮA BLOCK (chống giật — từ Toonflow)

Để video mượt, không "nhảy cóc":
- **Cầu nối hành động:** cuối block A là "trạng thái khởi đầu" của động tác, đầu block B là "đang diễn ra". (Sai: A "nắm chuôi kiếm" → B "xông lên". Đúng: A "tay siết chuôi kiếm, khớp trắng bệch" → B "kiếm choang rời vỏ".)
- **Tiếp sức cảm xúc:** cuối A dùng ánh mắt/vi biểu cảm dọn đường cho bùng nổ đầu B.
- **Liên kết ánh nhìn/âm thanh:** dùng cảnh trống, hướng nhìn, hoặc âm thanh cuối A kéo dài sang đầu B để nối 2 không gian.

---

## D. QUY TRÌNH LÀM (6 bước tuyến tính)

1. **Đọc ideal 1 lần** (nói về gì + tóm tắt cảnh). Xác định: thông điệp cốt lõi, số cảnh gốc, có nhân vật lặp không.
2. **Chốt số block** = ⌈thời lượng/10⌉. Phân bổ các cảnh gốc của ideal vào các block. 1 cảnh ideal có thể thành 1 hoặc nhiều block.
3. **Viết narration trước** (hoặc song song): mỗi block 1 dòng 20–24 từ, mạch hook→build→payoff, khớp hành động block đó.
4. **Điền bảng phân cảnh** cho từng block: mô tả hình, cỡ cảnh, chuyển động máy, âm hiệu. Thiết kế chuyển tiếp (mục C).
5. **Tự kiểm red-line:** đủ block? mỗi block 1 hành động? narration đúng độ dài? nhân vật không biến mất? không có nhạc nền? không tả ngoại hình?
6. **Xuất kịch bản** theo cấu trúc mục A.

---

## E. TEMPLATE NARRATION (xuất riêng, sạch — từ Higgsfield)

```
Block 1
<một câu 20–24 từ, mở bằng hook>
Block 2
<một câu build tiếp>
Block 3
<một câu payoff / chốt thông điệp>
```
Quy tắc: 1 dòng/block · chỉ text thoại thuần (không timecode, không cue cảm xúc, không chỉ đạo sân khấu) · số viết ra chữ.

---

## F. VÍ DỤ (ideal "Branded Video — Nước hoa nở giữa đêm", 8s → 1 block, hoặc kéo 20s → 2 block)

**Nếu 8s (1 block):**
```
## CẢNH 1: Studio tối, bàn đá đen ướt ｜ Vai: (không có người) — chủ thể: chai nước hoa
   ### Block 1 (~8s)
   - Tài sản tham chiếu: [chai nước hoa cao cấp]
   - Mô tả hình: giọt nước rơi chạm mặt đá đen ướt tạo gợn sóng; chai nước hoa từ bóng tối trồi lên, ánh viền vàng quét dọc thân chai; giọt nước bắn tung quanh chai
   - Cỡ cảnh: cận → trung
   - Chuyển động máy: orbit 180° chậm quanh chai
   - Narration: "Một mùi hương sang trọng, dựng nên chỉ trong vài giờ — không cần cả một ê-kíp quay suốt một tuần."
   - Âm hiệu: tiếng giọt nước, tiếng ngân trầm nhẹ
```

**Nếu kéo 20s (2 block):** tách "giọt nước + chai trồi lên" (block 1) và "orbit + chốt logo" (block 2), mỗi block 1 dòng narration riêng.

---

→ Xong bước 1, chuyển sang `references/2-image-prompt.md` để sinh prompt ẢNH khung đầu cho từng block.

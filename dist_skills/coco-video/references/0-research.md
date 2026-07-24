# CỔNG 0 · Ý ĐỒ + RESEARCH (chống bịa)

> Nhiệm vụ: chốt ĐÚNG "video nói về gì" và **không để lọt thông tin bịa** vào kịch bản. Đây là lớp mà 4 ông lớn đều có (Higgsfield có "research phase", Toonflow cấm bịa số/tên) mà v1 skill này thiếu.
>
> Triết lý: **thà để trống còn hơn bịa.** Video quảng cáo có 1 con số sai / 1 tuyên bố khống → hại thương hiệu thật, hoặc bị nền tảng gắn cờ.

---

## A. KHI NÀO CỔNG NÀY QUAN TRỌNG

| Mức | Dấu hiệu trong ideal | Xử lý |
|---|---|---|
| 🔴 Cao | Có **số liệu** ("giảm 50%", "1 triệu khách"), **giá**, **ngày**, **tên riêng/thương hiệu thật**, **tuyên bố y tế/tài chính** | BẮT BUỘC verify hoặc hỏi nguồn trước khi viết |
| 🟡 Vừa | Có tên sản phẩm, tính năng cụ thể | Hỏi xác nhận đúng tên/tính năng |
| 🟢 Thấp | Concept sáng tạo thuần (cảnh vật, cảm xúc, không tuyên bố thật) | Chỉ chốt ý đồ, không cần verify |

---

## B. QUY TẮC CHỐNG BỊA (từ Toonflow + Higgsfield)

1. **Không tự chế số liệu, giải thưởng, thứ hạng, năm, tên người.** Ideal không cho thì KHÔNG viết vào narration/overlay.
2. **Số liệu/tuyên bố thật** → nguồn đến từ người dùng. Nếu người dùng không cung cấp: hỏi, hoặc diễn đạt mềm ("nhanh hơn hẳn" thay vì "nhanh hơn 300%").
3. **Tên thương hiệu/sản phẩm** → dùng ĐÚNG chính tả người dùng đưa, không đoán.
4. **Người nổi tiếng thật** → không đưa tên riêng vào prompt ảnh/video (rủi ro bản quyền + bị chặn). Dùng mô tả chung.
5. **Khi cần thông tin ngoài** (VD "xu hướng 2026", "đối thủ đang làm gì") mà đáng để tra → có thể dùng WebSearch, **trích nguồn**, không phán bừa từ trí nhớ.

---

## C. QUY TRÌNH CỔNG 0

1. **Đọc/nghe ideal.** Rút ra 1 câu "nói về gì" + đối tượng xem + hành động mong muốn (mua/đăng ký/nhớ).
2. **Quét cờ đỏ:** có số/giá/ngày/tên/tuyên bố thật không? Liệt kê ra.
3. **Với mỗi cờ đỏ:** hỏi người dùng "cái này thật & có nguồn chứ?" hoặc đề xuất diễn đạt mềm.
4. **Nếu cần tra ngoài** (xu hướng, thuật ngữ ngành): WebSearch → tóm tắt có nguồn → hỏi người dùng dùng không.
5. **Chốt "nói về gì" 1 câu** đã duyệt → chuyển sang cổng tham số.

---

## D. CÂU HỎI MẪU

- "Video này để bán/giới thiệu cái gì, cho ai xem, và anh muốn người xem làm gì sau đó?"
- "Trong ý tưởng có nhắc con số/giá/tuyên bố — cái đó là thật và anh có nguồn không? Nếu chưa chắc, tôi diễn đạt mềm để khỏi bịa."
- "Tên thương hiệu/sản phẩm viết chính xác thế nào?"
- (Nếu cần tra) "Tôi tra nhanh <chủ đề> để cập nhật cho đúng nhé?"

---

## E. OUTPUT CỔNG 0

```
🎯 Ý ĐỒ ĐÃ CHỐT
- Nói về gì: <1 câu>
- Đối tượng: <ai>
- Hành động mong muốn: <mua/đăng ký/nhớ thương hiệu>
- Fact cần giữ đúng: <liệt kê số/tên/giá đã xác nhận — hoặc "không có">
- Cờ đã xử lý: <bịa gì đã bỏ / mềm hóa gì>
```

→ Xong Cổng 0, sang cổng tham số (`wizard-protocol.md`).

# MODULE · VOICE / NARRATION BÁN HÀNG (Hook → Body → CTA)

> Gọi bằng `--module voice`. Nhiệm vụ: viết **lời dẫn/voice-over kiểu bán hàng** cho video + hướng dẫn chọn giọng đọc/TTS. Dùng riêng, hoặc cắm vào pipeline lõi (thay narration) và module talking/product.
>
> Học từ Topview text2voice/voice + công thức content bán hàng. Narration vẫn theo luật lõi: **văn NÓI, số viết ra chữ, ~150 từ/phút**.

---

## A. CÔNG THỨC HOOK → BODY → CTA

| Phần | Nhiệm vụ | Độ dài | Bí quyết |
|---|---|---|---|
| **Hook** (2–3s đầu) | Chặn lướt, nêu vấn đề/lợi ích ngay | 1 câu, ~10–15 từ | Câu hỏi nhức nhối / con số / lời hứa. VD "Da khô mãi không hết dù đã thử đủ loại?" |
| **Body** | Giải pháp + bằng chứng + cảm xúc | 60–70% thời lượng | 1 lợi ích chính, 1–2 điểm hỗ trợ. "Cho xem đừng kể" — để hình khoe, lời chốt cảm xúc |
| **CTA** (2–3s cuối) | Kêu gọi hành động rõ ràng | 1 câu | Động từ + lợi ích + khẩn cấp nhẹ. VD "Chạm vào giỏ hàng, nhận ưu đãi hôm nay." |

**Map vào block:** Hook = block 1 · Body = block giữa · CTA = block cuối. Mỗi block vẫn 20–24 từ (10s).

---

## B. WIZARD MODULE

1. **Mục tiêu CTA:** mua ngay · để lại SĐT/đăng ký · nhắn tin · nhớ thương hiệu?
2. **Tông giọng:** thân mật/gần gũi · chuyên gia/uy tín · trẻ trung/hài · sang trọng?
3. **Điểm bán chính (USP):** 1 lợi ích số 1 muốn người xem nhớ?
4. **Ưu đãi (nếu có):** giá/voucher/deadline — (nhắc luật chống bịa: chỉ ghi ưu đãi CÓ THẬT).
5. **Giọng đọc:** người thật thu · TTS (giới tính/vùng miền Bắc-Trung-Nam)?

---

## C. LUẬT VIẾT (từ lõi + bán hàng)

1. **Văn nói**, câu ngắn, đọc trôi. Đọc to lên thấy tự nhiên mới đạt.
2. **Số viết ra chữ** ("ba triệu" không "3.000.000") để TTS đọc đúng.
3. **1 video = 1 thông điệp chính.** Đừng nhồi 5 lợi ích.
4. **Chống bịa:** không con số/giải thưởng/tuyên bố khống (xem `0-research.md`). Ưu đãi phải thật.
5. **CTA chỉ 1** — đừng vừa "mua" vừa "theo dõi" vừa "chia sẻ".
6. **Khớp thời lượng:** tổng từ ≈ (thời lượng giây ÷ 60) × 150. VD 30s ≈ 75 từ.

---

## D. HƯỚNG DẪN CHỌN GIỌNG (TTS)

| Nhu cầu | Gợi ý |
|---|---|
| Mỹ phẩm/thời trang nữ | Giọng nữ trẻ, ấm, miền Nam/Bắc tùy khách |
| Công nghệ/tài chính | Giọng nam trầm, rõ, tốc độ vừa |
| F&B/đời thường (UGC) | Giọng gần gũi, hơi nhanh, cảm thán |
| Cao cấp/TVC | Giọng chậm, ngân, nhiều khoảng nghỉ |

- Tốc độ đọc chuẩn ~150 từ/phút. Cao cấp chậm hơn (~120), UGC nhanh hơn (~170).
- Ghi rõ **chỗ ngắt nghỉ** (dấu — hoặc xuống dòng) để TTS/người đọc lấy hơi đúng.
- Coco/Topview có TTS; giọng clone cần mẫu giọng + đồng ý.

---

## E. OUTPUT

```
🎙️ VOICE — <tên video> (<thời lượng>, ~<tổng từ> từ, tông <X>)

[HOOK · block 1]
"<câu hook>"

[BODY · block 2..k]
"<câu body 1>"
"<câu body 2>"

[CTA · block cuối]
"<câu CTA>"

Ghi chú giọng: <giới tính/vùng/tốc độ/chỗ nghỉ>
```

- Nếu cắm vào pipeline lõi → mỗi dòng thay đúng "Narration (VI)" của block tương ứng.
- Nếu cho talking avatar → dòng này thành AUDIO segment (lipsync).

→ Cắm vào video người nói → `module-talking-avatar.md`. Cắm vào video sản phẩm → `module-product-avatar.md`.

# WIZARD PROTOCOL — hỏi gì & chốt thế nào ở từng cổng

> Đây là "kịch bản đối thoại" của skill. Mục tiêu: người dùng HIỂU RÕ và KIỂM SOÁT từng khâu, thay vì skill phóng một mạch ra hết. Học đúng cách Higgsfield: **hỏi → chốt → mới hỏi tiếp**, không gộp tất cả 1 lượt.
>
> Nguyên tắc chung mỗi cổng:
> 1. Nói mình đang ở cổng nào (1 dòng).
> 2. Hỏi đúng câu của cổng — **ưu tiên hỏi có lựa chọn để người dùng bấm chọn** (dùng AskUserQuestion khi hợp), luôn kèm mặc định gợi ý.
> 3. **Dừng chờ trả lời.** Không tự đi tiếp.
> 4. Sau khi sinh sản phẩm ở cổng: trình ra + hỏi "duyệt / sửa gì?".
>
> Nếu người dùng nói "tự quyết / làm nhanh" ngay từ đầu → chuyển `--che-do nhanh`: gộp hỏi 1 lượt (hoặc bỏ hỏi, ghi rõ mặc định) rồi chạy hết.

---

## CỔNG 0 · Ý ĐỒ + RESEARCH

**Khi nào:** luôn chạy đầu tiên. Đặc biệt quan trọng khi input là 1 câu thô, hoặc video có thông tin thật (số liệu, giá, tên thương hiệu, ngày, tuyên bố).

**Mở cổng:**
> "Bắt đầu ở **Cổng 0 — chốt ý đồ**. Tôi cần hiểu đúng video nói về gì trước khi cắt cảnh."

**Hỏi (tùy input):**
- Nếu input thô (1 câu): "Ý chính video là gì? Ai xem? Muốn người xem làm gì sau khi xem (mua/đăng ký/nhớ thương hiệu)?"
- Nếu ideal đã có sẵn (từ file .xlsx): tóm tắt lại "nói về gì" trong 1 câu → hỏi "đúng ý anh chưa, thêm/bớt gì?".
- Nếu có số liệu/tuyên bố thật: "Con số/tuyên bố này (VD 'giảm 50%', 'bán chạy nhất') là thật và anh có nguồn chứ? Nếu chưa chắc, tôi để trống hoặc diễn đạt mềm để tránh bịa." → xem `0-research.md`.

**Chốt cổng:** viết lại 1 câu "nói về gì" đã duyệt → chờ "ok" mới sang tham số.

---

## CỔNG THAM SỐ · hỏi 2 LƯỢT TÁCH BIỆT (không gộp 6 câu)

> Đây là điểm sửa lớn nhất so với v1. v1 bắn 6 câu 1 bảng. v2 tách 2 lượt.

### Lượt A — "Khung hình & phong cách" (hỏi trước)

Dùng AskUserQuestion, 3 câu:

1. **Phong cách / tab** — "Video theo phong cách nào?"
   - Gợi ý options theo 7 tab Coco (Branded/Cinematic/Game/AIGC/Trailer/Real Human/Cartoon) + "Suy từ ideal".
2. **Thời lượng** — "Dài bao nhiêu giây?"
   - Options: 8s (1 block) · 15s (2 block) · 30s (3 block) · "Tự quyết (8–15s)".
3. **Tỉ lệ khung** — "Chiếu ở đâu?"
   - Options: 16:9 (desktop/landing) · 9:16 (TikTok/Reels) · 1:1 · "Cả 16:9 + 9:16".

**Chốt lượt A:** nhắc lại "Phong cách X · Y giây (Z block) · tỉ lệ W" → sang lượt B.

### Lượt B — "Nhân vật & kỹ thuật" (hỏi sau khi chốt A)

Dùng AskUserQuestion, 3 câu:

1. **Nhân vật** — "Có người/nhân vật xuất hiện lặp lại không?"
   - Options: Không (product/cảnh vật) · Có 1 người · Có nhiều người · "Người thật cần eKYC (tab Real Human)".
   - Nếu "có" → sẽ kích hoạt Lớp 3 (@ref + CAST) ở bước 4, và hỏi thêm đặc điểm khóa ở GATE 1.
2. **Model đích** — "Render bằng model nào?"
   - Options: Seedance 2.0 (mặc định Coco, đa shot) · Kling 3.0 (cảnh đơn, rẻ) · "Tôi không rành — chọn giúp".
   - Nếu "chọn giúp" → suy từ intent (xem `model-catalog.md` mục B).
3. **Ngôn ngữ narration** — "Lời dẫn tiếng gì?"
   - Options: Tiếng Việt · Tiếng Anh · Không lời (chỉ hình + nhạc).

**Chốt lượt B + validate:** sau khi đủ 6 tham số, **kiểm tra ràng buộc model** (aspect/duration hợp lệ với model đã chọn — `model-catalog.md` mục C). Nếu xung đột (VD chọn Veo mà muốn 10s → Veo chỉ 4/6/8s) → báo + đề xuất sửa. Rồi chốt: "Đủ tham số. Sang Cổng 1 — viết kịch bản nhé?"

---

## CỔNG 1 · KỊCH BẢN

**Mở cổng:** "Cổng 1 — cắt <N> block, viết narration. Đọc `1-script.md`."

**Nếu có nhân vật (từ lượt B):** hỏi bổ sung 1 lần các đặc điểm khóa cứng:
> "Mô tả nhanh nhân vật để khóa xuyên suốt: giới tính, kiểu/màu tóc, trang phục chính, dấu hiệu nhận diện? (Để tôi giữ cứng mọi block, không nhảy mặt.)"

**Sinh:** kịch bản 3 tầng (Cảnh → Block → narration) theo `1-script.md`.

**Cổng chốt (bắt buộc):** trình kịch bản đầy đủ → hỏi:
> "Đây là kịch bản <N> block. Anh **duyệt** để tôi sinh prompt ảnh, hay muốn **sửa** block nào (đổi cảnh, đổi narration, tách/gộp block)?"

Không sang Cổng 2 khi chưa có "duyệt".

---

## CỔNG 2 · PROMPT ẢNH

**Mở cổng:** "Cổng 2 — prompt ảnh khung-đầu mỗi block. Đọc `2-image-prompt.md` + `style-library.md` để chốt STYLE."

**Chốt STYLE trước:** đề xuất 1 STYLE descriptor (theo tab) → hỏi "dùng style này hay đổi?". STYLE này sẽ lặp y hệt mọi block.

**Sinh:** mỗi block 1 prompt ảnh EN.

**Cổng chốt:** trình toàn bộ prompt ảnh → hỏi "duyệt / chỉnh block nào?". Gợi ý: "Anh có thể render thử **block 1** làm khung mẫu trước khi làm cả loạt — đỡ tốn credit nếu cần sửa style."

---

## CỔNG 3 · PROMPT VIDEO

**Mở cổng:** "Cổng 3 — cho khung đầu chuyển động. Đọc `3-video-prompt.md`."

**Sinh:** mỗi block 1 khối 5 trường (STYLE/SCENE/MOTION/AUDIO/NEGATIVE), STYLE lặp y hệt Cổng 2.

**Cổng chốt:** trình → hỏi "duyệt / chỉnh chuyển động block nào?".

---

## CỔNG 4 · NHẤT QUÁN + XUẤT

**Mở cổng:** "Cổng 4 — khóa nhất quán, tự kiểm, xuất bộ hoàn chỉnh. Đọc `4-consistency.md`."

**Làm:** dựng khối NHẤT QUÁN (STYLE + CAST + SOUL-ID marker) → chạy checklist tự kiểm → ước lượng credit → xuất bộ đầy đủ.

**Chốt giao:** hỏi "Lưu ra file .md cạnh ideal để copy dần không?" + nêu bước tiếp theo trên Coco (mở tab nào, dán gì, render mấy clip, tốn bao nhiêu credit).

---

## BẢNG TÓM — mỗi cổng hỏi gì

| Cổng | Hỏi gì | Cách hỏi | Chốt bằng |
|---|---|---|---|
| 0 | Ý đồ, đối tượng, fact thật? | Text ngắn | 1 câu "nói về gì" duyệt |
| Tham số A | Phong cách · thời lượng · tỉ lệ | AskUserQuestion 3 câu | Nhắc lại + sang B |
| Tham số B | Nhân vật · model · ngôn ngữ | AskUserQuestion 3 câu | Validate model + sang 1 |
| 1 | (nếu có người) đặc điểm khóa | Text | "Duyệt" kịch bản |
| 2 | STYLE dùng cái nào | Đề xuất + hỏi | "Duyệt" prompt ảnh |
| 3 | (không hỏi mới, chỉ trình) | — | "Duyệt" prompt video |
| 4 | Lưu file? | Có/không | Giao + bước tiếp Coco |

---

## CHẾ ĐỘ NHANH (khi người dùng bảo "tự quyết/làm nhanh")

Bỏ tất cả cổng chốt. Gộp: (1) chốt mặc định 6 tham số + ghi rõ ra, (2) chạy thẳng 1→4, (3) xuất bộ hoàn chỉnh 1 lần + ước lượng credit. Vẫn giữ Research tối thiểu (không bịa số/tên). Cuối vẫn nêu "muốn sửa gì thì nói".

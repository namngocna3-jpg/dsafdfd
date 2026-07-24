---
name: coco-video
description: |
  Biến một "ideal" (concept video: nói về gì + tóm tắt cảnh) thành BỘ SẢN XUẤT hoàn chỉnh: kịch bản phân cảnh → prompt ẢNH (khung đầu) → prompt VIDEO (chuyển động) → quy tắc giữ nhất quán nhân vật/phong cách. Chạy theo WIZARD có cổng chốt: hỏi → xác nhận → mới đi tiếp. Output là text copy-paste thẳng vào Coco Studio / Seedance / Kling / Higgsfield để render.
  Use when: "viết kịch bản cho ideal này", "sinh prompt ảnh", "sinh prompt video", "làm video từ concept", "bung ideal ra phân cảnh", "tạo storyboard", "prompt Seedance", "prompt Kling", "biến ý tưởng thành video", "làm TVC AI", "kịch bản phân cảnh", "làm talking avatar", "ghép sản phẩm lên người mẫu", "viết voice bán hàng".
  Chain: chạy WIZARD tuần tự có cổng chốt (0 research → 1 kịch bản → 2 ảnh → 3 video → 4 nhất quán). Không nhảy bước, không tự chạy hết khi chưa được chốt.
  NOT for: gọi API render thật (skill này CHỈ sinh text/prompt, không có API key) · dựng landing/web · viết content social thuần (dùng mkt-suite).
argument-hint: "[ideal-hoặc-file] [--buoc 1|2|3|4|all] [--tab <tên tab>] [--che-do wizard|nhanh] [--module talking|product|voice]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
metadata:
  type: reference
  vendor: coco-studio
  language: vi
  version: 2.0.0
---

# COCO VIDEO STUDIO — Ideal → Kịch bản → Prompt ảnh → Prompt video

> **Skill này là "xưởng phim ảo" chạy trên Claude.** Nhận 1 *ideal* (concept), trả về đủ bộ để render: kịch bản phân cảnh, prompt ảnh khung đầu, prompt video, và luật giữ nhất quán. Học công thức từ Higgsfield + Topview + Toonflow, đóng gói cho tiếng Việt.
>
> **Nguyên tắc số 1:** Skill KHÔNG render. Nó SINH RA prompt/kịch bản dạng text. Người dùng đem text đó bấm render trên Coco Studio / Seedance / Kling / Higgsfield.
>
> **Nguyên tắc số 2 (MỚI ở v2):** Chạy theo **WIZARD có cổng chốt** — mỗi khâu HỎI trước, người dùng XÁC NHẬN rồi mới đi tiếp. Không tự phóng một mạch từ ideal ra hết bộ sản phẩm. (Học đúng cách Higgsfield: hỏi → chốt → mới hỏi tiếp.)

---

## 0. "Ideal" là gì (input)

Một *ideal* = concept 1 video, gồm **2 phần bắt buộc**:
- **Nói về gì** — nội dung & thông điệp (VD: "TVC 8s nước hoa cao cấp, thông điệp: chất TVC dựng trong vài giờ").
- **Tóm tắt các cảnh** — liệt kê cảnh (VD: Cảnh 1 giọt nước rơi → Cảnh 2 chai trồi lên → Cảnh 3 orbit 180° → Cảnh 4 chốt logo).

Nếu người dùng chỉ đưa 1 câu ý tưởng thô → **GATE 0** (wizard) sẽ làm giàu thành ideal trước, có xác nhận.

Nguồn ideal Coco hiện có: `C:\Users\Admin\Downloads\CocoStudio_Plan\05_Gui_ChiTuyen\1_Ideal_Video_Landing.xlsx` (7 tab: Branded Video · Cinematic Creation · Game Production · AIGC Creative Tools · Trailer · Real Human · Cartoon and Anime).

---

## 1. WIZARD 5 CỔNG (mặc định — chạy tuần tự, mỗi cổng phải chốt)

```
IDEAL (nói về gì + tóm tắt cảnh)
   │
   ▼  GATE 0 · Ý ĐỒ + RESEARCH     → references/0-research.md
   │     làm giàu ideal thô · verify fact (cấm bịa số/ngày/tên) · chốt "nói về gì"
   │     ⟶ HỎI & CHỐT trước khi qua GATE tham số
   ▼  GATE THAM SỐ (2 lượt)        → references/wizard-protocol.md
   │     lượt A: phong cách/tab · thời lượng · tỉ lệ  → chốt
   │     lượt B: nhân vật · model đích · ngôn ngữ narration  → chốt
   ▼  GATE 1 · KỊCH BẢN            → references/1-script.md
   │     cắt concept thành Cảnh → Block 10s (1 block = 1 narration + 1 clip) + narration
   │     ⟶ TRÌNH kịch bản, HỎI sửa/duyệt trước khi sinh prompt
   ▼  GATE 2 · PROMPT ẢNH          → references/2-image-prompt.md
   │     sinh prompt ẢNH khung-đầu mỗi block  ⟶ TRÌNH, HỎI duyệt
   ▼  GATE 3 · PROMPT VIDEO        → references/3-video-prompt.md
   │     sinh prompt VIDEO (5 trường STYLE/SCENE/MOTION/AUDIO/NEGATIVE)  ⟶ TRÌNH, HỎI duyệt
   ▼  GATE 4 · NHẤT QUÁN + XUẤT    → references/4-consistency.md
         khóa nhân vật + phong cách xuyên mọi block, tự kiểm, xuất bộ hoàn chỉnh
```

**Chế độ chạy:**
- `--che-do wizard` (MẶC ĐỊNH): dừng ở mỗi cổng, hỏi & chờ chốt. Dùng khi muốn hiểu rõ, kiểm soát.
- `--che-do nhanh`: gộp tham số hỏi 1 lượt rồi chạy hết 1→4 (kiểu v1). Chỉ dùng khi người dùng nói rõ "làm nhanh/tự quyết".

**Tra cứu khi cần (lazy-load — chỉ đọc khi tới đúng việc):**
- `references/wizard-protocol.md` — kịch bản HỎI ở từng cổng (câu hỏi mẫu, cách chốt). **Đọc đầu tiên khi chạy wizard.**
- `references/0-research.md` — Phase Research: verify fact, chống bịa.
- `references/model-catalog.md` — có model nào, chọn theo mục đích, RÀNG BUỘC tham số (validate).
- `references/style-library.md` — 7 STYLE descriptor sẵn cho 7 tab + cách viết STYLE mới.

**Module năng lực mở rộng (ngoài 4 bước lõi — gọi bằng `--module`):**
- `references/module-talking-avatar.md` — ảnh chân dung + text → video người nói (presenter).
- `references/module-product-avatar.md` — đặt sản phẩm lên tay/người mẫu AI.
- `references/module-voice-sales.md` — viết voice/narration kiểu bán hàng (Hook→Body→CTA) + chọn giọng.

> **Quy tắc "300 dòng" (từ Higgsfield):** SKILL.md này chỉ là ROUTER + quy trình + defaults. Mọi template dài nằm ở references/. Chỉ đọc file con khi đã quyết định làm bước đó.

---

## 2. GIAO THỨC HỎI Ở TỪNG CỔNG (tinh thần — chi tiết ở wizard-protocol.md)

Học từ Higgsfield ("hỏi 2 lượt tách biệt, không gộp"). Ở mỗi cổng:

1. **Nêu mình đang ở cổng nào** + đang cần gì (1 dòng).
2. **Hỏi đúng câu của cổng đó** — dùng tool hỏi có lựa chọn khi hợp (để người dùng bấm chọn nhanh), kèm mặc định gợi ý.
3. **Chờ trả lời. KHÔNG tự đi tiếp.** Nếu người dùng bảo "tự quyết" → ghi rõ mặc định đã chọn rồi mới đi.
4. Sau khi sinh sản phẩm ở cổng (kịch bản/ảnh/video): **trình ra, hỏi "duyệt / sửa gì?"** trước khi sang cổng sau.

**6 tham số cần đủ trước GATE 1** (hỏi ở GATE THAM SỐ, 2 lượt):

| Lượt | Tham số | Mặc định nếu "tự quyết" |
|---|---|---|
| A | **Thời lượng** | 8–15s (Hero landing) |
| A | **Tỉ lệ khung** | 16:9 desktop (+9:16 mobile nếu social) |
| A | **Phong cách / tab** | Suy ra từ ideal (xem style-library) |
| B | **Nhân vật** (có người lặp lại không) | Không (nếu product/cảnh vật) |
| B | **Model đích** | Seedance 2.0 |
| B | **Ngôn ngữ narration** | Tiếng Việt |

**Công thức số block (Higgsfield):** `N block = ⌈thời lượng(giây) / 10⌉`. 8s = 1 block · 30s = 3 · 60s = 6.
**Độ dài narration (Toonflow):** ~150 từ/phút → mỗi block 10s ≈ **20–24 từ**. Số viết ra chữ.

---

## 3. QUY TẮC VÀNG (áp dụng mọi cổng)

1. **"Sinh prompt = chuyển format, KHÔNG sáng tác"** (Toonflow). Ideal/kịch bản là nguồn nội dung DUY NHẤT. Không tự thêm cánh hoa, nhân vật, đạo cụ mà ideal không có.
2. **Chống bịa (RESEARCH — MỚI v2):** nếu video có số liệu/ngày/tên/giá/tuyên bố thật → **verify trước, không bịa**. Không chắc thì hỏi người dùng hoặc bỏ. (Chi tiết `0-research.md`.)
3. **Tách intent khỏi prompt kỹ thuật** (Higgsfield). Người dùng nói ý bằng tiếng Việt → skill dựng prompt kỹ thuật đầy đủ (tiếng Anh) theo template.
4. **Tách lời nói khỏi video** (Higgsfield). Prompt video CHỈ tả hình + chuyển động + âm môi trường. Lời dẫn sinh riêng, không nhồi vào clip (tránh lip-sync giả).
5. **STYLE lặp y hệt mọi block** để chống style-drift. Viết STYLE descriptor 1 lần, dán vào mọi block.
6. **Prompt ảnh < 200 token**; negative diễn đạt dương ("no blur" → "tack sharp").
7. **Mọi prompt ảnh/video viết bằng TIẾNG ANH** (model hiểu tốt hơn). CHỈ narration dùng ngôn ngữ người dùng chọn.
8. **Không dump JSON/ID thô ra chat.** Trình bày sạch, dễ copy từng block.
9. **Validate tham số theo model** trước khi xuất (aspect/res/duration hợp lệ không) — tra `model-catalog.md`. Sai thì cảnh báo + đề xuất sửa, không xuất bừa.
10. **Trả lời cho người phi kỹ thuật:** giải thích ngắn gọn vì sao, tránh thuật ngữ khô; khi dùng thuật ngữ thì kèm 1 câu tiếng Việt dễ hiểu.

---

## 4. CÁCH THỰC THI (khi người dùng gọi skill)

**A. Nhận diện input:**
- File .xlsx ideal → đọc bằng `node /tmp/xlsxread.mjs <file> dump "<sheet>"` (reader có sẵn) hoặc hỏi tab nào.
- 1 câu ý tưởng thô → vào **GATE 0**, làm giàu thành ideal (nói về gì + tóm tắt cảnh) rồi xác nhận.
- Có `--module` → nhảy sang file module tương ứng (talking/product/voice), theo wizard riêng của module.

**B. Chọn chế độ:** mặc định `wizard`. Đọc `references/wizard-protocol.md` để biết hỏi gì ở từng cổng.

**C. Chạy WIZARD theo thứ tự cổng** (mục 1). **Mỗi cổng: sinh → trình → hỏi chốt → mới đi tiếp.** Với `--buoc N` thì chỉ làm đúng cổng đó (vẫn có xác nhận).

**D. Trước khi xuất bộ cuối — ƯỚC LƯỢNG cho người dùng:**
- Số block · số clip cần render · **credit ước tính** (Coco: 10 credit = 1 video/clip) · model đích · ghi chú eKYC nếu tab Real Human.

**E. Xuất kết quả** theo bố cục:
```
### 🎬 BỘ SẢN XUẤT — <tên ideal> (<N> block, <thời lượng>, <tỉ lệ>, model <X>)
Ước tính render: <N> clip × 10 credit = <10N> credit trên Coco.

#### NHẤT QUÁN (dán vào mọi block)
STYLE: <style descriptor>
CAST: <nhân vật + đặc điểm khóa cứng, nếu có>

#### BLOCK 1
• Narration (VI): "..."
• Prompt ẢNH (EN): ...
• Prompt VIDEO (EN): STYLE / SCENE / MOTION / AUDIO / NEGATIVE
#### BLOCK 2
...
```

**F. Ghi file nếu người dùng muốn:** lưu ra `.md` cạnh ideal để copy dần.

**G. Sau khi giao — protocol chốt:** chạy checklist `4-consistency.md`, nêu rõ bước tiếp theo người dùng làm (mở Coco → tab nào → dán prompt nào → render mấy clip).

---

## 5. MODULE NĂNG LỰC MỞ RỘNG (ngoài 4 bước lõi)

Đã đóng gói 3 module (gọi `--module <tên>`), mỗi module có wizard riêng:

| Module | Làm gì | File |
|---|---|---|
| **talking** | Ảnh chân dung + text → video người nói (presenter, avatar). Hợp tab Real Human + khóa CONTENT&VIDEO. | `references/module-talking-avatar.md` |
| **product** | Đặt sản phẩm lên tay/người mẫu AI (cầm/mặc/dùng). Hợp Affiliate Video + TVC. | `references/module-product-avatar.md` |
| **voice** | Viết voice/narration bán hàng (Hook→Body→CTA) + chọn giọng đọc/TTS. | `references/module-voice-sales.md` |

**Chưa đóng gói (nói tên khi cần, sẽ thêm theo khuôn):** Soul-ID train thật (reference_id, cần API), Marketing Studio UGC 10-mode, Virality Predictor (chấm điểm video đã render), Board (gom dự án xem/sửa web).

---

## 6. Reference docs — Load on demand

| File | Đọc khi |
|---|---|
| `references/wizard-protocol.md` | **Chạy wizard** — biết hỏi gì, chốt thế nào ở từng cổng |
| `references/0-research.md` | GATE 0 — làm giàu ideal + verify fact, chống bịa |
| `references/1-script.md` | GATE 1 — cắt ideal thành phân cảnh + viết narration |
| `references/2-image-prompt.md` | GATE 2 — sinh prompt ảnh khung đầu |
| `references/3-video-prompt.md` | GATE 3 — sinh prompt video chuyển động |
| `references/4-consistency.md` | GATE 4 — giữ nhất quán + checklist + xuất |
| `references/model-catalog.md` | Cần chọn model / validate ràng buộc tham số |
| `references/style-library.md` | Cần STYLE descriptor cho tab / viết style mới |
| `references/module-talking-avatar.md` | `--module talking` |
| `references/module-product-avatar.md` | `--module product` |
| `references/module-voice-sales.md` | `--module voice` |

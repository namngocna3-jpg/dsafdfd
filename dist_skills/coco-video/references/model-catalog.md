# MODEL CATALOG — chọn model render theo mục đích

> Bảng tra cứu để chọn model + biết ràng buộc tham số khi xuất prompt. Skill này KHÔNG gọi API; đây là để ghi đúng "model đích" vào bộ sản phẩm cho người dùng render trên Coco Studio / Seedance / Kling / Higgsfield / Topview.

---

## A. DEFAULTS NHANH (nhớ nhanh)

| Loại việc | Model mặc định |
|---|---|
| Ảnh/design/text/UI/typography | **GPT Image 2** |
| Ảnh nhân vật/cartoon/stylized | **Nano Banana** (Lite = nhanh/rẻ, Pro = ca khó) |
| Video đa shot "nghiêm túc", i2v, 4–15s | **Seedance 2.0** (SOTA, mặc định của Coco) |
| Video cảnh đơn, ít motion, rẻ | **Kling 3.0** (Turbo khi cần nhanh) |
| Ads/UGC/product/presenter | **Marketing Studio** (Higgsfield) / avatar (Topview) |
| Audio/SFX/ambience | **Seed Audio** (Higgsfield) / TTS (Topview) |
| Nhân vật identity-faithful | **Soul** (soul-id reference_id) |

---

## B. VIDEO — chọn theo intent (entry cao thắng)

1. Quảng cáo/thương mại có presenter → **Marketing Studio / avatar Topview**
2. Video all-purpose (đa shot, identity nhất quán, motion nặng, i2v, 4–15s) → **Seedance 2.0** (mặc định — Coco chạy Native Seedance)
3. Cảnh đơn phẳng, ít motion, budget → **Kling 3.0** (Turbo khi cần rẻ/nhanh)
4. Cinema fidelity cao nhất → **Cinema Studio Video 3.0** (Higgsfield)
5. i2v với first-frame rõ → **Kling 3.0** (start frame) hoặc **Seedance 2.0** (motion cao hơn)
6. Anime/bold i2v từ start frame → **Grok Video 1.5** (bắt buộc 1 start-image)
7. Reference-to-video nhiều ảnh (tới 7) → **Gemini Omni Flash** / omni Topview

---

## C. RÀNG BUỘC THAM SỐ (aspect / resolution / duration)

| Model | Aspect | Duration | Resolution | Native audio |
|---|---|---|---|---|
| **Seedance 2.0** | auto/21:9/16:9/4:3/1:1/3:4/9:16 | 4–15s | 480p/720p/1080p/4k | có (Standard/Fast) |
| **Kling 3.0** | 16:9/9:16/1:1 | 3–15s | pro/std | có (O3/V3) |
| **Veo 3.1** | 16:9/9:16 | chỉ 4/6/8s | basic/high/ultra; 4K chỉ ở đây | có |
| **Grok Video 1.5** | (bắt buộc start-image) | 2–15s | 480p/720p | — |
| **Marketing Studio** | như Seedance | tới 15s | 480p/720p | có (`generate-audio`) |
| **Gemini Omni** | 16:9/9:16 | clip 10s | 720p | — |

**Aspect ratio nhanh:** 16:9 cinematic/landscape · 9:16 vertical/social · 1:1 profile · 4:3/3:4/21:9 tùy model.

---

## D. ẢNH — chọn theo use case

| Model | Mạnh ở | Resolution | Ghi chú |
|---|---|---|---|
| **GPT Image 2** | text/typography/UI/design, 13 tỉ lệ | 1K/2K/4K | mặc định; edit tới 16 ảnh ref; có `quality` low/med/high |
| **Nano Banana (Pro)** | nhân vật/cartoon/stylized, fidelity cao | tùy model | ca khó dùng Pro |
| **Seedream/Doubao** | prompt tiếng Trung, `@图N` ref | — | không có negative field |
| **Reve Image** | mỹ thuật | — | có `quality` |

---

## E. MEDIA FLAGS (vai trò — khi ghi hướng dẫn render)

| Flag | Ý nghĩa | Model nhận |
|---|---|---|
| `image` / ref | ảnh tham chiếu | hầu hết image models, seedance, marketing |
| `start-image` / first-frame | frame đầu i2v | grok, kling, veo, seedance, marketing |
| `end-image` / end-frame | frame cuối chuyển cảnh | kling, seedance, marketing |
| `video` | video reference/phân tích | seedance, omni |
| `audio` | audio ref (lipsync/soundtrack) | seedance, avatar |

Mọi flag nhận **path (tự upload) HOẶC id** (upload trước đó). Type nhận qua đuôi file: ảnh png/jpg/webp; video mp4/mov/webm; audio mp3/wav/m4a.

---

## G. VALIDATE TRƯỚC KHI XUẤT (chạy ở cuối cổng tham số)

> Học từ Topview (MODEL_REGISTRY + soft-validate) + Higgsfield (cảnh báo khi param sai). Trước khi sinh prompt, kiểm 4 thứ này. Sai → **cảnh báo + đề xuất sửa, KHÔNG xuất bừa**.

**Checklist validate:**
1. **Duration hợp model?** VD chọn **Veo 3.1** mà muốn 10s → SAI (Veo chỉ 4/6/8s). Đề xuất: đổi 8s, hoặc đổi Seedance/Kling.
2. **Aspect hợp model?** VD **Kling** chỉ 16:9/9:16/1:1 — muốn 21:9 → SAI, đổi Seedance.
3. **Cần start-image mà t2v?** **Grok Video 1.5** BẮT BUỘC 1 start-image. Nếu pipeline không có ảnh khung đầu → cảnh báo.
4. **Số block × duration/block khớp thời lượng tổng?** N block × ~10s ≈ thời lượng đã chốt. Lệch nhiều → soát lại số block.

**Mẫu cảnh báo:**
> "⚠️ Anh chọn Veo 3.1 + 10 giây, nhưng Veo chỉ hỗ trợ 4/6/8s. Tôi đề xuất **8 giây** (giữ Veo) hoặc **đổi sang Seedance 2.0** (cho phép 4–15s). Chọn cái nào?"

**Nếu model người dùng nêu KHÔNG có trong bảng:** đừng nói "không hỗ trợ". Nói "tôi chưa có thông số model này — anh cho biết ràng buộc (duration/aspect/res) hoặc để tôi dùng Seedance 2.0 mặc định?".

---

## H. ƯỚC LƯỢNG CREDIT (Coco)

- Quy đổi: **10 credit = 1 video/clip**. Bộ N block = N clip → **10N credit**.
- Render lại 1 block (sửa) = thêm 10 credit. → Khuyên render thử block 1 trước khi làm cả loạt.
- Ảnh khung đầu (nếu sinh riêng bằng model ảnh) có thể tính phí riêng tùy nền tảng — nhắc người dùng.

---

## I. LƯU Ý COCO STUDIO (quan trọng cho dự án)

- Coco = Native Seedance → **mặc định ghi model đích = Seedance 2.0**.
- Quy đổi **10 credit = 1 video**. Tab Real Human cần eKYC (Real Face).
- Prompt xuất tiếng Anh dùng được; nếu người dùng render Seedance giao diện Trung → dịch prompt sang tiếng Trung khi họ yêu cầu (chế độ A ở bước 2/3).

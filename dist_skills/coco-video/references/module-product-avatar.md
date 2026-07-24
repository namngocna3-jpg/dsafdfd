# MODULE · PRODUCT AVATAR (đặt sản phẩm lên tay/người mẫu AI)

> Gọi bằng `--module product`. Nhiệm vụ: từ 1 ảnh sản phẩm (chai, hộp, áo, món ăn...) → sinh bộ sản phẩm cho video **người mẫu AI cầm/mặc/dùng sản phẩm**. Hợp **Affiliate Video (ưu tiên #1)** + **TVC**.
>
> Học từ Topview product_avatar (quy trình remove-bg → image_replace/ghép người) + Higgsfield product-photoshoot (10 mode, backend ráp prompt — "đừng tự viết prompt tả sản phẩm, hãy tả BỐI CẢNH & CÁCH DÙNG").

---

## A. NGUYÊN TẮC LÕI

**Giữ NGUYÊN sản phẩm, thay MỌI THỨ quanh nó.** Ảnh sản phẩm là "sự thật khóa cứng" — không mô tả lại hình dạng/nhãn sản phẩm (dễ méo chữ, sai logo). Chỉ mô tả: **ai dùng · dùng thế nào · bối cảnh · ánh sáng · camera.**

| Giữ cứng (từ ảnh ref) | Tự do sáng tạo |
|---|---|
| Hình dạng, màu, nhãn, logo sản phẩm | Người mẫu, tay, bối cảnh, ánh sáng, góc máy, chuyển động |

---

## B. WIZARD MODULE

1. **Ảnh sản phẩm:** có ảnh nền sạch chưa? (nếu nền lộn xộn → bước remove-bg trước khi ghép).
2. **Cách xuất hiện:** cầm trên tay · mặc/đeo lên người · đặt trong cảnh dùng (bàn ăn, bàn trang điểm) · flat-lay?
3. **Người mẫu:** có/không · giới tính/độ tuổi/phong cách · (người thật cần eKYC).
4. **Bối cảnh & mood:** studio sạch · đời thường (UGC) · sang trọng (TVC) · ngoài trời.
5. **Thời lượng & tỉ lệ:** như pipeline lõi (Affiliate thường 9:16, 15–30s).

---

## C. 10 CÁCH ĐẶT SẢN PHẨM (mode — từ Higgsfield product-photoshoot)

Chọn 1 làm "cách xuất hiện", skill ráp phần bối cảnh:

1. **In-hand** — tay người mẫu cầm/giới thiệu.
2. **On-body** — mặc/đeo/xịt lên người (mỹ phẩm, thời trang, nước hoa).
3. **In-use** — đang dùng thật (rót, ăn, bôi, bấm nút).
4. **Lifestyle scene** — đặt trong bối cảnh đời sống (bàn cafe, phòng tắm).
5. **Studio hero** — nền sạch, ánh sáng quảng cáo, sản phẩm là ngôi sao.
6. **Flat-lay** — nhìn từ trên xuống, bố cục phẳng cùng đạo cụ.
7. **Nature/organic** — cạnh nguyên liệu tự nhiên (lá, đá, nước).
8. **Luxury** — nền tối, ánh viền vàng, chất sang.
9. **Before/after** — 2 khung so sánh hiệu quả.
10. **UGC unboxing** — kiểu tự quay, đời thường, ánh sáng phòng.

---

## D. SINH GÌ

### 1. Prompt ẢNH ghép (mỗi khung)
```
@ref1 = <sản phẩm — giữ nguyên hình dạng/nhãn/logo từ ảnh đính kèm>.
<a [Vietnamese] model [in-hand/on-body/in-use] holding/using @ref1>, <bối cảnh theo mode>, <camera>, <lighting>, photorealistic, product label sharp and undistorted, tack sharp
negative: distorted product, warped label, altered logo, extra fingers
```
- **Luôn** có `product label sharp and undistorted` + negative `warped label, altered logo` (chống méo nhãn — lỗi kinh điển).
- Không tả lại hình dạng sản phẩm — để `@ref1` gánh.

### 2. Prompt VIDEO (làm khung ghép chuyển động)
```
STYLE REFERENCE: match attached image EXACTLY, keep product identical.
SCENE: <người mẫu thao tác 1 hành động rõ với sản phẩm: nâng lên khoe nhãn / xịt / rót / mặc vào>.
MOTION: <camera push-in tới sản phẩm / tay xoay nhẹ khoe mọi mặt / slow reveal>.
AUDIO: <ambient + SFX phù hợp: tiếng xịt, tiếng rót, tiếng vải — không voice>.
NEGATIVE: product morphing, warped label, altered logo, extra fingers, identity drift, on-screen text.
[loại: i2v · first-frame: ảnh ghép · duration: <giây> · model: Seedance 2.0]
```

---

## E. QUY TRÌNH GHÉP (khi render thật — ghi cho người dùng)

1. **Remove background** ảnh sản phẩm (nếu nền bẩn) → PNG trong suốt.
2. **Ghép người mẫu** (image_replace/compose) theo mode đã chọn → ảnh khung đầu.
3. **i2v** ảnh đó thành clip (Seedance).
4. Nối clip + voice (nếu có, từ `module-voice-sales.md`) ở khâu dựng.

---

## F. LƯU Ý

- **Affiliate Video** cần hook 2 giây đầu (khoe sản phẩm/lợi ích ngay) → block 1 phải "đập vào mắt".
- Chống méo nhãn là ưu tiên số 1 — luôn giữ negative chống warp.
- Người thật làm mẫu → eKYC (Coco Real Human). Người mẫu AI → không cần.
- Cần lời chào hàng → `module-voice-sales.md`. Nhiều clip cùng sản phẩm → `4-consistency.md` giữ @ref1 nguyên vẹn.

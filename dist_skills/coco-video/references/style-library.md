# STYLE LIBRARY — thư viện STYLE descriptor

> STYLE descriptor = chuỗi token phong cách dán y hệt vào trường STYLE của MỌI block (chống style-drift). Chọn 1 cái theo tab/ý đồ, hoặc viết mới theo công thức cuối file.
>
> Cách dùng: copy nguyên văn dòng STYLE vào khối "NHẤT QUÁN" và vào trường `STYLE REFERENCE` của mọi block video (bước 3).

---

## A. 7 STYLE CHO 7 TAB COCO

**1. Branded Video (TVC sản phẩm — THỰC):**
```
high-end commercial photography, glossy premium look, dramatic studio lighting, rich cinematic color grade, shallow depth of field, photorealistic, tack sharp, commercial grade
```

**2. Cinematic Creation (điện ảnh IMAX — THỰC):**
```
epic cinematic film still, IMAX documentary aesthetic, volumetric god rays, vast scale, rich film color grade, atmospheric haze, photorealistic, ultra detailed, tack sharp
```

**3. Game Production (game AAA — STYLIZED 3D):**
```
AAA game cinematic, stylized 3D render, dramatic volumetric lighting, heroic fantasy mood, high detail PBR materials, epic composition, not a photo
```

**4. AIGC Creative Tools (đa phong cách — chuyển style):**
```
clean high-fidelity render, versatile modern aesthetic, vibrant balanced colors, crisp lighting, showcase quality, tack sharp
```
(Tab này chủ đích ĐỔI style giữa các đoạn — dùng STYLE riêng cho từng segment khi morph.)

**5. Trailer (teaser phim — THỰC, tương phản cao):**
```
dark cinematic teaser trailer, high contrast dramatic lighting, desaturated moody palette, tense atmosphere, fast-paced film aesthetic, photorealistic, ultra detailed, tack sharp
```

**6. Real Human (người thật eKYC — THỰC, beauty):**
```
photorealistic close-up portrait, natural realistic skin texture, soft studio beauty lighting, gentle catchlight in eyes, commercial beauty campaign aesthetic, shallow depth of field, tack sharp
```

**7. Cartoon and Anime (anime studio — PHI THỰC):**
```
studio-quality Japanese anime, soft cel shading, vibrant warm colors, expressive lighting, clean line art, non-photorealistic, illustrated, not a photo, no live-action, no realism
```

---

## B. STYLE PHI-THỰC BỔ SUNG (từ Higgsfield — cho explainer/kể chuyện)

**Flat 2D vector:**
```
flat 2D vector animation, bold clean outlines, solid vibrant flat fills, no shading, no gradients, non-photorealistic, illustrated, not a photo, no live-action, no realism
```

**Marker/mực tay:**
```
hand-inked black marker on off-white paper, solid jet-black fills, thin white scratch highlights, marker grain, strictly monochrome, non-photorealistic, illustrated, no realism
```

**Silhouette tối giản:**
```
strict monochrome minimalism, black silhouettes on white void, high contrast, lots of negative space, matte, non-photorealistic, illustrated, no realism
```

**Storybook gouache:**
```
hand-painted storybook gouache, soft textures, warm muted palette, visible brush strokes, non-photorealistic, illustrated, no realism
```

---

## C. CÔNG THỨC VIẾT STYLE MỚI

```
<medium/kỹ thuật>, <đường nét/shading>, <bảng màu>, <ánh sáng/không khí>, <chất lượng>[, <chuỗi non-realism nếu phi-thực>]
```
- **Medium:** photography / 3D render / 2D vector / anime / oil painting / gouache...
- **Đường nét:** clean line art / bold outlines / soft cel shading / no shading...
- **Màu:** vibrant / muted / monochrome / warm / cool / desaturated...
- **Ánh sáng:** dramatic studio / volumetric god rays / soft beauty / high contrast...
- **Chất lượng:** tack sharp, ultra detailed, cinematic grade (LUÔN có — chống mờ).
- **Chuỗi non-realism (chỉ khi phi-thực):** `non-photorealistic, illustrated, not a photo, no live-action, no realism`

**Quy tắc:** video THỰC (sản phẩm, người, TVC) → KẾT bằng `photorealistic, tack sharp`. Video PHI-THỰC (anime, vector, game) → KẾT bằng chuỗi non-realism.

---

## D. STYLE-KEY IMAGE (đi kèm STYLE descriptor)

Ngoài chuỗi text, nên có **1 ảnh mẫu phong cách** đính vào mọi clip. Cách tạo:
- Render 1 ảnh test bằng chính STYLE descriptor → dùng làm style-key.
- Hoặc lấy 1 frame hero đã duyệt.
- Ghi vào khối NHẤT QUÁN: `STYLE-KEY: <đường dẫn/mô tả ảnh mẫu>`.

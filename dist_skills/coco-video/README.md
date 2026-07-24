# coco-video — skill biến Ideal → Kịch bản → Prompt ảnh → Prompt video

Skill chạy trên Claude Code. Gửi 1 *ideal* (concept video), nhận về bộ sản xuất hoàn chỉnh để render trên Coco Studio / Seedance / Kling / Higgsfield.

## Dùng thế nào

Gõ tự nhiên, skill tự kích hoạt khi khớp:
```
/coco-video làm video từ tab "Branded Video" trong file ideal Coco
```
hoặc chỉ cần nói:
```
Bung ideal này ra kịch bản + prompt ảnh + prompt video: <dán ideal>
```

Tham số: `--buoc 1|2|3|4|all` (mặc định all) · `--tab <tên tab>`.

## Nó làm gì — WIZARD 5 cổng (v2)

Chạy theo **wizard có cổng chốt**: mỗi khâu HỎI trước, bạn XÁC NHẬN rồi mới đi tiếp (học cách Higgsfield).

0. **Ý đồ + Research** — chốt "nói về gì", chống bịa số/tên/giá.
1. **Kịch bản** — cắt ideal thành phân cảnh (block 10s) + viết narration.
2. **Prompt ảnh** — sinh prompt khung-đầu (first frame) mỗi block.
3. **Prompt video** — sinh prompt chuyển động (khối 5 trường STYLE/SCENE/MOTION/AUDIO/NEGATIVE).
4. **Nhất quán + xuất** — khóa nhân vật + phong cách xuyên mọi block, ước lượng credit.

Tham số hỏi **2 lượt tách biệt** (khung hình/phong cách → nhân vật/kỹ thuật), không dồn 1 bảng.

Muốn chạy thẳng không hỏi: thêm `--che-do nhanh`.

## Module mở rộng (ngoài 4 bước lõi)

- `--module talking` — ảnh chân dung + text → video người nói (presenter).
- `--module product` — đặt sản phẩm lên tay/người mẫu AI (Affiliate/TVC).
- `--module voice` — viết voice bán hàng (Hook→Body→CTA) + chọn giọng.

## Nó KHÔNG làm gì

- Không render thật (không có API key). Chỉ sinh text/prompt copy-paste.
- Không dựng web, không viết content social thuần (dùng mkt-suite cho việc đó).

## Nguồn công thức

Học từ Higgsfield AI skills + TopView skill + kiến trúc Toonflow. Chi tiết trong `references/`.

## Mở rộng sau

Talking avatar, product avatar, soul-id train thật, voice/TTS, virality predictor — xem mục 5 trong SKILL.md. Nói tên khi cần, sẽ thêm module.

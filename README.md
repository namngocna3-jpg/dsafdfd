# COCO STUDIO — KẾ HOẠCH CỘNG ĐỒNG & FANPAGE

Đã tách sạch thành **2 file Excel độc lập**, mỗi file bám 1 khung mẫu chuẩn.

## 📂 2 FILE CHÍNH (mở bằng Excel)

| File | Nội dung | Khung mẫu theo |
|---|---|---|
| **COCO_PLAN_CONG_DONG.xlsx** | Plan Group "AI Video Creators Vietnam" — **20 sheet**: Concept, Lộ trình 50k, 8 kênh tăng trưởng, Checklist SEO, Rules, User Journey, KOL/Network, Nhân sự, Đối thủ, Phễu Event→Group, 10 bài mồi, Doanh thu, Checklist hành động, **Brand Identity, 10 bài seed FULL (copy-paste), Master Action Plan 18 việc, Contest #1, KPI Dashboard, Seeding Plan** | Master plan cộng đồng (JOBVUI) + pitch v2 |
| **COCO_PLAN_FANPAGE.xlsx** | Plan Fanpage (Content & Social) — **14 sheet**: Brief thương hiệu, Content Direction, **Phễu 5 tầng (Chưa biết→Biết→Hiểu→Tin→Yêu)**, Content Calendar 4 tuần, Brief 5 video Hero, Benchmark giá, Combo gói, Kịch bản Sale, Nhân sự, Research xu hướng, **20 Idea bài, 3 Customer Persona, Giá gói & vé event** | TikTok S:KIN + Marketing Plan W&D |

> Mỗi file có sheet **"00. Mục lục"** ở đầu để điều hướng.

## 📁 Thư mục phụ
- `02_MarkDown/` — nội dung gốc dạng text để copy nhanh: 3 bài mồi đầy đủ, hook event, brief 5 video, community plan.
- `04_Scripts/` — công cụ tạo Excel bằng **Node thuần** (máy không có Python/zip CLI):
  - `xlsxlib.mjs` — thư viện tạo .xlsx (style, wrap, merge, freeze).
  - `build_community.mjs` / `build_fanpage.mjs` — chạy `node <file>` để tạo lại Excel nếu sửa nội dung.
- `_ARCHIVE_cu/` — bản cũ rối (3 VER × 36 sheet, file tổng, HTML). Giữ để tham khảo, **không dùng nữa**.

## ✅ Đề xuất đã chốt (trình sếp duyệt)
1. **Tên group:** AI Video Creators Vietnam (đã chốt).
2. **Mã giảm vé:** COCO15 (-15%) cho member group — 500k→425k · 950k→807k · 1.7tr→1.445tr.
3. **Credit bonus:** +500 credit khi mua vé qua link group.
4. **Ngân sách (còn 2 kịch bản để sếp chọn):** A có paid ~120-180tr → 50k member · B organic 0đ → 12-18k member chất.

## ✏️ Cách sửa nội dung
Sửa text trong `04_Scripts/build_*.mjs` → chạy lại `node build_community.mjs` (hoặc `build_fanpage.mjs`) → file .xlsx được tạo mới.

---

## 📄 Bản CSV kèm theo (cho macOS / MacBook Intel)

Mỗi file `.xlsx` đã được xuất kèm một thư mục `<tên>_CSV/` chứa từng sheet dưới dạng `.csv` (UTF-8 có BOM).

- File `.xlsx` gốc: mở bằng Excel / Numbers / LibreOffice.
- Nếu máy nào mở `.xlsx` bị lỗi: mở bản `.csv` tương ứng trong thư mục `_CSV` — mọi máy đều đọc được, tiếng Việt hiển thị đúng.
- File `KE HOACH COCO - CHI TIET (pitch) v2.xlsx` đã đổi tên thành `KE_HOACH_COCO_CHI_TIET_pitch_v2.xlsx` (bỏ khoảng trắng & dấu ngoặc cho an toàn khi copy giữa các máy).

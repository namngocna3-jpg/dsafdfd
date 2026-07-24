# Hướng dẫn add skill vào Cowork

Cowork → Skills → **Add** → **Upload a skill** → chọn file `.zip` bên dưới.

> ⚠️ Cowork nhận **1 skill mỗi lần upload**. Không có cách gom hết plugin thành 1 lần bấm.

## File trong folder này

| File | Là gì | Upload thế nào |
|---|---|---|
| `coco-video.zip` | Skill coco-video v2 (nhà mình tự viết) — ideal → kịch bản → prompt ảnh → prompt video, wizard 5 cổng + 3 module | Upload 1 lần, xong ngay |
| `mkt-suite.zip` | Plugin marketing 117 skill (gộp 3 tác giả) | Xem lưu ý bên dưới |

## mkt-suite — 2 cách

### Cách A: nguyên plugin (1 file)
`mkt-suite.zip` = nguyên plugin (`.claude-plugin/` + `skills/`). Nếu Cowork nhận cả plugin → tách ra 117 skill 1 lần.

### Cách B: từng skill (117 file) — folder `mkt-suite-per-skill/`
Mỗi skill = 1 `.zip` riêng, **SKILL.md ở gốc zip** (đúng chuẩn "Upload a skill"). Dùng khi Cowork chỉ nuốt 1 skill/lần.
- Mục lục 117 skill + mô tả: xem `mkt-suite-DANH-SACH.md`.
- Upload cái nào cần cái đó — **không bắt buộc up hết 117**. Chọn vài skill hay dùng (vd `ad-creative.zip`, `ads.zip`, `content-calendar.zip`...) up trước.

👉 Khuyến nghị: **coco-video + vài skill mkt-suite hay dùng** thì up qua Cowork; **cả bộ 117** thì cài bằng plugin (`bash ~/.claude/memory/sync.sh`) cho nhanh — Cowork và CLI dùng chung kho skill.

## Cài lại trên máy khác (không cần Cowork)

Repo `claude-memory-sync` đã có cả coco-video + mkt-suite dạng local-plugin. Trên máy mới:

```bash
git clone https://github.com/namngocna3-jpg/claude-memory-sync.git ~/.claude/memory
bash ~/.claude/memory/sync.sh
```

`sync.sh` tự cài mkt-suite + coco-video + toàn bộ plugin trong manifest.

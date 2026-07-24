// build_gui_chituyen.mjs — Tạo 3 file gửi chị Tuyền, rút từ 2 file chính.
// 1) Ideal video trên page  2) 10 bài group + direction + content pillar (2 tuần T7 + T8)  3) Đề xuất gói + KM sự kiện cho group
import { Sheet, S, writeWorkbook, bullets } from 'file:///C:/Users/Admin/Downloads/CocoStudio_Plan/04_Scripts/xlsxlib.mjs';
const DIR = 'C:/Users/Admin/Downloads/CocoStudio_Plan/05_Gui_ChiTuyen/';

// ============================================================= FILE 1: IDEAL VIDEO TRÊN PAGE
function buildIdealVideo(){
  const s = new Sheet('Ideal Video - Landing');
  s.setCols([5, 22, 46, 62, 30]).freezeRows(4);
  s.banner('IDEAL VIDEO TRÊN LANDING PAGE — COCO STUDIO', S.title, 5);
  s.banner('7 video Hero minh hoạ 7 thế mạnh nền tảng. Đây là MÔ TẢ NỘI DUNG (kể chuyện gì + tóm tắt cảnh) để duyệt concept — KHÔNG phải prompt kỹ thuật. Prompt render lấy ở bước sản xuất.', S.subtitle, 5);
  s.addBlank();
  s.addRow([{v:'#',s:S.colheader},{v:'Tab / Thế mạnh',s:S.colheader},{v:'Nói về gì (nội dung & thông điệp)',s:S.colheader},{v:'Tóm tắt các cảnh',s:S.colheader},{v:'Overlay text (HTML)',s:S.colheader}]);
  const V = [
    ['1','Branded Video',
      '"Nước hoa nở giữa đêm" — TVC 8s cho một chai nước hoa cao cấp. Thông điệp: chất TVC sang trọng có thể dựng ra trong vài giờ, không cần ê-kíp quay cả tuần.',
      bullets('Cảnh 1: Mặt bàn đá đen ướt, tối. Một giọt nước rơi chậm, gợn sóng lan ra.\nCảnh 2: Chai nước hoa từ trong bóng tối trồi lên, ánh viền vàng quét dọc thân chai.\nCảnh 3: Máy quay lượn 180° quanh chai, giọt nước bắn tung slow-motion.\nCảnh 4: Chốt ở logo, ánh sáng tụ lại — "chất TVC" trọn vẹn trong 1 khung.'),
      '"TVC-ready in hours, not weeks."'],
    ['2','Cinematic Creation',
      '"Hang động ánh sáng" — một cảnh điện ảnh hoành tráng kiểu phim tài liệu IMAX. Thông điệp: những cú máy đời thực gần như không đủ tiền để quay, giờ làm được.',
      bullets('Cảnh 1: Máy bay xuyên qua miệng hang cổ khổng lồ, tia nắng vàng xuyên trần đá.\nCảnh 2: Lướt qua dòng sông ngầm mờ sương, rêu xanh phủ vách đá.\nCảnh 3: Camera vươn lên cao, mở ra toàn cảnh nội thất hang vĩ đại, tia sáng thể tích (god rays) đổ xuống.'),
      '"Shots you can\'t afford to film. Now you can."'],
    ['3','Game Production',
      '"Chiến binh trên vách đá" — cinematic trailer cho một nhân vật game fantasy. Thông điệp: từ concept tới đoạn giới thiệu nhân vật đậm chất AAA.',
      bullets('Cảnh 1: Chiến binh giáp trụ đứng ở mép vách đá, áo choàng bay trong gió.\nCảnh 2: Thanh kiếm năng lượng phát sáng trong tay; phía sau là hoàng hôn với các đảo bay lơ lửng.\nCảnh 3: Máy quay góc thấp đẩy chậm lên (heroic reveal) — khoảnh khắc "ra mắt anh hùng".'),
      '"From concept to game trailer."'],
    ['4','AIGC Creative Tools',
      '"Một khung hình, bảy phong cách" — video showcase chính sức mạnh công cụ: cùng một chủ thể biến hoá qua nhiều style. Thông điệp: nền tảng đa năng, mọi phong cách thương hiệu cần đều làm được.',
      bullets('Cảnh 1: Một chân dung người bình thường ở giữa khung.\nCảnh 2: Cùng chân dung đó "morph" mượt qua các style: điện ảnh → 3D game → tranh sơn dầu → anime → cyberpunk.\nCảnh 3: Tất cả phiên bản xếp thành lưới rồi thu lại về bản gốc.'),
      '"Every style your brand needs."'],
    ['5','Trailer',
      '"30 giây nghẹt thở" — teaser trailer phim giả tưởng, dựng nhịp cắt nhanh. Thông điệp: AI làm được cả cảm xúc điện ảnh, không chỉ khung hình đẹp.',
      bullets('Cảnh 1: Màn đen, một tiếng thở. Cận cảnh đôi mắt nhân vật chính mở ra.\nCảnh 2: Cắt nhanh: thành phố sụp đổ, đám đông bỏ chạy, tia sáng loé.\nCảnh 3: Nhân vật đứng dậy giữa đống đổ nát, máy quay đẩy ra sau bộc lộ quy mô hoành tráng.\nCảnh 4: Chớp đen dứt điểm → title phim hiện ra.'),
      '"Cinematic emotion, not just pretty frames."'],
    ['6','Real Human',
      '"Gương mặt thật, đã eKYC" — điểm khác biệt pháp lý của Coco: khuôn mặt người thật, có consent + eKYC, dùng được cho quảng cáo thương mại. Đây chính là video demo pháp lý.',
      bullets('Cảnh 1: Cận cảnh chân dung người mẫu Việt, da chân thực từng lỗ chân lông.\nCảnh 2: Nụ cười tự tin dần hình thành, ánh catchlight lấp lánh trong mắt.\nCảnh 3: Máy quay đẩy vào chậm, nền xoá phông — chốt bằng dòng "Real face · eKYC · dùng thương mại hợp lệ".'),
      '"Real faces, cleared with eKYC. Compliant for commercial use."'],
    ['7','Cartoon and Anime',
      '"Nóc nhà lúc hoàng hôn" — một cảnh anime cảm xúc. Thông điệp: nền tảng làm được cả mảng hoạt hình/anime chất lượng studio.',
      bullets('Cảnh 1: Nhân vật trẻ đứng trên nóc một toà nhà, nhìn ra thành phố Tokyo tương lai.\nCảnh 2: Gió thổi tóc bay, bầu trời cam-hồng với mây trôi.\nCảnh 3: Máy quay ngước dần từ thành phố lên gương mặt nhân vật — cel-shading mềm, màu rực rỡ.'),
      '"Every style your brand needs."'],
  ];
  V.forEach(r=>s.addRow([{v:r[0],s:S.center},{v:r[1],s:S.greenbold},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap}]));
  s.addBlank();
  s.banner('BỐ CỤC ĐỀ XUẤT TRÊN TRANG (thứ tự cuộn màn hình)', S.section, 5);
  const L = [
    ['Hero đầu trang','Video 1 (Branded/TVC) auto-loop, muted, overlay CTA "Dùng thử Coco Studio" — ấn tượng đầu tiên phải là chất thương mại.'],
    ['Dải "7 thế mạnh"','7 video xếp lưới/carousel, mỗi ô 1 tab (Branded · Cinematic · Game · AIGC Tools · Trailer · Real Human · Anime) — chứng minh nền tảng đa năng.'],
    ['Khối Real Human','Video 6 đặt cạnh phần eKYC/VAT/bản quyền — điểm khác biệt chính hãng, gỡ lo pháp lý cho khách DN.'],
    ['CTA cuối','Loop lại video 2 (cinematic) làm nền + nút "Xem bảng giá / Tạo video đầu tiên".'],
  ];
  L.forEach(r=>{s.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},'','','']); s.merge(`B${s._r}:E${s._r}`);});
  s.addBlank();
  s.banner('GHI CHÚ SẢN XUẤT (khi duyệt concept xong mới viết prompt render)', S.section, 5);
  const P = [
    ['Concept & tóm tắt cảnh','Bảng trên — dùng để chị Tuyền / sếp DUYỆT nội dung trước.'],
    ['Viết prompt render','Sau khi chốt concept mới bóc từng cảnh thành prompt Seedance (bước riêng).'],
    ['Video 6 (face thật)','Cần người mẫu có consent + eKYC đúng quy trình — chính video này là demo pháp lý.'],
    ['Grade / ghép loop / overlay','Editor nhẹ (CapCut/Premiere) — cắt loop mượt, overlay text để HTML render (không nhồi vào video).'],
    ['Nhúng landing','Dev web Coco thay ô video trống trên trang bằng 7 video này.'],
  ];
  P.forEach(r=>{s.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},'','','']); s.merge(`B${s._r}:E${s._r}`);});
  return s;
}

// ============================================================= FILE 2: 10 BÀI + DIRECTION + CONTENT PILLAR
function buildContentPlan(){
  const sheets = [];

  // -- Sheet A: Content Direction & Pillar
  const a = new Sheet('Direction & Pillar');
  a.setCols([28, 12, 70]).freezeRows(3);
  a.banner('CONTENT DIRECTION & PILLAR — GROUP "AI VIDEO CREATORS VIETNAM"', S.title, 3);
  a.banner('TONE: chuyên nghiệp – thẳng thắn – thực chiến – tôn trọng nghề. MOOD: "anh em làm nghề nâng nhau lên", nghiêm túc nhưng không khô. KHÔNG hô "AI thay thế con người", KHÔNG câu view rẻ.', S.subtitle, 3);
  a.addRow([{v:'Pillar (tuyến nội dung)',s:S.colheader},{v:'Tỷ lệ',s:S.colheader},{v:'Mô tả — bám tone',s:S.colheader}]);
  const P = [
    ['Thực chiến kỹ thuật (workflow/prompt)','30%','Mổ prompt, workflow Seedance/ComfyUI, giữ nhất quán nhân vật, ngôn ngữ máy quay, fix lỗi mặt trôi/tay 6 ngón.'],
    ['Ứng dụng thương mại (case thật)','25%','TVC/quảng cáo/phim/game làm bằng AI, bài toán client (giá – tiến độ – bản quyền – VAT), before/after.'],
    ['Cập nhật xu hướng & model mới','20%','Trend AI hình ảnh/video hot nhất, model mới, so sánh, tin thị trường nghề.'],
    ['Câu chuyện & truyền cảm hứng','15%','Hành trình người làm nghề, thất bại–bài học, UGC member, spotlight.'],
    ['Hoạt động cộng đồng (ritual)','10%','Khám video AI, contest, AMA/workshop, Chợ Phiên, minigame.'],
  ];
  P.forEach(r=>a.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:S.center},{v:r[2],s:S.wrap}]));
  a.addBlank();
  a.banner('5 RITUAL CỐ ĐỊNH (nhịp tuần) — xương sống lịch đăng', S.section, 3);
  const R = [
    ['🎬 Khám video AI','Chuyên gia review video member gửi — 3 điểm được / 3 điểm sửa. Ritual đinh của group.'],
    ['🛒 Chợ Phiên (Thứ 6)','Ngày DUY NHẤT được đăng bán dịch vụ / tuyển / tìm job, theo mẫu. Ngày khác gỡ.'],
    ['📡 Trend Radar','3 xu hướng video AI nóng tuần này + prompt mẫu.'],
    ['🧠 Mổ prompt','Bóc tách 1 prompt hay thành công thức copy được.'],
    ['🏆 Contest / Minigame','Đố vui AI-hay-thật, showcase, tặng Pro Kit — kéo tương tác.'],
  ];
  R.forEach(r=>a.addRow([{v:r[0],s:S.label},{v:'',s:0},{v:r[1],s:S.wrap}]));
  sheets.push(a);

  // -- Sheet B: Lịch 2 tuần tháng 7 (bám event 31/07)
  const b = new Sheet('Lịch 2 tuần T7');
  b.setCols([10, 14, 16, 40, 12]).freezeRows(4);
  b.banner('CONTENT CALENDAR — 2 TUẦN CUỐI THÁNG 7 (chạy nước rút sự kiện 31/07)', S.title, 5);
  b.banner('Mục tiêu: kéo traffic từ Fanpage → Group nhận mã COCO15, làm nóng trước & ngay sau event. ★ = bài đón traffic event.', S.subtitle, 5);
  b.addBlank();
  b.addRow([{v:'Ngày',s:S.colheader},{v:'Kênh',s:S.colheader},{v:'Pillar',s:S.colheader},{v:'Nội dung / Bài',s:S.colheader},{v:'Ưu tiên',s:S.colheader}]);
  const T7 = [
    ['T2 21/07','Group · Ghim','Ritual','Bài #1 Welcome + Rules (GHIM) — dựng chuẩn cộng đồng','📌 GHIM'],
    ['T3 22/07','Fanpage · Lạnh','Thực chiến','Bài #2 "Vì sao 90% video AI trông giả" — 3 lỗi brief','★'],
    ['T4 23/07','Group · Lạnh','Cộng đồng','Bài #3 Đố vui: AI hay quay thật? (tặng 20 prompt)',''],
    ['T5 24/07','Group · Ấm','Ritual','Bài #4 Ra mắt "Khám video AI — Số 0" (mở form nộp)',''],
    ['T6 25/07','Fanpage · Ấm','Thương mại','Bài #5 "TVC 15s, 3 bản, 48h — bài toán agency"','★'],
    ['T6 25/07','Group · Nóng','Ritual','Bài #6 Chợ Phiên #1 (có duyệt) — mở kênh giao dịch',''],
    ['T7 26/07','Group · Lạnh','Xu hướng','Bài #7 Trend Radar tuần này (3 trend + prompt)',''],
    ['CN 27/07','Fanpage · Lạnh','Thương mại','Nhắc nhẹ: event còn 4 ngày — teaser speaker/showcase',''],
    ['T2 28/07','Fanpage · Lạnh','Chuyển đổi','Bài #8 "Còn 3 ngày! Mã giảm vé COCO15" → về Group','★'],
    ['T3 29/07','Group · Ấm','Thực chiến','Bài #9 Tặng "AI Video Pro Kit" (20 prompt + checklist)','★'],
    ['T4 30/07','Group · Nóng','Chuyển đổi','Nhắc chốt vé + hướng dẫn nhận 500 credit qua link group',''],
    ['T5 31/07','Fanpage+Group','Sự kiện','SỰ KIỆN 31/07 — live/hình hậu trường, kêu gọi vào group',''],
    ['T6 01/08','Group · Ấm','Thương mại','Bài #10 Case thật: làm TVC bằng AI ra sao (recap event)',''],
  ];
  T7.forEach(r=>b.addRow([{v:r[0],s:S.label},{v:r[1],s:0},{v:r[2],s:0},{v:r[3],s:S.wrap},{v:r[4],s:r[4].includes('★')?S.good:(r[4]?S.warn:0)}]));
  sheets.push(b);

  // -- Sheet C: Lịch tháng 8 (4 tuần chủ đề)
  const c = new Sheet('Lịch tháng 8');
  c.setCols([10, 16, 16, 44]).freezeRows(4);
  c.banner('CONTENT CALENDAR — THÁNG 8 (nuôi dưỡng hậu event + biến member → khách)', S.title, 4);
  c.banner('4 tuần theo chủ đề. Giữ 5 ritual chạy đều. Chèn upsell gói Coco tinh tế theo tone làm nghề, không spam bán.', S.subtitle, 4);
  c.addBlank();
  c.addRow([{v:'Tuần',s:S.colheader},{v:'Chủ đề tuần',s:S.colheader},{v:'Ritual cố định',s:S.colheader},{v:'Bài chủ lực (gợi ý)',s:S.colheader}]);
  const T8 = [
    ['Tuần 1\n(04-10/08)','Hậu event & Onboarding','Khám video AI #1\nChợ Phiên · Trend Radar',bullets('Recap event + album ảnh, spotlight bài dự thi đẹp · Hướng dẫn member mới: cách nộp bài Khám video · Mổ prompt 1 video hero từ landing · UGC: member khoe video làm sau event')],
    ['Tuần 2\n(11-17/08)','Thực chiến chuyên sâu','Khám video AI #2\nChợ Phiên · Trend Radar',bullets('Series "Giữ nhất quán nhân vật xuyên cảnh" (khóa seed) · Ngôn ngữ máy quay: 8 lệnh camera hay dùng · Case client: A/B 3 hướng TVC trong 1 buổi · AMA mini với 1 đạo diễn/VFX')],
    ['Tuần 3\n(18-24/08)','Ứng dụng thương mại & Pháp lý','Khám video AI #3\nChợ Phiên · Trend Radar',bullets('Vì sao khách DN cần VAT + eKYC + bản quyền · Bóc case Real Face (eKYC) cho beauty/brand · Bảng giá trị: bao nhiêu video/1 job, tính chi phí thật · Phát động Contest #1 "AI Video Showcase"')],
    ['Tuần 4\n(25-31/08)','Contest & Chuyển đổi','Khám video AI #4\nChợ Phiên · Trend Radar',bullets('Đẩy bài dự thi Contest #1, minigame vote · Tổng kết trend tháng 8 · Ưu đãi gói Coco cho member (mã group) + 500 credit · Spotlight member có job/khách nhờ AI Video')],
  ];
  T8.forEach(r=>c.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap}]));
  sheets.push(c);

  // -- Sheet D: 10 bài seed FULL copy-paste
  const d = new Sheet('10 bài group (full)');
  d.setCols([5, 18, 26, 78, 12]).freezeRows(4);
  d.banner('10 BÀI GROUP — NỘI DUNG ĐẦY ĐỦ, COPY-PASTE ĐĂNG NGAY', S.title, 5);
  d.banner('TONE bám định vị: chuyên nghiệp – thực chiến – làm nghề, không hô hào, không câu view rẻ. ★ = đăng ngay đón traffic event · 📌 = ghim.', S.subtitle, 5);
  d.addBlank();
  d.addRow([{v:'#',s:S.colheader},{v:'Kênh / Phễu',s:S.colheader},{v:'Tiêu đề',s:S.colheader},{v:'Nội dung đầy đủ',s:S.colheader},{v:'Ưu tiên',s:S.colheader}]);
  const POSTS = [
    ['1','Group · Ghim','Welcome + Rules',`Chào mừng bạn đến với AI Video Creators Vietnam 👋

Đây không phải nơi khoe "AI sắp thay thế loài người". Đây là chỗ của những người THẬT SỰ dùng AI để ra sản phẩm — marketer, editor, production house, agency, freelancer, chủ brand.

Tiêu chuẩn của group: chất lượng trước, số lượng sau. Bạn sẽ thấy:
🎬 "Khám video AI" — chuyên gia review video bạn làm
📂 Template, prompt, source dùng được ngay
🧠 Case thật: làm TVC, video game, content brand bằng AI

NỘI QUY:
✅ Chia sẻ quá trình + prompt thật, hỏi cụ thể, góp ý có dẫn chứng
❌ Không spam link bán, không tài khoản lậu/crack, không vi phạm bản quyền

Bắt đầu: comment bạn đang làm gì với AI Video + 1 thứ muốn giỏi hơn trong 3 tháng tới.`,'📌 GHIM'],
    ['2','Fanpage · Lạnh','Vì sao 90% video AI trông "giả"',`Ai từng render một cảnh nhân vật bằng AI đều gặp: mặt "trôi" giữa các frame, tay 6 ngón, chuyển động như trượt băng. Không phải AI kém — phần lớn do brief sai từ đầu.

3 lỗi hay gặp nhất:
1. Nhồi quá nhiều vào 1 prompt. Một cảnh = 1 chủ thể + 1 hành động + 1 hướng máy.
2. Bỏ quên continuity. Đổi mặt giữa 2 cảnh là do không khóa seed. Nền tảng thuần seed như Seedance giữ nhất quán nhân vật rất tốt cho TVC.
3. Coi camera là phụ. "Dolly in chậm", "orbit 90 độ" — ghi rõ ngôn ngữ máy quay thì mới ra chất điện ảnh.

👉 Bạn kẹt ở lỗi nào nhất? Comment để tụi mình mổ bài tới.`,'★'],
    ['3','Group · Lạnh','Đố vui: AI hay quay thật?',`Nhìn nhanh 4 clip dưới đây 👇 Đâu là AI, đâu là quay thật?

Comment đáp án theo thứ tự (VD: 1-AI, 2-Thật...). Ai đúng hết tụi mình tặng bộ 20 prompt Seedance TVC-ready.

Gợi ý: để ý ánh sáng phản chiếu trong mắt và chuyển động của tóc — đó là chỗ AI hay lộ nhất.`,''],
    ['4','Group · Ấm','Khám video AI — Số 0',`Ra mắt chuyên mục 🎬 KHÁM VIDEO AI.

Cách chơi: bạn gửi 1 video AI mình làm → chuyên gia (đạo diễn/VFX/creator) sẽ xem trực tiếp, chỉ ra 3 điểm được và 3 điểm cần sửa. Học nhanh nhất là được người giỏi soi bài của chính mình.

Số đầu tiên tuần sau. Nộp bài qua form [link] kèm: video + prompt bạn dùng + bạn muốn được góp ý ở đâu.

Không sợ bị chê — sợ nhất là làm mãi không ai chỉ chỗ sai.`,''],
    ['5','Fanpage · Ấm','TVC 15s, 3 bản, 48h — bài toán agency',`Client giờ không hỏi "đẹp không". Họ hỏi: bao nhiêu, bao lâu, có xuất hóa đơn không.

Cách cũ: thuê ê-kíp, quay, hậu kỳ — vài chục triệu, vài tuần cho 1 concept. A/B test 3 hướng? Nhân 3 chi phí.

AI Video đổi luật: cùng 1 brief, ra 3-5 hướng hình trong 1 buổi để client chọn. Nhưng để DÙNG ĐƯỢC cho khách doanh nghiệp, cần 3 thứ bản free không có:
• Nhất quán thương hiệu qua cả campaign
• Hóa đơn VAT (không có thì kế toán khách không nghiệm thu)
• Bản quyền & eKYC khuôn mặt

👉 Agency/brand bạn vướng nhất ở đâu — chất lượng, chi phí, hay pháp lý?`,'★'],
    ['6','Group · Nóng','Chợ Phiên #1 (có duyệt)',`Thứ 6 hàng tuần = CHỢ PHIÊN — chỗ DUY NHẤT trong group được đăng bán dịch vụ / tuyển người / tìm job.

Đăng theo mẫu:
[LOẠI: Bán dịch vụ / Tuyển / Tìm job]
[Bạn làm gì]
[Kèm 1 sản phẩm mẫu]
[Liên hệ]

Các ngày khác đăng bán sẽ bị gỡ. Giữ group sạch để ai cũng muốn ở lại.`,''],
    ['7','Group · Lạnh','Trend Radar tuần này',`3 xu hướng video AI đang hot tuần này 👇
1. [Trend A] — ứng dụng vào... (kèm prompt mẫu)
2. [Trend B] — ...
3. [Trend C] — ...

Lưu bài lại, thử 1 prompt và khoe kết quả bên dưới. Tuần sau tụi mình cập nhật tiếp.

(Cập nhật thực tế mỗi tuần theo trend nóng nhất)`,''],
    ['8','Fanpage · Lạnh','Còn 3 ngày! Mã giảm vé event',`🎬 Còn 3 ngày đến sự kiện AI Video chuẩn sản xuất thương mại đầu tiên tại Việt Nam (31/07, Sofitel Saigon Plaza).

Đạo diễn – nhà sản xuất phim thật, showcase thật, cách đưa AI Video lên sóng TVC đúng luật.

👉 Vào Group AI Video Creators Vietnam [link] nhận MÃ GIẢM VÉ 15% (COCO15) + bộ tài liệu Pro Kit. Số lượng mã có hạn.`,'★'],
    ['9','Group · Ấm','Tặng bộ AI Video Pro Kit',`📂 Tặng cả nhà bộ AI VIDEO PRO KIT:
• 20 prompt Seedance làm TVC
• Checklist brief video thương mại
• Bảng giữ nhất quán nhân vật xuyên cảnh

Đây cũng là bộ tụi mình dùng để mổ bài trong "Khám video AI". Tải ở bài ghim 👆

Ai muốn tụi mình soi video của bạn — comment bên dưới.`,'★'],
    ['10','Group · Ấm','Case thật: làm TVC bằng AI ra sao',`Chia sẻ 1 case thật: từ brief của khách → 3 hướng hình → chốt 1 → ra file cuối, mất bao lâu và vướng gì.

[Kể quy trình từng bước, kèm ảnh từng giai đoạn]

Điều bất ngờ nhất: khâu tốn thời gian nhất không phải render, mà là brief cho đúng ý khách.

Bạn từng làm job AI Video cho khách chưa? Kể chỗ khó nhất bên dưới.`,''],
  ];
  POSTS.forEach(r=>d.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.greenbold},{v:r[3],s:S.wrap},{v:r[4],s:r[4].includes('★')?S.good:(r[4]?S.warn:0)}]));
  sheets.push(d);

  return sheets;
}

// ============================================================= FILE 3: ĐỀ XUẤT GÓI + KM SỰ KIỆN CHO GROUP
function buildOffer(){
  const sheets = [];

  const a = new Sheet('Gói Coco Studio');
  a.setCols([22, 16, 12, 12, 46]).freezeRows(4);
  a.banner('ĐỀ XUẤT GÓI COCO STUDIO — theo giá chính hãng', S.title, 5);
  a.banner('Đã gồm VAT · thanh toán VNĐ · quy đổi 10 credit = 1 video. Gói Starter 399k là đề xuất MỚI làm gói mồi kéo phễu.', S.subtitle, 5);
  a.addBlank();
  a.addRow([{v:'Gói',s:S.colheader},{v:'Giá (VNĐ)',s:S.colheader},{v:'Credit',s:S.colheader},{v:'~Video',s:S.colheader},{v:'Bao gồm / Tệp khách',s:S.colheader}]);
  const G = [
    ['Starter (đề xuất mới)','399.000','800','80',bullets('4K + AI Prompt Assistant · Full Seedance 2.0 (mini/fast/260128) · Hóa đơn VAT · Gói mồi: kéo creator/agency mới vào phễu, upsell lên Silver'),S.warn],
    ['Silver','990.000','2.000','200',bullets('4K + AI Prompt Assistant · Hóa đơn VAT · Hợp: Freelancer'),0],
    ['Gold','1.900.000','4.000','450',bullets('4K + AI Prompt Assistant · Hóa đơn VAT · Hợp: Freelancer / Studio nhỏ'),0],
    ['Diamond','4.990.000','10.500','1.150',bullets('4K + AI Prompt Assistant · Hóa đơn VAT · Hợp: Agency / Production'),0],
    ['Titan (Real Face)','9.990.000','22.000','2.300',bullets('Unlock Real Face (eKYC) · 4K + Hóa đơn VAT · Hợp: Brand / Enterprise'),0],
  ];
  G.forEach(r=>a.addRow([{v:r[0],s:r[5]===S.warn?S.warn:S.greenbold},{v:r[1],s:S.label},{v:r[2],s:S.center},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]));
  sheets.push(a);

  const b = new Sheet('Vé event & Ưu đãi group');
  b.setCols([20, 16, 20, 14, 40]).freezeRows(4);
  b.banner('VÉ SỰ KIỆN 31/07 + ƯU ĐÃI RIÊNG CHO MEMBER GROUP', S.title, 5);
  b.banner('Đòn bẩy đưa member Group → mua vé & mua gói. Chi phí biên gần 0 (credit là sản phẩm nội bộ).', S.subtitle, 5);
  b.addBlank();
  b.addRow([{v:'Loại vé',s:S.colheader},{v:'Giá gốc',s:S.colheader},{v:'Sau COCO15 (-15%)',s:S.colheader},{v:'Credit vé',s:S.colheader},{v:'Bao gồm',s:S.colheader}]);
  const T = [
    ['Early Bird','500.000','425.000','1.500',bullets('Full-day access · Workshop · Networking')],
    ['Standard','950.000','807.000','5.000',bullets('Mọi thứ Early Bird · Priority seating · Event kit')],
    ['VIP','1.700.000','1.445.000','9.000',bullets('Mọi thứ Standard · VIP lounge · Speaker meet & greet')],
  ];
  T.forEach(r=>b.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:0},{v:r[2],s:S.good},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]));
  b.addBlank();
  b.banner('CƠ CHẾ ƯU ĐÃI CHO GROUP (đòn bẩy phễu Event → Group → Gói)', S.section, 5);
  const M = [
    ['🎟️ Mã COCO15','Giảm 15% mọi loại vé cho member group. 500k→425k · 950k→807k · 1.7tr→1.445tr.','ĐÃ CHỐT với anh Danh'],
    ['🎁 +500 credit','Tặng 500 credit khi mua vé qua link riêng của group — vừa lợi member, vừa cho họ dùng thử sản phẩm.','ĐÃ CHỐT — cần xác nhận nguồn credit với BTC'],
    ['🧰 Pro Kit','Vào group nhận bộ 20 prompt + checklist brief + bảng giữ nhất quán nhân vật — mồi để vào group.','Sẵn sàng'],
    ['⬆️ Combo upsell','Mua vé VIP tặng thêm dùng thử gói Starter / cộng credit — đẩy từ vé sang xài nền tảng.','Đề xuất — trình sếp'],
  ];
  M.forEach(r=>{b.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},{v:'',s:0},{v:'',s:0},{v:r[2],s:r[2].startsWith('ĐÃ CHỐT')?S.good:S.warn}]); b.merge(`B${b._r}:D${b._r}`);});
  sheets.push(b);

  const c = new Sheet('Cần chốt với sếp');
  c.setCols([6, 40, 40]).freezeRows(3);
  c.banner('NHỮNG ĐIỂM CẦN TRÌNH SẾP / BTC XÁC NHẬN', S.title, 3);
  c.banner('Phần còn lại đã chốt, chỉ 3 điểm sau cần sếp/BTC gật để triển khai.', S.subtitle, 3);
  c.addRow([{v:'#',s:S.colheader},{v:'Nội dung',s:S.colheader},{v:'Trạng thái',s:S.colheader}]);
  const K = [
    ['1','Mức giảm vé 15% (COCO15) cho member group','Đề xuất — chờ duyệt %'],
    ['2','Nguồn 500 credit tặng khi mua vé qua link group','Chờ BTC xác nhận nguồn'],
    ['3','Combo upsell vé VIP → tặng Starter / cộng credit','Đề xuất mới — chờ sếp'],
  ];
  K.forEach(r=>c.addRow([{v:r[0],s:S.center},{v:r[1],s:S.wrap},{v:r[2],s:S.warn}]));
  sheets.push(c);

  return sheets;
}

// ============================================================= WRITE
writeWorkbook(DIR+'1_Ideal_Video_Landing.xlsx', [buildIdealVideo()]);
console.log('DONE 1: 1_Ideal_Video_Landing.xlsx');
writeWorkbook(DIR+'2_Content_Group_10bai_Pillar.xlsx', buildContentPlan());
console.log('DONE 2: 2_Content_Group_10bai_Pillar.xlsx');
writeWorkbook(DIR+'3_De_xuat_Goi_KM_Su_kien.xlsx', buildOffer());
console.log('DONE 3: 3_De_xuat_Goi_KM_Su_kien.xlsx');

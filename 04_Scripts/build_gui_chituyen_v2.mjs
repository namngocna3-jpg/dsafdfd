// build_gui_chituyen_v2.mjs — Bản làm lại File 1 (ideal theo skill coco-video) + File 2 (7 sheet đầy đủ).
// File 3 giữ nguyên (build ở build_gui_chituyen.mjs). Chạy: node build_gui_chituyen_v2.mjs
import { Sheet, S, writeWorkbook, bullets } from 'file:///C:/Users/Admin/Downloads/CocoStudio_Plan/04_Scripts/xlsxlib.mjs';
const DIR = 'C:/Users/Admin/Downloads/CocoStudio_Plan/05_Gui_ChiTuyen/';

// =====================================================================================
// FILE 1 — IDEAL VIDEO LANDING (theo khung skill coco-video: Nói về gì + Tóm tắt cảnh chia BLOCK + spec)
// =====================================================================================
function buildIdealVideo(){
  const sheets = [];

  // ---- Sheet A: 7 IDEAL (chuẩn feed thẳng vào wizard coco-video)
  const a = new Sheet('7 Ideal Video');
  a.setCols([4, 20, 44, 60, 11, 9, 13]).freezeRows(4);
  a.banner('IDEAL VIDEO LANDING — COCO STUDIO (7 Hero minh hoạ 7 thế mạnh)', S.title, 7);
  a.banner('Mỗi dòng = 1 IDEAL theo chuẩn skill coco-video: "Nói về gì" + "Tóm tắt cảnh" đã cắt sẵn BLOCK 10s. Đây là bản DUYỆT CONCEPT — chưa phải prompt render. Chốt concept xong đưa từng ideal vào wizard coco-video để sinh kịch bản → prompt ảnh → prompt video.', S.subtitle, 7);
  a.addBlank();
  a.addRow([
    {v:'#',s:S.colheader},{v:'Tab / Thế mạnh',s:S.colheader},{v:'Nói về gì (nội dung & thông điệp)',s:S.colheader},
    {v:'Tóm tắt cảnh (đã cắt BLOCK 10s)',s:S.colheader},{v:'Thời lượng',s:S.colheader},{v:'Tỉ lệ',s:S.colheader},{v:'Model / Credit',s:S.colheader}]);
  const V = [
    ['1','Branded Video · TVC VIRTUA',
      '"VIRTUA — Vẻ đẹp có chủ đích" — TVC son môi cao cấp ~36s. Người mẫu điềm tĩnh + thỏi son lì cam đất, tông editorial sang. Thông điệp: son cho người phụ nữ biết mình muốn gì; đồng thời chứng minh chất TVC beauty làm bằng AI. → Kịch bản + prompt đầy đủ ở sheet "TVC VIRTUA (chi tiết)".',
      bullets('BLOCK 1 (0-6s): Model giơ thỏi son đen (đóng nắp) trước mặt, mặt bokeh phía sau, môi cam đất — beauty hero.\nBLOCK 2 (6-12s): Cận mặt nghiêng, sáng tương phản mạnh, đưa thỏi son cam lên môi.\nBLOCK 3 (12-18s): Đặc tả môi đang thoa son cam, nền xám xanh.\nBLOCK 4 (18-24s): Model áo lụa trắng bên cửa sổ nắng, ngắm thỏi son mở nắp — lifestyle.\nBLOCK 5 (24-30s): Product hero — 2 thỏi son trên mặt phản chiếu đen, spotlight.\nBLOCK 6 (30-36s): Macro logo VIRTUA khắc trên vỏ đen viền bạc — chốt brand.'),
      '~36s (6 block)','16:9 + 9:16','Seedance 2.0 · 60cr'],
    ['2','Cinematic Creation',
      '"Hang động ánh sáng" — cảnh điện ảnh hoành tráng kiểu IMAX. Thông điệp: những cú máy đời thực gần như không đủ tiền để quay, giờ làm được.',
      bullets('BLOCK 1 (0-10s): Máy bay xuyên miệng hang cổ khổng lồ, tia nắng vàng xuyên trần đá → lướt qua dòng sông ngầm mờ sương, rêu xanh phủ vách.\nBLOCK 2 (10-15s): Camera vươn cao mở toàn cảnh hang vĩ đại, god rays đổ xuống.'),
      '12-15s (2 block)','16:9','Seedance 2.0 · 20cr'],
    ['3','Game Production',
      '"Chiến binh trên vách đá" — cinematic trailer nhân vật game fantasy. Thông điệp: từ concept tới đoạn giới thiệu nhân vật đậm chất AAA.',
      bullets('BLOCK 1 (0-10s): Chiến binh giáp trụ đứng mép vách đá, áo choàng bay trong gió, kiếm năng lượng phát sáng; sau lưng hoàng hôn với đảo bay lơ lửng → máy góc thấp đẩy chậm lên (heroic reveal).'),
      '8-10s (1 block)','16:9','Seedance 2.0 · 10cr'],
    ['4','AIGC Creative Tools',
      '"Một khung hình, bảy phong cách" — showcase sức mạnh công cụ: cùng chủ thể biến hoá qua nhiều style. Thông điệp: nền tảng đa năng, mọi phong cách brand cần đều làm được.',
      bullets('BLOCK 1 (0-10s): Chân dung người bình thường ở giữa khung → morph mượt qua các style: điện ảnh → 3D game → sơn dầu → anime → cyberpunk → tất cả xếp thành lưới rồi thu về bản gốc.'),
      '10s (1 block)','16:9','Seedance 2.0 · 10cr'],
    ['5','Trailer',
      '"30 giây nghẹt thở" — teaser trailer phim giả tưởng, nhịp cắt nhanh. Thông điệp: AI làm được cả cảm xúc điện ảnh, không chỉ khung hình đẹp.',
      bullets('BLOCK 1 (0-10s): Màn đen, một tiếng thở, cận cảnh đôi mắt nhân vật mở ra → cắt nhanh thành phố sụp đổ, đám đông bỏ chạy, tia sáng loé.\nBLOCK 2 (10-20s): Nhân vật đứng dậy giữa đổ nát, máy đẩy ra sau lộ quy mô → chớp đen → title phim hiện.'),
      '20s (2 block)','16:9','Seedance 2.0 · 20cr'],
    ['6','Real Human (eKYC)',
      '"Gương mặt thật, đã eKYC" — điểm khác biệt pháp lý của Coco: mặt người thật, có consent + eKYC, dùng cho quảng cáo thương mại. Chính là video demo pháp lý.',
      bullets('BLOCK 1 (0-8s): Cận cảnh chân dung người mẫu Việt, da chân thực từng lỗ chân lông → nụ cười tự tin hình thành, catchlight lấp lánh trong mắt → máy đẩy vào chậm, xoá phông, chốt dòng "Real face · eKYC".'),
      '8s (1 block)','9:16 + 16:9','Seedance 2.0 · 10cr·⚠eKYC'],
    ['7','Cartoon & Anime',
      '"Nóc nhà lúc hoàng hôn" — cảnh anime cảm xúc. Thông điệp: nền tảng làm được cả mảng hoạt hình/anime chất lượng studio.',
      bullets('BLOCK 1 (0-10s): Nhân vật trẻ đứng trên nóc toà nhà nhìn ra Tokyo tương lai, gió thổi tóc bay, trời cam-hồng mây trôi → máy ngước dần từ thành phố lên gương mặt, cel-shading mềm màu rực rỡ.'),
      '10s (1 block)','16:9','Seedance 2.0 · 10cr'],
  ];
  V.forEach(r=>a.addRow([{v:r[0],s:S.center},{v:r[1],s:S.greenbold},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap},{v:r[4],s:S.center},{v:r[5],s:S.center},{v:r[6],s:S.center}]));
  a.addBlank();
  a.banner('TỔNG ƯỚC LƯỢNG RENDER: 9 clip (7 video, trong đó video 2 & 5 dài 2 block) × 10 credit = ~90 credit trên Coco. Video 6 cần người mẫu có consent + eKYC.', S.section, 7);
  sheets.push(a);

  // ---- Sheet B: Bố cục landing + ghi chú sản xuất
  const b = new Sheet('Bố cục Landing');
  b.setCols([22, 78]).freezeRows(3);
  b.banner('BỐ CỤC ĐỀ XUẤT TRÊN TRANG (thứ tự cuộn màn hình)', S.title, 2);
  b.banner('Sắp xếp 7 video hero trên landing sao cho ấn tượng đầu là chất thương mại, chốt là pháp lý + CTA.', S.subtitle, 2);
  const L = [
    ['Hero đầu trang','Video 1 (Branded/TVC) auto-loop, muted, overlay CTA "Dùng thử Coco Studio" — ấn tượng đầu tiên phải là chất thương mại.'],
    ['Dải "7 thế mạnh"','7 video xếp lưới/carousel, mỗi ô 1 tab (Branded · Cinematic · Game · AIGC Tools · Trailer · Real Human · Anime) — chứng minh nền tảng đa năng.'],
    ['Khối Real Human','Video 6 đặt cạnh phần eKYC/VAT/bản quyền — điểm khác biệt chính hãng, gỡ lo pháp lý cho khách DN.'],
    ['CTA cuối','Loop lại video 2 (cinematic) làm nền + nút "Xem bảng giá / Tạo video đầu tiên".'],
  ];
  L.forEach(r=>b.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap}]));
  b.addBlank();
  b.banner('GHI CHÚ SẢN XUẤT (chốt concept xong mới viết prompt render)', S.section, 2);
  const P = [
    ['Concept & tóm tắt cảnh','Sheet "7 Ideal Video" — dùng để chị Tuyền / sếp DUYỆT nội dung trước.'],
    ['Sinh prompt render','Sau khi chốt concept, đưa từng ideal vào skill coco-video → wizard sinh kịch bản → prompt ảnh → prompt video (5 trường STYLE/SCENE/MOTION/AUDIO/NEGATIVE).'],
    ['Video 6 (face thật)','Cần người mẫu có consent + eKYC đúng quy trình — chính video này là demo pháp lý.'],
    ['Grade / ghép loop / overlay','Editor nhẹ (CapCut/Premiere) — cắt loop mượt, overlay text để HTML render (không nhồi chữ vào video).'],
    ['Nhúng landing','Dev web Coco thay ô video trống trên trang bằng 7 video này.'],
  ];
  P.forEach(r=>b.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap}]));
  sheets.push(b);

  // ---- Sheet C: Tracker sản xuất (format chi tiết, người phụ trách theo vai trò)
  const c = new Sheet('Tracker sản xuất');
  c.setCols([4, 26, 24, 16, 12, 22, 24]).freezeRows(4);
  c.banner('TRACKER SẢN XUẤT 7 VIDEO HERO', S.title, 7);
  c.banner('Bảng theo dõi tiến độ render. Cột "Người phụ trách" điền gợi ý theo vai trò — chị Tuyền chỉnh tên thật khi phân công. Tình trạng: Chưa làm → Đang render → Cần sửa → Xong.', S.subtitle, 7);
  c.addBlank();
  c.addRow([{v:'#',s:S.colheader},{v:'Video',s:S.colheader},{v:'Người phụ trách (vai trò)',s:S.colheader},{v:'Tình trạng',s:S.colheader},{v:'Deadline',s:S.colheader},{v:'Link render/output',s:S.colheader},{v:'Ghi chú',s:S.colheader}]);
  const TR = [
    ['1','Branded Video (TVC nước hoa)','AI Creator — dựng prompt & render','Chưa làm','','','Hero đầu trang, cần loop mượt'],
    ['2','Cinematic (Hang động)','AI Creator — dựng prompt & render','Chưa làm','','','2 block, ghép nối liền cảnh'],
    ['3','Game Production (Chiến binh)','AI Creator — dựng prompt & render','Chưa làm','','',''],
    ['4','AIGC Tools (7 phong cách)','AI Creator — dựng prompt & render','Chưa làm','','','Cảnh morph — test kỹ transition'],
    ['5','Trailer (Teaser phim)','AI Creator + Editor — cắt nhịp','Chưa làm','','','2 block, dựng nhịp cắt nhanh'],
    ['6','Real Human (Face eKYC)','AI Creator + Pháp chế — duyệt eKYC','Chưa làm','','','⚠ Cần người mẫu consent + eKYC'],
    ['7','Cartoon & Anime (Nóc nhà)','AI Creator — dựng prompt & render','Chưa làm','','',''],
  ];
  TR.forEach(r=>c.addRow([{v:r[0],s:S.center},{v:r[1],s:S.greenbold},{v:r[2],s:S.wrap},{v:r[3],s:S.warn},{v:r[4],s:S.center},{v:r[5],s:0},{v:r[6],s:S.wrap}]));
  sheets.push(c);

  return sheets;
}

// =====================================================================================
// FILE 2 — CONTENT PLAN (7 sheet): Direction → Pillar Fanpage → Pillar Group → Phễu → Plan chi tiết → Bài Fanpage → Bài Group
// =====================================================================================
function buildContentPlan(){
  const sheets = [];

  // ---------------------------------------- SHEET 1: DIRECTION & MỤC TIÊU
  const a = new Sheet('1. Direction & Mục tiêu');
  a.setCols([26, 74]).freezeRows(3);
  a.banner('CONTENT DIRECTION — HỆ SINH THÁI COCO STUDIO (Fanpage + Group)', S.title, 2);
  a.banner('TONE chung: chuyên nghiệp – thẳng thắn – thực chiến – tôn trọng nghề. MOOD "anh em làm nghề nâng nhau lên". KHÔNG hô "AI thay thế con người", KHÔNG câu view rẻ. Concept "Xưởng phim AI". Màu brand xanh #16A34A + đen #0B1220.', S.subtitle, 2);
  const DIR = [
    ['🎯 Mục tiêu tổng','Xây hệ sinh thái nội dung 2 tầng: Fanpage (mặt tiền thương hiệu, kéo người lạ) → Group (nhà chung cộng đồng, nuôi & chuyển đổi). Đích 6 tháng: 50.000 member group chất lượng.'],
    ['👥 Đối tượng','Marketer, editor, production house, agency, freelancer sáng tạo, chủ brand vừa & nhỏ — người THẬT SỰ dùng AI để ra sản phẩm thương mại (không phải dân "vọc cho vui").'],
    ['🏛️ Vai trò 2 kênh','FANPAGE = mặt tiền: bài trau chuốt, chạy ads, đón người lạ, xây uy tín thương hiệu, luôn có CTA "vào Group". GROUP = nhà chung: thực chiến sâu, ritual, UGC, giao dịch có kiểm soát, nơi chuyển đổi ra khách hàng.'],
    ['🔗 Nguyên tắc phễu','Mọi bài Fanpage đều mở 1 cửa dẫn về Group. Mọi hoạt động Group đều có điểm chạm dẫn tới sản phẩm Coco (gói/credit/event). Không để 2 kênh chạy rời rạc.'],
    ['📊 KPI Fanpage','Reach người lạ, lượt chia sẻ/lưu, tỉ lệ click sang Group, tăng follow. Đo mỗi bài ở cột Reach/Tương tác của Content Plan.'],
    ['📊 KPI Group','Member mới/tuần, tỉ lệ member tương tác (comment/nộp bài), số bài UGC, số giao dịch Chợ Phiên, số vé/gói bán qua link group.'],
    ['🗣️ Nguyên tắc viết','Bài nào cũng phải: (1) có 1 insight nghề thật, (2) mời tương tác cụ thể (không hỏi chung chung), (3) khớp 1 pillar, (4) đúng kênh. Không đăng cho có.'],
  ];
  DIR.forEach(r=>a.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap}]));
  sheets.push(a);

  // ---------------------------------------- SHEET 2: PILLAR FANPAGE
  const f = new Sheet('2. Pillar FANPAGE');
  f.setCols([28, 10, 62]).freezeRows(4);
  f.banner('CONTENT PILLAR — FANPAGE (mặt tiền thương hiệu, kéo người lạ)', S.title, 3);
  f.banner('Fanpage nói với NGƯỜI LẠ: uy tín, dễ hiểu, có sườn để chạy ads. Mỗi bài luôn khép lại bằng 1 cửa dẫn về Group. Ít thuật ngữ hơn Group, nhiều "wow" & lợi ích rõ.', S.subtitle, 3);
  f.addRow([{v:'Pillar Fanpage',s:S.colheader},{v:'Tỷ lệ',s:S.colheader},{v:'Mô tả — bám tone',s:S.colheader}]);
  const PF = [
    ['Showcase sản phẩm (wow)','30%','Video hero/case đẹp làm bằng Coco (TVC, cinematic, anime...). Mục tiêu dừng scroll người lạ, khoe năng lực nền tảng chính hãng.'],
    ['Uy tín & khác biệt chính hãng','25%','Native Seedance · eKYC/Real Face · hóa đơn VAT · thanh toán VNĐ · bản quyền. Gỡ lo pháp lý cho khách DN — thứ tool lậu không có.'],
    ['Kiến thức phổ thông (educate)','20%','Mẹo/insight dễ hiểu về AI video cho người mới ("vì sao video AI trông giả", "AI làm được gì cho brand"). Bản rút gọn, dẫn về Group để học sâu.'],
    ['Sự kiện & khuyến mãi','15%','Event 31/07, mã vé, gói Coco, ưu đãi. Bài chuyển đổi có CTA rõ, luôn kèm đường về Group nhận mã.'],
    ['Câu chuyện thương hiệu','10%','Coco là ai, Peacom/BytePlus chính hãng, tầm nhìn "xưởng phim AI cho người Việt". Xây niềm tin dài hạn.'],
  ];
  PF.forEach(r=>f.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:S.center},{v:r[2],s:S.wrap}]));
  f.addBlank();
  f.banner('ĐỊNH DẠNG FANPAGE HAY DÙNG: Video hero (loop) · Carousel case study · Ảnh đơn quote/insight · Reel ngắn dọc 9:16 · Bài chuyển đổi có link.', S.section, 3);
  sheets.push(f);

  // ---------------------------------------- SHEET 3: PILLAR GROUP
  const g = new Sheet('3. Pillar GROUP');
  g.setCols([28, 10, 62]).freezeRows(4);
  g.banner('CONTENT PILLAR — GROUP "AI VIDEO CREATORS VIETNAM" (nhà chung, nuôi & chuyển đổi)', S.title, 3);
  g.banner('Group nói với NGƯỜI TRONG NGHỀ: sâu, thực chiến, có đi có lại. Đây là nơi giữ chân & biến member → khách. Cho phép thuật ngữ, prompt thật, mổ bài.', S.subtitle, 3);
  g.addRow([{v:'Pillar Group',s:S.colheader},{v:'Tỷ lệ',s:S.colheader},{v:'Mô tả — bám tone',s:S.colheader}]);
  const PG = [
    ['Thực chiến kỹ thuật (workflow/prompt)','30%','Mổ prompt, workflow Seedance, giữ nhất quán nhân vật, ngôn ngữ máy quay, fix lỗi mặt trôi/tay 6 ngón. Xương sống giá trị của group.'],
    ['Ứng dụng thương mại (case thật)','25%','TVC/quảng cáo/phim/game làm bằng AI, bài toán client (giá – tiến độ – bản quyền – VAT), before/after, cách tính chi phí thật.'],
    ['Cập nhật xu hướng & model mới','20%','Trend AI hình ảnh/video nóng tuần này, model mới, so sánh, tin thị trường nghề (Trend Radar).'],
    ['Câu chuyện & truyền cảm hứng','15%','Hành trình người làm nghề, thất bại–bài học, UGC member, spotlight người có job nhờ AI Video.'],
    ['Hoạt động cộng đồng (ritual)','10%','Khám video AI, Chợ Phiên, contest, AMA/workshop, minigame — chất keo giữ member.'],
  ];
  PG.forEach(r=>g.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:S.center},{v:r[2],s:S.wrap}]));
  g.addBlank();
  g.banner('5 RITUAL CỐ ĐỊNH (nhịp tuần) — xương sống lịch đăng Group', S.section, 3);
  const R = [
    ['🎬 Khám video AI','Chuyên gia review video member gửi — 3 điểm được / 3 điểm sửa. Ritual đinh của group.'],
    ['🛒 Chợ Phiên (Thứ 6)','Ngày DUY NHẤT được đăng bán dịch vụ / tuyển / tìm job, theo mẫu. Ngày khác gỡ.'],
    ['📡 Trend Radar','3 xu hướng video AI nóng tuần này + prompt mẫu.'],
    ['🧠 Mổ prompt','Bóc tách 1 prompt hay thành công thức copy được.'],
    ['🏆 Contest / Minigame','Đố vui AI-hay-thật, showcase, tặng Pro Kit — kéo tương tác.'],
  ];
  R.forEach(r=>g.addRow([{v:r[0],s:S.label},{v:'',s:0},{v:r[1],s:S.wrap}]));
  sheets.push(g);

  // ---------------------------------------- SHEET 4: PHỄU EVENT → GROUP → GÓI
  const p = new Sheet('4. Phễu Event→Group');
  p.setCols([20, 30, 50]).freezeRows(3);
  p.banner('PHỄU CHUYỂN ĐỔI: FANPAGE / EVENT PAGE → GROUP → GÓI COCO', S.title, 3);
  p.banner('Sơ đồ dòng chảy traffic của cả chiến dịch. Mấu chốt: page sự kiện 31/07 KHÔNG bán vé trực tiếp cho người lạ — nó đẩy về Group để nhận mã COCO15 + 500 credit, vừa tăng member vừa tạo lý do vào group.', S.subtitle, 3);
  p.addRow([{v:'Tầng phễu',s:S.colheader},{v:'Điểm chạm / Kênh',s:S.colheader},{v:'Việc cần làm + CTA',s:S.colheader}]);
  const FUN = [
    ['① TOF — Nhận biết','Fanpage (organic + ads) · Page sự kiện 31/07','Bài showcase video hero + bài teaser event chạy ads tới người lạ. CTA: "Vào Group AI Video Creators Vietnam nhận mã giảm vé COCO15 + 500 credit".'],
    ['② Kéo về Group','Link riêng của Group gắn UTM (utm_source=fanpage / event_page)','Mọi bài Fanpage & mọi post trên page event đều trỏ về CÙNG 1 link group có gắn UTM để đo nguồn. Không dẫn thẳng ra trang bán vé.'],
    ['③ MOF — Vào Group & nhận ưu đãi','Bài ghim Group (Welcome + cách nhận mã) · Pro Kit','Member vào group → đọc bài ghim → nhận Pro Kit (20 prompt + checklist) + mã COCO15 + hướng dẫn lấy 500 credit qua link mua vé riêng của group.'],
    ['④ Nuôi dưỡng','5 ritual · Khám video AI · Trend Radar · UGC','Giữ member ở lại & tương tác bằng giá trị thực chiến. Chèn upsell gói Coco tinh tế theo tone làm nghề (không spam bán).'],
    ['⑤ BOF — Chuyển đổi','Link mua vé riêng group · Bảng gói Coco · Combo upsell','Member mua vé qua link group (được 500 credit) → dự event → chuyển thành khách mua gói. Vé VIP tặng dùng thử gói Starter.'],
    ['⑥ Sau event — Vòng lặp','Recap event trên cả 2 kênh · Spotlight member','Đưa hình/kết quả event lên Fanpage kéo thêm người lạ vào group → phễu chạy lại vòng mới với tệp nóng hơn.'],
  ];
  FUN.forEach(r=>p.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  p.addBlank();
  p.banner('SƠ ĐỒ NHANH', S.section, 3);
  p.addRow([{v:'Dòng chảy',s:S.label},{v:'Người lạ (ads/organic)  →  Fanpage & Page Event 31/07  →  [link group + UTM]  →  GROUP (bài ghim + Pro Kit + COCO15 + 500cr)  →  Nuôi bằng ritual  →  Mua vé qua link group  →  Dự event  →  Mua gói Coco  →  Recap kéo vòng mới',s:S.wrap},'']);
  p.merge(`B${p._r}:C${p._r}`);
  p.addBlank();
  p.banner('CẦN CHUẨN BỊ ĐỂ PHỄU CHẠY: (1) 1 link group chuẩn có gắn UTM · (2) link mua vé riêng cho group để gắn 500 credit · (3) bài ghim hướng dẫn nhận mã · (4) Pro Kit sẵn để tải · (5) mã COCO15 kích hoạt trên cổng vé.', S.section, 3);
  sheets.push(p);

  // ---------------------------------------- SHEET 5: CONTENT PLAN CHI TIẾT (format như ảnh) — cả 2 kênh
  const cp = new Sheet('5. Content Plan chi tiết');
  cp.setCols([4, 11, 8, 16, 16, 34, 16, 11, 12, 10, 11, 12, 20, 14, 8, 9]).freezeRows(4);
  cp.banner('CONTENT PLAN CHI TIẾT — 2 TUẦN CUỐI T7 (chạy nước rút event 31/07) · cả Fanpage + Group', S.title, 16);
  cp.banner('Bảng vận hành đầy đủ. Cột Reach/Tương tác điền sau khi đăng. Tình trạng: Chưa làm → Đang viết → Chờ duyệt → Đã duyệt → Đã đăng. Người phụ trách để gợi ý theo vai trò — đổi tên thật khi phân công.', S.subtitle, 16);
  cp.addBlank();
  const HEAD = ['STT','NGÀY ĐĂNG','GIỜ ĐĂNG','NICK ĐĂNG','PILLAR','ĐỀ XUẤT CHỦ ĐỀ','LINK THAM KHẢO/OUTLINE','DUYỆT CHỦ ĐỀ','DEADLINE VIẾT BÀI','LINK DOC','TÌNH TRẠNG','LINK FB POST','NGƯỜI PHỤ TRÁCH','HÌNH THỨC','REACH','TƯƠNG TÁC'];
  cp.addRow(HEAD.map(h=>({v:h,s:S.colheader})));
  // [stt, ngày, giờ, nick, pillar, chủ đề, ưu tiên(★/📌 để tô), hình thức, người phụ trách]
  const ROWS = [
    ['1','T2 21/07','20h','Coco Studio VN','Ritual','Bài GHIM Welcome + Nội quy group — dựng chuẩn cộng đồng','📌','Text + ảnh bìa','Admin Group'],
    ['2','T3 22/07','12h','Fanpage Coco','Educate','"Vì sao 90% video AI trông giả" — 3 lỗi brief (bản Fanpage, dẫn về Group)','★','Carousel','Editor Fanpage'],
    ['3','T4 23/07','20h','Coco Studio VN','Ritual','Đố vui: AI hay quay thật? (tặng 20 prompt cho ai đúng)','','Video + poll','Admin Group'],
    ['4','T5 24/07','20h','Coco Studio VN','Ritual','Ra mắt "Khám video AI — Số 0" (mở form nộp bài)','','Text + ảnh','Chuyên gia review'],
    ['5','T6 25/07','12h','Fanpage Coco','Thương mại','"TVC 15s, 3 bản, 48h — bài toán agency" (bản Fanpage)','★','Video case','Editor Fanpage'],
    ['6','T6 25/07','20h','Coco Studio VN','Ritual','Chợ Phiên #1 (có duyệt) — mở kênh giao dịch theo mẫu','','Text mẫu','Admin Group'],
    ['7','T7 26/07','11h','Coco Studio VN','Xu hướng','Trend Radar tuần này (3 trend + prompt mẫu)','','Carousel','AI Creator'],
    ['8','CN 27/07','20h','Fanpage Coco','Sự kiện','Teaser event còn 4 ngày — speaker/showcase (dẫn về Group nhận COCO15)','','Video teaser','Editor Fanpage'],
    ['9','T2 28/07','12h','Fanpage Coco','Sự kiện','"Còn 3 ngày! Mã giảm vé COCO15" → về Group','★','Ảnh đơn + link','Editor Fanpage'],
    ['10','T3 29/07','20h','Coco Studio VN','Thực chiến','Tặng "AI Video Pro Kit" (20 prompt + checklist)','★','Text + file','AI Creator'],
    ['11','T4 30/07','20h','Coco Studio VN','Chuyển đổi','Nhắc chốt vé + hướng dẫn nhận 500 credit qua link group','','Ảnh + link','Admin Group'],
    ['12','T5 31/07','Cả ngày','Fanpage + Group','Sự kiện','SỰ KIỆN 31/07 — live/hậu trường, kêu gọi vào group','📌','Live + album','Cả team'],
    ['13','T6 01/08','20h','Coco Studio VN','Thương mại','Case thật: làm TVC bằng AI ra sao (recap event)','','Video + ảnh','AI Creator'],
    ['14','T7 02/08','11h','Fanpage Coco','Showcase','Album recap event + spotlight bài dự thi đẹp (kéo người lạ vào group)','','Carousel','Editor Fanpage'],
  ];
  ROWS.forEach(r=>{
    const [stt,ngay,gio,nick,pillar,cd,uu,ht,ph] = r;
    const uuStyle = uu.includes('★')?S.good:(uu?S.warn:0);
    cp.addRow([
      {v:stt,s:S.center},{v:ngay,s:S.label},{v:gio,s:S.center},{v:nick,s:0},{v:pillar,s:0},
      {v:cd,s:S.wrap},{v:'',s:0},{v:'',s:0},{v:'',s:0},{v:'',s:0},
      {v:'Chưa làm',s:S.warn},{v:'',s:0},{v:ph,s:0},{v:ht,s:0},{v:'',s:0},{v:'',s:0}
    ]);
  });
  cp.addBlank();
  cp.banner('GỢI Ý GIỜ VÀNG: Group 20h (tối, dân nghề rảnh) · Fanpage 11h-12h trưa & 20h. NICK ĐĂNG: "Coco Studio VN" = post trong Group; "Fanpage Coco" = fanpage chính. HÌNH THỨC bám định dạng pillar tương ứng.', S.section, 16);
  sheets.push(cp);

  // ---------------------------------------- SHEET 6: BÀI FANPAGE FULL
  const bf = new Sheet('6. Bài FANPAGE (full)');
  bf.setCols([4, 18, 26, 80, 12]).freezeRows(4);
  bf.banner('BÀI FANPAGE — NỘI DUNG ĐẦY ĐỦ, COPY-PASTE ĐĂNG NGAY', S.title, 5);
  bf.banner('Fanpage nói với người lạ: dễ hiểu, có "wow", luôn khép bằng cửa dẫn về Group. ★ = bài chạy ads/đón traffic event.', S.subtitle, 5);
  bf.addBlank();
  bf.addRow([{v:'#',s:S.colheader},{v:'Pillar',s:S.colheader},{v:'Tiêu đề',s:S.colheader},{v:'Nội dung đầy đủ',s:S.colheader},{v:'Ưu tiên',s:S.colheader}]);
  const FPOSTS = [
    ['F1','Educate','Vì sao 90% video AI trông "giả"',`Bạn từng thấy video AI mà nhân vật "trôi mặt", tay 6 ngón, đi như trượt băng? Không phải AI kém — phần lớn do brief sai từ đầu.

3 lỗi khiến video AI mất chất:
1️⃣ Nhồi quá nhiều vào 1 cảnh. Một cảnh nên là 1 chủ thể + 1 hành động + 1 hướng máy.
2️⃣ Không giữ nhất quán nhân vật giữa các cảnh (đổi mặt liên tục).
3️⃣ Quên "ngôn ngữ máy quay" — không tả cú máy thì hình bị phẳng, thiếu chất điện ảnh.

Coco Studio dùng Native Seedance giữ nhân vật nhất quán rất tốt cho TVC & phim thương hiệu.

👉 Muốn học cách sửa từng lỗi (kèm prompt thật)? Vào Group "AI Video Creators Vietnam" — bọn mình mổ bài mỗi tuần: [link group]`,'★'],
    ['F2','Showcase','TVC dựng trong vài giờ, không phải vài tuần',`Chai nước hoa nở ra giữa bóng tối, ánh vàng quét dọc thân chai, giọt nước bắn slow-motion... 🎬

Đây là 1 TVC 8s dựng hoàn toàn bằng AI trên Coco Studio — thứ mà cách cũ cần cả ê-kíp quay vài ngày.

Điều làm nên khác biệt không chỉ là "đẹp", mà là DÙNG ĐƯỢC cho khách doanh nghiệp:
✅ Chất 4K
✅ Hóa đơn VAT
✅ Bản quyền rõ ràng, thanh toán VNĐ

Xưởng phim AI cho người làm nghề Việt là có thật.

👉 Xem thêm 7 thế mạnh & bảng giá: [link] — hoặc vào Group nhận bộ prompt TVC: [link group]`,'★'],
    ['F3','Uy tín chính hãng','eKYC — thứ khiến khách doanh nghiệp gật đầu',`Một cái khó ít ai nói: dùng khuôn mặt người trong quảng cáo mà không có consent + eKYC là rủi ro pháp lý thật sự cho brand.

Coco Studio là nền tảng chính hãng (Peacom – phân phối BytePlus tại VN) có:
• Real Face + eKYC đúng quy trình
• Hóa đơn VAT để kế toán khách nghiệm thu
• Thanh toán VNĐ, không tool lậu / fake IP

Đây là lý do agency & brand chọn nền tảng chính hãng thay vì công cụ trôi nổi.

👉 Tìm hiểu gói cho Brand/Enterprise: [link] · Thảo luận nghề trong Group: [link group]`,''],
    ['F4','Sự kiện','Còn 3 ngày! Sự kiện AI Video thương mại đầu tiên tại VN',`🎬 Còn 3 ngày đến sự kiện AI Video chuẩn sản xuất thương mại đầu tiên tại Việt Nam — 31/07, Sofitel Saigon Plaza.

Đạo diễn – nhà sản xuất phim thật, showcase thật, cách đưa AI Video lên sóng TVC đúng luật (VAT, bản quyền, eKYC).

Ưu đãi riêng: vào Group "AI Video Creators Vietnam" để nhận:
🎟️ Mã giảm vé 15% (COCO15)
🎁 500 credit dùng thử khi mua vé qua link group
🧰 Bộ AI Video Pro Kit

👉 Vào group nhận mã ngay (số lượng có hạn): [link group]`,'★'],
    ['F5','Câu chuyện thương hiệu','Coco Studio — xưởng phim AI cho người Việt',`Bọn mình không tin câu "AI thay thế con người". Bọn mình tin AI là cái xưởng phim mà người làm nghề Việt xứng đáng có: nhanh hơn, rẻ hơn, nhưng vẫn chuyên nghiệp và hợp pháp.

Coco Studio (Peacom – phân phối chính hãng BytePlus tại VN) sinh ra để làm đúng điều đó: Native Seedance, Real Face eKYC, hóa đơn VAT, thanh toán VNĐ.

Sứ mệnh đơn giản: giúp anh em làm nghề nâng nhau lên.

👉 Cùng xây cộng đồng làm nghề tử tế trong Group "AI Video Creators Vietnam": [link group]`,''],
  ];
  FPOSTS.forEach(r=>bf.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.greenbold},{v:r[3],s:S.wrap},{v:r[4],s:r[4].includes('★')?S.good:(r[4]?S.warn:0)}]));
  sheets.push(bf);

  // ---------------------------------------- SHEET 7: BÀI GROUP FULL
  const bg = new Sheet('7. Bài GROUP (full)');
  bg.setCols([4, 18, 26, 80, 12]).freezeRows(4);
  bg.banner('BÀI GROUP — NỘI DUNG ĐẦY ĐỦ, COPY-PASTE ĐĂNG NGAY', S.title, 5);
  bg.banner('Group nói với người trong nghề: sâu, thực chiến, có đi có lại. ★ = đón traffic event · 📌 = ghim.', S.subtitle, 5);
  bg.addBlank();
  bg.addRow([{v:'#',s:S.colheader},{v:'Pillar',s:S.colheader},{v:'Tiêu đề',s:S.colheader},{v:'Nội dung đầy đủ',s:S.colheader},{v:'Ưu tiên',s:S.colheader}]);
  const GPOSTS = [
    ['G1','Ritual','Welcome + Rules',`Chào mừng bạn đến với AI Video Creators Vietnam 👋

Đây không phải nơi khoe "AI sắp thay thế loài người". Đây là chỗ của những người THẬT SỰ dùng AI để ra sản phẩm — marketer, editor, production house, agency, freelancer, chủ brand.

Tiêu chuẩn của group: chất lượng trước, số lượng sau. Bạn sẽ thấy:
🎬 "Khám video AI" — chuyên gia review video bạn làm
📂 Template, prompt, source dùng được ngay
🧠 Case thật: làm TVC, video game, content brand bằng AI

NỘI QUY:
✅ Chia sẻ quá trình + prompt thật, hỏi cụ thể, góp ý có dẫn chứng
❌ Không spam link bán, không tài khoản lậu/crack, không vi phạm bản quyền

Bắt đầu: comment bạn đang làm gì với AI Video + 1 thứ muốn giỏi hơn trong 3 tháng tới.`,'📌 GHIM'],
    ['G2','Ritual','Đố vui: AI hay quay thật?',`Nhìn nhanh 4 clip dưới đây 👇 Đâu là AI, đâu là quay thật?

Comment đáp án theo thứ tự (VD: 1-AI, 2-Thật...). Ai đúng hết tụi mình tặng bộ 20 prompt Seedance TVC-ready.

Gợi ý: để ý ánh sáng phản chiếu trong mắt và chuyển động của tóc — đó là chỗ AI hay lộ nhất.`,''],
    ['G3','Ritual','Khám video AI — Số 0',`Ra mắt chuyên mục 🎬 KHÁM VIDEO AI.

Cách chơi: bạn gửi 1 video AI mình làm → chuyên gia (đạo diễn/VFX/creator) sẽ xem trực tiếp, chỉ ra 3 điểm được và 3 điểm cần sửa. Học nhanh nhất là được người giỏi soi bài của chính mình.

Số đầu tiên tuần sau. Nộp bài qua form [link] kèm: video + prompt bạn dùng + bạn muốn được góp ý ở đâu.

Không sợ bị chê — sợ nhất là làm mãi không ai chỉ chỗ sai.`,''],
    ['G4','Ritual','Chợ Phiên #1 (có duyệt)',`Thứ 6 hàng tuần = CHỢ PHIÊN — chỗ DUY NHẤT trong group được đăng bán dịch vụ / tuyển người / tìm job.

Đăng theo mẫu:
[LOẠI: Bán dịch vụ / Tuyển / Tìm job]
[Bạn làm gì]
[Kèm 1 sản phẩm mẫu]
[Liên hệ]

Các ngày khác đăng bán sẽ bị gỡ. Giữ group sạch để ai cũng muốn ở lại.`,''],
    ['G5','Xu hướng','Trend Radar tuần này',`3 xu hướng video AI đang hot tuần này 👇
1. [Trend A] — ứng dụng vào... (kèm prompt mẫu)
2. [Trend B] — ...
3. [Trend C] — ...

Lưu bài lại, thử 1 prompt và khoe kết quả bên dưới. Tuần sau tụi mình cập nhật tiếp.

(Cập nhật thực tế mỗi tuần theo trend nóng nhất)`,''],
    ['G6','Thực chiến','Tặng bộ AI Video Pro Kit',`📂 Tặng cả nhà bộ AI VIDEO PRO KIT:
• 20 prompt Seedance làm TVC
• Checklist brief video thương mại
• Bảng giữ nhất quán nhân vật xuyên cảnh

Đây cũng là bộ tụi mình dùng để mổ bài trong "Khám video AI". Tải ở bài ghim 👆

Ai muốn tụi mình soi video của bạn — comment bên dưới.`,'★'],
    ['G7','Chuyển đổi','Còn 3 ngày! Nhận mã giảm vé trong group',`🎬 Còn 3 ngày đến sự kiện AI Video thương mại đầu tiên tại VN (31/07, Sofitel Saigon Plaza).

Đặc quyền riêng cho member group mình:
🎟️ Mã giảm vé 15% (COCO15)
🎁 500 credit khi mua vé qua link riêng của group [link]
🧰 Pro Kit tải ở bài ghim

Ai định đi comment "GO" để tụi mình note giữ suất + hướng dẫn nhận credit nhé.`,'★'],
    ['G8','Thương mại','Case thật: làm TVC bằng AI ra sao',`Chia sẻ 1 case thật: từ brief của khách → 3 hướng hình → chốt 1 → ra file cuối, mất bao lâu và vướng gì.

[Kể quy trình từng bước, kèm ảnh từng giai đoạn]

Điều bất ngờ nhất: khâu tốn thời gian nhất không phải render, mà là brief cho đúng ý khách.

Bạn từng làm job AI Video cho khách chưa? Kể chỗ khó nhất bên dưới.`,''],
  ];
  GPOSTS.forEach(r=>bg.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.greenbold},{v:r[3],s:S.wrap},{v:r[4],s:r[4].includes('★')?S.good:(r[4]?S.warn:0)}]));
  sheets.push(bg);

  return sheets;
}

// ===================================================== WRITE
writeWorkbook(DIR+'1_Ideal_Video_Landing.xlsx', buildIdealVideo());
console.log('DONE 1: 1_Ideal_Video_Landing.xlsx');
writeWorkbook(DIR+'2_Content_Group_10bai_Pillar.xlsx', buildContentPlan());
console.log('DONE 2: 2_Content_Group_10bai_Pillar.xlsx');

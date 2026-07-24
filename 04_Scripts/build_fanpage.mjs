// build_fanpage.mjs — Tạo "COCO_PLAN_FANPAGE.xlsx" bám khung TikTok S:KIN + Marketing Plan W&D.
import { Sheet, S, writeWorkbook, bullets } from 'file:///C:/Users/Admin/Downloads/CocoStudio_Plan/04_Scripts/xlsxlib.mjs';

const OUT = 'C:/Users/Admin/Downloads/CocoStudio_Plan/COCO_PLAN_FANPAGE.xlsx';
const sheets = [];
const CH = (arr)=>arr.map(v=>({v,s:S.colheader}));

// ============ SHEET 0: MỤC LỤC ============
{
  const sh = new Sheet('00. Mục lục');
  sh.setCols([5, 32, 72]).freezeRows(3);
  sh.banner('COCO STUDIO — PLAN FANPAGE (CONTENT & SOCIAL)', S.title, 3);
  sh.banner('Định vị chính chuyên · Tuyến bài công nghệ/sản phẩm (Seedance & Coco) · Đồng bộ phễu với Group', S.subtitle, 3);
  sh.addRow(CH(['#','Sheet','Nội dung']));
  const rows = [
    ['01','Brief thương hiệu','Câu chuyện, USP, đối tượng, nỗi đau, rào cản, sản phẩm, kênh, TONE & MOOD'],
    ['02','Content Direction & Ý tưởng','Pillar/angle/tần suất/tone + 20 idea bài cụ thể dùng ngay'],
    ['03','Phễu 5 tầng (Strategy)','CHƯA BIẾT → BIẾT → HIỂU → TIN → YÊU, map Lạnh/Ấm/Nóng + CTA'],
    ['04','Content Calendar 4 tuần','Lịch bài mẫu tháng đầu, đủ pillar, hình thức, tầng phễu'],
    ['05','Brief 5 video Hero','Prompt Seedance-ready cho 5 video landing page + phương án sản xuất'],
    ['06','Kịch bản Sale','Sale khéo theo tệp DN/Agency, xử lý từ chối (objection)'],
    ['07','Nhân sự & Research','Cơ cấu team content + KPI + SOP research xu hướng hàng tuần'],
    ['08','3 Customer Persona','Chân dung Agency / Brand / Freelancer để content & sale đánh đúng'],
    ['09','Giá gói & vé event','Giá gói Coco (Starter 399k→Titan) + vé event 31/07 + mã giảm COCO15'],
    ['10','So sánh phân khúc','Bảng giá 3 phân khúc: Coco vs Kling / Hailuo / Higgsfield / Aggregator'],
    ['11','Chiến lược gói 399k','Thông số + giá trị chiến lược gói Starter mới (chèn ép đối thủ giá rẻ)'],
  ];
  rows.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('TONE FANPAGE (bám mọi bài): chính chuyên – chuyên gia – thực chiến "làm nghề". KHÔNG câu view rẻ. Bán gián tiếp, đưa nhu cầu tự nhiên (xem sheet 07 Sale).', S.warn, 3);
  sheets.push(sh);
}

// ============ SHEET 1: BRIEF THƯƠNG HIỆU ============
{
  const sh = new Sheet('01. Brief thương hiệu');
  sh.setCols([5, 26, 74]).freezeRows(2);
  sh.banner('BRIEF THƯƠNG HIỆU — COCO STUDIO', S.title, 3);
  sh.addRow(CH(['#','Hạng mục','Nội dung']));
  const brief = [
    ['1','Tên thương hiệu','Coco Studio — vận hành bởi Peacom, nhà phân phối chính thức của BytePlus tại Việt Nam.'],
    ['2','Mô tả','Nền tảng AI Video/Hình ảnh chuyên nghiệp, thuần seed video (Dreamina-Seedance), dùng API chính hãng. Dành cho sản xuất thương mại thật.'],
    ['3','Tone & Mood','Chuyên nghiệp – tin cậy – thực chiến – "làm nghề". Nói chuyện bằng ngôn ngữ sản xuất (brief, shot, continuity), không hô hào viển vông.'],
    ['4','Keyword','Chính hãng · Thuần Seedance · Bản quyền/eKYC · Hóa đơn VAT · Thanh toán VNĐ · Chất lượng thương mại · Nhất quán nhân vật.'],
    ['5','Màu thương hiệu','Xanh Coco #16A34A · Nền đen #0B1220 · Xám nhạt #F3F4F6 (theo landing hiện tại).'],
    ['6','Đối tượng','Production House · Agency quảng cáo · Game Studio · Doanh nghiệp/Brand · Freelancer chuyên nghiệp.'],
    ['7','Nỗi đau khách','Video AI ra "giả", mất nhất quán nhân vật · tool nước ngoài phải fake IP/thẻ quốc tế · không xuất được hóa đơn VAT · lo bản quyền mặt người · tiến độ gấp, chi phí ê-kíp cao.'],
    ['8','Rào cản mua','Nghi ngờ chất lượng AI · sợ pháp lý bản quyền · quen tool cũ · lo giá/credit · cần dùng thử trước.'],
    ['9','USP (điểm ăn tiền)','(1) Thuần Seedance chính hãng — giữ nhất quán nhân vật xuyên suốt TVC. (2) Thanh toán VNĐ + hóa đơn VAT. (3) eKYC bảo hộ bản quyền, dùng mặt người hợp pháp cho thương mại. (4) Unlock tính năng nâng cao (face, 4K) theo dự án. (5) Hỗ trợ kỹ thuật nội địa (Peacom).'],
    ['10','Sản phẩm/Tính năng','Video branded/TVC · cinematic · game/stylized · real human (eKYC) · animation/anime. Unlock theo dự án: can thiệp khuôn mặt, xuất 4K.'],
    ['11','Kênh','Fanpage (chính chuyên) · Group AI Video Creators Vietnam · Landing page Coco Studio · cắt clip TikTok/YouTube Shorts.'],
  ];
  brief.forEach(r=>{ const st = r[1]==='USP (điểm ăn tiền)'?S.greenbold:S.label; sh.addRow([{v:r[0],s:S.center},{v:r[1],s:st},{v:r[2],s:S.wrap}]); });
  sheets.push(sh);
}

// ============ SHEET 2: CONTENT DIRECTION + 20 IDEA ============
{
  const sh = new Sheet('02. Direction & Ý tưởng');
  sh.setCols([26, 40, 14, 18, 24]).freezeRows(2);
  sh.banner('CONTENT DIRECTION + 20 Ý TƯỞNG BÀI FANPAGE', S.title, 5);
  sh.banner('TONE bám Brief: chính chuyên – chuyên gia – thực chiến. Fanpage 1-2 bài/ngày, giờ vàng 12h & 20h, bán gián tiếp.', S.subtitle, 5);
  sh.banner('A. PILLAR / ANGLE / TẦN SUẤT', S.section, 5);
  sh.addRow(CH(['Pillar','Content Angle','Tần suất','Định dạng','Tone & Voice']));
  const dir = [
    ['Công nghệ & Sản phẩm (Seedance/Coco)','Giới thiệu tính năng, model, cập nhật, hướng dẫn dùng Coco/Seedance','2 bài/tuần','Clip + Photo','Súc tích, chuyên gia, tin cậy'],
    ['Showcase & Case study','Video/TVC làm bằng Coco, before/after, bài toán client (giá-tiến độ-VAT)','2 bài/tuần','Video + Carousel','Tự hào, thực chiến, ra số'],
    ['Education / Kỹ thuật','Mổ prompt, ngôn ngữ máy quay, giữ nhất quán nhân vật, fix lỗi','1-2 bài/tuần','Carousel + Clip','Thân thiện, dạy nghề'],
    ['Pháp lý & Niềm tin','eKYC bản quyền, VAT, thanh toán VNĐ, vì sao chọn nền tảng chính hãng','1 bài/tuần','Photo + Infographic','Nghiêm túc, minh bạch'],
    ['Xu hướng & Trend','Trend AI video hot, model mới, so sánh, bắt trend đúng brand','1-2 bài/tuần','Clip ngắn + Photo','Nhanh nhạy, cập nhật'],
    ['Event & Cộng đồng','Đếm ngược event 31/07, kéo về Group, recap, ritual Khám video AI','Theo campaign','Clip + Photo','Hào hứng, kết nối'],
  ];
  dir.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},{v:r[2],s:S.center},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]));
  sh.addBlank();
  sh.banner('B. 20 Ý TƯỞNG BÀI CỤ THỂ (gán vào Calendar sheet 04)', S.section, 5);
  sh.addRow([{v:'#',s:S.colheader},{v:'Pillar',s:S.colheader},{v:'Tiêu đề / Angle',s:S.colheader},{v:'Định dạng',s:S.colheader},{v:'',s:S.colheader}]);
  const ideas = [
    ['1','Sản phẩm','Seedance 2.0 có gì mới: 5 nâng cấp đáng chú ý','Carousel'],
    ['2','Sản phẩm','Vì sao "thuần seed" quan trọng khi làm TVC thương mại','Video'],
    ['3','Sản phẩm','Unlock face thật + eKYC: cách Coco xử lý bản quyền khuôn mặt','Text+ảnh'],
    ['4','Sản phẩm','So sánh: cùng 1 prompt trên 4 model, ai thắng?','Video so sánh'],
    ['5','Case study','Làm TVC nước hoa 15s bằng Coco: quy trình A-Z','Album quy trình'],
    ['6','Case study','Trailer game indie dựng bằng AI: tiết kiệm 80% chi phí','Video+số liệu'],
    ['7','Case study','Brand X làm 3 hướng hình trong 1 buổi thay vì 3 tuần','Before-after'],
    ['8','Case study','Từ moodboard đến video: 1 chiến dịch thật','Carousel'],
    ['9','Kiến thức','5 lỗi ánh sáng khiến video AI trông giả','Carousel'],
    ['10','Kiến thức','Ngôn ngữ camera: dolly/orbit/handheld dùng khi nào','Video minh hoạ'],
    ['11','Kiến thức','Cách giữ nhân vật nhất quán qua 10 cảnh','Text+ảnh'],
    ['12','Kiến thức','Checklist brief video thương mại chuẩn client','Carousel tải về'],
    ['13','Xu hướng','3 xu hướng AI video định hình quảng cáo 2026','Carousel'],
    ['14','Xu hướng','Đạo diễn thật nghĩ gì về AI video? (trích event)','Video quote'],
    ['15','Xu hướng','Vì sao brand lớn bắt đầu chuyển ngân sách sang AI video','Text dài'],
    ['16','Xu hướng','Tin ngành: cập nhật công nghệ tuần','Carousel'],
    ['17','Thương hiệu','Coco × BytePlus: vì sao là đối tác chính thức tại VN','Text+ảnh'],
    ['18','Thương hiệu','Hậu trường sự kiện 31/07 tại Sofitel','Album'],
    ['19','Thương hiệu','Hoạt động hỗ trợ cộng đồng sáng tạo AI Việt 2026-2027','Text'],
    ['20','Thương hiệu','Gặp gỡ đội ngũ & chuyên gia đồng hành cùng Coco','Carousel'],
  ];
  ideas.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.center},{v:'',s:S.normal}]));
  sheets.push(sh);
}

// ============ SHEET 3: PHỄU 5 TẦNG ============
{
  const sh = new Sheet('03. Phễu 5 tầng');
  sh.setCols([18, 20, 14, 44, 34]).freezeRows(3);
  sh.banner('PHỄU NỘI DUNG 5 TẦNG — CHƯA BIẾT → BIẾT → HIỂU → TIN → YÊU', S.title, 5);
  sh.banner('Map với phễu Lạnh / Ấm / Nóng · mỗi tầng có mục tiêu + tuyến nội dung + CTA riêng', S.subtitle, 5);
  sh.addRow(CH(['Tầng phễu','Phễu (nhiệt)','Tỷ trọng','Tuyến nội dung chính','CTA (kêu gọi hành động)']));
  const funnel = [
    ['CHƯA BIẾT → BIẾT','Lạnh nhất','25%','Reach rộng: trend AI video hot, clip "wow" showcase, tin thị trường AI, nội dung giải trí/viral gắn nghề — để người CHƯA từng nghe tới Coco lướt thấy và dừng lại','Follow Fanpage · Xem thêm · Lưu bài'],
    ['BIẾT → HIỂU (Thích)','Lạnh–Ấm','25%','Educate: mổ prompt, hướng dẫn kỹ thuật, so sánh AI vs quay thật, giải thích thuần Seedance/nhất quán nhân vật là gì','Đọc/Xem hết · Comment "cần" · Vào Group'],
    ['HIỂU → TIN','Ấm','25%','Niềm tin: case study client thật, before/after, feedback, chứng nhận đối tác BytePlus, minh bạch pháp lý eKYC/VAT/VNĐ','Inbox tư vấn · Đăng ký dùng thử · Nhận báo giá'],
    ['TIN → YÊU','Ấm–Nóng','15%','Chuyển đổi: gói & ưu đãi (sheet 09), ưu đãi, demo riêng cho dự án, unlock tính năng theo yêu cầu','Nhận combo · Đặt lịch demo · Chốt gói'],
    ['YÊU (giữ chân)','Nóng','10%','Chăm sóc: hỏi trải nghiệm, tài liệu nâng cao, ưu đãi khách cũ, mời vào nhóm power-user, ambassador','Renew · Giới thiệu (affiliate) · UGC'],
  ];
  funnel.forEach((r,i)=>{ const hot = i<2?S.center:(i<4?S.warn:S.good); sh.addRow([{v:r[0],s:S.greenbold},{v:r[1],s:hot},{v:r[2],s:S.center},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap}]); });
  sh.addBlank();
  sh.banner('NGUYÊN TẮC: người mới luôn ở tầng CHƯA BIẾT — Fanpage phải có đủ bài tầng 1 để liên tục nạp người lạ vào phễu, không chỉ đăng bài bán (tầng 4).', S.warn, 5);
  sheets.push(sh);
}

// ============ SHEET 4: CONTENT CALENDAR ============
{
  const sh = new Sheet('04. Content Calendar');
  sh.setCols([5, 10, 8, 40, 22, 16, 14]).freezeRows(3);
  sh.banner('CONTENT CALENDAR — THÁNG 1 (mẫu 4 tuần)', S.title, 7);
  sh.banner('Lịch bài Fanpage · điền ngày cụ thể khi chạy · đồng bộ mồi event ở tuần có 31/07', S.subtitle, 7);
  sh.addRow(CH(['#','Tuần','Thứ','Chủ đề bài','Pillar','Định dạng','Tầng phễu']));
  const cal = [
    ['1','T1','T2','5 phong cách video AI đang hot tuần này + prompt mẫu','Xu hướng & Trend','Carousel','Chưa biết→Biết'],
    ['2','T1','T4','Vì sao 90% video AI trông vẫn "giả" và cách người làm nghề xử lý','Education/Kỹ thuật','Bài + ảnh','Biết→Hiểu'],
    ['3','T1','T6','Showcase: TVC 15s làm bằng Coco (before/after)','Showcase & Case','Video','Hiểu→Tin'],
    ['4','T1','CN','Coco Studio là gì? Nền tảng thuần Seedance chính hãng tại VN','Công nghệ & SP','Photo/Infographic','Biết→Hiểu'],
    ['5','T2','T2','Ngôn ngữ máy quay cho AI: dolly/orbit/handheld','Education/Kỹ thuật','Carousel','Biết→Hiểu'],
    ['6','T2','T4','Đếm ngược Event 31/07 + mồi vé → link Group','Event & Cộng đồng','Clip','Chưa biết→Biết'],
    ['7','T2','T6','Case: làm cảnh "không thể quay thật" — chi phí & thời gian vs ê-kíp','Showcase & Case','Video + bảng','Hiểu→Tin'],
    ['8','T2','CN','eKYC + VAT + thanh toán VNĐ: vì sao DN nên quan tâm','Pháp lý & Niềm tin','Infographic','Hiểu→Tin'],
    ['9','T3','T2','Trend Radar tuần + prompt mẫu','Xu hướng & Trend','Carousel','Chưa biết→Biết'],
    ['10','T3','T4','Giữ nhất quán nhân vật xuyên suốt TVC — điểm ăn tiền thuần seed','Education/Kỹ thuật','Video','Biết→Hiểu'],
    ['11','T3','T6','Feedback/thể hiện đối tác BytePlus + case doanh nghiệp','Pháp lý & Niềm tin','Carousel','Hiểu→Tin'],
    ['12','T3','CN','Recap Event + mở Khám video AI #1 (điều hướng Group)','Event & Cộng đồng','Clip','Tin→Yêu'],
    ['13','T4','T2','So sánh Coco vs tool nước ngoài (VNĐ/VAT/eKYC)','Công nghệ & SP','Bảng so sánh','Hiểu→Tin'],
    ['14','T4','T4','Combo gói Coco cho Agency/DN + ưu đãi','Showcase & Case','Photo','Tin→Yêu'],
    ['15','T4','T6','UGC: video member/khách làm bằng Coco (spotlight)','Event & Cộng đồng','Video','Yêu (giữ chân)'],
    ['16','T4','CN','Q&A: câu hỏi thường gặp khi bắt đầu với Coco','Education/Kỹ thuật','Photo','Biết→Hiểu'],
  ];
  cal.forEach(r=>{ const ph = r[6].includes('Yêu')?S.good:(r[6].includes('Tin')?S.warn:S.center); sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.center},{v:r[2],s:S.center},{v:r[3],s:S.wrap},{v:r[4],s:S.center},{v:r[5],s:S.center},{v:r[6],s:ph}]); });
  sheets.push(sh);
}

// ============ SHEET 5: BRIEF 5 VIDEO HERO ============
{
  const sh = new Sheet('05. Brief 5 video Hero');
  sh.setCols([5, 20, 60, 18, 24]).freezeRows(2);
  sh.banner('BRIEF 5 VIDEO HERO — LANDING PAGE COCO STUDIO', S.title, 5);
  sh.banner('Seedance-ready · 1080p · 16:9 desktop + 9:16 mobile · 5-8s/clip loop · overlay text bằng HTML (không nhồi vào video) · tông xanh-đen brand', S.subtitle, 5);
  sh.addRow(CH(['#','Loại','Prompt (EN, Seedance-ready)','Camera / Mood','Overlay']));
  const vids = [
    ['1','Branded / TVC','A luxury glass perfume bottle rotating slowly on a wet reflective black surface, water droplets splashing in slow motion around it, dramatic rim lighting with soft golden highlights, camera does a slow 180-degree orbit around the product, shallow depth of field, high-end commercial aesthetic, cinematic color grading, hyper-detailed, 1080p','Slow orbit 180° / premium','"TVC-ready in hours, not weeks."'],
    ['2','Cinematic','Cinematic aerial shot flying through a vast ancient cave, golden sunbeams piercing through openings in the rock ceiling and hitting a misty underground river below, lush green moss on the walls, epic scale, volumetric god rays, camera flies forward and slightly upward revealing the grand interior, IMAX documentary style, rich cinematic color grade, 1080p','Forward fly-through / epic','"Shots you can\'t afford to film. Now you can."'],
    ['3','Game / Stylized','A stylized armored warrior character standing on a cliff edge in a fantasy game world, cape flowing in the wind, glowing energy sword in hand, dramatic dusk sky with floating islands in the background, camera slowly pushes in from a low angle for a heroic reveal, AAA game cinematic style, stylized 3D render, volumetric lighting, 1080p','Low-angle push-in / heroic','"From concept to game trailer."'],
    ['4','Real Human / eKYC','Cinematic close-up portrait of a professional Vietnamese female model, natural realistic skin texture, subtle confident smile forming, soft studio beauty lighting with a gentle catchlight in the eyes, shallow depth of field with a softly blurred background, camera slowly pushes in, photorealistic, commercial beauty campaign aesthetic, 1080p','Slow push-in / thật, đáng tin','"Real faces, cleared with eKYC. Compliant for commercial use."'],
    ['5','Animation / Anime','Anime style scene of a young character standing on a rooftop at sunset overlooking a futuristic Tokyo cityscape, wind blowing through their hair, warm orange and pink sky with drifting clouds, camera slowly tilts up from the city to the character\'s face, Studio-quality Japanese animation, vibrant colors, soft cel shading, 1080p','Tilt-up reveal / mộng mơ','"Every style your brand needs."'],
  ];
  vids.forEach(r=>{ const st = r[1].includes('eKYC')?S.warn:S.label; sh.addRow([{v:r[0],s:S.center},{v:r[1],s:st},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap}]); });
  sh.addBlank();
  sh.banner('CHỐT PHƯƠNG ÁN SẢN XUẤT', S.section, 5);
  const prod = [
    ['Prompt & concept','BẠN đã có sẵn (xong).'],
    ['Render V1,2,3,5','BẠN tự render ngay (cần tài khoản credit Coco).'],
    ['Render V4 (face thật)','CỘNG TÁC team Coco/Peacom: cần người mẫu có consent + eKYC đúng quy trình — chính video này là demo pháp lý.'],
    ['Grade / ghép loop / overlay','Editor nhẹ (CapCut/Premiere).'],
    ['Nhúng landing','Dev web Coco thay ô video trống trên trang.'],
  ];
  prod.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal},{v:'',s:S.normal}]));
  sheets.push(sh);
}

// ============ SHEET: KỊCH BẢN SALE ============
{
  const sh = new Sheet('06. Kịch bản Sale');
  sh.setCols([5, 30, 74]).freezeRows(2);
  sh.banner('KỊCH BẢN SALE KHÉO (không lộ liễu) — tệp DN / Agency', S.title, 3);
  sh.addRow(CH(['#','Bước','Cách làm']));
  const sale = [
    ['1','Không bán ở tầng lạnh','Fanpage tầng CHƯA BIẾT/BIẾT chỉ cho giá trị (trend, mổ prompt, showcase). Tuyệt đối không spam bán — giữ chính chuyên.'],
    ['2','Gieo nhu cầu tự nhiên','Qua case study & so sánh chi phí, để khách TỰ nhận ra "mình cũng cần cái này" — không nói "mua đi".'],
    ['3','Chạm nỗi đau đúng tệp','DN/Agency đau ở: tiến độ gấp, chi phí ê-kíp, bản quyền mặt người, cần VAT. Nội dung nhắc đúng nỗi đau → họ inbox.'],
    ['4','Chuyển hội thoại về tư vấn','Khi khách inbox/comment, KHÔNG báo giá ngay. Hỏi dự án cụ thể → hẹn demo riêng (vì tính năng unlock theo dự án).'],
    ['5','Demo cá nhân hóa','Render thử 1 cảnh theo đúng brand khách trong buổi demo → cho thấy chất lượng + nhất quán nhân vật.'],
    ['6','Chốt bằng ưu thế độc quyền','Nhấn VNĐ + VAT + eKYC + hỗ trợ nội địa — thứ tool nước ngoài không có. Đây là lý do chốt, không phải giá rẻ.'],
    ['7','Sau bán','Hỏi trải nghiệm, mời vào nhóm power-user, mở affiliate để khách giới thiệu khách.'],
  ];
  sale.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('XỬ LÝ TỪ CHỐI (OBJECTION)', S.section, 3);
  sh.addRow(CH(['Rào cản','Câu trả lời khéo','']));
  const obj = [
    ['"AI làm video vẫn giả lắm"','Đưa showcase before/after + giải thích thuần Seedance giữ nhất quán nhân vật — mời xem demo cảnh theo brand họ.'],
    ['"Giá/credit sao đắt hơn tool ngoài"','So tổng chi phí thật: tool ngoài + thẻ quốc tế + không VAT + rủi ro bản quyền. Coco tính VNĐ, có VAT, hợp pháp.'],
    ['"Sợ vấn đề bản quyền mặt người"','Đây chính là USP: eKYC bảo hộ, dùng mặt người có consent hợp pháp cho thương mại — an tâm khi phát sóng.'],
    ['"Đang quen tool cũ"','Không cần bỏ tool cũ — Coco mạnh ở video thương mại cần nhất quán + pháp lý. Dùng thử 1 dự án để so.'],
  ];
  obj.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},{v:'',s:S.normal}]));
  sheets.push(sh);
}

// ============ SHEET 8: NHÂN SỰ + RESEARCH ============
{
  const sh = new Sheet('07. Nhân sự & Research');
  sh.setCols([5, 26, 60, 20]).freezeRows(2);
  sh.banner('NHÂN SỰ CONTENT FANPAGE + SOP RESEARCH XU HƯỚNG', S.title, 4);
  sh.banner('A. CƠ CẤU NHÂN SỰ + KPI', S.section, 4);
  sh.addRow(CH(['#','Vai trò','Nhiệm vụ','KPI gợi ý']));
  const hr = [
    ['1','Content Lead / Planner','Lên direction, calendar, duyệt bài, đảm bảo phễu đủ tầng','Đủ lịch + reach/tương tác tổng'],
    ['2','Content Writer','Viết bài theo pillar, mổ prompt, case study','15-20 bài/tháng đạt tương tác chuẩn'],
    ['3','Designer','Ảnh bìa, carousel, infographic, thumbnail','Đúng brand, đúng deadline'],
    ['4','Video Editor','Ghép loop, grade, overlay, cắt clip TikTok/Shorts','5 video hero + clip tuần'],
    ['5','Ads / Performance','Chạy ads bài tầng lạnh, retarget tầng ấm','CPM/CPL, chuyển đổi inbox'],
    ['6','Sale / Tư vấn','Nhận inbox, demo, chốt gói theo kịch bản sheet 06','Số demo → số chốt'],
  ];
  hr.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap}]));
  sh.addRow([{v:'',s:S.normal},{v:'Ngân sách (trình sếp)',s:S.warn},{v:bullets('Sản xuất video hero · ads đẩy bài tầng lạnh · booking KOL · thiết kế'),s:S.wrap},{v:'Đồng bộ file Cộng đồng',s:S.muted}]);
  sh.addBlank();
  sh.banner('B. SOP RESEARCH XU HƯỚNG AI (hàng tuần)', S.section, 4);
  sh.addRow([{v:'#',s:S.colheader},{v:'Việc',s:S.colheader},{v:'Chi tiết',s:S.colheader},{v:'',s:S.colheader}]);
  const res = [
    ['1','Đặt lịch cố định','1 buổi/tuần (VD sáng Thứ 2) quét trend AI video/hình ảnh.'],
    ['2','Nguồn theo dõi',bullets('X/Twitter AI creators · Reddit r/aivideo · YouTube (Seedance, Veo, Kling, Runway) · TikTok trend AI · fanpage/group đối thủ · newsletter AI')],
    ['3','Lọc theo brand','Chỉ chọn trend hợp định vị chính chuyên & làm được bằng Seedance/Coco.'],
    ['4','Chuyển thành bài','Mỗi trend → 1 ý tưởng tầng "Chưa biết→Biết" (Trend Radar) + prompt mẫu.'],
    ['5','Ghi kho & đo','Lưu vào Calendar gắn pillar+tầng phễu; bài tương tác cao → nhân bản format.'],
  ];
  res.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:'',s:S.normal}]));
  sheets.push(sh);
}

// ============ SHEET: 3 CUSTOMER PERSONA (CHI TIẾT) ============
{
  const sh = new Sheet('08. 3 Customer Persona');
  sh.setCols([26, 74]).freezeRows(2);
  sh.banner('3 CHÂN DUNG KHÁCH HÀNG (chi tiết) — nền: JTBD + trigger + pain "in-their-words" + objection', S.title, 2);
  sh.banner('⚠ Persona provisional (proxy research): Coco mới, chưa có review first-party. Xây từ hiểu biết thị trường AI video VN + review đối thủ + hành vi tệp production. Cập nhật khi có khách thật.', S.subtitle, 2);

  // Helper render 1 persona thành khối
  const persona = (p)=>{
    sh.addBlank();
    sh.banner(p.title, S.section, 2);
    const rows = [
      ['👤 Hồ sơ', p.profile],
      ['🎯 Job-to-be-Done', p.jtbd],
      ['⚡ Trigger (khi nào đi tìm giải pháp)', p.trigger],
      ['😣 Nỗi đau (nguyên văn họ nói)', p.pains],
      ['🏆 Kết quả mong muốn (định nghĩa "thành công")', p.outcomes],
      ['🛑 Rào cản & nỗi sợ khi mua', p.objections],
      ['🔀 Giải pháp thay thế đang cân nhắc', p.alts],
      ['💬 Từ khóa họ hay dùng (dùng cho copy)', p.vocab],
      ['💚 Thông điệp trúng nhất', p.message],
      ['📦 Gói phù hợp', p.pkg],
      ['📡 Cách tiếp cận (kênh + content)', p.reach],
    ];
    rows.forEach(r=>{ const st = r[0].includes('Thông điệp')?S.greenbold:(r[0].includes('Gói phù hợp')?S.warn:S.wrap); sh.addRow([{v:r[0],s:S.label},{v:r[1],s:st}]); });
  };

  persona({
    title: 'PERSONA 1 — "PRODUCER ÁP DEADLINE" (Agency / Production House)',
    profile: 'Nam/nữ 28-40 tuổi. Chức danh: Producer / Creative Director / Account Director tại agency quảng cáo hoặc production house 10-80 người ở TP.HCM/Hà Nội. Cùng lúc chạy 3-6 job client, quản ê-kíp freelance + in-house. Báo cáo lên GĐ công ty / client.',
    jtbd: 'Functional: giao đủ số lượng & chất lượng video cho client đúng deadline với biên lợi nhuận tốt. Emotional: hết cảm giác "tim đập" mỗi khi client đổi brief phút chót. Social: được client tin là "agency làm được việc khó, giao nhanh", được sếp thấy tối ưu chi phí ê-kíp.',
    trigger: '• Vừa trúng pitch cần 3-5 hướng hình trong 1 tuần mà ngân sách quay không đủ.\n• Client yêu cầu A/B nhiều version → nhân chi phí ê-kíp lên nhiều lần.\n• Vừa "cháy" một job vì thuê quay xong client đổi ý, lỗ.\n• Thấy agency đối thủ khoe làm TVC bằng AI nhanh & rẻ hơn.',
    pains: '• "Thuê ê-kíp một buổi mấy chục triệu, client xem xong đổi ý là coi như bay tiền."\n• "Deadline 3 ngày mà cần 4 concept, quay thật không kịp."\n• "Làm AI thì nhân vật mỗi cảnh một mặt, không giao khách được."\n• "Client hỏi có xuất hóa đơn không, tool nước ngoài chịu."',
    outcomes: '• Ra 3-5 hướng hình/buổi để client chọn, không cần dựng ê-kíp.\n• Biên lợi nhuận job cao hơn vì cắt được chi phí quay.\n• Nhân vật/brand nhất quán xuyên cả campaign → giao được khách.\n• Đo bằng: số concept/ngày, % lợi nhuận job, số lần client duyệt lần đầu.',
    objections: '• "Chất lượng AI đủ để giao khách doanh nghiệp chưa, hay lại phải sửa tay?"\n• "Team mình quen quy trình cũ, học tool mới có tốn thời gian?"\n• "Render nhiều có bị đội credit không kiểm soát?"',
    alts: '• Thuê ê-kíp quay truyền thống\n• Tự xài tool nước ngoài (Kling/Runway) qua thẻ quốc tế\n• Thuê freelancer AI bên ngoài\n• Không làm (từ chối job khó)',
    vocab: '"hướng hình", "concept", "brief", "giao khách", "cháy job", "biên lợi nhuận", "nhất quán nhân vật", "A/B version", "deadline gấp".',
    message: '"3-5 hướng hình trong 1 buổi thay vì 3 tuần — nhất quán cả campaign, xuất VAT giao khách được. Biên lợi nhuận job của bạn cao hơn."',
    pkg: 'Diamond (10.500 credit / ~1.150 video 4K) — đủ chạy nhiều job client song song.',
    reach: 'Fanpage tuyến Case study + before/after (chứng minh giao được khách) → inbox tư vấn → demo render 1 concept theo brand họ. Gặp trực tiếp tại event 31/07. Content "so sánh chi phí AI vs ê-kíp".',
  });

  persona({
    title: 'PERSONA 2 — "BRAND LEAD SỢ RỦI RO" (Doanh nghiệp / Brand / Enterprise)',
    profile: 'Nam/nữ 30-45 tuổi. Chức danh: Marketing Manager / Brand Manager / Head of Marketing tại brand hoặc doanh nghiệp 100-1000+ nhân sự. Có ngân sách marketing, quy trình mua sắm nội bộ (cần báo giá, hợp đồng, hóa đơn). Báo cáo lên GĐ Marketing / Ban TGĐ.',
    jtbd: 'Functional: sản xuất TVC/video quảng cáo đúng brand guideline, đúng luật, kịp campaign. Emotional: an tâm không dính phốt pháp lý/bản quyền khi lên sóng. Social: được ban lãnh đạo thấy là người "đưa AI vào tiết kiệm ngân sách mà vẫn an toàn".',
    trigger: '• Sắp chạy campaign lớn, cần nhiều biến thể video cho đa kênh mà ngân sách production bị cắt.\n• Phòng pháp chế/kế toán yêu cầu chứng từ hợp lệ + rõ bản quyền hình ảnh, mặt người.\n• Ban lãnh đạo hỏi "sao chưa dùng AI cho tiết kiệm?"\n• Đối thủ tung loạt video AI dày đặc.',
    pains: '• "Dùng mặt người do AI tạo, lỡ trùng ai đó thì ai chịu trách nhiệm?"\n• "Tool nước ngoài không xuất hóa đơn, kế toán không nghiệm thu được."\n• "Sếp muốn dùng AI nhưng pháp chế chưa duyệt vì sợ bản quyền."\n• "Cần thanh toán bằng VNĐ qua công ty, không dùng thẻ cá nhân được."',
    outcomes: '• Có video/TVC đúng brand, đúng luật, có hồ sơ pháp lý rõ ràng để lên sóng.\n• Chứng từ VAT đầy đủ để nghiệm thu nội bộ.\n• Quy trình chuẩn để nhân rộng cho các campaign sau.\n• Đo bằng: campaign lên sóng đúng hạn, không sự cố pháp lý, chi phí/video giảm.',
    objections: '• "AI có đủ chuẩn thương hiệu để đại diện brand không?"\n• "Quy trình eKYC/bản quyền có thật sự bảo vệ được công ty?"\n• "Cần quy trình mua sắm — có hợp đồng, hóa đơn, cam kết SLA không?"',
    alts: '• Thuê agency/production trọn gói (đắt)\n• Tự làm bằng tool quốc tế (rủi ro pháp lý)\n• Trì hoãn dùng AI\n• Dùng stock footage',
    vocab: '"brand guideline", "lên sóng", "pháp chế", "bản quyền hình ảnh", "hóa đơn đỏ/VAT", "nghiệm thu", "rủi ro", "chuẩn thương hiệu", "quy trình nội bộ".',
    message: '"VAT + eKYC + bản quyền hợp pháp = an tâm lên sóng. Nền tảng chính hãng, thanh toán VNĐ, có chứng từ cho kế toán — chuẩn quy trình doanh nghiệp."',
    pkg: 'Titan (Real Face, eKYC) / Enterprise custom — dùng mặt người hợp pháp cho thương mại + SLA hỗ trợ.',
    reach: 'Sale trực tiếp + tư vấn quy trình. Content tuyến "Pháp lý & Niềm tin" (eKYC/VAT/VNĐ) trên Fanpage + LinkedIn. Mời dự event 31/07 gặp đối tác BytePlus để tăng uy tín. Case study brand thật.',
  });

  persona({
    title: 'PERSONA 3 — "FREELANCER MUỐN LÊN ĐỜI" (Creator / Editor tự do)',
    profile: 'Nam/nữ 22-35 tuổi. Editor/Motion/Content Creator tự do hoặc studio 1-3 người. Nhận job lẻ từ SME, shop, KOL, agency nhỏ. Nhạy giá, tự bỏ tiền túi mua tool. Hoạt động nhiều trên các group AI/dựng phim, TikTok, Facebook.',
    jtbd: 'Functional: nhận được nhiều job hơn, làm nhanh hơn, giá vốn thấp để cạnh tranh. Emotional: tự tin nhận job khó mà không sợ "làm không nổi". Social: được xem là creator "bắt trend AI nhanh, làm nghề tử tế", có thương hiệu cá nhân.',
    trigger: '• Khách hỏi làm video AI mà chưa có tool đủ tốt / đang xài bản free giới hạn.\n• Thấy creator khác kiếm tiền tốt nhờ AI video, sợ tụt lại.\n• Cần xuất hóa đơn cho khách công ty mà tool cá nhân không có.\n• Bản free hết hạn / bị giới hạn 720p, muốn nâng cấp mà ngại giá 990k.',
    pains: '• "Tool xịn toàn tính bằng đô, thẻ visa mình dùng cũng ngại phí."\n• "Bản free ra 720p, khách chê mờ."\n• "Muốn thử nghiêm túc nhưng chưa dám xuống 1 triệu ngay."\n• "Khách công ty đòi hóa đơn mà mình freelancer lấy đâu ra."',
    outcomes: '• Có tool 4K, giá vốn thấp, nhận được job trả tiền.\n• Xuất được hóa đơn cho khách công ty → nhận job to hơn.\n• Làm nhanh, nhận nhiều job hơn trong cùng thời gian.\n• Đo bằng: số job/tháng, giá vốn/video, có được khách công ty không.',
    objections: '• "399k/990k có đáng không, credit đủ dùng không?"\n• "Chất lượng có hơn bản free/tool rẻ mình đang xài?"\n• "Có được dùng thử trước khi xuống tiền không?"',
    alts: '• Bản free các tool AI\n• CapCut / công cụ rẻ\n• Dùng ké tài khoản team\n• Quay điện thoại tự dựng\n• Từ chối job AI',
    vocab: '"giá vốn", "job", "khách chốt", "bắt trend", "4K cho nét", "credit đủ xài", "làm nghề", "xuống tiền", "có hóa đơn không".',
    message: '"Chất studio, giá freelancer, có hóa đơn. Gói Starter 399k: 80 video 4K, full Seedance — thử nghiêm túc mà không phải xuống cả triệu."',
    pkg: 'Starter 399k (mồi, dùng thử) → Silver/Gold khi job nhiều lên.',
    reach: 'Group cộng đồng "AI Video Creators Vietnam" (ritual, Khám video AI, contest) + Fanpage tuyến Education/Trend. Contest #1 để họ thể hiện & nhận credit. Content "mổ prompt", "làm nhanh".',
  });
  sheets.push(sh);
}

// ============ SHEET 9: GIÁ GÓI + VÉ + SO SÁNH PHÂN KHÚC ============
{
  const sh = new Sheet('09. Giá gói & vé event');
  sh.setCols([20, 14, 12, 10, 52]).freezeRows(2);
  sh.banner('GIÁ GÓI COCO STUDIO + VÉ EVENT', S.title, 5);
  sh.banner('A. GÓI COCO STUDIO — đã gồm VAT, thanh toán VNĐ · quy đổi 10 credit = 1 video', S.section, 5);
  sh.addRow(CH(['Gói','Giá (VNĐ)','Credit','Video','Bao gồm / Tệp']));
  const pk = [
    ['Starter (đề xuất mới)','399.000','800','80','• 4K + AI Prompt Assistant\n• Full Seedance 2.0 (mini/fast/260128)\n• Hóa đơn VAT\n➜ Gói mồi: kéo creator/agency mới vào phễu, upsell lên Silver'],
    ['Silver','990.000','2.000','200','• 4K + AI Prompt Assistant\n• Hóa đơn VAT\n➜ Hợp: Freelancer'],
    ['Gold','1.900.000','4.000','450','• 4K + AI Prompt Assistant\n• Hóa đơn VAT\n➜ Hợp: Freelancer / Studio nhỏ'],
    ['Diamond','4.990.000','10.500','1.150','• 4K + AI Prompt Assistant\n• Hóa đơn VAT\n➜ Hợp: Agency / Production'],
    ['Titan (Real Face)','9.990.000','22.000','2.300','• Unlock Real Face (eKYC)\n• 4K + Hóa đơn VAT\n➜ Hợp: Brand / Enterprise'],
  ];
  pk.forEach(r=>{ const st = r[0].includes('Starter')?S.warn:S.greenbold; sh.addRow([{v:r[0],s:st},{v:r[1],s:S.center},{v:r[2],s:S.center},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]); });
  sh.addBlank();
  sh.banner('B. VÉ EVENT 31/07 + MÃ GIẢM ĐỀ XUẤT', S.section, 5);
  sh.addRow([{v:'Loại vé',s:S.colheader},{v:'Giá gốc',s:S.colheader},{v:'Sau COCO15 (-15%)',s:S.colheader},{v:'Credit vé',s:S.colheader},{v:'Bao gồm',s:S.colheader}]);
  const tk = [
    ['Early Bird','500.000','425.000','1.500','• Full-day access\n• Workshop\n• Networking'],
    ['Standard','950.000','807.000','5.000','• Mọi thứ Early Bird\n• Priority seating\n• Event kit'],
    ['VIP','1.700.000','1.445.000','9.000','• Mọi thứ Standard\n• VIP lounge\n• Speaker meet & greet'],
  ];
  tk.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.center},{v:r[2],s:S.greenbold},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]));
  sh.addBlank();
  sh.banner('✅ ĐÃ CHỐT (với anh Danh): Mã COCO15 (-15%) cho member group + tặng 500 credit khi mua vé qua link group. Chi phí biên gần 0. → Trình sếp/BTC xác nhận mức 15% & nguồn 500 credit.', S.good, 5);
  sheets.push(sh);
}

// ============ SHEET 14: SO SÁNH THEO PHÂN KHÚC ============
{
  const sh = new Sheet('10. So sánh phân khúc');
  sh.setCols([16, 16, 22, 18, 26, 18]).freezeRows(3);
  sh.banner('BẢNG SO SÁNH GIÁ TỔNG HỢP THEO 3 PHÂN KHÚC (tỷ giá ~25.000đ/$)', S.title, 6);
  sh.banner('Dùng cho content "so sánh" tầng HIỂU→TIN & để sale định vị. Hàng CocoStudio tô xanh.', S.subtitle, 6);

  const head = ['Nền tảng','Tên gói','Mức giá','Credit','Sản lượng video tối đa','CP TB/video'];

  // Phân khúc 1
  sh.banner('🔹 PHÂN KHÚC 1: PHỔ THÔNG / DÙNG THỬ (dưới 500.000đ/tháng)', S.section, 6);
  sh.addRow(CH(head));
  const p1 = [
    ['CocoStudio ★','Starter (mới)','399.000đ','800/tháng','Up to 80 video (4K)','~4.987đ','coco'],
    ['Kling AI','Standard','$6.99 (~175.000đ)','660/tháng','33 video (720p)','~5.300đ',''],
    ['Hailuo AI','Standard','$9.99 (~250.000đ)','1.000/tháng','~83 video','~3.000đ',''],
    ['Higgsfield','Starter','$15 (~375.000đ)','200/tháng','~11 video (Seedance Fast)','~34.000đ',''],
    ['Aggregator','Pro (trả năm)','$16 (~400.000đ)','960/năm','~20 video/tháng','~20.000đ',''],
  ];
  p1.forEach(r=>{ const st = r[6]==='coco'?S.greenbold:S.wrap; sh.addRow([{v:r[0],s:r[6]==='coco'?S.greenbold:S.label},{v:r[1],s:st},{v:r[2],s:st},{v:r[3],s:st},{v:r[4],s:st},{v:r[5],s:st}]); });
  sh.addBlank();

  // Phân khúc 2
  sh.banner('🔹 PHÂN KHÚC 2: TẦM TRUNG / PRO (600.000đ – 1.250.000đ/tháng)', S.section, 6);
  sh.addRow(CH(head));
  const p2 = [
    ['Kling AI','Pro','$25.99 (~650.000đ)','3.000/tháng','150 video (720p)','~4.330đ',''],
    ['Hailuo AI','Pro','$34.99 (~875.000đ)','4.500/tháng','~375 video','~2.330đ',''],
    ['CocoStudio ★','Silver','990.000đ','2.000','Up to 200 video (4K)','~4.950đ','coco'],
    ['Aggregator','Business (năm)','$44 (~1.100.000đ)','3.000/năm','~62 video/tháng','~17.700đ',''],
    ['Higgsfield','Plus','$49 (~1.225.000đ)','1.000/tháng','~44 video (Seedance 2.0)','~27.800đ',''],
    ['Aggregator','Ultra (năm)','$50 (~1.250.000đ)','500/tháng','~125 video/tháng','~10.000đ',''],
  ];
  p2.forEach(r=>{ const st = r[6]==='coco'?S.greenbold:S.wrap; sh.addRow([{v:r[0],s:r[6]==='coco'?S.greenbold:S.label},{v:r[1],s:st},{v:r[2],s:st},{v:r[3],s:st},{v:r[4],s:st},{v:r[5],s:st}]); });
  sh.addBlank();

  // Phân khúc 3
  sh.banner('🔹 PHÂN KHÚC 3: CAO CẤP / DOANH NGHIỆP (trên 1.500.000đ/tháng)', S.section, 6);
  sh.addRow(CH(head));
  const p3 = [
    ['Kling AI','Premier','$64.99 (~1.625.000đ)','8.000/tháng','400 video (720p)','~4.060đ',''],
    ['CocoStudio ★','Gold','1.900.000đ','4.000','Up to 450 video (4K)','~4.220đ','coco'],
    ['Hailuo AI','Master','$79.99 (~2.000.000đ)','10.500/tháng','~875 video','~2.280đ',''],
    ['Kling AI','Ultra','$127.99 (~3.200.000đ)','26.000/tháng','1.300 video (720p)','~2.460đ',''],
    ['Higgsfield','Ultra','$129 (~3.225.000đ)','3.000/tháng','~133 video (Seedance 2.0)','~24.200đ',''],
    ['CocoStudio ★','Diamond','4.990.000đ','10.500','Up to 1.150 video (4K)','~4.340đ','coco'],
    ['CocoStudio ★','Titan','9.990.000đ','22.000','Up to 2.300 video (Real Face)','~4.340đ','coco'],
  ];
  p3.forEach(r=>{ const st = r[6]==='coco'?S.greenbold:S.wrap; sh.addRow([{v:r[0],s:r[6]==='coco'?S.greenbold:S.label},{v:r[1],s:st},{v:r[2],s:st},{v:r[3],s:st},{v:r[4],s:st},{v:r[5],s:st}]); });
  sh.addBlank();
  sh.banner('ĐỌC VỊ: các đối thủ RẺ hơn/video (Hailuo ~2.3k) nhưng đa số 720p, KHÔNG VAT, KHÔNG eKYC, phải thẻ quốc tế. Coco ổn định ~4.2-4.9k/video ở 4K + VAT + eKYC + VNĐ — điểm bán không phải giá thấp nhất, mà là 4K hợp pháp có chứng từ.', S.good, 6);
  sheets.push(sh);
}

// ============ SHEET 15: CHIẾN LƯỢC GÓI 399K ============
{
  const sh = new Sheet('11. Chiến lược gói 399k');
  sh.setCols([5, 26, 74]).freezeRows(2);
  sh.banner('ĐỀ XUẤT GÓI MỚI — "COCOSTUDIO STARTER 399K"', S.title, 3);
  sh.banner('Lấp khoảng trống dưới 500k: Higgsfield quá đắt/video, Kling giới hạn 720p — Coco chèn vào với 80 video 4K', S.subtitle, 3);
  sh.banner('A. KHUNG THÔNG SỐ KỸ THUẬT', S.section, 3);
  sh.addRow(CH(['#','Hạng mục','Chi tiết']));
  const spec = [
    ['1','Tên gói','Starter (hoặc Basic Entry)'],
    ['2','Giá bán','399.000đ/tháng (đã gồm VAT)'],
    ['3','Credit','800 Coco Credits (~40% dung lượng gói Silver)'],
    ['4','Sản lượng','Up to 80 videos'],
    ['5','Chất lượng','Hỗ trợ xuất video chuẩn 4K'],
    ['6','Tính năng','Video AI Prompt Assistant · Hỗ trợ xuất hóa đơn VAT'],
    ['7','Model truy cập','Full hệ Seedance 2.0: mini · fast · 260128'],
    ['8','CPA (chi phí/video)','~4.987đ/video'],
  ];
  spec.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('B. GIÁ TRỊ CHIẾN LƯỢC', S.section, 3);
  sh.addRow(CH(['#','Giá trị','Diễn giải']));
  const val = [
    ['1','Hạ rào cản thử nghiệm','Creator nhỏ/agency mới xuống tiền ngay ở mốc 399k, không phải đắn đo như mốc 990k → tăng số lượng khách mới vào phễu.'],
    ['2','Chèn ép đối thủ giá rẻ','vs Higgsfield Starter ($15~375k): Coco cho 80 video 4K, áp đảo 11 video của Higgsfield. vs Kling Standard ($6.99~175k): sản lượng gấp 2.4 lần, CPA tương đương nhưng 4K vs 720p.'],
    ['3','Tối ưu ngân sách team lớn','Quản lý dễ chia định mức 399k/tháng cho từng VJ/Talent/Creator để chạy phễu test A/B kịch bản ngắn hạn, không phung phí tài nguyên chung.'],
    ['4','Bàn đạp upsell','Gói mồi để khách trải nghiệm chất lượng 4K + nhất quán Seedance → tự nhiên nâng lên Silver/Gold khi cần sản lượng lớn hơn.'],
  ];
  val.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.greenbold},{v:r[2],s:S.wrap}]));
  sheets.push(sh);
}

writeWorkbook(OUT, sheets);
console.log('DONE:', OUT, '| sheets:', sheets.length);

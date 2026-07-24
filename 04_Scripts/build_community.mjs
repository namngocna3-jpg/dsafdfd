// build_community.mjs — "COCO_PLAN_CONG_DONG.xlsx" (bám khung Master plan cộng đồng JOBVUI).
// Bản gọn: gộp các sheet cùng chủ đề, content bám ĐỊNH VỊ + TONE/MOOD của Concept.
import { Sheet, S, writeWorkbook, bullets } from 'file:///C:/Users/Admin/Downloads/CocoStudio_Plan/04_Scripts/xlsxlib.mjs';

const OUT = 'C:/Users/Admin/Downloads/CocoStudio_Plan/COCO_PLAN_CONG_DONG.xlsx';
const sheets = [];
const CH = (arr)=>arr.map(v=>({v,s:S.colheader}));

// ============ 00. MỤC LỤC ============
{
  const sh = new Sheet('00. Mục lục');
  sh.setCols([5, 30, 74]).freezeRows(3);
  sh.banner('COCO STUDIO — PLAN CỘNG ĐỒNG (GROUP "AI VIDEO CREATORS VIETNAM")', S.title, 3);
  sh.banner('Peacom × BytePlus / Dreamina-Seedance · Mục tiêu 6 tháng: 50.000 member chất · Chuẩn High Standard', S.subtitle, 3);
  sh.addRow(CH(['#','Sheet','Nội dung']));
  const rows = [
    ['01','Định vị & Nhận diện','Sứ mệnh, đối tượng, tầm nhìn, Concept "Xưởng phim AI", tone & mood, content direction, đối thủ & khoảng trống, brand guide'],
    ['02','Lộ trình & KPI','6 giai đoạn đạt 50k member, 2 kịch bản ngân sách, bảng KPI theo dõi hàng tháng'],
    ['03','Tăng trưởng & Seeding','8 kênh kéo member + checklist SEO 16 mục + kế hoạch seeding (bài/comment/nick)'],
    ['04','Vận hành: Rules & Journey','Do\'s/Don\'ts, chế tài, hành trình member trước/sau khi vào, ritual định kỳ'],
    ['05','KOL & Network','Danh sách chuyên gia/creator theo vai trò + chính sách deal 3 bậc'],
    ['06','Nhân sự & Doanh thu','Cơ cấu team + công cụ + ngân sách + các dòng doanh thu từ cộng đồng'],
    ['07','Phễu Event → Group','Hook 3 tầng + timeline Trước/Trong/Sau sự kiện 31/07 + 3 caption'],
    ['08','10 bài seed (FULL)','Nội dung đầy đủ 10 bài copy-paste, đánh dấu bài ghim & 3 bài đăng ngay'],
    ['09','Action Plan & Checklist','18 đầu việc (PIC/deadline/KPI/chi phí) + việc làm ngay theo giai đoạn'],
    ['10','Contest #1','Thể lệ "AI Video Showcase" — tiêu chí, giải, chống gian lận'],
  ];
  rows.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('CÁC ĐỀ XUẤT ĐÃ CHỐT (nội bộ) — chỉ còn cần sếp/BTC xác nhận cột cuối', S.section, 3);
  sh.addRow([{v:'Hạng mục',s:S.colheader},{v:'Chốt',s:S.colheader},{v:'Cần trình sếp / BTC',s:S.colheader}]);
  sh.addRow([{v:'Tên group',s:S.label},{v:'AI Video Creators Vietnam',s:S.greenbold},{v:'(không cần) — đã chốt',s:S.muted}]);
  sh.addRow([{v:'% giảm vé event',s:S.label},{v:'15% (mã COCO15)',s:S.greenbold},{v:'Xác nhận mức 15%: 500k→425k, 950k→807k, 1.7tr→1.445tr',s:S.wrap}]);
  sh.addRow([{v:'Credit bonus',s:S.label},{v:'+500 credit/vé',s:S.greenbold},{v:'Duyệt nguồn credit tặng khi mua vé qua link group',s:S.wrap}]);
  sh.addRow([{v:'Ngân sách',s:S.label},{v:'2 kịch bản để chọn',s:S.warn},{v:'CHỌN: A có paid (~120-180tr → 50k member) hay B organic (0đ → 12-18k member chất)',s:S.wrap}]);
  sheets.push(sh);
}

// ============ 01. ĐỊNH VỊ & NHẬN DIỆN (Concept + Direction + Đối thủ + Brand) ============
{
  const sh = new Sheet('01. Định vị & Nhận diện');
  sh.setCols([5, 24, 78]).freezeRows(2);
  sh.banner('ĐỊNH VỊ & NHẬN DIỆN CỘNG ĐỒNG', S.title, 3);
  sh.banner('A. CONCEPT — nền tảng định vị', S.section, 3);
  sh.addRow(CH(['#','Hạng mục','Nội dung']));
  const c = [
    ['1','Sứ mệnh','Cộng đồng cho những người THẬT SỰ dùng AI (đặc biệt hình ảnh & video) để tạo ra sản phẩm thương mại — không phải hội "vọc cho vui". Nơi chia sẻ quá trình tìm tòi, ứng dụng AI vào công việc thật: TVC, quảng cáo, phim, game, nội dung.'],
    ['2','Đối tượng','Production House, Agency quảng cáo, Game Studio, Doanh nghiệp/Brand, và Freelancer chuyên nghiệp. Người làm nghề cần output dùng được cho khách — quan tâm chất lượng, bản quyền, tiến độ, chi phí.'],
    ['3','Tầm nhìn','Trở thành cộng đồng AI Video chuyên nghiệp lớn & uy tín nhất Việt Nam — nơi mọi thành viên nâng được tay nghề và tìm được cơ hội thương mại từ AI.'],
    ['4','Concept "Xưởng phim AI"','Admin = Đạo diễn/Xưởng trưởng · Mod = Tổ trưởng sản xuất · Member = Ê-kíp/nghệ sĩ. Không khí một xưởng sản xuất chuyên nghiệp: cùng nhau làm ra "phim", mổ băng, nâng chất — thay vì hỏi đáp lặt vặt.'],
    ['5','TONE & MOOD (bám mọi content)','TONE: chuyên nghiệp – thẳng thắn – thực chiến – tôn trọng nghề. Nói bằng ngôn ngữ sản xuất (brief, shot, continuity). MOOD: "anh em làm nghề nâng nhau lên", nghiêm túc nhưng không khô, tự hào về sản phẩm. KHÔNG hô khẩu hiệu "AI thay thế con người", KHÔNG câu view rẻ.'],
    ['6','Bảo hộ hiển thị','Banner định vị: BytePlus × Coco Studio (Peacom) × [đối tác]. Nhấn: nền tảng chính hãng, thanh toán VNĐ, VAT, eKYC bản quyền — khác biệt với các nhóm xài tool lậu/fake IP.'],
  ];
  c.forEach(r=>{ const st = r[1].includes('TONE')?S.greenbold:S.label; sh.addRow([{v:r[0],s:S.center},{v:r[1],s:st},{v:r[2],s:S.wrap}]); });
  sh.addBlank();
  sh.banner('B. CONTENT DIRECTION — tỷ lệ tuyến nội dung (bám tone ở mục 5)', S.section, 3);
  sh.addRow([{v:'Pillar',s:S.colheader},{v:'Tỷ lệ',s:S.colheader},{v:'Mô tả',s:S.colheader}]);
  const dir = [
    ['Thực chiến kỹ thuật (workflow/prompt)','30%','Mổ prompt, workflow Seedance/ComfyUI, giữ nhất quán nhân vật, ngôn ngữ máy quay, fix lỗi.'],
    ['Ứng dụng thương mại (case thật)','25%','TVC/quảng cáo/phim/game làm bằng AI, bài toán client (giá – tiến độ – bản quyền – VAT), before/after.'],
    ['Cập nhật xu hướng & model mới','20%','Trend AI hình ảnh/video hot nhất, model mới, so sánh, tin thị trường nghề.'],
    ['Câu chuyện & truyền cảm hứng','15%','Hành trình người làm nghề, thất bại–bài học, UGC member, spotlight.'],
    ['Hoạt động cộng đồng (ritual)','10%','Khám video AI, contest, AMA/workshop, Chợ Phiên, minigame.'],
  ];
  dir.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.center},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('C. ĐỐI THỦ & KHOẢNG TRỐNG COCO CHIẾM', S.section, 3);
  sh.addRow(CH(['','Nhóm tham chiếu / Điểm khác biệt','Ghi chú']));
  const comp = [
    ['Đối thủ','Bình Dân Học AI · Học Viện AI · Phổ Cập AI · Vũ Trụ AI · Lazy AI · Nghiện AI','Phổ cập AI đại chúng, mạnh update model/tips/tin — KHÔNG chuyên sâu video thương mại'],
  ];
  comp.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:bullets(r[1]),s:S.wrap},{v:r[2],s:S.wrap}]));
  const gap = [
    'Chuyên sâu VIDEO thương mại (không phải phổ cập AI chung chung) — tệp làm nghề thật.',
    'Chuẩn High Standard + case output dùng được cho khách (TVC, phim, game, quảng cáo).',
    'Định vị chính hãng: nền tảng bản quyền, VNĐ, VAT, eKYC — khác các nhóm xài tool lậu.',
    'Ritual "Khám video AI" do chuyên gia review — thứ ít cộng đồng làm được bài bản.',
  ];
  gap.forEach((g,i)=>sh.addRow([{v:'Khoảng trống '+(i+1),s:S.good},{v:g,s:S.wrap},{v:'',s:S.normal}]));
  sh.addBlank();
  sh.banner('D. BRAND GUIDE — nhận diện', S.section, 3);
  sh.addRow(CH(['#','Hạng mục','Đề xuất']));
  const bi = [
    ['1','Màu chủ đạo','Xanh Coco (#16A34A) + Đen (#0B1220) — bám brand landing. Điểm nhấn xanh neon cho CTA.'],
    ['2','Font','Sans-serif hiện đại (Montserrat / Inter) — chuyên nghiệp, dễ đọc, không generic.'],
    ['3','Logo / Cover','Co-brand Coco Studio × BytePlus × [đối tác]. Tông điện ảnh, tối giản, có điểm nhấn.'],
    ['4','Khung avatar','Frame để member đổi avatar khi tham gia — tăng nhận diện & cảm giác thuộc về.'],
    ['5','Template bài (5 mẫu)',bullets('Thông báo · Kiến thức/mổ prompt · Khám video AI · Chợ Phiên · Trend Radar')],
    ['6','Tone hình ảnh','Điện ảnh, tối giản, có điểm nhấn — TUYỆT ĐỐI không generic/AI rập khuôn.'],
  ];
  bi.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap}]));
  sheets.push(sh);
}

// ============ 02. LỘ TRÌNH & KPI ============
{
  const sh = new Sheet('02. Lộ trình & KPI');
  sh.setCols([6, 18, 12, 38, 38]).freezeRows(2);
  sh.banner('LỘ TRÌNH 50.000 MEMBER (6 tháng, mốc lũy kế) + KPI', S.title, 5);
  sh.banner('Cơ cấu nguồn: Organic+KOL+Event ~40% · Booking chéo ~25% · Paid Ads ~25% · Contest/Viral ~10%', S.subtitle, 5);
  sh.addRow(CH(['GĐ','Tháng','Mốc','Trọng tâm','Đòn bẩy chính']));
  const road = [
    ['T1','Nền móng','2.000','Setup group chuẩn, seed 10 bài, mời 30-50 founding member','Event 31/07 + DM tệp pro chọn lọc'],
    ['T2','Kích hoạt','8.000','Lập ritual, Khám video AI #1, KOL đợt 1','Recap event + KOL share + booking'],
    ['T3','Tăng tốc','18.000','Contest #1, tài liệu viral, mở tuyến giải trí','Contest (giải credit) + paid ads'],
    ['T4','Nhân rộng','30.000','Workshop, case study DN, ambassador','Co-marketing + KOL đợt 2 + seeding'],
    ['T5','Cộng hưởng','42.000','Talkshow offline, đẩy UGC member','Sự kiện vệ tinh + booking chéo'],
    ['T6','Về đích','50.000','Tổng kết, vinh danh, chuẩn bị monetize','Contest #2 lớn + paid dồn cuối kỳ'],
  ];
  road.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.greenbold},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap}]));
  sh.addBlank();
  sh.banner('2 KỊCH BẢN NGÂN SÁCH — SẾP CHỌN', S.warn, 5);
  sh.addRow([{v:'Kịch bản',s:S.colheader},{v:'Điều kiện',s:S.colheader},{v:'Member thực tế',s:S.colheader},{v:'Ghi chú',s:S.colheader},{v:'',s:S.colheader}]);
  sh.addRow([{v:'A. Có paid ads',s:S.label},{v:'Duyệt ngân sách ads + booking (~120-180tr)',s:S.wrap},{v:'50.000 (cam kết)',s:S.greenbold},{v:'Đủ 4 nguồn chạy song song, đúng lộ trình',s:S.wrap},{v:'',s:S.normal}]);
  sh.addRow([{v:'B. 0đ paid',s:S.label},{v:'Chỉ organic + KOL đổi credit',s:S.wrap},{v:'12.000–18.000 (chất)',s:S.warn},{v:'Chất lượng cao hơn nhưng chậm; đặt mốc thật',s:S.wrap},{v:'',s:S.normal}]);
  sh.addBlank();
  sh.banner('KPI DASHBOARD — theo dõi hàng tháng', S.section, 5);
  sh.addRow([{v:'Chỉ số',s:S.colheader},{v:'T1',s:S.colheader},{v:'T2',s:S.colheader},{v:'T3 / T4 / T5 / T6',s:S.colheader},{v:'Ghi chú',s:S.colheader}]);
  const kpi = [
    ['Member lũy kế','2.000','8.000','18k / 30k / 42k / 50k','Mục tiêu chính'],
    ['Member mới/tháng','2.000','6.000','10k / 12k / 12k / 8k','—'],
    ['% new post trong 7 ngày','>15%','>15%','>18% → >20%','Sức khoẻ group'],
    ['% content từ member','20%','30%','40% → 60%','Không phải BQT'],
    ['Khám video AI/tháng','1','2','4 / 4 / 4 / 4','Ritual mồi'],
    ['Lead cho sale','-','50','100 / 150 / 180 / 200+','Bàn giao sale'],
    ['CPR (đ/member paid)','-','-','<5k → <7k','Nếu chạy paid'],
  ];
  kpi.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.center},{v:r[2],s:S.center},{v:r[3],s:S.center},{v:r[4],s:S.wrap}]));
  sheets.push(sh);
}

// ============ 03. TĂNG TRƯỞNG & SEEDING (8 kênh + SEO + Seeding) ============
{
  const sh = new Sheet('03. Tăng trưởng & Seeding');
  sh.setCols([4, 30, 40, 40]).freezeRows(2);
  sh.banner('TĂNG TRƯỞNG MEMBER — 8 KÊNH + SEO + SEEDING', S.title, 4);
  sh.banner('A. 8 KÊNH KÉO MEMBER (hành vi → hoạt động cần làm)', S.section, 4);
  sh.addRow(CH(['#','Kênh tiếp cận','Điều kiện cần','Hoạt động Coco cần làm']));
  const kenh = [
    ['1','FB cá nhân member (share)','Có quà/lợi ích khi share · nội dung "đáng share"','Tăng bài chia sẻ file/prompt kit · minigame quà credit · CTA share công khai'],
    ['2','FB đề xuất (chất lượng group)','>7-10 bài/ngày · tương tác tốt · >50% bài member viết · tăng đều >3k/tháng','Đăng đều 7+ bài/ngày · gắn thẻ tag · tối ưu cài đặt group · kiểm soát chất lượng'],
    ['3','KOL/kênh khác giới thiệu','Nội dung xịn đáng copy ghi nguồn · network tốt · booking','Seeding đa cộng đồng · nội dung có ý đồ · deal KOL (sheet 05) · booking PR'],
    ['4','Chạy quảng cáo','Có bài xịn để chạy · có page riêng · ngân sách','Chọn bài tương tác cao chạy ads về group · A/B creative · retarget'],
    ['5','Nền tảng khác (TikTok/Threads/YT)','Mod seeding đa nền tảng · nội dung mũi nhọn','Cắt clip mổ prompt lên TikTok/YT Shorts · Threads tips · 1 bài/kênh/ngày'],
    ['6','FB đề xuất qua tương tác bạn bè','Nội dung hữu ích · tương tác sôi nổi','Bài có CTA tương tác · tối ưu SEO · fanpage vệ tinh · ảnh/mô tả chuyên nghiệp'],
    ['7','FB đề xuất group liên quan','Tối ưu SEO · uy tín · kết nối chéo','Checklist SEO (mục B) · chia sẻ chéo group–group, fanpage–group'],
    ['8','User chủ động tìm tên group','Group top tìm kiếm · nội dung đều & chất','Tối ưu keyword ở tên+mô tả+tag · giữ chất lượng · tránh bị "ăn gậy"'],
  ];
  kenh.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:bullets(r[2]),s:S.wrap},{v:bullets(r[3]),s:S.wrap}]));
  sh.addBlank();
  sh.banner('B. CHECKLIST SEO GROUP (16 mục — tick khi đạt)', S.section, 4);
  sh.addRow([{v:'#',s:S.colheader},{v:'Mục',s:S.colheader},{v:'Chi tiết',s:S.colheader},{v:'Tác động',s:S.colheader}]);
  const seo = [
    ['1','Member share FB cá nhân','≥5% bài có giá trị + CTA share về trang cá nhân','Cao'],
    ['2','Minigame/quà','Minigame có quà credit tối thiểu 2 tháng/lần','Cao'],
    ['3','SEO group','Cài đặt group đạt >90% tiêu chí (tên, mô tả, chủ đề, quyền riêng tư)','Cao'],
    ['4','Gắn thẻ tag','>50% bài viết được gắn thẻ tag chủ đề','TB'],
    ['5','Tần suất','Đăng tối thiểu 7 bài/ngày','Cao'],
    ['6','Tỷ lệ member viết','Tỷ lệ member (không phải admin-mod) viết bài >50%','Cao'],
    ['7','Bài chuyên sâu/CTA','Mật độ bài chuyên sâu hoặc có CTA tương tác >30%','Cao'],
    ['8','Tag bạn bè','≥5% bài có CTA tag bạn bè để nhận file/kit','Cao'],
    ['9','Seeding đa nền tảng','TikTok/Threads/YT tối thiểu 1 bài/kênh/ngày','Cao'],
    ['10','Seeding đa cộng đồng','Kéo từ các cộng đồng liên quan về group','Cao'],
    ['11','Quảng cáo','Chi ngân sách ads cho bài/tệp chọn lọc (kịch bản A)','Cao'],
    ['12','KOL chia sẻ','Tối thiểu 1 KOL/tháng viết bài giới thiệu group','TB'],
    ['13','Keyword tìm kiếm','100% keyword quan trọng tối ưu ở mô tả + tag + tuyến nội dung','TB'],
    ['14','Fanpage vệ tinh','Tạo fanpage riêng, đăng 1-3 bài/ngày điều hướng group','Thấp'],
    ['15','Mô tả & ảnh','100% mô tả & ảnh bìa chuyên nghiệp, đúng brand','TB'],
    ['16','Chia sẻ chéo','≥3 bài seeding chéo từ cộng đồng/kênh liên quan mỗi tuần','Cao'],
  ];
  seo.forEach(r=>{ const im = r[3]==='Cao'?S.good:(r[3]==='TB'?S.center:S.muted); sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:im}]); });
  sh.addBlank();
  sh.banner('C. SEEDING PLAN — nuôi group (bao nhiêu bài/comment/nick?)', S.section, 4);
  sh.addRow([{v:'Giai đoạn',s:S.colheader},{v:'Bài seed BQT/ngày',s:S.colheader},{v:'Comment/ngày',s:S.colheader},{v:'Nick + mục tiêu',s:S.colheader}]);
  const sd = [
    ['Trước mở group','10 bài chất (1 lần)','-','Group không trống khi user vào'],
    ['Tháng 1','2 bài/ngày','10-15','3-5 nick thật · tạo cảm giác sôi nổi'],
    ['Tháng 2-3','2 bài/ngày','15-20','5 nick · duy trì nhiệt + kéo tương tác'],
    ['Tháng 4-6','1-2 bài/ngày','10-15','5 nick · member tự tạo content, giảm seed'],
  ];
  sd.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.center},{v:r[2],s:S.center},{v:r[3],s:S.wrap}]));
  sh.addRow([{v:'Quy tắc',s:S.warn},{v:bullets('Nick thật có avatar & lịch sử · Comment có giá trị (không "hay quá/hóng") · Không PR lộ liễu · Mỗi nick 1 persona (newbie hỏi / pro trả lời / client thắc mắc) · Nick thật share ra group cùng tệp'),s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sheets.push(sh);
}

// ============ 04. VẬN HÀNH: RULES & JOURNEY ============
{
  const sh = new Sheet('04. Rules & Journey');
  sh.setCols([5, 46, 46]).freezeRows(2);
  sh.banner('VẬN HÀNH CỘNG ĐỒNG — RULES & USER JOURNEY', S.title, 3);
  sh.banner('A. RULES — HIGH STANDARD', S.section, 3);
  sh.addRow([{v:'✅ NÊN LÀM (Do\'s)',s:S.colheader},{v:'❌ KHÔNG NÊN (Don\'ts)',s:S.colheader},{v:'',s:S.colheader}]);
  const dos = [
    'Chia sẻ quá trình + prompt thật, có sản phẩm đi kèm',
    'Hỏi cụ thể, kèm ảnh/video/prompt đang bị lỗi',
    'Góp ý có dẫn chứng, tôn trọng người làm nghề',
    'Ghi rõ model/nền tảng đã dùng (Seedance, Coco...)',
    'Credit nguồn khi dùng lại tác phẩm/prompt người khác',
    'Đăng bài bán/tuyển đúng khung "Thứ 6 Chợ Phiên"',
  ];
  const donts = [
    'Spam link bán hàng, DM rác, tag bừa',
    'Rao/dùng tài khoản lậu, crack, fake IP',
    'Vi phạm bản quyền, dùng mặt người không có consent',
    'NSFW, chính trị, nội dung câu view rẻ tiền',
    'Drama, công kích cá nhân, hạ bệ đồng nghiệp',
    'Đăng lại showcase độc quyền event/BytePlus khi chưa được phép',
  ];
  for(let i=0;i<Math.max(dos.length,donts.length);i++){ sh.addRow([{v:dos[i]||'',s:S.good},{v:donts[i]||'',s:S.warn},{v:'',s:S.normal}]); }
  sh.addRow([{v:'Chế tài',s:S.label},{v:'Nhắc lần 1 → cảnh cáo lần 2 → 3 lần = ban. Spam/lừa đảo/crack: ban thẳng. Bật duyệt bài toàn bộ giai đoạn đầu (T1-T2), nới dần khi cộng đồng tự điều tiết.',s:S.wrap},{v:'',s:S.normal}]);
  sh.addBlank();
  sh.banner('B. USER JOURNEY — trước & sau khi member vào', S.section, 3);
  sh.addRow(CH(['Mốc','Hoạt động','Mục tiêu']));
  const jr = [
    ['TRƯỚC — Duyệt vào','3 câu hỏi: (1) Bạn làm gì với AI Video? (2) Muốn giỏi hơn ở khâu nào? (3) Cam kết không spam?','Lọc đúng tệp ngay cửa'],
    ['TRƯỚC — Sẵn sàng','Banner + mô tả SEO · 3 bài ghim (welcome/rules/pro kit) · 10 bài seed · bot auto gửi mã+tài liệu','Group không trống'],
    ['Phút 0','Auto-welcome + tag "Start Here" + gửi Pro Kit','Không để member lạc lõng'],
    ['24 giờ','Mời comment tự giới thiệu, admin reply đích danh → gợi bài đăng đầu','Phá băng, tạo tương tác'],
    ['Tuần 1','Đẩy Pro Kit + rủ tham gia "Khám video AI"','Cho lý do ở lại'],
    ['Tuần 2-4','Ritual hàng tuần đều đặn','Biến lurker → active'],
    ['Tháng 2+','Nhận diện power-user → mời làm CTV/ambassador','Xây lõi tự vận hành'],
  ];
  jr.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.wrap},{v:r[2],s:S.wrap}]));
  sh.addBlank();
  sh.banner('C. RITUAL ĐỊNH KỲ (nhịp sinh hoạt)', S.section, 3);
  sh.addRow(CH(['Lịch','Ritual','Vai trò trong phễu']));
  const rit = [
    ['Thứ 2','"Bạn đang làm gì tuần này?"','Ấm — member khoe dự án đang chạy'],
    ['Thứ 4','🎬 Khám video AI','Chuyên gia review video member — mồi tương tác #1'],
    ['Thứ 6','Chợ Phiên','Khung DUY NHẤT được bán/tuyển (nóng, có duyệt)'],
    ['Chủ nhật','Trend Radar','Xu hướng AI tuần + prompt mẫu (lạnh, dễ share)'],
    ['Hàng tháng','AMA / Workshop + Contest','Sự kiện lớn giữ nhiệt & kéo member mới'],
  ];
  rit.forEach(r=>sh.addRow([{v:r[0],s:S.label},{v:r[1],s:S.greenbold},{v:r[2],s:S.wrap}]));
  sheets.push(sh);
}

// ============ 05. KOL & NETWORK ============
{
  const sh = new Sheet('05. KOL & Network');
  sh.setCols([4, 26, 30, 26, 34]).freezeRows(2);
  sh.banner('KOL / CHUYÊN GIA THEO VAI TRÒ (flywheel cộng đồng)', S.title, 5);
  sh.addRow(CH(['#','Nhóm','Hồ sơ mục tiêu','Vai trò trong group','Quyền lợi đề xuất']));
  const kol = [
    ['1','AI Creator / Worker kỹ thuật','Kiểu TaiOn AI Worker, nhóm thực chiến ComfyUI/Workflow','Kéo tệp thực chiến + dạy kỹ thuật','Credit + đồng sản xuất + affiliate'],
    ['2','Đạo diễn / Nhà sản xuất','Nguyễn Cao Tùng, Sunil Thomas (đã gắn event)','Uy tín "high standard", định chuẩn nghề','Ghế speaker + spotlight cá nhân'],
    ['3','VFX / Motion Artist','Artist hậu kỳ, motion designer AI cinematic','Chiều sâu kỹ thuật, đồng host Khám video AI','Đồng tổ chức + credit + PR sản phẩm'],
    ['4','Agency / Brand C-level','GĐ sáng tạo, marketing lead doanh nghiệp','Mở tệp DN, case study thương mại','Case study PR + networking + ưu đãi gói'],
    ['5','Game / Content Creator','Studio indie, creator viral đa use-case','Đa dạng ứng dụng, sponsor contest','Contest sponsor + credit + spotlight'],
  ];
  kol.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap}]));
  sh.addBlank();
  sh.banner('CHÍNH SÁCH DEAL 3 BẬC (mang đi thương lượng)', S.section, 5);
  sh.addRow([{v:'Bậc',s:S.colheader},{v:'Coco cho gì',s:S.colheader},{v:'Đổi lại',s:S.colheader},{v:'',s:S.colheader},{v:'',s:S.colheader}]);
  sh.addRow([{v:'1. Nhẹ',s:S.label},{v:'Credit nền tảng + spotlight thương hiệu cá nhân',s:S.wrap},{v:'1-2 bài chia sẻ chất trong group',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sh.addRow([{v:'2. Vừa',s:S.label},{v:'Đồng sản xuất video demo (chia sẻ sản phẩm)',s:S.wrap},{v:'Đồng host ritual + kéo tệp riêng',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sh.addRow([{v:'3. Nặng',s:S.label},{v:'Affiliate / chia sẻ doanh thu khi giới thiệu khách DN mua gói Coco',s:S.wrap},{v:'Cam kết dài hạn, đại sứ cộng đồng',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sheets.push(sh);
}

// ============ 06. NHÂN SỰ & DOANH THU ============
{
  const sh = new Sheet('06. Nhân sự & Doanh thu');
  sh.setCols([4, 26, 60, 16]).freezeRows(2);
  sh.banner('NHÂN SỰ, NGUỒN LỰC & DOANH THU CỘNG ĐỒNG', S.title, 4);
  sh.banner('A. CƠ CẤU NHÂN SỰ', S.section, 4);
  sh.addRow(CH(['#','Vai trò','Nhiệm vụ chính','Số lượng']));
  const hr = [
    ['1','Community Lead (bạn)','Chiến lược, định hướng, chịu trách nhiệm KPI tổng, deal KOL/đối tác','1'],
    ['2','Moderator','Duyệt bài, giữ chuẩn, chăm tương tác, vận hành ritual, xử lý vi phạm','2'],
    ['3','Content Creator','Sản xuất bài seed/tuyến nội dung, mổ prompt, viết case study','2'],
    ['4','Seeder','Seeding đa nền tảng & đa cộng đồng, kéo traffic','team 3-5 nick'],
    ['5','Designer','Ảnh bìa, banner, thumbnail, layout Pro Kit','1'],
    ['6','Ads / Performance','Chạy & tối ưu ads (kịch bản A), báo cáo hiệu quả/member','1'],
    ['7','Pool KOL/CTV','Chia sẻ, đồng host, kéo tệp (theo sheet 05)','linh hoạt'],
  ];
  hr.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.center}]));
  sh.addRow([{v:'',s:S.normal},{v:'Công cụ',s:S.label},{v:bullets('Coco/Seedance (credit demo + giải) · Canva/Figma · CapCut/Premiere · Meta Business Suite · Google Sheet/Trello · chatbot FB · social listening'),s:S.wrap},{v:'',s:S.normal}]);
  sh.addRow([{v:'',s:S.normal},{v:'Ngân sách (trình sếp)',s:S.warn},{v:bullets('Giải contest (credit) · booking KOL/group · paid ads · standee/POSM event'),s:S.wrap},{v:'',s:S.normal}]);
  sh.addBlank();
  sh.banner('B. DOANH THU TỪ CỘNG ĐỒNG (monetize khéo, không lộ liễu)', S.section, 4);
  sh.addRow([{v:'#',s:S.colheader},{v:'Dòng tiền',s:S.colheader},{v:'Cách khai thác',s:S.colheader},{v:'',s:S.colheader}]);
  const rev = [
    ['1','Chuyển đổi gói Coco Studio','Nội dung dạy nghề → phát sinh nhu cầu render → giới thiệu gói (file Fanpage). Đánh tệp agency/DN.'],
    ['2','Affiliate / chia sẻ doanh thu','KOL & member giới thiệu khách DN mua gói → hưởng % (deal bậc 3).'],
    ['3','Booking / PR chéo','Bán slot booking cho brand/tool liên quan trong khung Chợ Phiên có duyệt.'],
    ['4','Event & Workshop có phí','Talkshow/workshop chuyên sâu bán vé; combo vé + credit Coco.'],
    ['5','Đồng sản xuất video','Nhận job sản xuất video thương mại cho DN qua uy tín cộng đồng (Peacom thực thi).'],
    ['6','Contest có sponsor','Brand tài trợ giải thưởng contest → thu phí sponsor + tăng member.'],
  ];
  rev.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:'',s:S.normal}]));
  sheets.push(sh);
}

// ============ 07. PHỄU EVENT → GROUP ============
{
  const sh = new Sheet('07. Phễu Event-Group');
  sh.setCols([5, 22, 34, 34, 30]).freezeRows(2);
  sh.banner('PHỄU EVENT 31/07 → GROUP (cửa sổ ~11 ngày + hậu event)', S.title, 5);
  sh.banner('Event: AI Video for Professional Film & Commercial Production in Vietnam — 31/07/2026, Sofitel Saigon Plaza', S.subtitle, 5);
  sh.banner('A. 3 TẦNG MỒI CÂU (HOOK)', S.section, 5);
  sh.addRow(CH(['Tầng','Mồi','Đổi lấy','Vì sao','']));
  sh.addRow([{v:'Lạnh',s:S.label},{v:'Mã giảm 15% vé event (COCO15)',s:S.wrap},{v:'Vào group nhận mã',s:S.wrap},{v:'Cú hích chốt vé + kéo member',s:S.wrap},{v:'',s:S.normal}]);
  sh.addRow([{v:'Ấm',s:S.label},{v:'Bộ AI Video Pro Kit (20 prompt Seedance + checklist brief + bảng continuity)',s:S.wrap},{v:'Ghim bài, react + comment',s:S.wrap},{v:'Đúng thứ dân nghề cần',s:S.wrap},{v:'',s:S.normal}]);
  sh.addRow([{v:'Nóng',s:S.label},{v:'+500 credit khi mua vé qua link group + suất Khám video AI',s:S.wrap},{v:'Check-in nhận',s:S.wrap},{v:'Tăng giá trị vé, giữ chân',s:S.wrap},{v:'',s:S.normal}]);
  sh.addRow([{v:'✅ ĐÃ ĐỀ XUẤT',s:S.good},{v:'Mã COCO15 (-15%): 500k→425k, 950k→807k, 1.7tr→1.445tr · Bonus +500 credit qua link group',s:S.good},{v:'',s:S.normal},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sh.addBlank();
  sh.banner('B. TIMELINE 3 GIAI ĐOẠN', S.section, 5);
  sh.addRow(CH(['GĐ','Thời gian','Fanpage','Group','Khác']));
  sh.addRow([{v:'Trước',s:S.label},{v:'20-30/07',s:S.center},{v:'Đếm ngược + mồi vé → link group, xoay 3 mồi',s:S.wrap},{v:'Thả Pro Kit thật (lý do ở lại)',s:S.wrap},{v:'Speaker/KOL share story gắn link group'}]);
  sh.addRow([{v:'Trong',s:S.label},{v:'31/07',s:S.center},{v:'Live không khí (KHÔNG livestream showcase độc quyền)',s:S.wrap},{v:'Post slide/tài liệu độc quyền chỉ trong group',s:S.wrap},{v:'Standee + QR check-in · PG nhắc quét QR khi trao quà'}]);
  sh.addRow([{v:'Sau',s:S.label},{v:'01-07/08',s:S.center},{v:'Recap → điều hướng group',s:S.wrap},{v:'Tài liệu tổng hợp + mở Khám video AI #1',s:S.wrap},{v:'Nurture vé Gold → nhóm power-user'}]);
  sh.addBlank();
  sh.banner('C. 3 CAPTION SẴN DÙNG (bám tone chuyên nghiệp – thực chiến)', S.section, 5);
  sh.addRow([{v:'Caption A — Fanpage (mồi vé)',s:S.label},{v:'🎬 11 ngày nữa: sự kiện AI Video chuẩn sản xuất thương mại đầu tiên tại Việt Nam. Đạo diễn – nhà sản xuất phim thật, showcase thật, và cách đưa AI Video lên sóng TVC/quảng cáo đúng luật (bản quyền, VAT, eKYC). 👉 Vào Group AI Video Creators Vietnam [link] để nhận mã giảm vé 15% + bộ Pro Kit. Số lượng có hạn.',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sh.addRow([{v:'Caption B — Group (mồi tài liệu)',s:S.label},{v:'📂 Tặng cả nhà bộ AI Video Pro Kit: 20 prompt Seedance làm TVC, checklist brief video thương mại, bảng giữ nhất quán nhân vật. Đây cũng là bộ tụi mình dùng để mổ bài trong "Khám video AI". Tải ở bài ghim 👆, ai muốn soi video thì comment.',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sh.addRow([{v:'Caption C — Onsite/QR',s:S.label},{v:'📸 Đang ở sự kiện? Quét QR vào Group nhận slide + tài liệu độc quyền của buổi hôm nay (chỉ post trong Group) và giữ suất Khám video AI số đầu tiên.',s:S.wrap},{v:'',s:S.normal},{v:'',s:S.normal},{v:'',s:S.normal}]);
  sheets.push(sh);
}

// ============ 08. 10 BÀI SEED (FULL) ============
{
  const sh = new Sheet('08. 10 bài seed');
  sh.setCols([4, 20, 26, 78, 16]).freezeRows(3);
  sh.banner('10 BÀI SEED — NỘI DUNG ĐẦY ĐỦ, COPY-PASTE ĐĂNG NGAY', S.title, 5);
  sh.banner('TONE bám Concept: chuyên nghiệp – thực chiến – làm nghề, không hô hào, không câu view rẻ. ★ = đăng ngay để đón traffic event.', S.subtitle, 5);
  sh.addRow(CH(['#','Kênh / Phễu','Tiêu đề','Nội dung đầy đủ','Ưu tiên']));
  const seed = [
    ['1','Group · Ghim','Welcome + Rules','Chào mừng bạn đến với AI Video Creators Vietnam 👋\n\nĐây không phải nơi khoe "AI sắp thay thế loài người". Đây là chỗ của những người THẬT SỰ dùng AI để ra sản phẩm — marketer, editor, production house, agency, freelancer, chủ brand.\n\nTiêu chuẩn của group: chất lượng trước, số lượng sau. Bạn sẽ thấy:\n🎬 "Khám video AI" — chuyên gia review video bạn làm\n📂 Template, prompt, source dùng được ngay\n🧠 Case thật: làm TVC, video game, content brand bằng AI\n\nNỘI QUY:\n✅ Chia sẻ quá trình + prompt thật, hỏi cụ thể, góp ý có dẫn chứng\n❌ Không spam link bán, không tài khoản lậu/crack, không vi phạm bản quyền\n\nBắt đầu: comment bạn đang làm gì với AI Video + 1 thứ muốn giỏi hơn trong 3 tháng tới.','📌 GHIM'],
    ['2','Fanpage · Lạnh','Vì sao 90% video AI trông "giả"','Ai từng render một cảnh nhân vật bằng AI đều gặp: mặt "trôi" giữa các frame, tay 6 ngón, chuyển động như trượt băng. Không phải AI kém — phần lớn do brief sai từ đầu.\n\n3 lỗi hay gặp nhất:\n1. Nhồi quá nhiều vào 1 prompt. Một cảnh = 1 chủ thể + 1 hành động + 1 hướng máy.\n2. Bỏ quên continuity. Đổi mặt giữa 2 cảnh là do không khóa seed. Nền tảng thuần seed như Seedance giữ nhất quán nhân vật rất tốt cho TVC.\n3. Coi camera là phụ. "Dolly in chậm", "orbit 90 độ" — ghi rõ ngôn ngữ máy quay thì mới ra chất điện ảnh.\n\n👉 Bạn kẹt ở lỗi nào nhất? Comment để tụi mình mổ bài tới.','★ ĐĂNG NGAY'],
    ['3','Group · Lạnh','Đố vui: AI hay quay thật?','Nhìn nhanh 4 clip dưới đây 👇 Đâu là AI, đâu là quay thật?\n\nComment đáp án theo thứ tự (VD: 1-AI, 2-Thật...). Ai đúng hết tụi mình tặng bộ 20 prompt Seedance TVC-ready.\n\nGợi ý: để ý ánh sáng phản chiếu trong mắt và chuyển động của tóc — đó là chỗ AI hay lộ nhất.',''],
    ['4','Group · Ấm','Khám video AI — Số 0','Ra mắt chuyên mục 🎬 KHÁM VIDEO AI.\n\nCách chơi: bạn gửi 1 video AI mình làm → chuyên gia (đạo diễn/VFX/creator) sẽ xem trực tiếp, chỉ ra 3 điểm được và 3 điểm cần sửa. Học nhanh nhất là được người giỏi soi bài của chính mình.\n\nSố đầu tiên tuần sau. Nộp bài qua form [link] kèm: video + prompt bạn dùng + bạn muốn được góp ý ở đâu.\n\nKhông sợ bị chê — sợ nhất là làm mãi không ai chỉ chỗ sai.',''],
    ['5','Fanpage · Ấm','TVC 15s, 3 bản, 48h — bài toán agency','Client giờ không hỏi "đẹp không". Họ hỏi: bao nhiêu, bao lâu, có xuất hóa đơn không.\n\nCách cũ: thuê ê-kíp, quay, hậu kỳ — vài chục triệu, vài tuần cho 1 concept. A/B test 3 hướng? Nhân 3 chi phí.\n\nAI Video đổi luật: cùng 1 brief, ra 3-5 hướng hình trong 1 buổi để client chọn. Nhưng để DÙNG ĐƯỢC cho khách doanh nghiệp, cần 3 thứ bản free không có:\n• Nhất quán thương hiệu qua cả campaign\n• Hóa đơn VAT (không có thì kế toán khách không nghiệm thu)\n• Bản quyền & eKYC khuôn mặt\n\n👉 Agency/brand bạn vướng nhất ở đâu — chất lượng, chi phí, hay pháp lý?','★ ĐĂNG NGAY'],
    ['6','Group · Nóng','Chợ Phiên #1 (có duyệt)','Thứ 6 hàng tuần = CHỢ PHIÊN — chỗ DUY NHẤT trong group được đăng bán dịch vụ / tuyển người / tìm job.\n\nĐăng theo mẫu:\n[LOẠI: Bán dịch vụ / Tuyển / Tìm job]\n[Bạn làm gì]\n[Kèm 1 sản phẩm mẫu]\n[Liên hệ]\n\nCác ngày khác đăng bán sẽ bị gỡ. Giữ group sạch để ai cũng muốn ở lại.',''],
    ['7','Group · Lạnh','Trend Radar tuần này','3 xu hướng video AI đang hot tuần này 👇\n1. [Trend A] — ứng dụng vào... (kèm prompt mẫu)\n2. [Trend B] — ...\n3. [Trend C] — ...\n\nLưu bài lại, thử 1 prompt và khoe kết quả bên dưới. Tuần sau tụi mình cập nhật tiếp.\n\n(Cập nhật thực tế mỗi tuần theo trend nóng nhất)',''],
    ['8','Fanpage · Lạnh','Còn 3 ngày! Mã giảm vé event','🎬 Còn 3 ngày đến sự kiện AI Video chuẩn sản xuất thương mại đầu tiên tại Việt Nam (31/07, Sofitel Saigon Plaza).\n\nĐạo diễn – nhà sản xuất phim thật, showcase thật, cách đưa AI Video lên sóng TVC đúng luật.\n\n👉 Vào Group AI Video Creators Vietnam [link] nhận MÃ GIẢM VÉ 15% (COCO15) + bộ tài liệu Pro Kit. Số lượng mã có hạn.',''],
    ['9','Group · Ấm','Tặng bộ AI Video Pro Kit','📂 Tặng cả nhà bộ AI VIDEO PRO KIT:\n• 20 prompt Seedance làm TVC\n• Checklist brief video thương mại\n• Bảng giữ nhất quán nhân vật xuyên cảnh\n\nĐây cũng là bộ tụi mình dùng để mổ bài trong "Khám video AI". Tải ở bài ghim 👆\n\nAi muốn tụi mình soi video của bạn — comment bên dưới.','★ ĐĂNG NGAY'],
    ['10','Group · Ấm','Case thật: làm TVC bằng AI ra sao','Chia sẻ 1 case thật: từ brief của khách → 3 hướng hình → chốt 1 → ra file cuối, mất bao lâu và vướng gì.\n\n[Kể quy trình từng bước, kèm ảnh từng giai đoạn]\n\nĐiều bất ngờ nhất: khâu tốn thời gian nhất không phải render, mà là brief cho đúng ý khách.\n\nBạn từng làm job AI Video cho khách chưa? Kể chỗ khó nhất bên dưới.',''],
  ];
  seed.forEach(r=>{ const pri = r[4].includes('★')?S.good:(r[4].includes('GHIM')?S.warn:S.muted); sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap},{v:r[4],s:pri}]); });
  sheets.push(sh);
}

// ============ 09. ACTION PLAN & CHECKLIST ============
{
  const sh = new Sheet('09. Action Plan');
  sh.setCols([4, 14, 18, 38, 24, 12, 14, 20, 18]).freezeRows(2);
  sh.banner('MASTER ACTION PLAN — 18 ĐẦU VIỆC (action / output / PIC / deadline / KPI / chi phí)', S.title, 9);
  sh.banner('★ = việc làm NGAY (giai đoạn nền móng). Bám checklist brief sếp giao.', S.subtitle, 9);
  sh.addRow(CH(['#','Giai đoạn','Hạng mục','Action cụ thể','Output nộp','PIC','Deadline','KPI','Chi phí']));
  const ap = [
    ['1','★ T1 Nền móng','Ký NDA','Ký thỏa thuận bảo mật trước khi nhận tài liệu sâu','NDA ký','Lead','Ngay','Xong','0đ'],
    ['2','★ T1 Nền móng','Bộ nhận diện','Thiết kế logo, cover, khung avatar, 5 template bài','File AI/PNG + Canva','Designer','Tuần 1','5 template duyệt','1-2tr / 0đ'],
    ['3','★ T1 Nền móng','Setup group','Tạo group, mô tả SEO, 3 câu hỏi duyệt, bật duyệt bài, ghim 3 bài','Group live','Lead','Tuần 1','Setup 100%','0đ'],
    ['4','★ T1 Nền móng','10 bài seed','Đăng 10 bài đã viết sẵn (sheet 08); 3 bài ★ đăng ngay cả Group+Fanpage','10 post live','Content x2','Tuần 1-2','10 bài, ≥5 cmt/bài','0đ'],
    ['5','★ T1 Nền móng','Founding members','DM 30-50 người tệp pro mời vào seed tương tác','Bảng 50 lời mời','Lead','Tuần 1-2','≥30 vào + cmt','0đ'],
    ['6','★ T1 Nền móng','Fanpage vệ tinh','Lập fanpage, đăng 3 bài đầu điều hướng group','Fanpage live','Content','Tuần 1-2','3 bài + link','0đ'],
    ['7','T2 Kích hoạt','Đòn bẩy event','3 tầng mồi kéo người event 31/07 (COCO15 + 500 credit)','Report member event','Lead','20-31/07','≥1.500 member','gộp NS event'],
    ['8','T2 Kích hoạt','Ritual','4 ritual/tuần đều đặn','Lịch + link post','Mod x2','Cả T2','reply >30%','0đ'],
    ['9','T2 Kích hoạt','Khám video AI #1','Gọi nộp video, mời chuyên gia review','1 buổi + recap','Lead+KOL','Tuần 5','≥10 video, ≥100 cmt','0.5-2tr'],
    ['10','T2 Kích hoạt','KOL đợt 1','Chốt 3-5 KOL share','Deal + link','Lead','Tuần 5-6','≥3 KOL, +2.000','3-10tr'],
    ['11','T2 Kích hoạt','Booking chéo','Book 3-5 group cùng tệp','List + report','Booking','Cả T2','+2.000 member','3-8tr'],
    ['12','T3 Tăng tốc','Contest #1','Chạy cuộc thi (thể lệ sheet 10)','Landing + BGK','Lead','Tuần 9-12','≥50 bài, +5.000','credit Coco'],
    ['13','T3 Tăng tốc','Paid ads','Ads Group Join tệp pro','Camp + report','Ads','Cả T3','CPR <5k, +5.000','10-20tr/th'],
    ['14','T3 Tăng tốc','Tài liệu viral','2 bộ tài liệu tải nhiều','2 file gated','Content','Tuần 9','≥1.000 tải','0đ'],
    ['15','T4 Nhân rộng','Workshop + Ambassador','1 workshop/tháng + chọn 10-20 power-user','Landing + list','Lead','T4','≥200 ĐK, ≥10 active','2-5tr + credit'],
    ['16','T5 Cộng hưởng','Talkshow offline','Buổi offline 30-50 người','Kịch bản + ảnh','All','T5','+3.000 member','10-20tr'],
    ['17','T6 Về đích','Contest #2','Cuộc thi lớn + paid cuối kỳ','Thể lệ + report','All','T6','Đạt 50.000','giải + 15-25tr'],
    ['18','T6 Về đích','Chuẩn bị monetize','Đóng gói lead warm → sale gói Coco','List lead + kịch bản','Lead','T6','≥200 lead','0đ'],
  ];
  ap.forEach(r=>{ const st = r[1].includes('★')?S.warn:S.center; sh.addRow([{v:r[0],s:S.center},{v:r[1],s:st},{v:r[2],s:S.label},{v:r[3],s:S.wrap},{v:r[4],s:S.wrap},{v:r[5],s:S.center},{v:r[6],s:S.center},{v:r[7],s:S.wrap},{v:r[8],s:S.center}]); });
  sheets.push(sh);
}

// ============ 10. CONTEST #1 ============
{
  const sh = new Sheet('10. Contest #1');
  sh.setCols([5, 26, 66, 26]).freezeRows(2);
  sh.banner('THỂ LỆ CUỘC THI #1 — "AI VIDEO SHOWCASE"', S.title, 4);
  sh.addRow(CH(['#','Hạng mục','Chi tiết','Ghi chú']));
  const ct = [
    ['1','Tên cuộc thi','AI Video Showcase — Làm video thương mại bằng Coco Studio','Có thể đổi tên'],
    ['2','Mục tiêu','Tạo UGC chất lượng + kéo member + demo năng lực Seedance','+5.000 member'],
    ['3','Thời gian','Tuần 9 mở — Tuần 12 trao giải (4 tuần)','Trùng giai đoạn T3'],
    ['4','Đối tượng','Thành viên group, mọi trình độ','Chia 2 bảng: Pro & Newbie'],
    ['5','Đề bài','Làm 1 video 15-30s theo brief giả định (TVC nước hoa / trailer game / video brand)','3 đề chọn 1'],
    ['6','Yêu cầu bài thi','Video + prompt đã dùng + mô tả quy trình. Đăng công khai, hashtag #AIVideoShowcase','Bắt buộc dùng Coco/Seedance'],
    ['7','Tiêu chí chấm (100đ)','Ý tưởng 30 / Kỹ thuật (nhất quán, camera, ánh sáng) 40 / Ứng dụng thương mại 30','BGK chấm'],
    ['8','BGK','2-3 chuyên gia/KOL + đại diện Coco','Mời từ KOL list (sheet 05)'],
    ['9','Cơ cấu giải',bullets('Nhất: credit lớn + spotlight + suất mentor · Nhì: credit vừa · Ba: credit nhỏ · Được yêu thích (vote): quà riêng'),'Giải = credit Coco quy đổi'],
    ['10','Cách chọn thắng','70% điểm BGK + 30% tương tác (react + comment hợp lệ)','Chống gian lận vote'],
    ['11','Lan tỏa','Bài dự thi = seeding tự nhiên; recap top bài đăng Fanpage','Đòn bẩy viral'],
    ['12','Chi phí','Chủ yếu credit nội bộ + quà nhẹ','Rẻ, hiệu quả cao'],
  ];
  ct.forEach(r=>sh.addRow([{v:r[0],s:S.center},{v:r[1],s:S.label},{v:r[2],s:S.wrap},{v:r[3],s:S.wrap}]));
  sheets.push(sh);
}

writeWorkbook(OUT, sheets);
console.log('DONE:', OUT, '| sheets:', sheets.length);

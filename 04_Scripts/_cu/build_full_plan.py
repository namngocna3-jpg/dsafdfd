# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.Workbook()
H = Font(bold=True, color="FFFFFF", size=11)
HFILL = PatternFill("solid", fgColor="1F3864")
SUB = Font(bold=True, color="1F3864", size=11)
TITLE = Font(bold=True, size=14, color="1F3864")
WRAP = Alignment(wrap_text=True, vertical="top")
CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
thin = Side(style="thin", color="BBBBBB")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
RED = Font(italic=True, color="C00000")

def hstyle(ws,row,ncol):
    for c in range(1,ncol+1):
        x=ws.cell(row=row,column=c); x.font=H; x.fill=HFILL; x.alignment=CENTER; x.border=BORDER
def body(ws,start,ncol):
    for r in ws.iter_rows(min_row=start,max_col=ncol):
        for c in r: c.alignment=WRAP; c.border=BORDER
def setw(ws,ws_w):
    for i,w in enumerate(ws_w,1): ws.column_dimensions[get_column_letter(i)].width=w

# ============ SHEET 0: TÓM TẮT PITCH ============
ws=wb.active; ws.title="0. Tóm tắt Pitch"
ws["A1"]="KẾ HOẠCH TRIỂN KHAI COCO STUDIO & CỘNG ĐỒNG AI — BẢN PITCH"; ws["A1"].font=TITLE
ws.merge_cells("A1:D1")
data=[
 ["","",""],
 ["MỤC","NỘI DUNG CHỐT","GHI CHÚ CẦN SẾP QUYẾT"],
 ["Sản phẩm","Coco Studio (Peacom x BytePlus) — AI Video chuyên nghiệp, thuần Seedance, eKYC, VAT, local support","Tính năng cao cấp unlock theo dự án"],
 ["Cộng đồng","Group 'AI Video Creators Vietnam' — chuẩn cao, tệp pro","Chốt tên group cuối cùng"],
 ["Mục tiêu","50.000 member / 6 tháng","⚠️ Cần ngân sách paid — nếu 0đ thì thực tế 12-18k"],
 ["Tệp KH","Production House, Agency, Game Studio, Brand, Freelancer pro",""],
 ["Đòn bẩy chính","Sự kiện 31/07 Sofitel → phễu group","Chốt % giảm vé + số credit bonus"],
 ["6 deliverable","1.Community Plan 2.Fanpage+Landing 3.Định giá+Sale 4.Event onsite 5.Research trend 6.Đóng gói","Xem các sheet chi tiết"],
 ["Ngân sách 6 tháng","KB tiết kiệm: ~15-25tr | KB đầy đủ đạt 50k: ~120-180tr","QUYẾT ĐỊNH lớn nhất"],
 ["Nhân sự tối thiểu","1 Lead + 2 Mod + 2 Content + Seeder + Designer","Tuyển/điều phối"],
]
for r in data: ws.append(r)
hstyle(ws,3,3); body(ws,4,3); setw(ws,[20,60,42])
for r in range(4,4+len(data)-1): ws.row_dimensions[r].height=34

# ============ SHEET 1: MASTER ACTION PLAN ============
ws=wb.create_sheet("1. Master Action Plan")
ws["A1"]="MASTER ACTION PLAN — 18 ĐẦU VIỆC"; ws["A1"].font=TITLE; ws.merge_cells("A1:I1")
hdr=["STT","Giai đoạn","Hạng mục","Action cụ thể","Output nộp gì","PIC","Deadline","KPI","Chi phí"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
rows=[
 ["1","T1 Nền móng","Bộ nhận diện","Thiết kế logo, cover, khung avatar, 5 template bài","File AI/PNG + Canva link","Designer","Tuần 1","5 template duyệt","1-2tr / 0đ tự làm"],
 ["2","T1 Nền móng","Setup group","Tạo group, mô tả, 3 câu hỏi duyệt, bật duyệt bài, ghim 3 bài","Group live + screenshot","Lead","Tuần 1","Setup 100%","0đ"],
 ["3","T1 Nền móng","10 bài seed","Đăng 10 bài đã viết sẵn (sheet 2)","10 post live","Content x2","Tuần 1-2","10 bài, >=5 cmt/bài","0đ"],
 ["4","T1 Nền móng","Founding members","DM 30-50 người tệp pro mời vào seed tương tác","Bảng 50 lời mời","Lead","Tuần 1-2",">=30 vào+cmt","0đ"],
 ["5","T1 Nền móng","Chatbot","Setup 6 kịch bản bot (sheet 4)","Bot live","Mod 1","Tuần 2","Reply <1 phút","0đ ManyChat"],
 ["6","T1 Nền móng","Đòn bẩy event","3 tầng mồi kéo người event 31/07","Report member event","Lead","20-31/07",">=1.500 member","gộp NS event"],
 ["7","T2 Kích hoạt","Ritual","4 ritual/tuần đều đặn","Lịch + link post","Mod x2","Cả T2","reply>30%","0đ"],
 ["8","T2 Kích hoạt","Khám video AI #1","Gọi nộp video, mời chuyên gia review","1 buổi + recap","Lead+KOL","Tuần 5",">=10 video,>=100cmt","0.5-2tr"],
 ["9","T2 Kích hoạt","KOL đợt 1","Chốt 3-5 KOL share","Deal+link","Lead","Tuần 5-6",">=3 KOL,+2.000","3-10tr"],
 ["10","T2 Kích hoạt","Booking chéo","Book 3-5 group cùng tệp","List+report","Booking","Cả T2","+2.000 member","3-8tr"],
 ["11","T3 Tăng tốc","Contest #1","Chạy cuộc thi (thể lệ sheet 5)","Landing+BGK","Lead","Tuần 9-12",">=50 bài,+5.000","credit Coco"],
 ["12","T3 Tăng tốc","Paid ads","Ads Group Join tệp pro","Camp+report","Ads","Cả T3","CPR<5k,+5.000","10-20tr/th"],
 ["13","T3 Tăng tốc","Tài liệu viral","2 bộ tài liệu tải nhiều","2 file gated","Content","Tuần 9",">=1.000 tải","0đ"],
 ["14","T4 Nhân rộng","Workshop online","1 workshop/tháng có speaker","Landing+recording","Lead","T4",">=200 đăng ký","2-5tr"],
 ["15","T4 Nhân rộng","Ambassador","Chọn 10-20 power-user, badge+quyền lợi","List+policy","Lead","T4",">=10 active","credit+swag"],
 ["16","T5 Cộng hưởng","Talkshow offline","Buổi offline 30-50 người","Kịch bản+ảnh","All","T5","+3.000 member","10-20tr"],
 ["17","T6 Về đích","Contest #2","Cuộc thi lớn + paid cuối kỳ","Thể lệ+report","All","T6","Đạt 50.000","giải+15-25tr"],
 ["18","T6 Về đích","Chuẩn bị monetize","Đóng gói lead warm → sale gói Coco","List lead+kịch bản","Lead","T6",">=200 lead","0đ"],
]
for r in rows: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[5,13,15,34,22,12,11,20,16])
ws.row_dimensions[3].height=30
for r in range(4,4+len(rows)): ws.row_dimensions[r].height=48

# ============ SHEET 2: 10 BÀI SEED (FULL CONTENT) ============
ws=wb.create_sheet("2. 10 bài seed (full)")
ws["A1"]="10 BÀI SEED — NỘI DUNG ĐẦY ĐỦ, COPY-PASTE ĐĂNG NGAY"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
hdr=["#","Kênh / Phễu","Tiêu đề","NỘI DUNG ĐẦY ĐỦ (copy-paste)","CTA + Visual"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
posts=[
 ["1","Group / Thông báo","Welcome + Rules (GHIM)",
  "Chào mừng bạn đến với AI Video Creators Vietnam 👋\n\nĐây không phải nơi khoe 'AI sắp thay thế loài người'. Đây là chỗ của những người THẬT SỰ dùng AI để ra sản phẩm — marketer, editor, production house, agency, freelancer, chủ brand.\n\nTiêu chuẩn của group: chất lượng trước, số lượng sau. Bạn sẽ thấy:\n🎬 'Khám video AI' — chuyên gia review video bạn làm\n📂 Template, prompt, source dùng được ngay\n🧠 Case thật: làm TVC, video game, content brand bằng AI\n\nNỘI QUY:\n✅ Chia sẻ quá trình + prompt thật, hỏi cụ thể, góp ý có dẫn chứng\n❌ Không spam link bán, không tài khoản lậu/crack, không vi phạm bản quyền\n\nBắt đầu: comment bạn đang làm gì với AI Video + 1 thứ muốn giỏi hơn trong 3 tháng tới.",
  "CTA: Comment giới thiệu | Visual: Cover brand"],
 ["2","Fanpage / Lạnh","Vì sao 90% video AI trông 'giả'",
  "Ai từng render một cảnh nhân vật bằng AI đều gặp: mặt 'trôi' giữa các frame, tay 6 ngón, chuyển động như trượt băng. Không phải AI kém — phần lớn do brief sai từ đầu.\n\n3 lỗi hay gặp nhất:\n1. Nhồi quá nhiều vào 1 prompt. Một cảnh = 1 chủ thể + 1 hành động + 1 hướng máy.\n2. Bỏ quên continuity. Đổi mặt giữa 2 cảnh là do không khóa seed. Nền tảng thuần seed như Seedance giữ nhất quán nhân vật rất tốt cho TVC.\n3. Coi camera là phụ. 'Dolly in chậm', 'orbit 90 độ' — ghi rõ ngôn ngữ máy quay thì mới ra chất điện ảnh.\n\n👉 Bạn kẹt ở lỗi nào nhất? Comment để tụi mình mổ bài tới.",
  "CTA: Comment lỗi bạn kẹt | Visual: 3 ảnh minh hoạ"],
 ["3","Group / Lạnh","Đố vui: AI hay quay thật?",
  "Nhìn nhanh 4 clip dưới đây 👇 Đâu là AI, đâu là quay thật?\n\nComment đáp án theo thứ tự (VD: 1-AI, 2-Thật...). Ai đúng hết tụi mình tặng bộ 20 prompt Seedance TVC-ready.\n\nGợi ý: để ý ánh sáng phản chiếu trong mắt và chuyển động của tóc — đó là chỗ AI hay lộ nhất.",
  "CTA: Vote+đoán | Visual: 4 clip so sánh"],
 ["4","Group / Ấm","Khám video AI — Số 0: Kêu gọi nộp bài",
  "Ra mắt chuyên mục 🎬 KHÁM VIDEO AI.\n\nCách chơi: bạn gửi 1 video AI mình làm → chuyên gia (đạo diễn/VFX/creator) sẽ xem trực tiếp, chỉ ra 3 điểm được và 3 điểm cần sửa. Học nhanh nhất là được người giỏi soi bài của chính mình.\n\nSố đầu tiên tuần sau. Nộp bài qua form [link] kèm: video + prompt bạn dùng + bạn muốn được góp ý ở đâu.\n\nKhông sợ bị chê — sợ nhất là làm mãi không ai chỉ chỗ sai.",
  "CTA: Nộp video qua form | Visual: Banner ritual"],
 ["5","Fanpage / Ấm","TVC 15s, 3 bản, 48h — bài toán agency",
  "Client giờ không hỏi 'đẹp không'. Họ hỏi: bao nhiêu, bao lâu, có xuất hóa đơn không.\n\nCách cũ: thuê ê-kíp, quay, hậu kỳ — vài chục triệu, vài tuần cho 1 concept. A/B test 3 hướng? Nhân 3 chi phí.\n\nAI Video đổi luật: cùng 1 brief, ra 3-5 hướng hình trong 1 buổi để client chọn. Nhưng để DÙNG ĐƯỢC cho khách doanh nghiệp, cần 3 thứ bản free không có:\n• Nhất quán thương hiệu qua cả campaign\n• Hóa đơn VAT (không có thì kế toán khách không nghiệm thu)\n• Bản quyền & eKYC khuôn mặt\n\n👉 Agency/brand bạn vướng nhất ở đâu — chất lượng, chi phí, hay pháp lý?",
  "CTA: Comment khâu vướng | Visual: 1 ảnh hero"],
 ["6","Group / Nóng","Chợ Phiên #1 (có duyệt)",
  "Thứ 6 hàng tuần = CHỢ PHIÊN — chỗ DUY NHẤT trong group được đăng bán dịch vụ / tuyển người / tìm job.\n\nĐăng theo mẫu:\n[LOẠI: Bán dịch vụ / Tuyển / Tìm job]\n[Bạn làm gì]\n[Kèm 1 sản phẩm mẫu]\n[Liên hệ]\n\nCác ngày khác đăng bán sẽ bị gỡ. Giữ group sạch để ai cũng muốn ở lại.",
  "CTA: Comment theo mẫu | Visual: Template khung"],
 ["7","Group / Lạnh","Trend Radar tuần này",
  "3 xu hướng video AI đang hot tuần này 👇\n1. [Trend A] — ứng dụng vào... (kèm prompt mẫu)\n2. [Trend B] — ...\n3. [Trend C] — ...\n\nLưu bài lại, thử 1 prompt và khoe kết quả bên dưới. Tuần sau tụi mình cập nhật tiếp.\n\n(Cập nhật thực tế mỗi tuần theo trend nóng nhất)",
  "CTA: Lưu+thử prompt | Visual: 3 ảnh trend"],
 ["8","Fanpage / Lạnh","Còn 3 ngày! Mã giảm vé event",
  "🎬 Còn 3 ngày đến sự kiện AI Video chuẩn sản xuất thương mại đầu tiên tại Việt Nam (31/07, Sofitel Saigon Plaza).\n\nĐạo diễn – nhà sản xuất phim thật, showcase thật, cách đưa AI Video lên sóng TVC đúng luật.\n\n👉 Vào Group AI Video Creators Vietnam [link] nhận MÃ GIẢM VÉ + bộ tài liệu Pro Kit. Số lượng mã có hạn.",
  "CTA: Vào group nhận mã | Visual: Poster event"],
 ["9","Group / Ấm","Tặng bộ AI Video Pro Kit",
  "📂 Tặng cả nhà bộ AI VIDEO PRO KIT:\n• 20 prompt Seedance làm TVC\n• Checklist brief video thương mại\n• Bảng giữ nhất quán nhân vật xuyên cảnh\n\nĐây cũng là bộ tụi mình dùng để mổ bài trong 'Khám video AI'. Tải ở bài ghim 👆\n\nAi muốn tụi mình soi video của bạn — comment bên dưới.",
  "CTA: Tải+comment | Visual: Ảnh Pro Kit"],
 ["10","Group / Ấm","Case thật: làm TVC bằng AI ra sao",
  "Chia sẻ 1 case thật: từ brief của khách → 3 hướng hình → chốt 1 → ra file cuối, mất bao lâu và vướng gì.\n\n[Kể quy trình từng bước, kèm ảnh từng giai đoạn]\n\nĐiều bất ngờ nhất: khâu tốn thời gian nhất không phải render, mà là brief cho đúng ý khách.\n\nBạn từng làm job AI Video cho khách chưa? Kể chỗ khó nhất bên dưới.",
  "CTA: Kể case của bạn | Visual: Ảnh quy trình"],
]
for r in posts: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[4,16,26,80,26])
ws.row_dimensions[3].height=28
for r in range(4,4+len(posts)): ws.row_dimensions[r].height=150

# ============ SHEET 3: CONTENT CALENDAR 4 TUẦN ============
ws=wb.create_sheet("3. Content Calendar 4 tuần")
ws["A1"]="CONTENT CALENDAR — 4 TUẦN ĐẦU (từng bài, từng ngày)"; ws["A1"].font=TITLE; ws.merge_cells("A1:H1")
hdr=["Ngày","Kênh","Phễu","Pillar","Định dạng","Tiêu đề/Angle","CTA","PIC"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
cal=[
 ["-- TUẦN 1 --","","","","","","",""],
 ["T2 21/07","Group","-","Thông báo","Text+ảnh","Welcome+Rules (ghim)","Comment giới thiệu","Lead"],
 ["T2 21/07","Fanpage","Lạnh","Technical","Carousel","Vì sao 90% video AI 'giả'","Comment lỗi bạn kẹt","Content"],
 ["T3 22/07","Group","Lạnh","Giải trí","Poll","Đố vui AI hay thật","Vote+đoán","Mod 1"],
 ["T4 23/07","Group","Ấm","Khám video AI","Video+text","Số 0: kêu gọi nộp bài","Nộp qua form","Lead"],
 ["T5 24/07","Fanpage","Ấm","Business","Text dài","TVC 15s 3 bản 48h","Comment khâu vướng","Content"],
 ["T6 25/07","Group","Nóng","Chợ Phiên","Text","Chợ Phiên #1","Comment theo mẫu","Mod 2"],
 ["CN 27/07","Group","Lạnh","Trend Radar","Carousel","Trend Radar tuần","Lưu+thử prompt","Content"],
 ["-- TUẦN 2 (EVENT) --","","","","","","",""],
 ["T2 28/07","Fanpage","Lạnh","Event","Countdown","Còn 3 ngày! Mã giảm vé","Vào group nhận mã","Lead"],
 ["T3 29/07","Group","Ấm","Kiến thức","Text","Case thật làm TVC bằng AI","Kể case của bạn","Content"],
 ["T4 30/07","Group","Ấm","Event","Text","Tối mai sự kiện — tài liệu chỉ trong group","React+comment","Content"],
 ["T5 31/07","Group","Nóng","Event LIVE","Ảnh live","Live không khí (KHÔNG showcase độc quyền)","Điểm danh","Mod onsite"],
 ["T7 01/08","Fanpage","Ấm","Recap","Album","Recap sự kiện → nhận tài liệu group","Vào group nhận slide","Content"],
 ["CN 03/08","Group","Ấm","Khám video AI","Video","Số 1: review 5 video member","Nộp bài số sau","Lead+KOL"],
 ["-- TUẦN 3 --","","","","","","",""],
 ["T2 04/08","Group","Ấm","Kiến thức","Carousel","5 lỗi ánh sáng khi làm video AI","Lưu bài","Content"],
 ["T3 05/08","Fanpage","Lạnh","Technical","Video","Demo: 1 prompt → 5 phong cách","Bạn thích style nào","Content"],
 ["T4 06/08","Group","Ấm","Khám video AI","Video","Số 2","Nộp bài","Lead+KOL"],
 ["T5 07/08","Group","Lạnh","Giải trí","Poll","Prompt battle: bản nào đẹp hơn","Vote","Mod 1"],
 ["T6 08/08","Group","Nóng","Chợ Phiên","Text","Chợ Phiên #3","Comment mẫu","Mod 2"],
 ["CN 10/08","Group","Lạnh","Trend Radar","Carousel","Trend Radar","Thử prompt","Content"],
 ["-- TUẦN 4 --","","","","","","",""],
 ["T2 11/08","Fanpage","Ấm","Business","Text","Vì sao brand cần VAT+eKYC khi làm AI Video","Comment","Content"],
 ["T3 12/08","Group","Ấm","Kiến thức","Text","Workflow từ brief → file cuối","Hỏi đáp","Content"],
 ["T4 13/08","Group","Ấm","Khám video AI","Video","Số 3","Nộp bài","Lead+KOL"],
 ["T5 14/08","Group","Nóng","Activation","Text","Teaser Contest #1 sắp mở","Đăng ký nhận tin","Lead"],
 ["T6 15/08","Group","Nóng","Chợ Phiên","Text","Chợ Phiên #4","Comment mẫu","Mod 2"],
 ["CN 17/08","Group","Lạnh","Trend Radar","Carousel","Trend Radar","Thử prompt","Content"],
]
for r in cal: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[16,10,8,14,12,38,20,10])
# highlight section rows
for i,r in enumerate(cal):
    if str(r[0]).startswith("--"):
        rr=4+i
        for c in range(1,9):
            ws.cell(row=rr,column=c).fill=PatternFill("solid",fgColor="D6E4F0")
            ws.cell(row=rr,column=c).font=SUB
ws.append([]); n=ws.max_row+1
ws.cell(row=n,column=1,value="Tần suất: BQT 2 + Seeding 2 bài/ngày. Giờ vàng: 11-12h, 19-21h. Từ tuần 5 lặp cấu trúc, thay angle theo Trend Radar & kết quả.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=8)

# ============ SHEET 4: KỊCH BẢN BOT ============
ws=wb.create_sheet("4. Kịch bản Bot")
ws["A1"]="KỊCH BẢN CHATBOT / AUTO-REPLY — TỪNG TIN NHẮN"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Trigger (khi nào)","Tin nhắn bot gửi (nguyên văn)","Nút bấm / Hành động","Mục tiêu"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
bot=[
 ["Member được duyệt vào group",
  "Chào [Tên] 👋 Mừng bạn gia nhập AI Video Creators Vietnam!\nMình gửi bạn 3 thứ để bắt đầu:\n1️⃣ Bộ AI Video Pro Kit (20 prompt + checklist)\n2️⃣ Mã giảm vé sự kiện 31/07\n3️⃣ Link bài 'Start Here'\nBạn muốn nhận cái nào trước?",
  "[Nhận Pro Kit] [Nhận mã vé] [Start Here]","Kích hoạt 24h đầu"],
 ["Bấm 'Nhận Pro Kit'",
  "Đây nhé 📂 [link tải Pro Kit]\nTip: mở file '20 prompt Seedance' và thử ngay 1 cái, rồi khoe kết quả trong group — tụi mình sẽ góp ý cho bạn.",
  "[Đã tải] [Xem Khám video AI]","Tạo hành động đầu tiên"],
 ["Bấm 'Nhận mã vé'",
  "Mã giảm [X]% vé sự kiện của bạn: COCO[XXXX] 🎟️\nĐặt vé tại [link Quickom]. Vé Silver trở lên có kèm Coco Credits để tạo video thật với Seedance.\nHẹn gặp bạn ở Sofitel ngày 31/07!",
  "[Đặt vé ngay]","Chuyển đổi vé"],
 ["Member đăng bài đầu tiên",
  "🎉 Bài đầu tiên của bạn trong group! Cảm ơn [Tên] đã chia sẻ. Anh/em trong group sẽ vào góp ý sớm. Cứ hỏi thoải mái nhé.",
  "-","Củng cố hành vi"],
 ["Sau sự kiện (khách đã check-in)",
  "Cảm ơn bạn đã đến sự kiện hôm nay 🙌 Slide + tài liệu độc quyền của buổi đã được đăng trong group tại [link ghim]. Số 'Khám video AI' đầu tiên mở tuần sau — giữ suất bằng cách comment video bạn muốn được review.",
  "[Xem tài liệu] [Giữ suất review]","Nurture hậu event"],
 ["Member im lặng 14 ngày",
  "Lâu rồi không thấy bạn 👀 Tuần này group có [chủ đề hot] và số Khám video AI mới. Ghé xem thử nhé: [link]. Có gì đang kẹt cứ đăng lên, tụi mình gỡ cùng.",
  "[Xem ngay]","Chống lurker/churn"],
]
for r in bot: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[26,58,26,18])
for r in range(4,4+len(bot)): ws.row_dimensions[r].height=110

# ============ SHEET 5: THỂ LỆ CONTEST ============
ws=wb.create_sheet("5. Thể lệ Contest #1")
ws["A1"]="THỂ LỆ CUỘC THI #1 — 'AI VIDEO SHOWCASE'"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Hạng mục","Chi tiết","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
con=[
 ["Tên cuộc thi","AI Video Showcase — Làm video thương mại bằng Coco Studio","Có thể đổi tên"],
 ["Mục tiêu","Tạo UGC chất lượng + kéo member + demo năng lực Seedance","+5.000 member"],
 ["Thời gian","Tuần 9 mở — Tuần 12 trao giải (4 tuần)","Trùng giai đoạn T3"],
 ["Đối tượng","Thành viên group, mọi trình độ","Chia 2 bảng: Pro & Newbie"],
 ["Đề bài","Làm 1 video 15-30s theo brief giả định (VD: TVC nước hoa / trailer game / video brand)","3 đề chọn 1"],
 ["Yêu cầu bài dự thi","Video + prompt đã dùng + mô tả quy trình. Đăng công khai trong group, hashtag #AIVideoShowcase","Bắt buộc dùng Coco/Seedance"],
 ["Tiêu chí chấm (100đ)","Ý tưởng 30 / Kỹ thuật (nhất quán, camera, ánh sáng) 40 / Tính ứng dụng thương mại 30","BGK chấm"],
 ["BGK","2-3 chuyên gia/KOL + đại diện Coco","Mời từ KOL list"],
 ["Cơ cấu giải","Nhất: gói credit lớn + spotlight + suất mentor\nNhì: credit vừa\nBa: credit nhỏ\nBài được yêu thích (vote): quà riêng","Giải = credit Coco quy đổi"],
 ["Cách chọn thắng","70% điểm BGK + 30% tương tác (react+comment hợp lệ)","Chống gian lận vote"],
 ["Lan tỏa","Bài dự thi = seeding tự nhiên; recap top bài đăng Fanpage","Đòn bẩy viral"],
 ["Chi phí","Chủ yếu credit nội bộ + quà nhẹ","Rẻ, hiệu quả cao"],
]
for r in con: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[22,66,22])
for r in range(4,4+len(con)): ws.row_dimensions[r].height=48

wb.save("KE HOACH COCO - CHI TIET (pitch) v2.xlsx")
print("SAVED v2"); print(wb.sheetnames)

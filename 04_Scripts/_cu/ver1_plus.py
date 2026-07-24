# -*- coding: utf-8 -*-
# VER1-PLUS: nâng cấp bằng khung JOBVUI (group 552k member thành công thật)
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb=openpyxl.Workbook()
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="1F6F3D")  # xanh lá đậm
SUB=Font(bold=True,color="1F6F3D",size=11); TITLE=Font(bold=True,size=14,color="1F6F3D")
GOLD=PatternFill("solid",fgColor="FFF2CC"); GREEN=PatternFill("solid",fgColor="E2EFDA")
WRAP=Alignment(wrap_text=True,vertical="top"); CENTER=Alignment(horizontal="center",vertical="center",wrap_text=True)
thin=Side(style="thin",color="BBBBBB"); BORDER=Border(left=thin,right=thin,top=thin,bottom=thin)
RED=Font(italic=True,color="C00000")
def hstyle(ws,row,ncol):
    for c in range(1,ncol+1):
        x=ws.cell(row=row,column=c); x.font=H; x.fill=HFILL; x.alignment=CENTER; x.border=BORDER
def body(ws,start,ncol):
    for r in ws.iter_rows(min_row=start,max_col=ncol):
        for c in r: c.alignment=WRAP; c.border=BORDER
def setw(ws,w):
    for i,v in enumerate(w,1): ws.column_dimensions[get_column_letter(i)].width=v

# ==== 0. CONCEPT (học JOBVUI: sứ mệnh/đối tượng/tầm nhìn/concept/tone) ====
ws=wb.active; ws.title="0. Concept"
ws["A1"]="CONCEPT CỘNG ĐỒNG — KHUNG CHUẨN JOBVUI (552k member)"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
ws.append([]); ws.append(["Hạng mục","Nội dung cho Coco","Ghi chú vận dụng"]); hstyle(ws,3,3)
cc=[
 ["Sứ mệnh","Giúp người làm nghề sáng tạo tại VN đưa AI Video vào sản phẩm THƯƠNG MẠI THẬT — nhanh hơn, rẻ hơn, đúng luật hơn. Không phải chỗ vọc AI cho vui, mà là nơi biến AI thành công cụ kiếm tiền.","Trả lời 'vì sao group tồn tại'"],
 ["Đối tượng","Người làm sản xuất/quảng cáo 24-45t: editor, motion, production house, agency owner, marketer, freelancer pro. Có nhu cầu thương mại hóa video AI cho khách/DN.","Nhân khẩu + hành vi + nhu cầu"],
 ["Tầm nhìn","Trở thành cộng đồng AI Video chuyên nghiệp lớn & chất nhất VN — nơi brand/agency tìm người, người làm nghề tìm cơ hội, và chuẩn ngành được thiết lập.","Điểm đến dài hạn"],
 ["Concept (ẩn dụ)","'XƯỞNG PHIM AI' — Admin = Đạo diễn (dẫn dắt), Mod = Trợ lý đạo diễn, Chuyên gia = Nhà sản xuất, Member = Ê-kíp/Creator. Mỗi bài đăng = một 'cảnh quay'. Học JOBVUI dùng ẩn dụ 'khu phố' để tạo bản sắc.","Tạo văn hóa nhất quán"],
 ["Tone & mood","Tone: chuyên nghiệp nhưng gần gũi, nói chuyện nghề thẳng thắn, tôn trọng chất xám. Mood: 'ở đây người giỏi thật chịu ngồi soi bài cho nhau'. Không khoe mẽ, không hô khẩu hiệu.","Giữ nhất quán mọi bài"],
 ["Content direction","5 pillar: Cơ hội & case thực chiến (30%) · Kiến thức kỹ thuật (25%) · Xu hướng AI (20%) · Tương tác/giải trí nghề (15%) · Thương hiệu/sự kiện (10%).","Đường ray nội dung"],
]
for r in cc: ws.append(r)
body(ws,4,3); setw(ws,[18,70,26])
for r in range(4,4+len(cc)): ws.row_dimensions[r].height=72

# ==== 1. MASTER FRAMEWORK (SOW kiểu JOBVUI) ====
ws=wb.create_sheet("1. Master Framework")
ws["A1"]="MASTER FRAMEWORK — SOW THEO THÁNG (khung JOBVUI)"; ws["A1"].font=TITLE; ws.merge_cells("A1:G1")
hdr=["Hạng mục","Đơn vị","Đơn giá (đ)","T1","T2","T3","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,7)
mf=[
 ["I. COMMUNITY MANAGEMENT","","","","","",""],
 ["KPI Member growth","Member","-","2.000","8.000","18.000","Lũy kế"],
 ["Community Post (BQT)","Post","-","60","60","60","~2 bài/ngày"],
 ["Seeding Post","Post","-","60","60","60","~2 bài/ngày"],
 ["Monthly Report","Report","-","1","1","1",""],
 ["II. ACTIVITIES - INBOUND","","","","","",""],
 ["Thought Leader (chuyên gia thường trực)","Người/th","500.000-3.000.000","2","3","3","Chia sẻ định kỳ trong group"],
 ["Khám video AI (ritual)","Buổi","500.000-2.000.000","2","4","4","Mồi tương tác #1"],
 ["Minigame","Item","2.000.000","1","1","1","2 tháng/lần tối thiểu"],
 ["Talkshow/Workshop","Item","-","0","1","1",""],
 ["III. ACTIVITIES - OUTBOUND","","","","","",""],
 ["KOL/KOC booking","Post","3.000.000-7.000.000","0","3","2","Đợt 1-2"],
 ["Group booking (chéo tệp)","Post","3.000.000-5.000.000","0","3","2","Group cùng tệp"],
 ["TikTok seeding","Post","-","0","3","6","Đa nền tảng"],
 ["Paid ads","Item","tùy KB","tùy","tùy","tùy","Chỉ VER2/VER3"],
]
for r in mf: ws.append(r)
body(ws,4,7); setw(ws,[34,12,20,10,10,10,22])
for i,r in enumerate(mf):
    if r[0].startswith(("I.","II.","III.")):
        rr=4+i
        for c in range(1,8): ws.cell(row=rr,column=c).fill=GREEN; ws.cell(row=rr,column=c).font=SUB
for r in range(4,4+len(mf)): ws.row_dimensions[r].height=30

# ==== 2. KPI CHUẨN (10 chỉ số JOBVUI + benchmark) ====
ws=wb.create_sheet("2. KPI chuẩn cộng đồng")
ws["A1"]="KPI CHUẨN — 10 CHỈ SỐ JOBVUI DÙNG (có công thức + cách lấy)"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
hdr=["Chỉ số","Định nghĩa","Cách tính / lấy số","Ý nghĩa","Mục tiêu Coco"]
ws.append([]); ws.append(hdr); hstyle(ws,3,5)
kp=[
 ["Tổng tương tác","Like+love+haha+wow+share+comment mọi bài","Cộng từ FB Insights","Group sôi nổi không","Tăng đều/tháng"],
 ["Reach","Số người thấy nội dung","FB Insights","Khả năng lan tỏa","Reach/post >4.000"],
 ["Member growth","Member mới/khoảng thời gian","Tự động trong group","Sức hút cộng đồng","Theo lộ trình VER"],
 ["Total member","Tổng thành viên hiện tại","Header group","Độ lớn (không=chất)","Theo mục tiêu VER"],
 ["Total post","Số bài/khoảng thời gian","Cào tay/FB","Năng suất nội dung",">120 bài/tháng"],
 ["Total Creators","Số member khác nhau đăng bài","FB Insights","Cộng đồng tự sống chưa","Tăng đều, >50/th"],
 ["Action","Số hoạt động (game/talk/ws/event)","Tự thống kê","Gắn kết thật","≥4/tháng"],
 ["Doanh thu","Tiền từ booking/event/tài trợ/sale","Excel/CRM nội bộ","Chuyển đổi ra tiền","Xem sheet Doanh thu"],
 ["Reach/post","Tổng reach / tổng bài","Phép chia","Hiệu suất lan tỏa/bài",">4.000"],
 ["Tương tác/post","Tổng tương tác / tổng bài","Phép chia","Chất lượng nội dung",">300 (JOBVUI đạt 500+)"],
]
for r in kp: ws.append(r)
body(ws,4,5); setw(ws,[18,32,24,26,20])
for r in range(4,4+len(kp)): ws.row_dimensions[r].height=40
n=ws.max_row+2
ws.cell(row=n,column=1,value="BENCHMARK JOBVUI (tham chiếu): 552k member, Reach/post ~4.200, Tương tác/post 145-320 (đỉnh 500+ khi tối ưu), Doanh thu 490tr/6th. Coco tệp NGÁCH hơn (pro) nên member ít hơn nhưng tương tác/post & doanh thu/member CAO hơn là mục tiêu.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=5)

# ==== 3. 6 KÊNH TĂNG TRƯỞNG MEMBER (JOBVUI) ====
ws=wb.create_sheet("3. 6 Kênh tăng member")
ws["A1"]="6 KÊNH TĂNG TRƯỞNG MEMBER — PHÂN TÍCH HÀNH VI (khung JOBVUI)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Kênh","Điều kiện cần để có kênh này","Hoạt động Coco cần làm","Tác động"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
ch=[
 ["MEMBER BỊ ĐỘNG (đúng tệp, chưa đi tìm group)","","",""],
 ["K1: FB cá nhân của member share","Có quà/lợi ích khi member share; nội dung đủ hay để họ muốn khoe","5% bài có CTA share; minigame 2th/lần; tài liệu tặng","Cao"],
 ["K2: FB đề xuất do group chất","Nội dung tương tác cao, đăng đều >7 bài/ngày, member mới post nhiều","Tối ưu SEO group >90% tiêu chí; đăng đều; seed tương tác","Cao"],
 ["K3: KOL/kênh khác giới thiệu","Nội dung hay tới mức bị copy ghi nguồn; group thật sự giá trị","Sản xuất nội dung độc quyền; deal KOL nhắc group","Cao"],
 ["K4: Chạy quảng cáo","Có bài xịn trong group để boost; có page riêng CTA về group","Tạo nội dung chạy ads; page cộng đồng; ngân sách","TB-Cao (VER2)"],
 ["K5: Nền tảng khác nhắc tới","Mod seeding đa nền tảng; nội dung đủ big để KOL ngách mang đi","Seeding TikTok/Thread/LinkedIn; toplist","TB"],
 ["K6: FB đề xuất khi member tương tác","Nội dung hữu ích, tương tác sôi nổi → bạn bè họ thấy","Nội dung kích cmt/share có giá trị","Cao"],
 ["MEMBER CHỦ ĐỘNG (đúng tệp, đang tìm group AI Video)","","",""],
 ["K7: FB đề xuất group liên quan","Tối ưu SEO group; vào group AI khác được đề xuất Coco","SEO tên+mô tả+từ khóa group","Cao"],
 ["K8: Gõ tìm kiếm trực tiếp","Group real hiện đầu ô tìm kiếm; nội dung giá trị, đều, tương tác cao","Tối ưu SEO; gỡ gậy vi phạm; tên dễ tìm","Cao"],
]
for r in ch: ws.append(r)
body(ws,4,4); setw(ws,[30,34,34,14])
for i,r in enumerate(ch):
    if r[0].startswith("MEMBER"):
        rr=4+i
        for c in range(1,5): ws.cell(row=rr,column=c).fill=GREEN; ws.cell(row=rr,column=c).font=SUB
for r in range(4,4+len(ch)): ws.row_dimensions[r].height=44

# ==== 4. CHECKLIST SEO GROUP ====
ws=wb.create_sheet("4. Checklist SEO Group")
ws["A1"]="CHECKLIST TỐI ƯU GROUP ĐỂ FB ĐỀ XUẤT (rút từ JOBVUI)"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Hạng mục","Chi tiết cần làm","Tác động"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
seo=[
 ["Tên group","Chứa từ khóa 'AI Video' + 'Vietnam' để hiện khi tìm kiếm","Cao"],
 ["Mô tả group","Rõ đối tượng, giá trị, từ khóa ngành","Cao"],
 ["Tần suất","Đăng tối thiểu 7 bài/ngày (BQT+seed+member)","Cao"],
 ["Gắn thẻ tag","≥50% bài viết được gắn thẻ chủ đề","TB"],
 ["Câu hỏi duyệt","3 câu lọc đúng tệp + thu insight","Cao"],
 ["Quy tắc rõ","Rules ghim, duyệt bài bật giai đoạn đầu","Cao"],
 ["CTA share","5% bài có kêu gọi share về trang cá nhân","Cao"],
 ["Member mới post","Onboarding đẩy member post trong 7 ngày","Cao"],
 ["Không vi phạm","Tránh spam link, nội dung bẩn → không bị gậy","Cao"],
 ["Đa nền tảng","Seeding TikTok/Thread/LinkedIn trỏ về group","TB"],
]
for r in seo: ws.append(r)
body(ws,4,3); setw(ws,[22,56,14])
for r in range(4,4+len(seo)): ws.row_dimensions[r].height=30

# ==== 5. DOANH THU CỘNG ĐỒNG (JOBVUI 490tr) ====
ws=wb.create_sheet("5. Doanh thu cộng đồng")
ws["A1"]="DOANH THU TỪ CỘNG ĐỒNG — CÁCH JOBVUI KIẾM 490TR/6TH (áp cho Coco)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Nguồn doanh thu","JOBVUI làm thế nào","Coco áp dụng ra sao","Tiềm năng"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
rev=[
 ["Booking content/event","Brand trả tiền để xuất hiện trong cộng đồng (70tr/th)","Brand/tool AI khác booking bài; Coco tự bán gói qua demo","Cao"],
 ["Bán gói sản phẩm","-","Bán gói Coco Silver→Titan cho member (thế mạnh riêng Coco)","RẤT CAO"],
 ["Đăng bài tuyển/dịch vụ","Thu phí bài tuyển dụng (10-15tr/th)","Phí Chợ Phiên: brand tuyển editor AI, agency tìm freelancer","TB"],
 ["Webinar/workshop thu phí","Sự kiện nội bộ (50tr/đợt)","Masterclass chuyên sâu (eKYC, pháp lý, nâng cao)","Cao"],
 ["Affiliate/hoa hồng","-","Chia hoa hồng khi member/KOL giới thiệu khách mua Coco","Cao"],
 ["Tài trợ (sponsor)","Nhãn hàng tài trợ hoạt động","BytePlus/đối tác tài trợ contest/event","TB"],
]
for r in rev: ws.append(r)
body(ws,4,4); setw(ws,[24,32,36,14])
for r in range(4,4+len(rev)): ws.row_dimensions[r].height=44
n=ws.max_row+2
ws.cell(row=n,column=1,value="KHÁC BIỆT COCO vs JOBVUI: JOBVUI kiếm tiền chủ yếu từ BOOKING (bán chỗ hiển thị). Coco có thêm nguồn mạnh hơn = BÁN CHÍNH SẢN PHẨM (gói credit) cho tệp doanh nghiệp. Doanh thu/member của Coco cao hơn nhiều vì tệp pro chi trả cao.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=4)

# ==== 6. PHÂN TÍCH ĐỐI THỦ THEO TUYẾN (bảng tick JOBVUI) ====
ws=wb.create_sheet("6. Đối thủ theo tuyến")
ws["A1"]="PHÂN TÍCH ĐỐI THỦ THEO TUYẾN NỘI DUNG (khung JOBVUI)"; ws["A1"].font=TITLE; ws.merge_cells("A1:F1")
hdr=["Tuyến nội dung","Tương tác","Độ khó","SDVN","Group AI khác","→ Coco nên?"]
ws.append([]); ws.append(hdr); hstyle(ws,3,6)
comp=[
 ["Update công nghệ AI Video mới (Seedance/Veo/Sora)","Cao","TB","Có","Có","✅ Làm mạnh"],
 ["Chia sẻ chuyên sâu kèm file (prompt/template/source)","Cao","Cao","Ít","Ít","✅ ĐIỂM KHÁC BIỆT"],
 ["Mẹo/tips nhanh dễ áp dụng","Cao","TB","Có","Có","✅ Làm đều"],
 ["Giới thiệu 1 tính năng chuyên sâu","TB","TB","Có","Ít","✅ Làm"],
 ["Tin thị trường/nghề: AI ảnh hưởng công việc","Cao","Thấp","Ít","Không","✅ ĐỘC QUYỀN (tệp pro)"],
 ["Giải trí với AI","Cao","Thấp","Ít","Ít","⚠️ Ít thôi (giữ chuẩn cao)"],
 ["So sánh các AI, khi nào chọn cái nào","Cao","TB","Ít","Ít","✅ Làm (Coco có data)"],
 ["Chia sẻ về Prompt","TB","Thấp","Có","Có","✅ Làm (Pro Kit)"],
 ["Case thương mại thật (TVC/game/brand)","Cao","Cao","Không","Không","✅✅ VŨ KHÍ RIÊNG COCO"],
]
for r in comp: ws.append(r)
body(ws,4,6); setw(ws,[40,12,10,10,16,26])
for r in range(4,4+len(comp)): ws.row_dimensions[r].height=32
n=ws.max_row+2
ws.cell(row=n,column=1,value="CHIẾN LƯỢC KHOẢNG TRỐNG: các tuyến 'Cao tương tác + Cao khó' mà đối thủ NGẠI làm (chia sẻ kèm file, case thương mại thật) chính là hào của Coco — vì Coco có sản phẩm thật + tệp pro. Đánh mạnh vào đó.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=6)

# ==== 7. NHÂN SỰ CÓ KPI (JOBVUI) ====
ws=wb.create_sheet("7. Nhân sự có KPI")
ws["A1"]="CƠ CẤU NHÂN SỰ CÓ KPI ĐỊNH LƯỢNG (khung JOBVUI)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Role","KPI định lượng cụ thể","Lương gợi ý","Hoa hồng"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
hr=[
 ["Community Manager","Lên chiến lược; 15 bài/tháng đạt >500 tương tác & 20k reach; chịu KPI tổng","3-8tr","Từ doanh thu booking/sale"],
 ["Mod 1-2 (mỗi người)","25 bài/tháng đạt >300 tương tác & 20k reach; gồm 3 bài framework >1k tương tác/300 share","5-8tr","Từ hoạt động"],
 ["Content Creator","Viết bài chuyên sâu + visual; hỗ trợ mod đạt KPI","4-6tr","-"],
 ["Thought Leader (chuyên gia)","X bài/tháng đạt tương tác/reach cam kết tại group","500k-3tr","Spotlight + affiliate"],
 ["Seeder team (3-5 nick)","10-20 comment giá trị/ngày; share đa nền tảng","2-3tr/gói","-"],
 ["Designer","KV, cover, 5 template, visual theo bài","3-5tr freelance","-"],
 ["Ads (nếu VER2/3)","CPR<5k; tối ưu creative hàng tuần","6-10tr","% hiệu quả"],
]
for r in hr: ws.append(r)
body(ws,4,4); setw(ws,[22,52,16,24])
for r in range(4,4+len(hr)): ws.row_dimensions[r].height=48

# ==== 8. 10 BƯỚC RA HÀNG VẠN Ý TƯỞNG (Cocoon) ====
ws=wb.create_sheet("8. Quy trình ra ý tưởng")
ws["A1"]="QUY TRÌNH BIẾN 1 IDEA → HÀNG CHỤC CONTENT (khung Cocoon)"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Bước","Làm gì","Ví dụ với Coco"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
st=[
 ["1. Xác định Phễu-Direction-Pillar","Chọn phễu (lạnh/ấm/nóng) + hướng + tuyến","Phễu lạnh + Kiến thức + 'lỗi làm video AI'"],
 ["2. Idea sơ khởi","Câu title thô","'Vì sao video AI trông giả'"],
 ["3. Bối cảnh/hoàn cảnh","Đặt vào ngữ cảnh cụ thể của tệp","Editor giao khách bị trả bài"],
 ["4. Góc nhìn (angle)","Nhiều góc: cảnh báo/hướng dẫn/kể chuyện/so sánh","Góc 'tôi từng sai thế nào'"],
 ["5. Định dạng","Text/carousel/video/poll/livestream","Carousel 5 lỗi"],
 ["6. Hook","Câu mở 3 giây","'90% video AI trông giả vì...'"],
 ["7. Body","Triển khai giá trị chính","3 lỗi + cách sửa"],
 ["8. CTA","Kêu gọi hành động","'Comment lỗi bạn gặp'"],
 ["9. Biến thể","1 idea → nhiều định dạng/kênh","Fanpage carousel + Group text + TikTok short"],
 ["10. Tái sử dụng","Evergreen lặp lại sau 3-6 tháng","Cập nhật số liệu, đăng lại"],
]
for r in st: ws.append(r)
body(ws,4,3); setw(ws,[26,44,34])
for r in range(4,4+len(st)): ws.row_dimensions[r].height=32

wb.save("E:/CocoStudio_Plan/VER1_OrganicFirst/VER1_PLUS_KhungJOBVUI.xlsx")
print("VER1-PLUS done. Sheets:", len(wb.sheetnames))

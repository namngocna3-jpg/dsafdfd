# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb=openpyxl.Workbook()
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="C55A11")  # cam = event
SUB=Font(bold=True,color="C55A11",size=11); TITLE=Font(bold=True,size=14,color="C55A11")
GOLD=PatternFill("solid",fgColor="FFF2CC"); ORG=PatternFill("solid",fgColor="FCE4D6")
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

# 0. Chiến lược
ws=wb.active; ws.title="0. Chiến lược VER3"
ws["A1"]="VER 3 — EVENT-LED: LẤY SỰ KIỆN LÀM TRỤC KÉO CỘNG ĐỒNG & SALE"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
ws.append([]); ws.append(["Yếu tố","Cách làm VER3 (khác VER1 & VER2)","Ghi chú"]); hstyle(ws,3,3)
d=[
 ["Triết lý","Mỗi tháng 1 'moment' sự kiện (online/offline) làm đỉnh sóng → mỗi sóng kéo member+lead+sale cùng lúc.","Event = động cơ tăng trưởng"],
 ["Mục tiêu","30-40k member CHẤT + doanh thu sale sớm (event bán được ngay)","Cân bằng member & tiền"],
 ["Ngân sách","60-90 triệu (event + booking, ít ads hơn VER2)","Trung bình"],
 ["Trục chính","Event 31/07 → chuỗi workshop/talkshow/contest hàng tháng","Nhịp sự kiện đều"],
 ["Lợi thế","Event tạo uy tín + FOMO + lead chất; tận dụng speaker sẵn có","Khác biệt lớn nhất"],
 ["Rủi ro","Tổ chức event tốn sức, phụ thuộc speaker/địa điểm","Cần team event mạnh"],
 ["Khi nào chọn VER3","Peacom mạnh về tổ chức event + muốn bán gói Coco sớm qua event","KB tận dụng thế mạnh event"],
]
for r in d: ws.append(r)
body(ws,4,3); setw(ws,[20,64,26])
for r in range(4,4+len(d)): ws.row_dimensions[r].height=44

# 1. Lịch sự kiện 6 tháng
ws=wb.create_sheet("1. Lịch Event 6 tháng")
ws["A1"]="CHUỖI SỰ KIỆN 6 THÁNG — MỖI THÁNG 1 ĐỈNH SÓNG"; ws["A1"].font=TITLE; ws.merge_cells("A1:F1")
hdr=["Tháng","Sự kiện","Hình thức","Mục tiêu member","Mục tiêu sale","Đòn bẩy"]
ws.append([]); ws.append(hdr); hstyle(ws,3,6)
ev=[
 ["T1","AI Video Summit 31/07","Offline lớn (Sofitel)","+2.000","Bán vé Gold+demo Coco","Speaker quốc tế, showcase"],
 ["T2","Workshop 'Từ prompt đến TVC'","Online (Zoom/FB Live)","+4.000","Trial credit → gói","KOL dạy, member thực hành"],
 ["T3","Contest 'AI Video Showcase' + Gala","Online contest + live trao giải","+8.000","Upsell người thi","Giải credit lớn, viral"],
 ["T4","Talkshow 'AI trong quảng cáo Game'","Offline nhỏ (30-50)","+5.000","Deal brand/agency","Case game studio"],
 ["T5","Masterclass eKYC & Bản quyền","Online chuyên sâu","+4.000","Bán gói Titan/Enterprise","USP pháp lý"],
 ["T6","Year-end Creator Awards","Offline + livestream","+7.000","Chốt hợp đồng năm","Vinh danh, PR lớn"],
]
for r in ev: ws.append(r)
body(ws,4,6); setw(ws,[8,28,22,16,22,24])
for r in range(4,4+len(ev)): ws.row_dimensions[r].height=48

# 2. Anatomy 1 event (playbook lặp)
ws=wb.create_sheet("2. Event Playbook")
ws["A1"]="PLAYBOOK 1 SỰ KIỆN — QUY TRÌNH LẶP LẠI (Pre-During-Post)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Giai đoạn","Việc làm","Kéo member thế nào","Kéo sale thế nào"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
pb=[
 ["PRE (2 tuần)","Landing đăng ký, teaser speaker, mồi vé/tài liệu, seeding","Join group nhận ưu đãi/tài liệu","Form đăng ký lọc lead theo nhu cầu"],
 ["DURING","Livestream/onsite, tương tác, QR group, demo sản phẩm","QR + tài liệu độc quyền chỉ trong group","Demo Coco live + offer giới hạn trong event"],
 ["POST (1 tuần)","Recap, tài liệu, mở Khám video AI, follow-up lead","Người dự → member active","Inbox lead nóng, gửi báo giá+trial"],
]
for r in pb: ws.append(r)
body(ws,4,4); setw(ws,[16,34,30,32])
for r in range(4,4+len(pb)): ws.row_dimensions[r].height=60

# 3. Lộ trình member VER3
ws=wb.create_sheet("3. Lộ trình 30-40k")
ws["A1"]="LỘ TRÌNH MEMBER — MÔ HÌNH SÓNG SỰ KIỆN"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
hdr=["Tháng","Member lũy kế","Tăng từ event","Tăng organic/KOL","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,5)
rt=[
 ["T1","2.500","2.000","500","Summit 31/07 mồi mạnh"],
 ["T2","7.000","3.000","1.500","Workshop online scale"],
 ["T3","16.000","6.000","3.000","Contest viral đỉnh"],
 ["T4","23.000","4.000","3.000","Talkshow + KOL"],
 ["T5","30.000","4.000","3.000","Masterclass chuyên sâu"],
 ["T6","38.000","5.000","3.000","Awards - PR lớn"],
]
for r in rt: ws.append(r)
body(ws,4,5); setw(ws,[10,16,16,18,26])
for r in range(4,4+len(rt)): ws.row_dimensions[r].height=28
n=ws.max_row+2
ws.cell(row=n,column=1,value="VER3 đích 38k member CHẤT + doanh thu sale sớm từ mỗi event. Ưu điểm: mỗi event vừa kéo member vừa bán được ngay, không đợi 6 tháng mới monetize.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=5)

# 4. Sale qua Event
ws=wb.create_sheet("4. Sale qua Event")
ws["A1"]="KỊCH BẢN BÁN GÓI COCO NGAY TẠI/SAU EVENT"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Điểm chạm","Cách bán (khéo, không lộ)","Gói đẩy"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
sl=[
 ["Trong vé event","Vé Silver/Gold đã kèm credit → khách dùng thử ngay, quen sản phẩm","Silver/Gold"],
 ["Demo onsite","Cho khách xem live 5 video theo ngành họ → 'anh/chị muốn thử job thật không?'","Diamond"],
 ["Offer giới hạn event","'Trong hôm nay, đăng ký gói năm được thêm X credit + suất mentor'","Diamond/Titan"],
 ["Follow-up 48h","Inbox người dự: gửi demo riêng + báo giá theo nhu cầu đã hỏi ở form","Theo persona"],
 ["Masterclass eKYC (T5)","Dạy về pháp lý → chốt Titan (face thật) cho brand lo tuân thủ","Titan/Enterprise"],
]
for r in sl: ws.append(r)
body(ws,4,3); setw(ws,[22,58,20])
for r in range(4,4+len(sl)): ws.row_dimensions[r].height=44

# 5. Nhân sự event
ws=wb.create_sheet("5. Team Event")
ws["A1"]="CƠ CẤU NHÂN SỰ CHO MÔ HÌNH EVENT-LED"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Vai trò","Nhiệm vụ","Tần suất"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
tm=[
 ["Event Lead","Lên concept, điều phối tổng, chốt speaker","Mỗi event"],
 ["Logistics/Onsite","Địa điểm, PG, check-in, thiết bị","Event offline"],
 ["Content/Livestream","Quay, live, recap, tư liệu","Mỗi event"],
 ["Community Mod","Kéo người dự vào group, giữ nhiệt","Liên tục"],
 ["Sale/Lead","Follow-up lead từ event, chốt gói","Sau mỗi event"],
 ["Designer","Poster, standee, landing event","Mỗi event"],
]
for r in tm: ws.append(r)
body(ws,4,3); setw(ws,[22,50,18])
for r in range(4,4+len(tm)): ws.row_dimensions[r].height=34

# 6. Ngân sách VER3
ws=wb.create_sheet("6. Ngân sách VER3")
ws["A1"]="NGÂN SÁCH 6 THÁNG — VER3 EVENT-LED"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Hạng mục","Chi phí (triệu)","% tổng","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
bg=[
 ["Event offline (3 buổi)","35","44%","Địa điểm, PG, teabreak, thiết bị"],
 ["Event online (3 buổi)","6","8%","Tool, thiết kế, quà"],
 ["Booking KOL/speaker","18","23%","Speaker + KOL share"],
 ["Ads đẩy đăng ký event","12","15%","Ít hơn VER2, chỉ đẩy event"],
 ["Contest/giải","5","6%","Gala + giải"],
 ["Design/misc","3","4%","Poster, standee, tool"],
 ["TỔNG","79","100%","Chưa gồm lương"],
]
for r in bg: ws.append(r)
body(ws,4,4); setw(ws,[26,18,12,30])
for c in range(1,5): ws.cell(row=3+len(bg),column=c).fill=GOLD; ws.cell(row=3+len(bg),column=c).font=SUB
for r in range(4,4+len(bg)): ws.row_dimensions[r].height=30
n=ws.max_row+2
ws.cell(row=n,column=1,value="VER3 giữ nguyên: bảng giá combo, persona, 5 video landing, rules group từ VER1. KHÁC ở: trục chuỗi event, playbook event, lộ trình theo sóng, sale qua event, team event, ngân sách nghiêng event.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=4)

wb.save("E:/CocoStudio_Plan/VER3_EventLed/VER3_CocoPlan_Event.xlsx")
print("VER3 done. Sheets:", len(wb.sheetnames))

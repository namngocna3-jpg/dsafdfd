# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

F="E:/CocoStudio_Plan/VER1_OrganicFirst/VER1_PLUS_KhungJOBVUI.xlsx"
wb=openpyxl.load_workbook(F)
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="C00000")  # đỏ = cảnh báo audit
SUB=Font(bold=True,color="C00000",size=11); TITLE=Font(bold=True,size=14,color="C00000")
GOLD=PatternFill("solid",fgColor="FFF2CC"); GREEN=PatternFill("solid",fgColor="E2EFDA"); REDF=PatternFill("solid",fgColor="FCE4E4")
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

# ==== AUDIT: khung JOBVUI nào áp/không áp ====
ws=wb.create_sheet("★ AUDIT 0-1 (đọc trước)")
wb.move_sheet("★ AUDIT 0-1 (đọc trước)", -(len(wb.sheetnames)-1))
ws["A1"]="AUDIT PLAN — GROUP 5 MEMBER KHÔNG PHẢI GROUP 552K (hội đồng MKT)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
ws.append([]); ws.append(["SỰ THẬT CỐT LÕI: JOBVUI ở giai đoạn SCALE (552k, tương tác đang GIẢM=bão hòa). Group Coco ở giai đoạn ZERO (5 member). Không copy nguyên khung — phải ĐẢO ưu tiên."])
ws.cell(row=3,column=1).font=SUB; ws.merge_cells("A3:D3")
ws.append([]); ws.append(["Khung JOBVUI","Áp cho Coco?","Vì sao","Làm gì thay thế (giai đoạn 0-1)"]); hstyle(ws,5,4)
au=[
 ["Concept/ẩn dụ/tone","✅ ÁP NGAY","Tạo bản sắc từ ngày 1, không tốn nguồn lực","Chốt 'Xưởng Phim AI', dùng nhất quán"],
 ["Checklist SEO group","✅ ÁP NGAY","Cần sẵn sàng để đón member","Tối ưu tên/mô tả/duyệt bài trước khi kéo"],
 ["6 kênh tăng member","⚠️ ÁP 1 PHẦN","K2 'FB đề xuất' cần khối lượng lớn → chưa có","Chỉ kích K1(share)+K3(KOL)+event trước"],
 ["Concept doanh thu","✅ BIẾT ĐÍCH","Biết hướng monetize nhưng chưa vội","Ghi nhận, chưa bán cho tới khi có member"],
 ["7 bài/ngày để FB đề xuất","❌ CHƯA ÁP","5 người → đăng 7 bài/ngày = hét phòng trống, kiệt sức","2-3 bài CHẤT/ngày + phủ comment mọi bài"],
 ["KPI 10 chỉ số reach/tương tác","❌ CHƯA ÁP","Chưa có gì để đo, đo sớm gây nản","30 ngày đầu đo 3 số: member mới / % đăng bài / số câu hỏi thật"],
 ["Master Framework booking KOL dày","❌ CHƯA ÁP","Chưa đủ sức hút để KOL nhận quy mô","DM tay + 1-2 KOL thân trước"],
 ["Mục tiêu 2.000 member/tháng 1","❌ HẠ XUỐNG","Ảo với group mới; JOBVUI mất nhiều tháng mới lớn","Thực tế 300-800 member CHẤT/30 ngày đầu"],
]
for r in au: ws.append(r)
body(ws,6,4); setw(ws,[28,16,34,38])
for i,r in enumerate(au):
    rr=6+i
    if r[1].startswith("✅"):
        for c in range(1,5): ws.cell(row=rr,column=c).fill=GREEN
    elif r[1].startswith("❌"):
        for c in range(1,5): ws.cell(row=rr,column=c).fill=REDF
    for c in range(1,5): ws.cell(row=rr,column=c).border=BORDER
for r in range(6,6+len(au)): ws.row_dimensions[r].height=44

# 30-day 0->1 plan
sb=6+len(au)+2
ws.cell(row=sb,column=1,value="KẾ HOẠCH 30 NGÀY ĐẦU (0→1) — THỨ TỰ ĐÚNG THEO HỘI ĐỒNG").font=SUB
ws.merge_cells(start_row=sb,start_column=1,end_row=sb,end_column=4)
ws.append([]); ws.append(["Thứ tự","Việc","Nguyên tắc (cố vấn)","Mục tiêu tuần"]); hstyle(ws,sb+1,4)
d30=[
 ["1 (Tuần 1)","Dựng OFFER trước: 'Khám video AI số 0 miễn phí' + Pro Kit làm mồi","Offer phải gánh toàn bộ khi chưa có quán tính XH (Hormozi)","Offer + 10 bài seed sẵn"],
 ["2 (Tuần 1-2)","DANH SÁCH trước content: DM tay 50 người đúng tệp","Đi kiếm 'đám đông đói' trước khi nấu ăn (Halbert)","+50-100 member founding"],
 ["3 (Tuần 2)","SEED không trống: BQT+seeder phủ comment, welcome từng người tên","Phục vụ 30 người đầu tới mức remarkable (Godin)","Mọi bài có >=5 cmt"],
 ["4 (Tuần 2-3)","EVENT 31/07 làm cú bơm reach: QR, mồi vé/tài liệu","Mua reach 1 lần để vượt ngưỡng tối thiểu (Sharp)","+300-500 member"],
 ["5 (Tuần 3-4)","Khám video AI số 1 thật: chuyên gia soi bài","Biến người vào thành người ĐĂNG BÀI","% đăng bài >15%"],
 ["6 (Tuần 4)","Đo 3 số + quyết định: giữ nhiệt hay đổ thêm traffic","Đừng đổ người vào xô thủng (Sharp tripwire)","Chốt hướng tháng 2"],
]
for r in d30: ws.append(r)
body(ws,sb+2,4); setw(ws,[14,40,34,24])
for r in range(sb+2,sb+2+len(d30)): ws.row_dimensions[r].height=48
n=ws.max_row+2
ws.cell(row=n,column=1,value="TRIPWIRE quan trọng: sau event nếu member vào rồi IM (không đăng) → NGƯNG đổ traffic, sửa offer/retention trước. Đổ người vào xô thủng = đốt tiền. Đây là lỗi phổ biến nhất của group mới.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=4)

wb.save(F)
print("AUDIT sheet added. Total:", len(wb.sheetnames))

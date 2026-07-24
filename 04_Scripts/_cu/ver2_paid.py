# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb=openpyxl.Workbook()
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="7030A0")  # tím = paid
SUB=Font(bold=True,color="7030A0",size=11); TITLE=Font(bold=True,size=14,color="7030A0")
GOLD=PatternFill("solid",fgColor="FFF2CC"); PUR=PatternFill("solid",fgColor="E6DCEF")
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
ws=wb.active; ws.title="0. Chiến lược VER2"
ws["A1"]="VER 2 — PAID-GROWTH: ĐỔ TIỀN ÉP ĐỦ 50.000 MEMBER / 6 THÁNG"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
ws.append([]); ws.append(["Yếu tố","Cách làm VER2 (khác VER1)","Ghi chú"]); hstyle(ws,3,3)
d=[
 ["Triết lý","Growth-first: mua tăng trưởng bằng ads + contest lớn + booking dày. Cộng đồng chất lượng hóa SAU.","Ngược VER1 (organic trước)"],
 ["Mục tiêu","50.000 CAM KẾT đạt, có đệm rủi ro","Cần ngân sách thật"],
 ["Ngân sách 6th","120-180 triệu (chủ yếu ads)","Điều kiện tiên quyết"],
 ["Kênh chính","FB/IG Ads (Group Join + Lead) + TikTok Ads + booking KOL dày","Đa kênh paid"],
 ["Nội dung","Sản xuất công nghiệp: video ads, creative test A/B liên tục","Volume + tối ưu"],
 ["Rủi ro lớn nhất","Member kém chất lượng, vào rồi im → phải có retention engine mạnh","Canh DAU/MAU"],
 ["Khi nào chọn VER2","Sếp DUYỆT ngân sách ads + cần đạt 50k đúng hạn để báo cáo/đối tác","KB tăng trưởng nóng"],
]
for r in d: ws.append(r)
body(ws,4,3); setw(ws,[20,64,26])
for r in range(4,4+len(d)): ws.row_dimensions[r].height=44

# 1. Lộ trình 50k paid
ws=wb.create_sheet("1. Lộ trình 50k (Paid)")
ws["A1"]="LỘ TRÌNH 50K — MÔ HÌNH PAID FUNNEL"; ws["A1"].font=TITLE; ws.merge_cells("A1:G1")
hdr=["Tháng","Member lũy kế","Từ Organic","Từ Ads","Từ Contest/Viral","Ngân sách ads (tr)","CPR mục tiêu"]
ws.append([]); ws.append(hdr); hstyle(ws,3,7)
rt=[
 ["T1","3.000","1.000","1.500","500","15","<5.000đ"],
 ["T2","10.000","2.000","4.000","1.000","25","<5.000đ"],
 ["T3","22.000","3.000","7.000","2.000","30","<4.500đ"],
 ["T4","34.000","3.500","6.500","2.000","28","<4.500đ"],
 ["T5","44.000","3.500","4.500","2.000","20","<5.000đ"],
 ["T6","52.000","3.000","3.000","2.000","15","<5.500đ"],
 ["TỔNG","52.000","16.000","26.500","9.500","~133tr",""],
]
for r in rt: ws.append(r)
body(ws,4,7); setw(ws,[10,16,14,14,18,18,16])
for c in range(1,8): ws.cell(row=3+len(rt),column=c).fill=GOLD; ws.cell(row=3+len(rt),column=c).font=SUB
for r in range(4,4+len(rt)): ws.row_dimensions[r].height=28

# 2. Ads Plan chi tiết
ws=wb.create_sheet("2. Ads Plan")
ws["A1"]="KẾ HOẠCH ADS CHI TIẾT — TỪNG CHIẾN DỊCH"; ws["A1"].font=TITLE; ws.merge_cells("A1:F1")
hdr=["Chiến dịch","Nền tảng","Mục tiêu","Tệp target","Creative","KPI"]
ws.append([]); ws.append(hdr); hstyle(ws,3,6)
ads=[
 ["CD1 - Group Growth","FB/IG","Tăng member group","Interest: làm phim, quảng cáo, editor, agency owner, 25-45t HCM/HN","Video 15s demo 'AI làm TVC' + CTA join","CPR<5k, +15k member"],
 ["CD2 - Lead Magnet","FB/IG","Thu lead qua Pro Kit","Lookalike từ member chất + interest marketing","Carousel 'Tải bộ 20 prompt' → form","CPL<15k"],
 ["CD3 - Video View retarget","FB/IG/TikTok","Nuôi ấm","Người xem video >50% + tương tác page","Case study video + testimonial","Retarget → group/sale"],
 ["CD4 - TikTok Spark","TikTok","Viral kéo tệp trẻ","Interest AI, sáng tạo, freelancer","Short 9:16 hook 3s, trend sound","View + follow → group"],
 ["CD5 - Sale Conversion","FB/IG","Chốt gói Coco","Lead nóng + member hỏi giá","Demo 5 video + offer gói","ROAS>2, đơn Coco"],
]
for r in ads: ws.append(r)
body(ws,4,6); setw(ws,[20,14,18,34,32,20])
for r in range(4,4+len(ads)): ws.row_dimensions[r].height=54

# 3. Creative Test Matrix
ws=wb.create_sheet("3. Creative Test Matrix")
ws["A1"]="MA TRẬN TEST CREATIVE — A/B LIÊN TỤC (đặc trưng VER2)"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
hdr=["Biến test","Phương án A","Phương án B","Phương án C","Cách đo"]
ws.append([]); ws.append(hdr); hstyle(ws,3,5)
cr=[
 ["Hook 3s đầu","'90% video AI trông giả'","'TVC 15s giao trong 48h'","'Client hỏi 3 câu...'","CTR, hold rate"],
 ["Format","Video demo","Carousel prompt","Testimonial","Cost/result"],
 ["CTA","Join group","Tải Pro Kit","Nhận mã vé","Conversion rate"],
 ["Offer","Tài liệu free","Mã giảm vé","Credit trial","CPL, CPR"],
 ["Tệp","Interest ngành","Lookalike","Retarget","CPR theo tệp"],
]
for r in cr: ws.append(r)
body(ws,4,5); setw(ws,[18,26,26,26,18])
for r in range(4,4+len(cr)): ws.row_dimensions[r].height=32
n=ws.max_row+2
ws.cell(row=n,column=1,value="NGUYÊN TẮC: mỗi tuần test tối thiểu 3 creative/campaign, tắt cái CPR cao, scale cái thắng. Ngân sách 70% cho winner, 30% cho test mới.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=5)

# 4. Ngân sách chi tiết VER2
ws=wb.create_sheet("4. Ngân sách VER2")
ws["A1"]="NGÂN SÁCH 6 THÁNG — VER2 PAID (chi tiết)"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Hạng mục","Chi phí (triệu)","% tổng","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
bg=[
 ["FB/IG Ads","90","54%","Trục chính kéo member"],
 ["TikTok Ads","20","12%","Kéo tệp trẻ, viral"],
 ["Booking KOL/group","30","18%","2 đợt dày"],
 ["Contest (giải + tiền mặt)","15","9%","Contest lớn 2 lần"],
 ["Sản xuất creative","8","5%","Video ads, thuê editor"],
 ["Tool + misc","4","2%","Chatbot, listening, design"],
 ["TỔNG","167","100%","Chưa gồm lương nhân sự"],
]
for r in bg: ws.append(r)
body(ws,4,4); setw(ws,[26,18,12,30])
for c in range(1,5): ws.cell(row=3+len(bg),column=c).fill=GOLD; ws.cell(row=3+len(bg),column=c).font=SUB
for r in range(4,4+len(bg)): ws.row_dimensions[r].height=30

# 5. Retention Engine
ws=wb.create_sheet("5. Retention Engine")
ws["A1"]="RETENTION ENGINE — GIỮ MEMBER PAID KHỎI CHURN (bắt buộc cho VER2)"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Cơ chế","Cách vận hành","Mục tiêu"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
re=[
 ["Onboarding tự động","Bot 3 bước trong 48h đầu: welcome → tài liệu → mời post","Post rate >15%"],
 ["Daily hook","Mỗi ngày 1 bài giữ nhiệt (poll/tip/trend) giờ vàng","DAU/MAU >18%"],
 ["Gamification","Điểm/huy hiệu cho member tích cực, leaderboard tháng","Tăng tần suất quay lại"],
 ["Win-back","Bot nhắc member im 14 ngày kèm nội dung hot","Giảm lurker <70%"],
 ["Nhóm nhỏ VIP","Power-user vào nhóm riêng, quyền lợi sớm","Giữ 1% tạo 90% giá trị"],
]
for r in re: ws.append(r)
body(ws,4,3); setw(ws,[22,54,22])
for r in range(4,4+len(re)): ws.row_dimensions[r].height=40

# 6. Content mix VER2 (nghiêng ads)
ws=wb.create_sheet("6. Content Mix Paid")
ws["A1"]="CONTENT MIX VER2 — 60% AD-DRIVEN"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Loại content","Tỉ lệ","Mục đích","Sản lượng/tuần"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
cm=[
 ["Video ads (paid)","30%","Kéo member từ ads","5-8 creative"],
 ["Lead magnet content","15%","Thu lead","2-3 bài"],
 ["Retention/ritual","25%","Giữ nhiệt group","hằng ngày"],
 ["Case/kiến thức","20%","Uy tín, convert sale","3-4 bài"],
 ["Contest/viral","10%","Lan tỏa","theo đợt"],
]
for r in cm: ws.append(r)
body(ws,4,4); setw(ws,[24,12,30,18])
for r in range(4,4+len(cm)): ws.row_dimensions[r].height=32
n=ws.max_row+2
ws.cell(row=n,column=1,value="VER2 giữ nguyên: bảng giá combo, kịch bản sale, 5 video landing, persona, event onsite từ VER1. KHÁC ở: lộ trình 50k, ads plan, creative test, ngân sách, retention engine — vì đây là bản PAID.").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=4)

wb.save("E:/CocoStudio_Plan/VER2_PaidGrowth/VER2_CocoPlan_Paid.xlsx")
print("VER2 done. Sheets:", len(wb.sheetnames))

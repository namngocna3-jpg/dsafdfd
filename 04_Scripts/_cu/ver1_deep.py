# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

F="E:/CocoStudio_Plan/VER1_OrganicFirst/VER1_CocoPlan_Full.xlsx"
wb=openpyxl.load_workbook(F)
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="1F3864")
SUB=Font(bold=True,color="1F3864",size=11); TITLE=Font(bold=True,size=14,color="1F3864")
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

# ==== 21. USER JOURNEY chi tiết theo touchpoint ====
ws=wb.create_sheet("21. User Journey chi tiết")
ws["A1"]="USER JOURNEY THEO TOUCHPOINT — 5 GIAI ĐOẠN AARRR"; ws["A1"].font=TITLE; ws.merge_cells("A1:F1")
hdr=["Giai đoạn (AARRR)","Trạng thái member","Touchpoint","Nội dung/Hành động cụ thể","Cảm xúc mong muốn","Chỉ số đo"]
ws.append([]); ws.append(hdr); hstyle(ws,3,6)
uj=[
 ["ACQUISITION\n(Thu hút)","Chưa biết group","Fanpage/KOL/Event/Ads","Thấy bài kiến thức chất → tò mò → bấm join","'Chỗ này có vẻ xịn'","CTR join, nguồn traffic"],
 ["ACTIVATION\n(Kích hoạt)","Vừa join, chưa post","Bot welcome + bài Start Here + Pro Kit","Nhận tài liệu, đọc rules, được mời giới thiệu","'Được chào đón, có giá trị ngay'","% post trong 7 ngày (>15%)"],
 ["RETENTION\n(Giữ chân)","Đã post ít nhất 1 lần","Ritual hàng tuần + Khám video AI","Tham gia đều, được góp ý, thấy tiến bộ","'Ở đây mình học được thật'","DAU/MAU >20%, reply rate"],
 ["REFERRAL\n(Giới thiệu)","Member active","Contest + spotlight + share","Khoe sản phẩm, rủ đồng nghiệp, share bài","'Tự hào là thành viên'","Viral coefficient, share"],
 ["REVENUE\n(Doanh thu)","Lead nóng","Inbox sale + demo + trial","Hỏi về gói, dùng thử, chốt mua Coco","'Đáng đầu tư cho công việc'","Lead→sale rate, ARPU"],
]
for r in uj: ws.append(r)
body(ws,4,6); setw(ws,[16,18,22,40,22,22])
for r in range(4,4+len(uj)): ws.row_dimensions[r].height=64

# ==== 22. 90-DAY SPRINT ====
ws=wb.create_sheet("22. 90-day Sprint")
ws["A1"]="90-DAY SPRINT — CHI TIẾT 12 TUẦN ĐẦU (giai đoạn sống còn)"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
hdr=["Tuần","Trọng tâm","Việc chính (3-5 việc)","Mục tiêu member","Risk cần canh"]
ws.append([]); ws.append(hdr); hstyle(ws,3,5)
sp=[
 ["Tuần 1","Dựng nền","Setup group, nhận diện, 10 bài seed, mời 30 founding","300","Group trống khi user vào"],
 ["Tuần 2","Event push","Mồi vé/tài liệu, đẩy traffic event, bot live","800","Mồi không đủ hấp dẫn"],
 ["Tuần 3","Hậu event","Recap, tài liệu độc quyền, Khám video AI #0","1.500","Người vào rồi im"],
 ["Tuần 4","Ritual hóa","Chạy đủ 4 ritual/tuần, ổn định nhịp","2.500","BQT đăng nhiều hơn member"],
 ["Tuần 5-6","Khám video AI #1-2","Mời KOL review, tạo case mẫu","4.000","Ít người nộp bài"],
 ["Tuần 7-8","KOL đợt 1","Chốt 3-5 KOL share, booking group chéo","6.500","KOL không convert"],
 ["Tuần 9-10","Contest teaser+mở","Tung thể lệ contest #1, gọi bài","9.000","Contest ít tham gia"],
 ["Tuần 11-12","Contest chấm+trao","BGK chấm, recap top bài lên Fanpage","12.000","Gian lận vote"],
]
for r in sp: ws.append(r)
body(ws,4,5); setw(ws,[12,18,44,16,26])
for r in range(4,4+len(sp)): ws.row_dimensions[r].height=44
n=ws.max_row+2
ws.cell(row=n,column=1,value="VER1 ORGANIC: kết thúc 90 ngày ~12k member CHẤT LƯỢNG. 3 tháng sau (T4-6) mới scale bằng ambassador + workshop + offline, đích thực tế 18-25k (không ép 50k nếu không có paid).").font=RED
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=5)

# ==== 23. Risk & Crisis ====
ws=wb.create_sheet("23. Risk & Crisis")
ws["A1"]="QUẢN TRỊ RỦI RO & XỬ LÝ KHỦNG HOẢNG"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Rủi ro","Dấu hiệu sớm","Phòng ngừa","Xử lý khi xảy ra"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
rk=[
 ["Group loãng/spam","Bài bán hàng tăng, comment rác","Bật duyệt bài, rule rõ, Chợ Phiên 1 buổi/tuần","Gỡ bài, cảnh cáo 3 lần ban, ghim lại rule"],
 ["Tương tác chết","Reply rate <20%, cùng vài người","Ritual đều, seed comment, hỏi mở","Tăng seed, mở contest, đổi khung giờ"],
 ["Drama/tranh cãi","Comment công kích, chia phe","Rule cấm công kích cá nhân","Admin vào hạ nhiệt, xóa nếu quá, nhắc rule riêng"],
 ["KOL không convert","Share ít tương tác, không kéo member","Chọn KOL đúng tệp, brief kỹ","Đổi KOL, đo lại, chuyển ngân sách"],
 ["Khủng hoảng thương hiệu","Member phốt Coco/sản phẩm công khai","Local support tốt, phản hồi nhanh","Xử lý riêng inbox trước, công khai giải pháp sau, không xóa vội"],
 ["Vi phạm bản quyền trong group","Member đăng nội dung ăn cắp/mặt người lậu","Rule rõ + duyệt","Gỡ ngay, nhắc rule công khai, ban nếu tái phạm"],
 ["FB phạt/hạn chế reach","Reach tụt đột ngột","Không spam link, nội dung sạch","Giảm link ngoài, tăng native, kháng nghị"],
]
for r in rk: ws.append(r)
body(ws,4,4); setw(ws,[22,24,30,36])
for r in range(4,4+len(rk)): ws.row_dimensions[r].height=48

# ==== 24. Partnership Deck (deal KOL) ====
ws=wb.create_sheet("24. Partnership Deck")
ws["A1"]="PARTNERSHIP DECK — TÀI LIỆU ĐI DEAL CHUYÊN GIA/KOL"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Mục","Nội dung trình bày với KOL","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,3)
pd=[
 ["1. Chúng tôi là ai","Coco Studio - Peacom, đối tác chính thức BytePlus tại VN. Nền tảng Seedance chuyên nghiệp. Đang xây cộng đồng AI Video lớn nhất VN.","Tạo uy tín"],
 ["2. Cộng đồng gì","AI Video Creators Vietnam - tệp production/agency/brand/freelancer PRO. Mục tiêu 50k, chuẩn cao.","Quy mô hấp dẫn"],
 ["3. Vì sao mời bạn","[Cá nhân hóa]: chuyên môn/tệp follower/uy tín của bạn phù hợp vai trò [X].","Chân thành, cụ thể"],
 ["4. Bạn được gì (3 bậc)","BẬC 1: Credit Coco + spotlight thương hiệu cá nhân.\nBẬC 2: Đồng sản xuất video demo (2 bên cùng dùng).\nBẬC 3: Affiliate/chia sẻ doanh thu khi giới thiệu khách DN.","Deal linh hoạt"],
 ["5. Bạn làm gì","Tùy vai trò: review 'Khám video AI' / speaker workshop / giám khảo contest / share bài.","Rõ cam kết"],
 ["6. Cam kết đôi bên","Coco: hỗ trợ credit, PR, kết nối khách. KOL: nội dung/thời gian theo thỏa thuận.","Win-win"],
 ["7. Bước tiếp theo","Call 15' → ký thỏa thuận nhẹ → khởi động số đầu tiên.","CTA rõ"],
]
for r in pd: ws.append(r)
body(ws,4,3); setw(ws,[20,68,20])
for r in range(4,4+len(pd)): ws.row_dimensions[r].height=60

# ==== 25. Metrics công thức ====
ws=wb.create_sheet("25. Metrics công thức")
ws["A1"]="CÔNG THỨC TÍNH CHỈ SỐ — ĐỂ BÁO CÁO CHÍNH XÁC"; ws["A1"].font=TITLE; ws.merge_cells("A1:D1")
hdr=["Chỉ số","Công thức","Ngưỡng tốt","Ý nghĩa"]
ws.append([]); ws.append(hdr); hstyle(ws,3,4)
mt=[
 ["DAU/MAU (stickiness)","Active hàng ngày / Active hàng tháng","≥20%","Độ dính của cộng đồng"],
 ["Post rate người mới","% member post trong 7 ngày đầu","≥15%","Onboarding hiệu quả"],
 ["Thread reply rate","% bài có ≥1 reply / tổng bài","≥30%","Bài có được tương tác không"],
 ["Lurker ratio","% member không post 30 ngày","<70%","Bao nhiêu người im lặng"],
 ["% content từ member","Bài member / tổng bài","≥50% (từ T4)","Cộng đồng tự sống chưa"],
 ["CPR (nếu paid)","Chi phí ads / số member mới từ ads","<5.000đ","Hiệu quả tiền ads"],
 ["Viral coefficient","Số member mới do 1 member mời","≥0.3","Tự lan tỏa"],
 ["Lead→Sale rate","Đơn chốt / lead bàn giao","≥10%","Cộng đồng ra tiền chưa"],
]
for r in mt: ws.append(r)
body(ws,4,4); setw(ws,[24,38,14,30])
for r in range(4,4+len(mt)): ws.row_dimensions[r].height=32

wb.save(F)
print("VER1 DEEP done. Sheets:", len(wb.sheetnames))

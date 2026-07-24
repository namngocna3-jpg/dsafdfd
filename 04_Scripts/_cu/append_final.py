# -*- coding: utf-8 -*-
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.load_workbook("KE HOACH COCO - CHI TIET (pitch) v2.xlsx")
H=Font(bold=True,color="FFFFFF",size=11); HFILL=PatternFill("solid",fgColor="1F3864")
SUB=Font(bold=True,color="1F3864",size=11); TITLE=Font(bold=True,size=14,color="1F3864")
GOLD=PatternFill("solid",fgColor="FFF2CC")
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

# ====== SHEET 18: ACTION TUẦN SAU + NDA ======
ws=wb.create_sheet("18. Action tuần sau")
ws["A1"]="ACTION PLAN TUẦN SAU (Phần 4 brief sếp) — VIỆC LÀM NGAY"; ws["A1"].font=TITLE; ws.merge_cells("A1:F1")
hdr=["STT","Việc phải làm","Chi tiết","PIC","Deadline","Trạng thái"]
ws.append([]); ws.append(hdr); hstyle(ws,3,6)
act=[
 ["1","Ký NDA","Ký Thoả thuận bảo mật với quản lý TRƯỚC khi nhận tài liệu sâu hơn","Danh","Ngày 1","☐ Chưa"],
 ["2","3 bài mồi","Đã viết sẵn (sheet 2) — duyệt & đăng Fanpage+Group","Danh+Content","Ngày 2-3","✅ Đã có nội dung"],
 ["3","Setup group + nhận diện","Tạo group, cover, ghim 3 bài, bật duyệt bài","Danh+Designer","Ngày 2-4","☐"],
 ["4","Kéo traffic event","Đăng mồi câu (mã giảm vé/quà) đẩy người event vào group","Danh","Ngày 3-7","✅ Có kịch bản"],
 ["5","Brief 5 video landing","Đã có prompt Seedance-ready (sheet Landing/brief) — bắt đầu render","Danh","Ngày 4-7","✅ Đã có brief"],
 ["6","Chốt 3 con số với sếp","% giảm vé + credit bonus + tên group + ngân sách paid","Danh→Sếp","Ngày 1-2","☐ CẦN HỎI SẾP"],
 ["7","Setup chatbot","6 kịch bản bot (sheet 4) lên ManyChat","Mod 1","Ngày 5-7","✅ Có kịch bản"],
]
for r in act: ws.append(r)
body(ws,4,6); setw(ws,[6,22,44,16,12,18])
for r in range(4,4+len(act)): ws.row_dimensions[r].height=40
# highlight NDA + hỏi sếp
for rr in [4,9]:
    for c in range(1,7): ws.cell(row=rr,column=c).fill=GOLD

# ====== SHEET 19: SEEDING PLAN ======
ws=wb.create_sheet("19. Seeding Plan")
ws["A1"]="SEEDING PLAN — NUÔI GROUP (sếp hỏi: cần bao nhiêu bài?)"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
ws.append([]); ws.append(["A. ĐỀ XUẤT SỐ LƯỢNG"]); ws.cell(row=3,column=1).font=SUB
ws.append(["Giai đoạn","Bài seed BQT/ngày","Comment seeding/ngày","Nick seed cần","Mục tiêu"])
hstyle(ws,4,5)
seed=[
 ["Trước mở group","10 bài chất lượng (1 lần)","-","-","Group không trống khi user vào"],
 ["Tháng 1","2 bài/ngày","10-15 comment/ngày","3-5 nick thật","Tạo cảm giác sôi nổi"],
 ["Tháng 2-3","2 bài/ngày","15-20 comment/ngày","5 nick","Duy trì nhiệt + kéo tương tác"],
 ["Tháng 4-6","1-2 bài/ngày","10-15 comment/ngày","5 nick","Member tự tạo content, giảm seed dần"],
]
for r in seed: ws.append(r)
body(ws,5,5)
sb=5+len(seed)+2
ws.cell(row=sb,column=1,value="B. QUY TẮC SEEDING (giữ tự nhiên, không lộ)").font=SUB
ws.append([]); ws.append(["Nguyên tắc","Chi tiết"]); hstyle(ws,sb+1,2)
rules=[
 ["Dùng nick thật","Nick có avatar, lịch sử hoạt động — không nick ảo dễ bị FB phạt"],
 ["Comment có giá trị","Trả lời câu hỏi thật, thêm góc nhìn — không 'hay quá', 'hóng'"],
 ["Không tự PR lộ liễu","Seed dẫn dắt thảo luận, không spam link Coco trong group"],
 ["Đa dạng giọng","Mỗi nick 1 persona (newbie hỏi, pro trả lời, client thắc mắc)"],
 ["Share ra ngoài","Nick thật share bài group vào các group/page cùng tệp (đúng chính sách)"],
]
for r in rules: ws.append(r)
body(ws,sb+2,2); setw(ws,[24,60])
for r in range(sb+2,sb+2+len(rules)): ws.row_dimensions[r].height=36

# ====== SHEET 20: BRAND IDENTITY ======
ws=wb.create_sheet("20. Brand Identity")
ws["A1"]="BỘ NHẬN DIỆN & TÊN GROUP — ĐỀ XUẤT ĐỂ SẾP CHỐT"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
ws.append([]); ws.append(["A. ĐỀ XUẤT TÊN GROUP (chọn 1)"]); ws.cell(row=3,column=1).font=SUB
ws.append(["Tên","Ưu điểm","Nhược"]); hstyle(ws,4,3)
names=[
 ["AI Video Creators Vietnam","Rõ tệp, dễ SEO, chuyên nghiệp quốc tế","Hơi 'Tây', ít cảm xúc"],
 ["Xưởng Phim AI","Gần gũi, dễ nhớ, thuần Việt","Hẹp về 'phim', bỏ sót quảng cáo"],
 ["Cộng đồng AI Video Việt Nam","Bao quát, thân thiện","Chung chung, khó khác biệt"],
 ["The AI Storytellers Vietnam","Sang, gợi kể chuyện","Kén tệp, khó tìm kiếm"],
]
for r in names: ws.append(r)
body(ws,5,3)
sb=5+len(names)+2
ws.cell(row=sb,column=1,value="B. BRAND GUIDE (khi đã chốt tên)").font=SUB
ws.append([]); ws.append(["Hạng mục","Đề xuất"]); hstyle(ws,sb+1,2)
bg=[
 ["Màu chủ đạo","Xanh lá neon (#00E676) + đen (#0A0A0A) — bám brand Coco trên web hiện tại"],
 ["Font","Sans-serif hiện đại (Montserrat/Inter) — chuyên nghiệp, dễ đọc"],
 ["Logo/Cover","Gắn co-brand: Coco Studio x BytePlus x TAS ở banner (như sếp yêu cầu)"],
 ["Khung avatar","Frame để member đổi avatar khi tham gia (tăng nhận diện)"],
 ["Template bài","5 mẫu: thông báo, kiến thức, khám video AI, chợ phiên, trend radar"],
 ["Tone hình ảnh","Điện ảnh, tối giản, có điểm nhấn — không generic/AI rập khuôn"],
]
for r in bg: ws.append(r)
body(ws,sb+2,2); setw(ws,[24,66])
for r in range(sb+2,sb+2+len(bg)): ws.row_dimensions[r].height=36

# ====== SHEET 21: MỤC LỤC ======
ws=wb.create_sheet("00. MỤC LỤC")
wb.move_sheet("00. MỤC LỤC", -(len(wb.sheetnames)-1))
ws["A1"]="MỤC LỤC — KẾ HOẠCH COCO STUDIO & CỘNG ĐỒNG AI"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
ws.append([]); ws.append(["Sheet","Nội dung","Nhiệm vụ sếp"]); hstyle(ws,3,3)
toc=[
 ["0. Tóm tắt Pitch","1 trang sếp đọc nhanh + điểm cần quyết","Tổng"],
 ["1. Master Action Plan","18 đầu việc có PIC/deadline/KPI/chi phí","NV1"],
 ["2. 10 bài seed (full)","Nội dung 10 bài viết sẵn copy-paste","Action#2"],
 ["3. Content Calendar 4 tuần","28 bài theo từng ngày","NV2"],
 ["4. Kịch bản Bot","6 tin nhắn auto-reply nguyên văn","NV1"],
 ["5. Thể lệ Contest #1","Đề bài, chấm điểm, giải thưởng","Ý tưởng"],
 ["6. Benchmark đối thủ","5 đối thủ + điểm yếu để đánh","NV3"],
 ["7. Combo giá Coco","5 gói Silver→Titan","NV3"],
 ["8. Kịch bản chốt sale","9 bước nói nguyên văn","NV3"],
 ["9. Event Onsite 31-07","Kịch bản theo giờ + checklist PG","NV4"],
 ["10. Nhân sự & Ngân sách","Lương + 2 kịch bản ngân sách","NV1"],
 ["11. KPI Tracking","8 chỉ số x 6 tháng","NV1"],
 ["12. Fanpage Strategy","5 pillar + 20 idea bài","NV2"],
 ["13. Customer Persona","3 chân dung khách","NV3"],
 ["14. KOL DM Scripts","Tin nhắn mời KOL nguyên văn","NV1"],
 ["15. Research Trend SOP","Quy trình research theo tuần","NV5"],
 ["16. Landing Page Copy","Copy từng section landing","NV2"],
 ["17. Xử lý từ chối Sale","6 objection + cách trả lời","NV3"],
 ["18. Action tuần sau","Việc làm ngay + NDA","Action"],
 ["19. Seeding Plan","Số bài seed + quy tắc","Ý tưởng"],
 ["20. Brand Identity","Tên group + brand guide","NV2"],
]
for r in toc: ws.append(r)
body(ws,4,3); setw(ws,[26,50,14])
for r in range(4,4+len(toc)): ws.row_dimensions[r].height=24

wb.save("KE HOACH COCO - CHI TIET (pitch) v2.xlsx")
print("FINAL. Total sheets:", len(wb.sheetnames))

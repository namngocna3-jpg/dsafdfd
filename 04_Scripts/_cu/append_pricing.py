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

# ====== SHEET 6: BENCHMARK ĐỐI THỦ ======
ws=wb.create_sheet("6. Benchmark đối thủ")
ws["A1"]="BENCHMARK GIÁ 5 ĐỐI THỦ — QUY ĐỔI VỀ 'GIÁ MỖI VIDEO'"; ws["A1"].font=TITLE; ws.merge_cells("A1:G1")
hdr=["Nền tảng","Chuyên về","Cách tính","Gói tham khảo (USD/th)","Sản lượng","~Giá/video quy đổi","Điểm yếu để Coco đánh"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
bm=[
 ["TopView.AI","Video UGC/Marketing/AI Agent","Fixed credit (1 video 15s=5 credit)","$9.7 - $44.9","10-50 video/th","~$0.9-1/video","Thiên UGC, không chuẩn điện ảnh, không VAT nội địa"],
 ["Hailuo/MiniMax","Text-to-Video","Trừ theo độ phân giải","$9.99 (1.000cr) - $79.99","~40 video 768p / 125 video 1080p","~$0.25-0.6/video","Không có face thật eKYC, không hóa đơn VN"],
 ["Haiper AI","Text/Image-to-Video","Theo thời lượng + batch ảnh","$8 - $80","1s 720p=8cr; 4 ảnh 1080p=10cr","~$0.3-0.8/video","Không local support, không pháp lý VN"],
 ["HeyGen","AI Avatar/Presenter","Theo chất lượng avatar (3-20cr/phút)","$29 - $149","tùy avatar","cao (avatar siêu thực)","Chỉ mạnh avatar nói, không đa cảnh điện ảnh"],
 ["InVideo AI","Đa model (Sora/Veo)","Biến động theo model","$17 - $170","tùy model","biến động cao","Thiên tổng hợp stock, không thuần T2V điện ảnh"],
 ["=> COCO STUDIO","AI Video chuyên nghiệp thuần Seedance","Coco Credits + unlock theo dự án","(bám giá vé event)","xem sheet 7","cạnh tranh + VAT","LỢI THẾ: eKYC face thật + VAT + local support + thuần seed"],
]
for r in bm: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[16,22,26,20,20,20,34])
for r in range(4,4+len(bm)): ws.row_dimensions[r].height=48
# highlight coco row
for c in range(1,8): ws.cell(row=3+len(bm),column=c).fill=GOLD; ws.cell(row=3+len(bm),column=c).font=SUB

# ====== SHEET 7: COMBO GIÁ COCO ======
ws=wb.create_sheet("7. Combo giá Coco")
ws["A1"]="COMBO GIÁ COCO STUDIO — BÁM CẤU TRÚC VÉ EVENT (Silver→Titan)"; ws["A1"].font=TITLE; ws.merge_cells("A1:G1")
hdr=["Gói","Giá (VND)","Coco Credits","Sản lượng ước","Đối tượng","Tính năng nổi bật","Đòn bẩy sale"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
pk=[
 ["Silver","990.000","2.000","~200 video Seedance","Freelancer, thử nghiệm","VAT, prompt assistant","Đúng giá vé Silver → quen thuộc"],
 ["Gold ⭐","1.900.000","4.000","~400 video / 4K","Freelancer pro, team nhỏ","VAT + 4K + hỗ trợ","GÓI NEO — best value, đẩy mạnh"],
 ["Diamond","4.990.000","10.500","~950 video / 4K","Agency, Production House","Full + priority support","Bám vé Gold event (4.99tr) → nhất quán"],
 ["Titan (Face Unlock)","9.990.000","22.000","~2.300 video","Brand/Enterprise, dự án lớn","eKYC Face thật + 4K + AM riêng","USP độc quyền — không đối thủ nào có"],
 ["Enterprise/Custom","Liên hệ","Theo dự án","Không giới hạn","Enterprise, chiến dịch lớn","Unlock theo dự án, hợp đồng, xuất hóa đơn","Sales-led, deal riêng"],
]
for r in pk: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[20,14,12,20,22,28,28])
for c in range(1,8): ws.cell(row=5,column=c).fill=GOLD  # Gold row
for r in range(4,4+len(pk)): ws.row_dimensions[r].height=44
n=ws.max_row+2
notes=[
 "NGUYÊN TẮC ĐỊNH GIÁ:",
 "1. Bám giá vé event để KH đã dự event thấy nhất quán (Silver 990k, Gold~Diamond 4.99tr).",
 "2. Gói Gold là 'decoy' neo giá — làm Diamond trông hời hơn.",
 "3. Titan bán bằng USP (eKYC face thật) chứ không bán bằng số credit — đối thủ không có.",
 "4. So đối thủ: Coco đắt hơn/video nhưng bù bằng VAT + pháp lý + local support = thứ DN bắt buộc cần.",
 "5. Combo bán kèm: mua gói năm tặng suất Khám video AI + credit bonus + ưu tiên event.",
]
for i,t in enumerate(notes):
    ws.cell(row=n+i,column=1,value=t).font=(SUB if i==0 else RED)
    ws.merge_cells(start_row=n+i,start_column=1,end_row=n+i,end_column=7)

# ====== SHEET 8: KỊCH BẢN SALE ======
ws=wb.create_sheet("8. Kịch bản chốt sale")
ws["A1"]="KỊCH BẢN CHỐT SALE — KHÉO, KHÔNG LỘ LIỄU (qua cộng đồng)"; ws["A1"].font=TITLE; ws.merge_cells("A1:C1")
hdr=["Bước / Tình huống","Cách nói (nguyên văn gợi ý)","Nguyên tắc"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
sc=[
 ["1. Không bán trong group","Group KHÔNG post bán Coco. Chỉ chia sẻ kiến thức + case. Sản phẩm xuất hiện tự nhiên trong câu chuyện 'mình dùng gì để làm'.","Value trước, sản phẩm sau"],
 ["2. Nhận diện lead nóng","Ai hỏi 'làm sao có hóa đơn / face thật / xuất 4K / dùng thương mại được không' = lead nóng. Inbox riêng, không chốt public.","Lắng nghe tín hiệu mua"],
 ["3. Mở đầu inbox","'Chào anh/chị, thấy anh/chị quan tâm việc đưa AI Video vào job thật. Bên em có vài case tương tự, gửi anh/chị tham khảo nhé?'","Tư vấn, không chào giá ngay"],
 ["4. Đào nhu cầu","'Team mình đang làm cho khách ngành gì? Bài toán lớn nhất là chất lượng, chi phí hay pháp lý ạ?'","Hỏi để hiểu, không thuyết"],
 ["5. Gắn giải pháp","Nếu vướng pháp lý → nhấn VAT+eKYC. Nếu vướng chi phí → nhấn A/B nhiều hướng rẻ hơn quay. Nếu vướng chất lượng → mời xem demo Titan.","Bán đúng nỗi đau"],
 ["6. Chứng minh","Gửi 5 video demo landing (đúng use-case của họ) + 1 case thật có số liệu (thời gian, chi phí tiết kiệm).","Show, don't tell"],
 ["7. Chốt bằng gói","'Với nhu cầu của mình, gói Diamond hợp nhất — đủ 4K, priority support, xuất hóa đơn. Em gửi báo giá + demo riêng nhé?'","Đề xuất gói cụ thể"],
 ["8. Xử lý 'để suy nghĩ'","'Dạ em hiểu. Anh/chị cứ dùng thử [credit trial] cho 1 job thật đi, thấy hợp mình đi tiếp. Em hỗ trợ setup.'","Hạ rào cản, cho dùng thử"],
 ["9. Upsell qua cộng đồng","Khách mua rồi → mời vào nhóm power-user, spotlight sản phẩm họ trong group → họ tự PR cho mình.","Biến khách thành ambassador"],
]
for r in sc: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[26,66,22])
for r in range(4,4+len(sc)): ws.row_dimensions[r].height=56

# ====== SHEET 9: EVENT ONSITE ======
ws=wb.create_sheet("9. Event Onsite 31-07")
ws["A1"]="KẾ HOẠCH ONSITE 31/07 — SOFITEL SAIGON PLAZA (theo khung giờ)"; ws["A1"].font=TITLE; ws.merge_cells("A1:H1")
hdr=["Khung giờ","Hạng mục","Action cụ thể","Nhân sự","Đạo cụ/Chuẩn bị","PIC","Phễu","Ghi chú"]
ws.append([]); ws.append(hdr); hstyle(ws,3,len(hdr))
ev=[
 ["Trước 13:30","Setup","Dựng standee QR group, bàn check-in, test bot, dán chỉ dẫn","2 setup","Standee QR, bàn, iPad, dây đeo","Lead","-","QR trỏ group+tài liệu"],
 ["13:30-14:00","Đón khách","Check-in, phát tài liệu+quà, PG hướng dẫn quét QR vào group","3-4 PG, 1 photographer","DS khách, quà, máy ảnh","Mod onsite","Lạnh→Ấm","Mỗi khách quét QR"],
 ["14:00-15:30","Keynote 1","Chụp/quay tư liệu (KHÔNG quay showcase độc quyền BytePlus)","1 photo, 1 quay","Máy ảnh, xin phép BTC","Content","-","Lấy tư liệu recap"],
 ["15:30-15:45","Teabreak","PG nhắc quét QR khi phục vụ; mod live ảnh lên group","2 PG, 1 mod","Điện thoại live","Mod onsite","Ấm","Đẩy điểm danh group"],
 ["15:45-16:30","Keynote 2","Note quote hay, chụp speaker","Content","Sổ ghi quote","Content","-","Chuẩn bị recap"],
 ["16:30-17:00","Panel","Ghi ý chính panel để làm bài chia sẻ","Content","-","Content","-","Nội dung hậu event"],
 ["Từ 17:00","Bế mạc","Nhắc CTA: tài liệu+Khám video AI chỉ trong group; tiễn khách","1 mod, PG","Card CTA","Lead","Ấm→Nóng","Chuyển hóa cuối"],
 ["Hậu event 48h","Follow-up","Đăng recap, gửi tài liệu, mời vé Gold vào nhóm power-user","Content+Lead","Album, file tài liệu","Lead","Nóng","Nurture"],
]
for r in ev: ws.append(r)
body(ws,4,len(hdr)); setw(ws,[13,12,34,16,22,10,11,20])
for r in range(4,4+len(ev)): ws.row_dimensions[r].height=44
n=ws.max_row+2
ws.cell(row=n,column=1,value="CHECKLIST BOOKING: [ ] 3-4 PG  [ ] 1 photographer  [ ] 1 quay phim  [ ] in standee QR  [ ] quà tặng  [ ] iPad/điện thoại quét  [ ] xin phép BTC quay chụp").font=SUB
ws.merge_cells(start_row=n,start_column=1,end_row=n,end_column=8)

# ====== SHEET 10: NHÂN SỰ & NGÂN SÁCH ======
ws=wb.create_sheet("10. Nhân sự & Ngân sách")
ws["A1"]="NHÂN SỰ & NGÂN SÁCH 6 THÁNG (2 kịch bản)"; ws["A1"].font=TITLE; ws.merge_cells("A1:E1")
ws.append([]); ws.append(["A. NHÂN SỰ"]); ws.cell(row=3,column=1).font=SUB
hp=["Vai trò","SL","Nhiệm vụ","Full/Bán TG","Chi phí/tháng"]
ws.append(hp); hstyle(ws,4,len(hp))
hr=[
 ["Community Lead","1","Chiến lược, đối ngoại KOL, điều phối","Full","(bạn)"],
 ["Moderator","2","Duyệt bài, giữ nhiệt, online giờ vàng","Bán","5-8tr/ng"],
 ["Content Creator","2","Viết bài + visual + video demo","Bán/Full","6-10tr/ng"],
 ["Seeder team","3-5 nick","Comment, share, giữ tương tác","Freelance","2-3tr/gói"],
 ["Designer","1","KV, cover, template","Freelance","3-5tr"],
 ["Ads/Performance","1","Chạy paid, tối ưu CPR","Bán","6-10tr"],
]
for r in hr: ws.append(r)
body(ws,5,len(hp));
sb=5+len(hr)+2
ws.cell(row=sb,column=1,value="B. NGÂN SÁCH THEO KỊCH BẢN").font=SUB
bp=["Hạng mục","KB Tiết kiệm (0 paid)","KB Đầy đủ (đạt 50k)","Ghi chú"]
ws.append([]); ws.append(bp); hstyle(ws,sb+1,len(bp))
bud=[
 ["Paid ads","0","60-100tr","Mục tiêu Group Join"],
 ["Booking KOL/group","3-5tr","30-50tr","Đợt 1+2"],
 ["Giải contest","Credit nội bộ","Credit + tiền mặt nhẹ","Quy đổi credit Coco"],
 ["Event offline/standee","2-3tr","15-25tr","Talkshow T5"],
 ["Tổng ước tính","~15-25tr","~120-180tr","Chưa gồm lương NS"],
 ["=> MEMBER THỰC TẾ","12.000-18.000","50.000","QUYẾT ĐỊNH bởi ngân sách"],
]
for r in bud: ws.append(r)
body(ws,sb+2,len(bp)); setw(ws,[22,22,22,24])
for c in range(1,5): ws.cell(row=sb+2+len(bud)-1,column=c).fill=GOLD; ws.cell(row=sb+2+len(bud)-1,column=c).font=SUB

# ====== SHEET 11: KPI ======
ws=wb.create_sheet("11. KPI Tracking")
ws["A1"]="KPI DASHBOARD — THEO DÕI HÀNG THÁNG"; ws["A1"].font=TITLE; ws.merge_cells("A1:H1")
hk=["Chỉ số","T1","T2","T3","T4","T5","T6","Ghi chú"]
ws.append([]); ws.append(hk); hstyle(ws,3,len(hk))
kpi=[
 ["Member lũy kế","2.000","8.000","18.000","30.000","42.000","50.000","Mục tiêu chính"],
 ["Member mới/tháng","2.000","6.000","10.000","12.000","12.000","8.000",""],
 ["% new post trong 7 ngày",">15%",">15%",">18%",">18%",">20%",">20%","Sức khoẻ"],
 ["Thread reply rate",">30%",">30%",">35%",">35%",">40%",">40%",">=1 reply"],
 ["% content từ member","20%","30%","40%","50%","55%","60%","Không phải BQT"],
 ["Khám video AI/tháng","1","2","4","4","4","4","Ritual mồi"],
 ["Lead cho sale","-","50","100","150","180","200+","Bàn giao sale"],
 ["CPR (đ/member paid)","-","-","<5.000","<5.000","<6.000","<7.000","Nếu paid"],
]
for r in kpi: ws.append(r)
body(ws,4,len(hk)); setw(ws,[28,10,10,10,10,10,10,20])
for r in range(4,4+len(kpi)): ws.row_dimensions[r].height=30

wb.save("KE HOACH COCO - CHI TIET (pitch) v2.xlsx")
print("APPENDED. Sheets:", wb.sheetnames)

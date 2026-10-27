# CV và hồ sơ ứng tuyển

2026-10-27. Chủ portfolio yêu cầu tìm thêm skill CV/job và áp dụng vào hồ sơ.
Mục tiêu đã xác nhận: theo hướng nghiên cứu, đồng thời ứng tuyển AI/ML engineering.

## Các skill đã cài vào repo

| Skill | Dùng cho | Nguồn |
| --- | --- | --- |
| Academic CV Builder | CV nghiên cứu, phân loại publication, authorship | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates/tree/4efb68547887d2a4dd714074bd7ecb4171dc9fee/cli-tool/components/skills/career/academic-cv-builder) |
| Tech Resume Optimizer | Kỹ năng và đóng góp kỹ thuật trong résumé AI/ML | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates/tree/4efb68547887d2a4dd714074bd7ecb4171dc9fee/cli-tool/components/skills/career/tech-resume-optimizer) |
| Resume/Cover Letter Writer | Chỉnh theo JD, thị trường và thư ứng tuyển | [jezweb/claude-skills](https://github.com/jezweb/claude-skills/tree/1260fa7439b36b18dbf16648ccc7fb44783f6c23/plugins/writing/skills/resume-cover-letter) |

Cả ba có giấy phép MIT, giữ nguyên `SKILL.md`, kèm `UPSTREAM-LICENSE`.
Commit và hash từng file được ghi trong `.agents/skills/SOURCES.json`.
Các thư mục này chỉ có hướng dẫn và license; không cần chạy mã của bên thứ ba.
Skill sẽ được khám phá từ lượt tiếp theo; lượt này đã đọc trực tiếp để áp dụng.

Đã khảo sát thêm resume-tailoring của varunr89 và resume-skill-kit của
mikeburke925. Không cài thêm luồng tailoring trùng lặp; loại bộ đề nghị tự ước
lượng số liệu vào CV. Không dùng số sao repo như bằng chứng về hiệu quả tuyển dụng.

Đối chiếu thêm hướng dẫn [CV của MIT CAPD](https://capd.mit.edu/resources/cvs/):
CV học thuật trình bày nghiên cứu và publication sâu hơn; résumé ngành cần
ngắn và liên quan đến vị trí. Đây là lý do giữ hai bản nền, thay vì bắt một bản
phục vụ mọi cơ hội.

## Đã áp dụng

### Research CV — 2 trang

- Đưa research interests lên đầu: XAI, time series, multimodal learning, CV.
- Phân biệt conference publication đã xuất bản với manuscripts under review.
- Dùng đầy đủ tác giả paper SmokeNet theo dữ liệu portfolio; bôi đậm tên chủ CV.
- Giữ DOI, tác giả/đóng góp và phạm vi đánh giá. Hai kết quả SmokeNet 35.9% và
  57.7% vẫn là hai thí nghiệm khác nhau.
- Giữ nghiên cứu đang tiến hành, nhóm nghiên cứu, FCAJ và chứng chỉ.
- Bỏ danh sách coursework khỏi khối education ngắn; bản gốc vẫn được giữ.

### Résumé AI/ML — 1 trang

- Education/GPA, kỹ năng kỹ thuật, bốn dự án, leadership/cloud và publication.
- Một cột, text có thể chọn/copy, không icon, ảnh hay thanh tự chấm kỹ năng.
- Giữ tên vai trò thật. Không đổi undergraduate researcher thành ML engineer
  đã đi làm, hoặc FCAJ thành employment tại AWS.
- SER dùng WavLM + Compact Conformer; kết quả đang chạy không bị biến thành
  accuracy đã có. ASR vẫn ghi “reported” cho WER/CER.
- Chứng chỉ và ba manuscript khác nằm trong CV dài; résumé có link dẫn tới đó.

Humanizer được dùng cùng hai skill trên để bỏ cách diễn đạt phóng đại và giữ
đóng góp cụ thể. Thư ứng tuyển chưa được viết cho một công ty giả: đã chuẩn bị
khung làm việc trong `docs/career/cover-letter-outline.md` để dùng với JD thật.

## Bằng chứng và khoảng trống

| Nội dung | Bằng chứng hiện có | Cần bổ sung khi dùng để ứng tuyển |
| --- | --- | --- |
| SmokeNet / XAI | DOI, kiến trúc, mô tả contribution và kết quả có phạm vi | Paper/bảng và artifact đánh giá, ví dụ XAI thật; đã deferred trong backlog |
| SER | Kiến trúc hiện tại và kế hoạch benchmark | Kết quả cuối, split, ablation; không thêm số để khớp JD |
| ASR | Kiến trúc 5.4M, 745 giờ, WER/CER được báo cáo | Corpus, split, decoding/normalization, audio/transcript mẫu |
| PPE | Mô tả YOLOv8/Streamlit, 9 lớp | Thời gian dự án, repo/demo thật; mAP/FPS nếu có protocol |
| Cloud | FCAJ journal và tên chương trình | Ngày bắt đầu/kết thúc, trạng thái; chỉ thêm AWS services khi có bằng chứng |
| ML engineering | Code/model methods và portfolio web đã deploy | Artifact serving/monitoring/latency của mô hình nếu JD yêu cầu production ML |
| Manuscripts | Tên, venue đang review, vai trò và số liệu từ CV trước | Full author lists nếu cần citation đầy đủ; trạng thái mới do chủ CV xác nhận |

Đây là khoảng trống trong hồ sơ bằng chứng, không phải kết luận rằng chủ CV
không có năng lực đó. Không chuyển certificate thành kinh nghiệm triển khai.

## Khi có JD

1. Lưu nguyên JD, URL, ngày xem, role/company, địa điểm và yêu cầu eligibility
   vào `docs/career/applications/<company-role>/` (ignored).
2. Chọn bản nền research hoặc industry. Lập bảng yêu cầu → bằng chứng → thiếu
   gì; phân loại match/partial/gap, không gọi đó là điểm ATS hay xác suất đậu.
3. Chỉnh thứ tự và bullet dựa trên bằng chứng. Tạo bản riêng; không ghi đè bản
   nền bằng keywords của một công ty.
4. Dùng Resume/Cover Letter Writer để viết thư dưới một trang: nêu một lý do
   cụ thể về đội ngũ, hai ví dụ phù hợp và lời kết gọn. Kiểm chứng thông tin công
   ty bằng nguồn hiện hành; không tự tạo câu chuyện, contact hay referral.
5. Dùng Humanizer, xuất PDF và xem từng trang. Chuẩn bị câu trả lời cho từng
   claim. Chỉ gửi hồ sơ hoặc liên hệ người khác khi chủ CV yêu cầu rõ.

Hiện chưa có JD, quốc gia ứng tuyển, lịch có thể bắt đầu hay work authorization
được cung cấp. Hai bản PDF hiện tại là base documents; chưa phải hồ sơ đã tailor
cho một công ty hoặc lab cụ thể.

## Kiểm tra trước lần tách digital/print

- Build Next.js production qua compile, lint/type checks và static generation.
- PDF research 2 trang, PDF AI/ML 1 trang; letter paper, Charter 10pt, lề 1 inch.
  Cả ba trang được render và xem trực tiếp; không có cảnh báo overfull box.
- Kiểm tra text/Unicode, keywords và link DOI/case study. Chế độ plain của
  pypdf chèn khoảng trắng ở một số cặp chữ kerned của Charter (ví dụ “PyT orch”);
  chế độ layout giữ đúng “PyTorch”, “TensorFlow” và các section headings.
  Đây là kiểm tra trích xuất cục bộ, chưa phải thử với ATS của một nhà tuyển dụng.
- Kiểm tra nút tải ở 1440/834/390px, focus bàn phím, reduced motion, console và
  HTTP của cả hai PDF. Không thêm client component cho nhóm link.
- File nguồn CV, bản gốc và tài liệu ứng tuyển riêng tiếp tục nằm trong `docs/`
  được ignore. Git chỉ chứa skill/license, ghi chú chung và các đầu ra public.

## Phiên bản digital và bản in hiện tại

Sau khi chủ CV yêu cầu học thêm rồi chỉnh cả hai cách dùng, layout đã chuyển
sang A4, chữ thân bài 11pt, tên lệch trái và màu cobalt cho bản digital. Bản in
dùng grayscale, có QR dẫn tới portfolio và cùng nội dung theo từng vai trò.
Profile URL, DOI và số trang đọc được trên giấy. Hai bản nội dung vẫn là research
2 trang và AI/ML 1 trang; mỗi bản có digital và print, tổng cộng 4 PDF / 6 trang.
Xem `design/cv-digital-and-print.md` để biết nguồn tham khảo và kiểm tra mới nhất.

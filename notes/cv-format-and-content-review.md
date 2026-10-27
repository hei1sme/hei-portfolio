# Đánh giá CV của Le Nguyen Gia Hung

Ngày kiểm tra: 2026-10-27. Mục tiêu: research internship/lab và AI/ML internship,
ở cấp undergraduate. Không có JD cụ thể nên chưa đánh giá độ khớp một vị trí.

**Kết luận:** có thể dùng hai bản nền hiện tại để bắt đầu chuẩn bị hồ sơ.
Format không cần thiết kế lại. Trước khi gửi một đơn cụ thể, cần chọn dự án theo
JD và làm rõ contribution/protocol của các kết quả được nhấn mạnh.

## Phạm vi và phương pháp

- Đọc nội dung hai CV và xem sáu trang render của bốn PDF trong `public/`:
  research digital/print mỗi bản 2 trang; AI/ML digital/print mỗi bản 1 trang.
- Chạy lại `python scripts/check-cv-text.py --directory public`: cả bốn qua kiểm
  tra A4, page count, 18 chuỗi định danh/kỹ năng/kết quả, DOI annotation và text
  extraction bằng pypdf plain/layout cùng PyMuPDF.
- Dùng Academic CV Builder và Tech Resume Optimizer để xét đúng hướng nghiên cứu
  và kỹ thuật. Tham khảo rubric bốn chiều của Resume Reviewer; lưu nhận xét ở
  Markdown trong repo. Không tạo Word report trong lượt này: máy hiện không có
  LibreOffice để hoàn thành bước render/kiểm tra bắt buộc của workflow DOCX.
- Đây là đánh giá thủ công. Không chạy ATS của một công ty, không kiểm chứng lại
  mọi kết quả thí nghiệm và không suy ra xác suất được phỏng vấn.

## Điểm tham khảo

Thang 10 thể hiện nhận xét của lần review này, không phải thang chuẩn ngành.
Chiều định dạng chỉ đánh giá cấu trúc và khả năng đọc PDF đã kiểm tra.

| Tiêu chí | Research | AI/ML | Căn cứ |
| --- | --- | --- | --- |
| Bằng chứng và đóng góp | 8 | 7 | Có publication, dữ liệu, baseline và kết quả; ASR thiếu protocol, MERR-GAT chưa có kết quả cuối |
| Cấu trúc và khả năng đọc PDF | 9 | 9 | Một cột, contact là text trong body; trích xuất được “PyTorch”, “TensorFlow/Keras” và các chuỗi đã kiểm tra |
| Độ rõ và dễ đọc lướt | 7 | 8 | Research có “C-DLE”, “Mondrian pools”, “8-gate provenance audit”; AI/ML ngắn hơn nhưng phần skills còn dày |
| Bố cục và độ dài | 8 | 8 | Research 2 trang phù hợp lượng công trình; AI/ML 1 trang đủ bốn dự án, không tràn hay chồng chữ trong các trang đã xem |
| Trung bình | 8 | 8 | Chưa chấm độ khớp JD hoặc điều kiện tuyển dụng |

Không áp dụng máy móc quy tắc “sinh viên chỉ được một trang” cho research CV.
Không trừ điểm vì chưa có grants, teaching hay faculty appointments.

## Những điểm nên giữ

- “First & corresponding author” và AJCAI 2025 được nhìn thấy sớm. Bản research
  phân biệt rõ paper đã xuất bản với “Manuscripts under review”.
- “35.9% lower MAE than XGBoost on the 2024 held-out evaluation” có baseline và
  phạm vi; kết quả backtest May 2024 được trình bày riêng.
- MERR-GAT ghi “experiments are ongoing”; không biến kế hoạch đánh giá thành
  thành tích. Kiến trúc đã theo WavLM + Compact Conformer.
- Contact, URL, education/GPA và DOI dễ tìm. Bản print có tương phản grayscale
  tốt trong render, QR và vịt nhỏ nằm ngoài phần nội dung. Chưa kiểm tra bản giấy
  từ một máy in thật.
- Dấu ấn cá nhân đến từ hướng XAI, first paper, nhóm nghiên cứu và vịt nhỏ ở bản
  in. Không cần thêm mascot lớn, skill bars hay trang trí vào bản digital.

## Việc cần chỉnh theo ưu tiên

Không phát hiện lỗi format nghiêm trọng trong lần kiểm tra này.

### Important — Làm rõ ngữ cảnh số liệu SmokeNet và ASR

“Reported MAE 0.7470, R² 0.9545” chưa cho biết horizon, đơn vị của MAE hoặc dữ liệu
có được chuẩn hóa hay không. Cần đối chiếu protocol trước khi bổ sung; không tự
gắn µg/m³ vào con số. Đây là việc đã lưu trong backlog, không yêu cầu chủ CV gửi
lại tài liệu đang deferred.

“reported WER 33.09%, CER 15.28%” thiếu corpus/test split và decoding. Số liệu có
thể đọc được nhưng chưa đủ để so sánh chất lượng ASR. Giữ “reported” và link notes
cho tới khi có protocol; không viết rằng đã vượt PhoWhisper.

### Important — Chỉ rõ phần trực tiếp làm trong nghiên cứu chung

“Develop emotion recognition from speech and text…” chủ yếu mô tả hệ thống.
Vai trò “Second & Corresponding Author” chưa giải thích module, experiment hoặc
phần phân tích mà chủ CV trực tiếp phụ trách. Bổ sung khi có xác nhận, không mặc
định chủ CV tự làm toàn bộ pipeline.

Tương tự, đối chiếu các động từ “Developed” và “Designed” trong công trình
multimodal anomaly detection với contribution thực tế trước một đơn lab cụ thể.

### Important — Tách bằng chứng nghiên cứu và production ML

“Git, Docker, Linux, Weights & Biases, Streamlit, FastAPI” là danh sách kỹ năng,
chưa phải bằng chứng đã vận hành model service. Nếu JD yêu cầu serving, monitoring
hay latency, dùng artifact thật để chứng minh; không chuyển certificate thành
deployment hoặc thêm production impact giả.

### Polish — Giảm thuật ngữ khi đọc lướt

“Developed C-DLE with split-conformal calibration and Mondrian pools…” cần một
cụm giải thích mục đích dễ hiểu hơn. “Led manuscript writing and the 8-gate
provenance audit…” có thể ưu tiên audit đã thay đổi tập sự kiện thế nào.
Không cần lược bỏ phương pháp quan trọng ở bản gửi lab chuyên môn.

### Polish — Hoàn thiện thông tin hành chính khi đã rõ

“FCAJ Cloud Intern, Team NeuraX | 2026” không đủ để suy ra ngày bắt đầu/kết thúc.
Giữ như hiện tại cho tới khi chủ CV xác nhận. Không ghi là nhân viên AWS.
PPE thiếu ngày do các nguồn cũ mâu thuẫn; không tự chọn một ngày.

## Ba cách viết lại để cân nhắc

Các câu dưới đây chỉ là đề xuất review, chưa thay nội dung CV đang phát hành.
Không thêm số liệu hoặc phần việc mới.

1. **Trước:** “Inspected forecasts with SHAP, Integrated Gradients and DiCE.”
   **Đề xuất:** “Used SHAP, Integrated Gradients and DiCE to inspect PM2.5
   forecasts.” Cụ thể hóa đối tượng phân tích, không tuyên bố đã chứng minh causal
   explanation hoặc tăng độ tin cậy của người dùng.
2. **Trước:** “Led manuscript writing and the 8-gate provenance audit: 22 apparent
   episode starts reduced to 3 eligible incidents.”
   **Đề xuất:** “Led manuscript writing and audited event provenance, retaining
   3 eligible incidents from 22 apparent episode starts.” Giữ nguyên số liệu và
   đóng góp, giảm thuật ngữ nội bộ.
3. **Trước:** “Developed C-DLE with split-conformal calibration and Mondrian pools
   for false-alarm control under missing modalities.”
   **Đề xuất:** “Developed C-DLE to control false alarms when modalities are
   missing, using split-conformal calibration and Mondrian pools.” Đưa mục đích
   lên trước; cần giữ đúng contribution như lưu ý ở trên.

## Cách dùng hai bản

Research/lab: dùng research CV 2 trang, ưu tiên paper và phương pháp liên quan
nhất với nhóm nhận hồ sơ. AI/ML engineering: dùng résumé 1 trang, thay thứ tự dự
án theo JD và làm rõ phần triển khai có bằng chứng. Print dùng cùng nội dung theo
vai trò; không cần một câu chuyện nghề nghiệp khác với digital.

Các thiếu sót về artifact/protocol đã được ghi trong `notes/portfolio-backlog.md`
và `notes/career-skills-review.md`. Không cần thêm chứng chỉ để thay thế chúng.

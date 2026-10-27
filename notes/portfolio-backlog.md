# Portfolio: những gì còn thiếu để bổ sung sau

Cập nhật: 2026-10-27. Chủ portfolio yêu cầu để phần tài liệu/demo chưa có lại
sau và lưu danh sách này để tiếp tục trong các phiên làm việc tới.

Giữ hướng Sculpture xanh, vịt chạy và nội dung research-first hiện tại.
Không cần mở lại vòng chọn concept để xử lý các mục dưới đây.

## Ưu tiên 1 — Bằng chứng nghiên cứu SmokeNet

- [ ] PDF cuối cùng của paper hoặc bản tác giả để đối chiếu bảng kết quả,
  thông tin xuất bản và mô tả thí nghiệm.
- [ ] Đầu ra dự báo và ground truth trên cùng tập test: timestamp, đơn vị,
  horizon và cách chia dữ liệu. Dùng để vẽ forecast vs actual.
- [ ] Bảng baseline gốc, kèm cùng protocol/split. Phân biệt kết quả held-out
  2024 (35.9% giảm MAE so với XGBoost) với backtest sự kiện tháng 5/2024
  (57.7% giảm MAE so với baseline); không gộp hai phạm vi.
- [ ] Một ví dụ SHAP / Integrated Gradients / counterfactual thật, có đầu vào,
  prediction, hình attribution và phần diễn giải ngắn của tác giả.

Đích triển khai: `/projects/smokenet-air-quality`, sau đó chọn một hình kết quả
để dẫn từ publication trên homepage. Đừng tạo đường dự báo, attribution hay
bảng benchmark giả để lấp chỗ trống.

Đã kiểm tra repo công khai
[melbourne-air-quality-forecast](https://github.com/SpeedyLabX/melbourne-air-quality-forecast):
nhánh `main` có dữ liệu, notebook thu thập và EDA; chưa tìm thấy artifact dự báo
hay XAI cần cho phần trên. README còn ghi giai đoạn planning/data collection;
không coi nó là trạng thái xuất bản mới nhất. Notebook EDA có hình phân tích dữ
liệu, nhưng các hình đó không phải kết quả đánh giá SmokeNet.

## Ưu tiên 2 — Đầu ra thực tế của PPE và ASR

- [ ] PPE: link repo đúng project; 2–3 ảnh hoặc clip ngắn từ ứng dụng thật,
  gồm detection, confidence và cách chuyển sang safe/unsafe. Nếu có mAP/FPS,
  cần ghi rõ tập đánh giá và phần cứng trước khi hiển thị.
- [ ] ASR: link repo/model nếu chia sẻ được; một đoạn audio có transcript
  tham chiếu và transcript mô hình, ví dụ lỗi đáng chú ý.
- [ ] ASR: tên corpus, test split, decoding/normalization và protocol cho
  WER 33.09%, CER 15.28%. Hiện chỉ trình bày đây là số liệu được báo cáo.

Đích triển khai: `/projects/ppe-detection-system` và `/projects/vietnamese-asr`.
Giữ schematic được gắn nhãn rõ cho tới khi có đầu ra thực tế. Không dựng demo
giả hoặc dùng audio/ảnh không liên quan để minh họa như kết quả project.

## Có thể thêm khi chủ portfolio cung cấp

- [ ] Một vài ảnh chạy/trail hoặc ảnh do chủ portfolio chụp, kèm chú thích.
  Dùng cho About hoặc một dải ảnh nhỏ, không biến homepage thành gallery dài.
- [ ] Thời gian có thể bắt đầu internship, lịch làm việc và ưu tiên địa điểm.
  Hiện chỉ dùng định hướng đã xác nhận: research + AI/ML engineering.
- [ ] FCAJ: xác nhận ngày bắt đầu/kết thúc và trạng thái chương trình.
  Chủ portfolio chưa xác nhận đã kết thúc; không tự ghi completed hay
  suy ra đang là nhân viên AWS.
- [ ] PPE: xác nhận thời gian thực hiện. Bản LaTeX chủ portfolio gửi ghi
  09–11/2025, còn case MDX ghi 09/2024. CV hiện để “Course project”, chưa ghi
  mốc tháng/năm; không tự chọn một mốc để đồng bộ.

## Nguồn CV đã nhập

Chủ portfolio đã gửi nguồn Overleaf `resume_havard_ver.tex.txt`. Bản gốc và CV
cũ nằm trong `docs/cv/original/`; bản đang chỉnh là
`docs/cv/resume_havard_ver.tex`. Thư mục `docs/` được ignore và chỉ có trên máy
này. Dùng `python scripts/build-cv.py` để xuất bản kiểm tra; chỉ thêm `--publish`
sau khi đã kiểm tra hai trang PDF. Xem `design/cv-update.md` để biết nguồn thông
tin và các mục đã đồng bộ.

## Khi tiếp tục

Ghi chú kỹ thuật: dependency đã được vá trong đợt deploy 2026-10-27; xem
`design/dependency-maintenance.md`. ESLint 8 và một số công cụ build còn báo
deprecated. Việc nâng major của tooling nên làm thành một lượt riêng, có build
và kiểm tra lại; không tự đổi major Next.js hay Tailwind trong lúc thêm nội dung.

1. Đọc file này cùng `AGENTS.md` và `design/recruiter-content-refinement.md`.
2. Kiểm tra tài liệu chủ portfolio vừa cung cấp và nguồn gốc artifact.
3. Ưu tiên hoàn thiện SmokeNet trước, rồi demo PPE/ASR. Bổ sung vào case study
   để homepage vẫn gọn; giữ publication và cả bốn project dễ tìm.
4. Đánh dấu mục đã hoàn tất, ghi nguồn và kiểm tra desktop/mobile sau khi sửa.

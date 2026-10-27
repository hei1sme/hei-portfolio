# Portfolio: những gì còn thiếu để bổ sung sau

Cập nhật: 2026-10-27. Chủ portfolio yêu cầu để phần tài liệu/demo chưa có lại
sau và lưu danh sách này để tiếp tục trong các phiên làm việc tới.

Giữ hướng Sculpture xanh, vịt chạy và nội dung research-first hiện tại.
Không cần mở lại vòng chọn concept để xử lý các mục dưới đây.

## Ưu tiên 1 — Bằng chứng nghiên cứu SmokeNet

- [x] Đã nhận bản camera-ready và đối chiếu thiết lập 48-hour input,
  next-day mean PM2.5, đơn vị gốc và test 2024. Nguồn giữ riêng trong `cv-inbox/`.
- [ ] Đầu ra dự báo và ground truth trên cùng tập test: timestamp, đơn vị,
  horizon và cách chia dữ liệu. Dùng để vẽ forecast vs actual.
- [ ] Bảng baseline gốc, kèm cùng protocol/split. Phân biệt kết quả held-out
  2024 (35.9% giảm MAE so với XGBoost) với backtest sự kiện tháng 5/2024
  (57.7% giảm MAE so với baseline); không gộp hai phạm vi.
- [ ] Đối chiếu baseline table trong paper với log gốc: lượt scan CV phát hiện
  một bất nhất MAE/RMSE cần kiểm tra. Homepage hiện dẫn bằng phương pháp và phạm
  vi đánh giá thay cho KPI hiệu năng; không tự sửa số liệu paper.
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
- [x] FCAJ: chứng nhận và chủ CV đã xác nhận cùng đợt OJT Jan–May 2026, đã hoàn
  thành đợt được chứng nhận. Report dùng một khoảng planned ngắn hơn; ưu tiên
  chứng nhận cho CV. Người dùng còn ở cộng đồng/nhóm nhưng trạng thái tiếp tục
  chưa rõ; không tự kéo OJT tới Present hoặc suy ra current AWS employment.
- [ ] PPE: xác nhận thời gian thực hiện. Bản LaTeX chủ portfolio gửi ghi
  09–11/2025, còn case MDX ghi 09/2024. CV hiện để “Course project”, chưa ghi
  mốc tháng/năm; không tự chọn một mốc để đồng bộ.

## Đợt paper, experience và cuộc thi đã tiếp nhận

- [x] Một paper published và bốn manuscript under review. Bloom đã chuyển từ
  AJCAI bị từ chối sang ACIIDS 2027; AISTATS 2027 là paper mới. Author lists và
  trạng thái được cập nhật trên homepage, không public bản manuscript.
- [x] NutriTrack/FCAJ có experience và case study; BioListen và CosmicOptic có
  visual/case riêng, cùng CV downloads đã đồng bộ.
- [x] VAIC: chủ CV xác nhận hạng 6 vòng 1, không phải hạng chung cuộc hoặc giải.
- [x] CosmicOptic: chủ CV làm frontend/backend; repo web hiện dùng synthetic
  inference. Không gán accuracy hiển thị hoặc SHAP demo thành kết quả model thật.
- [ ] Contribution chi tiết của từng paper, khi chủ CV bổ sung. Giữ co-authored
  ở các phần chưa xác nhận module/experiment, không tự nâng thành led/designed.
- [ ] TeamFinder: repo hiện chủ CV chưa tìm lại được, đã deferred. Mô tả đã rõ
  là web tìm đồng đội môn học; không hỏi lại link trước khi có thông tin mới.
- [ ] CosmicOptic: model cuối/real inference nếu có sau này. Không dùng việc chưa
  có link model để phủ nhận contribution web/API đã xác nhận.

FPT Hackathon 2025 là thi lập trình giải thuật kiểu ICPC, không phải một project
app. Không tiếp tục đòi repo/sản phẩm hoặc tự ghi official ICPC affiliation.

## Nguồn CV đã nhập

Chủ portfolio đã gửi nguồn Overleaf `resume_havard_ver.tex.txt`. Bản gốc và CV
cũ nằm trong `docs/cv/original/`; bản đang chỉnh là
`docs/cv/resume_havard_ver.tex`. Thư mục `docs/` được ignore và chỉ có trên máy
này. Dùng `python scripts/build-cv.py` để xuất bản kiểm tra; chỉ thêm `--publish`
sau khi đã kiểm tra cả bốn PDF (6 trang). Bản research có 2 trang; bản AI/ML trong
`docs/cv/resume_ai_ml.tex` có 1 trang. Mỗi bản có edition digital và print A4,
dùng chung `docs/cv/cv-style.tex`. Link digital ở Education; link bản in nằm
trong mục “Print editions · A4”.
Xem `design/cv-update.md` để biết nguồn thông tin và các mục đã đồng bộ;
`notes/career-skills-review.md` ghi cách dùng các skill CV/job và phần cần làm
khi có JD cụ thể. Tài liệu ứng tuyển riêng nằm trong `docs/career/` (ignored).

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

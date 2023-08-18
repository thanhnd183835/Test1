# Test1

khó khăn: chưa nghĩ dc giao diện , css không đẹp
giải quyết: tham khảo trên google, chatGPT
Redux: quản lý trạng thái của ứng dụng,
cấu trúc redux: store, actions, reducers

- actions là một sự kiện, các actions được gửi bằng phương thức store.dispath()
- reducers: là các hàm thuần túy lấy trạng thái hiện tại của ứng dụng, thực hiện một hành động và trả về trạng thái mới. Các trạng thái được lưu trữ dưới dạng đối tượng và chúng xác định trạng thái của ứng dụng thay đổi như thế nào để đáp ứng với hành động được gửi đến "store".
- store: nơi giữ trạng thái ứng dụng, chỉ có một store
  nên dùng redux:
- dễ dàng theo dõi các thay đổi trạng thá, dễ debug.
  không nên:
- viết nhiều mã boilerplate để định nghĩa các actions, reducers và constants
- ứng dụng nhỏ k cần dùng vì gây phức tạp

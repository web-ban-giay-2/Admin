import { colors } from "@mui/material";


const DeleteBtn = ({productId }: {productId: number}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7080/api/Product/${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Xử lý khi xóa thành công
        alert("Xoá sản phẩm thành công")
        // ... (cập nhật giao diện, tải lại danh sách, đặt lại form)
        window.location.reload();
      } else {
        alert("Xoá thất bại.")
      }
    } catch (error) {
      console.error("Error deleting resource:", error)
    }
  }

  return (
    <>
      <a className="btn" style={{ color: "red" }} role="button" data-bs-toggle="modal" data-bs-target={`#${productId}`}>
      <i className="fa-solid fa-trash"></i>
      </a>
      <div className="modal fade" id={`${productId}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Xoá sản phẩm
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">Bạn có chắc chắn muốn xoá sản phẩm #{productId} không!</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} style={{color: "white", backgroundColor: "red"}}>
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteBtn

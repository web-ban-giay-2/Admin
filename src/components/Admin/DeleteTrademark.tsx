

const DeleteTrademark = ({ id }: { id: string }) => {

    const handleDelete = async () => {
        try {
          const response = await fetch(`https://localhost:7080/api/Trademark/${id}`, {
            method: "DELETE",
          })
    
          if (response.ok) {
            // Xử lý khi xóa thành công
            const data = await response.json()
            if(data.code === 401){
              alert(data.message)
              window.location.reload();
            } else {
              alert("Xoá thương hiệu thành công")
              window.location.reload();
            }
            // ... (cập nhật giao diện, tải lại danh sách, đặt lại form)
          } else {
            alert("Xoá thất bại.")
          }
        } catch (error) {
          console.error("Error deleting resource:", error)
        }
      }

  return (
    <>
        <a type='button' className="btn"  data-bs-toggle="modal" data-bs-target={`#${id}`}><i className="fa-solid fa-trash" style={{ color: "red" }}></i></a>
        <div className="modal fade" id={`${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Xoá thương hiệu
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">Bạn có chắc chắn muốn xoá thương hiệu #{id} không!</div>
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

export default DeleteTrademark
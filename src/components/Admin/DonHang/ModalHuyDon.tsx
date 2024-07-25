

const ModalHuyDon = ({ id }: { id: number }) => {
    const huyDon = async (id: number) => {
        const response = await fetch(`https://localhost:7080/api/DonHang/HuyDon/${id}`, {
          method: "PUT",
        })
    
        if (response.ok) {
          console.log("Huỷ đơn thành công!")
          window.location.reload()
        }
      }

  return (
    <>
        <a type="button" data-bs-toggle="modal" data-bs-target={`#${id}`}>
            <i className="fa-solid fa-trash" style={{ color: "red", margin: 10 }}></i>
        </a>
      <div className="modal fade" id={`${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Huỷ đơn hàng
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">Bạn có chắc chắn muốn huỷ đơn hàng #{id} không!</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="button" className="btn btn-danger" onClick={() => huyDon(id)} style={{color: "white", backgroundColor: "red"}}>
                Huỷ đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalHuyDon

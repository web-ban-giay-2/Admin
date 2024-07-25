const ModalBanTk = (pro: { id: number, name: string }) => {
  const banTk = async (id: number) => {
    const response = await fetch(`https://localhost:7080/api/TaiKhoan/ban-tk/${id}`, {
      method: "POST",
    })

    if (response.ok) {
      console.log("Ban tài khoản!")
      alert("Ban tài khoản thành công!")
      window.location.reload()
    }
  }
  return (
    <>
      <a type="button" data-bs-toggle="modal" data-bs-target={`#${pro.id}`}>
        <i className="fa-solid fa-x" style={{ color: "red" }}></i>
      </a>
      <div className="modal fade" id={`${pro.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Ban tài khoản
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">Bạn có chắc chắn muốn ban tài khoản -{pro.name}- không!</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-danger" onClick={() => banTk(pro.id)} style={{color: "white", backgroundColor: "red"}}>
                Ban
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalBanTk

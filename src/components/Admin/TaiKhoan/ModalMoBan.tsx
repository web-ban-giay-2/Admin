

const ModalMoBan = (pro: { id: number, name: string }) => {

    const moBanTk = async (id: number) => {
        const response = await fetch(`https://localhost:7080/api/TaiKhoan/mo-ban-tk/${id}`, {
          method: "POST",
        })
    
        if (response.ok) {
          console.log("mở ban tài khoản!")
          alert("Mở ban tài khoản thành công!")
          window.location.reload()
        }
      }
  return (
    <>
        <a type='button' className='btn' data-bs-toggle='modal' data-bs-target={`#${pro.id}`}>
        <i className="fa-solid fa-check" style={{ color: "green" }}></i>
        </a>
        <div className="modal fade" id={`${pro.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Mở ban tài khoản
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">Bạn có chắc chắn muốn mở ban tài khoản -{pro.name}- không!</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={() => moBanTk(pro.id)}>
                Mở ban
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ModalMoBan
import React, { useState } from "react"

const CreateTrademark = () => {
  const [productData, setProductData] = useState({
    name: "",
  })
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget || {}
    setProductData({
      ...productData,
      [name]: value,
    })
  }

  const handleSubmitTrademark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("https://localhost:7080/api/Trademark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        
        alert("Thêm thương hiệu thành công!")
        window.location.reload()
      } else {
        // Xử lý lỗi
        alert("Có lỗi xảy ra khi thêm sản phẩm.")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm thương hiệu
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitTrademark} id="trademark-form">
                <div className="mb-6">
                  <label className="form-label">Tên thương hiệu</label>
                  <input type="text" className="form-control" name="name" id="" aria-describedby="helpId" placeholder="" onChange={handleInputChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="submit" className="btn btn-primary" form="trademark-form">
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTrademark

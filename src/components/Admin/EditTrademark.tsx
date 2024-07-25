import React, { useEffect, useState } from 'react'
import { TrademarkType } from './Product/Product'
import { number, string } from 'yup';
 
const EditTrademark = ({id, name} : {id: string, name: string}) => {

    const [TradeMarkdata, setTradeMark] = useState({
        id: '',
        name: '',
    })

    useEffect(() => {
        // Use the destructured variables here
        setTradeMark({
          ...TradeMarkdata,
          id: id,
          name: name
        })
      }, [id, name]);
      console.log(TradeMarkdata)

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.currentTarget || {}
        setTradeMark({
          ...TradeMarkdata,
          [name]: value,
        })
      }


    const handleSubmitTrademark = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const response = await fetch(`https://localhost:7080/api/Trademark/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(TradeMarkdata),
            })

            if (response.ok) {
                alert("Sua thuong hiệu thanh cong")
                window.location.reload()
                
            } else {
                // Xu ly loi
                alert("Co loi xay ra khi sua thuong hiệu")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

  return (
    <>
        <div className="modal fade" id={"exampleModal" + id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Sửa thương hiệu : {name}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitTrademark} id={"trademark-form" + id}>
                <div className="mb-6">
                  <label className="form-label">Tên thương hiệu</label>
                  <input type="text" name="name" value={TradeMarkdata.name} onChange={handleInputChange} className="form-control" id="" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Đóng
              </button>
              <button type="submit" className="btn btn-primary" form={"trademark-form" + id}>
                Sửa
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditTrademark
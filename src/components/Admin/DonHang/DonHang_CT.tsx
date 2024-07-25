import React, { useEffect, useState } from "react"

const DonHang_CT = ({ id, pro }: { id: number; pro: any }) => {
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  useEffect(() => {
    //tìm sản phẩn có id = id
    setData2(pro.dh_ChiTiets)
    setData(pro)
    console.log(pro)
  }, [])
  return (
    <>
      <tr className="collapse" id={`${id}`}>
        <td colSpan={6}>
          <h3 className="text-center">Chi tiết đơn hàng</h3>
          <div>
            <span className="text-start">Thời gian tạo đơn : {pro.timeCreate}</span>
            <p>
              <strong>Sản phẩm trong đơn hàng</strong>
            </p>
            <table className="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">ID</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Thương hiệu</th>
                  <th scope="col">Size</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Tổng</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data2.map((item : any, index: number) => {
                  return(
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <th>{item.id}</th>
                      <td>{item.nameProduct}</td>
                      <td>{item.trademark}</td>
                      <td>{item.size}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.tong}</td>
                    </tr>
                  )
                    
                })}

                <tr>
                  <th scope="row" colSpan={7}>
                    Tổng:
                  </th>
                  
                  <th>{pro.tongTien}</th>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="col-6">Tên người nhận hàng :</div>
                  <div className="col-6">
                    <strong>{pro.hoTen}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">Số điện thoại :</div>
                  <div className="col-6">
                    <strong>{pro.sdt}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">Địa chỉ :</div>
                  <div className="col-6">
                    <strong>{pro.diaChi}</strong>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">Ghi chú :</div>
                  <div className="col-6">
                    <strong>{pro.ghiChu}</strong>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row" style={{ paddingRight: "23px" }}>
                  <div className="col-6 text-end">phí ship :</div>
                  <div className="col-6 text-end pe-4">
                    <strong>Free</strong>
                  </div>
                  <div className="col-6 text-end">Tổng tiền :</div>
                  <div className="col-6 text-end pe-4">
                    <strong>{pro.tongTien}</strong>
                  </div>
                  {/* <div className="col mt-3">
                    <a className="btn btn-danger" style={{ backgroundColor: "red" }}>Hủy đơn</a>
                  </div>
                  <div className="col mt-3">
                    <a className="btn btn-primary">Duyệt đơn</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default DonHang_CT

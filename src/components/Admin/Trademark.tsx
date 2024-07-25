import React, { useEffect, useState } from "react"
import CreateTrademark from "./CreateTrademark"
import { TrademarkType } from "./Product/Product"
import EditTrademark from "./EditTrademark"
import DelateTrademark from "./DeleteTrademark"
import { string } from "yup"

const Trademark = () => {
  const [TradeMarkdata, setTradeMark] = useState<TrademarkType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTradeMark = await fetch("https://localhost:7080/api/Trademark")
        const jsonTradeMarkData = await responseTradeMark.json()

        setTradeMark(jsonTradeMarkData)

        console.log(jsonTradeMarkData)
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="row p-2" style={{ margin: "0 auto", marginLeft: "200px", width: "1000px" }}>
        <div className="col-8 shadow p-3 mb-5 rounded p-5 me-5">
          <h1>Thương hiệu</h1>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i className="fa-solid fa-plus"></i> Thêm thương hiệu
          </button>
          <table className="table mt-3">
            <thead>
              <tr className="table-primary text-center">
                <th scope="col">Tên</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {TradeMarkdata.map((trademark) => (
                <tr key={trademark.id}>
                  <td>{trademark.name}</td>
                  <td className="text-center">
                    <a type="button" className="btn me-3" data-bs-toggle="modal" data-bs-target={"#exampleModal" + trademark.id}>
                    <i className="fa-solid fa-pen-to-square" aria-hidden="true" style={{ color: "blue" }}></i>
                    </a>
                    <DelateTrademark id={trademark.id}/>
                    <EditTrademark id={trademark.id} name={trademark.name}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CreateTrademark />
          
        </div>
      </div>
    </>
  )
}

export default Trademark

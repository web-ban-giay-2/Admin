import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DeleteBtn from "./DeleteBtn"
import ReactPaginate from "react-paginate"



interface ProTYpe {
  currentPage: number
  totalItems: number
  totalPages: number
  items: {
    id: number
    name: string
    price: number
    description: string
    trademark: string
    trangThai: boolean
    images: {
      id: number
      name: string
      productId: number
    }[]
    productDetails: {
      id: number
      size: number
      quantity: number
      productId: number
    }[]
  }[]
}

export type TrademarkType = {
  id: "int"
  name: "string"
  productId: "int"
}

export const LinkImg = "https://localhost:7080/api/Image/get-pro-img/"

const Product = () => {
  const [data, setData] = useState<ProTYpe>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  })
  const [TradeMarkdata, setTradeMark] = useState<TrademarkType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadProduct(1)
        const responseTradeMark = await fetch("https://localhost:7080/api/Trademark")
        const jsonTradeMarkData = await responseTradeMark.json()
        setTradeMark(jsonTradeMarkData)
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }

    fetchData()
  }, [])
  console.log(data)

  const loadProduct = async (page: number) => {
    try {
      const response = await fetch(`https://localhost:7080/api/Product/getAll-form-admin/${page}`)
      setData(await response.json())
    } catch (error) {
      console.error("Lỗi etching data:", error)
    }
  }

  const handlePageClick = (e : any) => {
    loadProduct(+e.selected + 1)
  }

  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      <a className="btn btn-primary" href="product/create" role="button">
        <i className="fa-solid fa-plus"></i> Thêm
      </a>
      <table className="table mt-3">
        <thead>
          <tr className="table-primary text-center">
            <th scope="col">Hình</th>
            <th scope="col">Tên</th>
            <th scope="col">Giá</th>
            <th scope="col">Mô tả</th>
            <th scope="col" style={{ width: "114px" }}>
              Thương hiệu
            </th>
            <th scope="col">Trạng thái</th>
            <th scope="col" style={{ width: "126px" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((pro) => (
            <tr key={pro.id} className="text-center">
              <td>
                <img src={`${LinkImg}${pro.images[0]?.name}`} alt="" style={{ width: "50px" }} />
              </td>
              <td className="align-middle">{pro.name}</td>
              <td className="align-middle">{pro.price}</td>
              <td className="align-middle">{pro.description}</td>
              <td className="align-middle">{pro.trademark}</td>
              <td className="align-middle">{pro.trangThai === true ? <span className="badge rounded-pill text-bg-success">Đang bán</span> : <span className="badge rounded-pill text-bg-danger">Ngừng bán</span>}</td>
              <td className="align-middle">
                <Link className="btn" style={{ color: "blue" }} to={`edit/${pro.id}`} role="button">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                {pro.trangThai === true ? <DeleteBtn productId={pro.id} /> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate nextLabel=">>" onPageChange={handlePageClick} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={data.totalPages} previousLabel="<<" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} />
    </>
  )
}

export default Product

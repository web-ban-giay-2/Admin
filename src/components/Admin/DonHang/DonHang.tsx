import React, { useEffect, useState } from "react"
import DonHang_CT from "./DonHang_CT"
import { styled } from "@mui/material"
import "./DonHang.css"
import ReactPaginate from "react-paginate"
import ModalHuyDon from "./ModalHuyDon"

interface donhangType {
  currentPage: number
  totalItems: number
  totalPages: number
  items: {
    id: number
    timeCreate: string
    trangThai_ThanhToan: boolean
    trangThai_DonHang: string
    tenTaiKhoan: string
    tongTien: number
    hoTen : string
    sdt : string
    diaChi : string
    ghiChu : string
  }[]
}

const DonHang = () => {
  const [data, setData] = useState<donhangType[]>([])
  const [donhang, setDonhang] = useState<donhangType[]>([])
  const [activeTab, setActiveTab] = useState(0)
  const [DH_choDuyet, setDH_choDuyet] = useState<donhangType>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  })
  const [DH_dangGiao, setDH_dangGiao] = useState<donhangType>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  })
  const [DH_daGiao, setDH_daGiao] = useState<donhangType>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  })
  const [DH_daHuy, setDH_daHuy] = useState<donhangType>({
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7080/api/DonHang`)
        await setData(await response.json())
        await load_DH_choDuyet(1)
        await load_dangGiao(1)
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }

    fetchData()
  }, [])
  const load_DH_choDuyet = async (page: number) => {
    const response_choDuyet = await fetch(`https://localhost:7080/api/DonHang/ChoDuyet/${page}`)
    setDH_choDuyet(await response_choDuyet.json())
    setActiveTab(0)
  }


  const load_dangGiao = async (page: number) => {
    if(page === null) {
      page = 1
    }
    const response = await fetch(`https://localhost:7080/api/DonHang/DangGiao/${page}`)
    setDH_dangGiao(await response.json())
    setActiveTab(1)
  }

  const load_daGiao = async (page: number) => {
    if(page === null) {
      page = 1
    }
    const response = await fetch(`https://localhost:7080/api/DonHang/DaGiao/${page}`)
    setDH_daGiao(await response.json())
    setActiveTab(2)
  }

  const daHuy = async (page: number) => {
    if(page === null) {
      page = 1
    }
    const response = await fetch(`https://localhost:7080/api/DonHang/DaHuy/${page}`)
    setDH_daHuy(await response.json())
    setActiveTab(3)
  }

  const duyetDon = async (id: number) => {
    const response = await fetch(`https://localhost:7080/api/DonHang/DuyetDon/${id}`, {
      method: "PUT",
    })

    if (response.ok) {
      console.log("Duyệt đơn thành công!")
      // ... (cập nhật giao diện, tải lại danh sách, đặt lại form)
      load_DH_choDuyet(1)
      load_dangGiao(1)
    }
  }

  

  const actice = {
    color: "white",
    backgroundColor: "#5d87ff",
  }
  if (!DH_choDuyet) {
    ;<div>...Loading</div>
  }

  const handlePageClick_choDuyet = (e : any) => {

    load_DH_choDuyet(+e.selected + 1)
  }
  const handlePageClick_dangGiao = (e : any) => {
    load_dangGiao(+e.selected + 1)
  }

  const handlePageClick_daGiao = (e : any) => {

    load_daGiao(+e.selected + 1)
  }

  const handlePageClick_daHuy = (e : any) => {

    daHuy(+e.selected + 1)
  }

  return (
    <>
      <h2>Đơn hàng</h2>

      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => load_DH_choDuyet(1)}>
            Chờ duyệt<span className="badge text-bg-warning ms-1">{DH_choDuyet.items.length}</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => load_dangGiao(1)}>
            Đang giao <span className="badge text-bg-warning ms-1">{DH_dangGiao.items.length}</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => load_daGiao(1)}>
            Đã giao
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-dahuy" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => daHuy(1)}>
            Đã huỷ
          </button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
          <table className="table align-middle table-condensed table-hover text-center table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Trang thái thanh toán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {DH_choDuyet.items.map((donHang) => (
                <>
                  <tr key={donHang.id}>
                    <td>{donHang.id}</td>
                    <td>{donHang.tenTaiKhoan}</td>
                    <td>100</td>
                    <td>{donHang.tongTien}</td>
                    <td>{donHang.trangThai_ThanhToan ? <span className="badge rounded-pill text-bg-success">Đã thanh toán</span> : <span className="badge rounded-pill text-bg-danger">Chưa thanh toán</span>}</td>
                    <td>
                      {donHang.trangThai_ThanhToan === false ? (
                        <ModalHuyDon id={donHang.id} />
                      ) : null}

                      {donHang.trangThai_DonHang === "Đang giao" || donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => duyetDon(donHang.id)}>
                          <i className="fa-solid fa-check" style={{ color: "blue", margin: 10 }}></i>
                        </a>
                      ) : null}

                      <a data-bs-toggle="collapse" href={`#${donHang.id}`} role="button" aria-expanded="false" aria-controls={`${donHang.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ color: "green", margin: 10 }}></i>
                      </a>
                    </td>
                  </tr>
                  <DonHang_CT id={donHang.id} pro={donHang} />
                </>
              ))}
            </tbody>
          </table>
          <ReactPaginate nextLabel="next >" onPageChange={handlePageClick_choDuyet} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={DH_choDuyet.totalPages} previousLabel="< previous" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} />
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
          <table className="table align-middle table-condensed table-hover text-center table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Trang thái thanh toán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {DH_dangGiao.items.map((donHang) => (
                <>
                  <tr key={donHang.id}>
                    <td>{donHang.id}</td>
                    <td>{donHang.tenTaiKhoan}</td>
                    <td>100</td>
                    <td>{donHang.tongTien}</td>
                    <td>{donHang.trangThai_ThanhToan ? <span className="badge rounded-pill text-bg-success">Đã thanh toán</span> : <span className="badge rounded-pill text-bg-danger">Chưa thanh toán</span>}</td>
                    <td>
                      {donHang.trangThai_DonHang === "Đang giao" || donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => duyetDon(donHang.id)}>
                          <i className="fa-solid fa-check" style={{ color: "blue", margin: 10 }}></i>
                        </a>
                      ) : null}

                      <a data-bs-toggle="collapse" href={`#${donHang.id}`} role="button" aria-expanded="false" aria-controls={`${donHang.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ color: "green", margin: 10 }}></i>
                      </a>
                    </td>
                  </tr>
                  <DonHang_CT id={donHang.id} pro={donHang} />
                </>
              ))}
            </tbody>
          </table>
          <ReactPaginate nextLabel="next >" onPageChange={handlePageClick_dangGiao} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={DH_dangGiao.totalPages} previousLabel="< previous" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} />
        </div>
        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
          <table className="table align-middle table-condensed table-hover text-center table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Trang thái thanh toán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {DH_daGiao.items.map((donHang) => (
                <>
                  <tr key={donHang.id}>
                    <td>{donHang.id}</td>
                    <td>{donHang.tenTaiKhoan}</td>
                    <td>100</td>
                    <td>{donHang.tongTien}</td>
                    <td>{donHang.trangThai_ThanhToan ? <span className="badge rounded-pill text-bg-success">Đã thanh toán</span> : <span className="badge rounded-pill text-bg-danger">Chưa thanh toán</span>}</td>
                    <td>
                      {donHang.trangThai_DonHang === "Đang giao" || donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => duyetDon(donHang.id)}>
                          <i className="fa-solid fa-check" style={{ color: "blue", margin: 10 }}></i>
                        </a>
                      ) : null}

                      <a data-bs-toggle="collapse" href={`#${donHang.id}`} role="button" aria-expanded="false" aria-controls={`${donHang.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ color: "green", margin: 10 }}></i>
                      </a>
                    </td>
                  </tr>
                  <DonHang_CT id={donHang.id} pro={donHang} />
                </>
              ))}
            </tbody>
          </table>
          <ReactPaginate nextLabel="next >" onPageChange={handlePageClick_daGiao} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={DH_daGiao.totalPages} previousLabel="< previous" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} />
        </div>
        <div className="tab-pane fade" id="pills-dahuy" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
          <table className="table align-middle table-condensed table-hover text-center table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Trang thái thanh toán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {DH_daHuy.items.map((donHang) => (
                <>
                  <tr key={donHang.id}>
                    <td>{donHang.id}</td>
                    <td>{donHang.tenTaiKhoan}</td>
                    <td>100</td>
                    <td>{donHang.tongTien}</td>
                    <td>{donHang.trangThai_ThanhToan ? <span className="badge rounded-pill text-bg-success">Đã thanh toán</span> : <span className="badge rounded-pill text-bg-danger">Chưa thanh toán</span>}</td>
                    <td>
                      {donHang.trangThai_DonHang === "Đang giao" || donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => duyetDon(donHang.id)}>
                          <i className="fa-solid fa-check" style={{ color: "blue", margin: 10 }}></i>
                        </a>
                      ) : null}

                      <a data-bs-toggle="collapse" href={`#${donHang.id}`} role="button" aria-expanded="false" aria-controls={`${donHang.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ color: "green", margin: 10 }}></i>
                      </a>
                    </td>
                  </tr>
                  <DonHang_CT id={donHang.id} pro={donHang} />
                </>
              ))}
            </tbody>
          </table>
          <ReactPaginate nextLabel="next >" onPageChange={handlePageClick_daHuy} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={DH_daHuy.totalPages} previousLabel="< previous" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" activeClassName="active" renderOnZeroPageCount={null} />
        </div>
      </div>

      {/* <div className="tab-content">
        <div id="tab1" className="tab-pane fade show active">
          <h5>tab1</h5>
          <table className="table align-middle table-condensed table-hover text-center table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Trang thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {donhang.map((donHang) => (
                <>
                  <tr key={donHang.id}>
                    <td>{donHang.id}</td>
                    <td>{donHang.tenTaiKhoan}</td>
                    <td>100</td>
                    <td>{donHang.tongTien}</td>
                    <td>{donHang.trangThai_ThanhToan ? <span className="badge rounded-pill text-bg-success">Đã thanh toán</span> : <span className="badge rounded-pill text-bg-danger">Chưa thanh toán</span>}</td>
                    <td>
                      {donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => huyDon(donHang.id)}>
                          <i className="fa-solid fa-trash" style={{ color: "red", margin: 10 }}></i>
                        </a>
                      ) : null}

                      {donHang.trangThai_DonHang === "Đang giao" || donHang.trangThai_DonHang === "Chờ duyệt" ? (
                        <a onClick={() => duyetDon(donHang.id)}>
                          <i className="fa-solid fa-check" style={{ color: "blue", margin: 10 }}></i>
                        </a>
                      ) : null}

                      <a data-bs-toggle="collapse" href={`#${donHang.id}`} role="button" aria-expanded="false" aria-controls={`${donHang.id}`}>
                        <i className="fa-solid fa-pen-to-square" style={{ color: "green", margin: 10 }}></i>
                      </a>
                    </td>
                  </tr>
                  <DonHang_CT id={donHang.id} pro={donHang} />
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  )
}

export default DonHang

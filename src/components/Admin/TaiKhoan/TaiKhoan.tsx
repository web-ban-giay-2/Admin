import React, { useEffect, useState } from "react"
import ModalBanTk from "./ModalBanTk"
import ModalMoBan from "./ModalMoBan"

interface tkType {
  id: number
  username: string
  email: string
  timeCreate: string
  trangThai: boolean
  isAdmin: boolean
}

const TaiKhoan = () => {
  const [data, setData] = useState<tkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("https://localhost:7080/api/TaiKhoan/getAll-user")
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
          
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }
    fetchData()
  }, [])
  console.log(data)

  if (loading) return <div>Loading...</div>
  return (
    <>
      <h1>Quản lý tài khoản</h1>
      <table className="table mt-3">
        <thead>
          <tr className="table-primary text-center">
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Thời gian tạo tài khoản</th>
            <th scope="col">Trạng thài tài khoản</th>
            <th scope="col">Loại tài khoản</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((pro) => (
            <tr key={pro.id} className="text-center">
                <td className="align-middle">{pro.id}</td>
              <td className="align-middle">{pro.username}</td>
              <td className="align-middle">{pro.email}</td>
              <td className="align-middle">{pro.timeCreate.substring(0, 10)}</td>
              <td className="align-middle">{pro.trangThai ? <span className="badge rounded-pill text-bg-success">Đang hoạt động</span> : <span className="badge rounded-pill text-bg-danger">Bị ban</span>}</td>
              <td className="align-middle"><span className="badge rounded-pill text-bg-primary">User</span></td>
              <td className="align-middle">{ pro.trangThai ? <ModalBanTk id={pro.id} name={pro.username} /> : <ModalMoBan id={pro.id} name={pro.username} /> }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TaiKhoan

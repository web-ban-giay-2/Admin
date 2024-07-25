import React, { useEffect, useState } from "react"

const DangNhap = () => {
  const [tk, setTk] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    localStorage.removeItem("user")
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(tk)
    const response = await fetch(`https://localhost:7080/api/TaiKhoan/dang-nhap-admin/${tk.username}/${tk.password}`, {})
    if (response.ok) {
      await alert("Đăng nhập thành công")
      const data = await response.json()
      //xoá dữ liệu trong localStorage
      localStorage.removeItem("user")
      localStorage.setItem("user", [data.id, data.username].join())
      window.location.href = "/"
    } else {
      alert("Đăng nhập thất bại")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTk({ ...tk, [e.target.name]: e.target.value })
    console.log(tk)
  }

  return (
    <>
      <div className="container">
        <div style={{ marginTop: "50px", width: "70%", margin: "100px auto", padding: "50px 50px" }} className="shadow mb-5 rounded">
          <div style={{ textAlign: "center" }}>
            <img src="src/assets/img/logo/shoes-shop-logo-vector-store-260nw-1718721763.png" alt="" style={{ width: "400px" }} />
          </div>

          <h1 className="text-center">Đăng nhập Admin</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label>Tên tài khoản</label>
              <input type="text" name="username" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group my-3">
              <label>Mật khẩu</label>
              <input type="password" name="password" onChange={handleChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default DangNhap

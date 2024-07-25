import React, { useEffect, useState } from "react"
import { TextField, Button, FormControl, InputLabel, InputAdornment, FormHelperText, MenuItem } from "@mui/material"
import "../css/CreatePro.css"
import CreateTrademark from "../CreateTrademark"
import { Link } from "react-router-dom"
import { saveAs } from "file-saver"
import fs from "fs-extra"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import Product from "./Product"
import { number } from "yup"

export type TrademarkType = {
  id: "int"
  name: "string"
}

type ImgType = {
  nameImg: string
}

export type SPchiTietType = {
  id: string
  quantity: number
  size: number
}

const Create = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: 1,
    description: "",
    trademarkId: 0,
  })
  const [newSPchiTiet, setNewSPchiTiet] = useState<{ size: string; quantity: string }>({
    quantity: "",
    size: "",
  })
  const [SPchiTiet, setSPchiTiet] = useState<SPchiTietType[]>([])
  const [TradeMarkdata, setTradeMark] = useState<TrademarkType[]>([])
  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Trademark")
        const jsonData = await response.json()
        setTradeMark(jsonData)
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }
    fetchData()
  }, [])

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const onNewSpChiTietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setNewSPchiTiet({ ...newSPchiTiet, [name]: value })
  }
  const onAddSpChiTiet = () => {
    const formErrors = validateSize()
    setErrors(formErrors)
    if (Object.keys(formErrors).length === 0) {
      setSPchiTiet([
        ...SPchiTiet,
        {
          id: uuidv4(),
          size: Number(newSPchiTiet.size),
          quantity: Number(newSPchiTiet.quantity),
        },
      ])
      setNewSPchiTiet({ size: "", quantity: "" })
    }
    
  }
  console.log(newSPchiTiet)

  const onDeleteSpChiTiet = async (id: string) => {
    const newItems = await SPchiTiet.filter((item) => item.id !== id)
    await setSPchiTiet(newItems)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget || {}
    setProductData({
      ...productData,
      [name]: value,
    })
  }

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setProductData({
      ...productData,
      [name]: value,
    })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget
    setProductData({
      ...productData,
      [name]: parseInt(value),
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = await Array.from(e.target.files || [])
    await setImages((prevImages) => [...prevImages, ...files])
  }

  const UpLoadImage = async (ProductId: number) => {
    const formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i])
    }

    try {
      const response = await fetch(`https://localhost:7080/api/Image/${ProductId}`, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Image uploaded successfully:", data)
      } else {
        console.error("Image upload failed:", response.statusText)
      }
    } catch (error) {
      console.error("Image upload error:", error)
    }
  }

  const UpLoadCTSP = async (ProductId: number) => {
    const formData = new FormData()

    try {
      const response = await fetch(`https://localhost:7080/api/ProductDetail/${ProductId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SPchiTiet),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("ProductDetail uploaded successfully:", data)
      } else {
        console.error("ProductDetail upload failed:", response.statusText)
      }
    } catch (error) {
      console.error("ProductDetail upload error:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)
    if (Object.keys(formErrors).length === 0) {
      try {
        await fetch("https://localhost:7080/api/Product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }).then(async (response) => {
          if (response.ok) {
            response.json().then(async (data) => {
              const ProductId = data.id
              await UpLoadImage(ProductId)
              await UpLoadCTSP(ProductId)
              alert("Thêm sản phẩm thành công!")
              window.location.href = "/product"
            })
            // Sản phẩm được thêm thành công
          } else {
            // Xử lý lỗi
            alert("Có lỗi xảy ra khi thêm sản phẩm.")
          }
        })
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  const validateForm = () => {
    const formErrors: { [key: string]: string } = {}

    if (!productData.name) {
      formErrors.name = "Tên không được để trống!"
    }

    if (!productData.price) {
      formErrors.price = "Giá không được để trống"
    } else if (productData.price <= 1000) {
      formErrors.price = "Giá phải lớn hơn 1.000đ"
    }

    if (!SPchiTiet || SPchiTiet.length <= 0) {
      formErrors.sizes = "Phải thêm ít nhất 1 Size!"
    }

    if (productData.trademarkId === 0) {
      formErrors.trademark = "Phải chọn ít nhất 1 thương hiệu!"
    }
    if (images.length <= 0) {
      formErrors.images = "Phải thêm ít nhất 1 ảnh!"
    } else if (images.length > 5) {
      formErrors.images = "Chỉ được thêm tối đã 5 ảnh!"
    }

    return formErrors
  }

  const validateSize = () => {
    const formErrors: { [key: string]: string } = {}

    if(Number(newSPchiTiet.size) < 30 || Number(newSPchiTiet.size) > 50){
      formErrors.size = "Size phải từ 30 - 50!"
    }

    if(Number(newSPchiTiet.quantity) <= 1 || Number(newSPchiTiet.quantity) > 100){
      formErrors.quantity = "Số lượng phải từ 1 - 100!"
    }

    return formErrors
  }

  return (
    <>
      <div className="container px-5">
        <h1>Thêm sản phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="form-label">Tên sản phẩm</label>
            <input type="text" className="form-control" name="name" value={productData.name} onChange={handleInputChange} id="" aria-describedby="helpId" placeholder="" />
            {errors.name && <span className="validation-error">{errors.name}</span>}
          </div>
          <div className="mb-6">
            <label className="form-label">Giá</label>
            <input type="number" className="form-control" name="price" onChange={handleInputChange} id="" aria-describedby="helpId" placeholder="" />
            {errors.price && <span className="validation-error">{errors.price}</span>}
          </div>
          <div className="row mb-6">
            <div className="row">
              <div className="col-4">
                <label className="form-label">Số size : </label>
                <input className="form-control" type="number" value={newSPchiTiet.size} name="size" id="" onChange={onNewSpChiTietChange} />
                {errors.size && <span className="validation-error">{errors.size}</span>}
              </div>
              <div className="col-4">
                <label className="form-label">Số lượng: </label>
                <input className="form-control" type="number" name="quantity" value={newSPchiTiet.quantity} id="" onChange={onNewSpChiTietChange} />
                {errors.quantity && <span className="validation-error">{errors.quantity}</span>}
              </div>
              <div className="col-4">
                <div className="btn btn-primary mt-4" onClick={onAddSpChiTiet}>
                  Thêm
                </div>
              </div>
            </div>
            {errors.sizes && <span className="validation-error">{errors.sizes}</span>}

            <div className="row mt-2">
              <div className="col-8">
                {SPchiTiet.map((item) => {
                  return (
                    <>
                      <div className="row px-3" key={item.id}>
                        <div className="col-4">
                          <label className="form-label">Số size : {item.size}</label>
                        </div>
                        <div className="col-4">
                          <label className="form-label">Số lượng: {item.quantity}</label>
                        </div>
                        <div className="col-4">
                          <a className="btn" style={{ color: "red" }} onClick={() => onDeleteSpChiTiet(item.id)}>
                            <i className="fa-solid fa-x"></i>
                          </a>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
              <div className="col-4"></div>
            </div>
          </div>
          <div className="mb-6">
            <div className="row">
              <div className="col-9">
                <label className="form-label">Thương hiệu</label>
                <select className="form-select" name="trademarkId" value={productData.trademarkId} onChange={handleSelectChange}>
                  <option value="0">Chọn 1 thương thương hiệu</option>
                  {TradeMarkdata.map((trademark) => (
                    <option key={trademark.id} value={trademark.id}>
                      {trademark.name}
                    </option>
                  ))}
                </select>
                {errors.trademark && <span className="validation-error">{errors.trademark}</span>}
              </div>
              <div className="col-3">
                <label className="form-label" style={{ color: "blue" }}>
                  Chưa có thương hiệu!
                </label>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Thêm thương hiệu
                </button>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="form-label">Hình ảnh</label>
            <input type="file" className="form-control" name="image" onChange={handleFileChange} id="imgPro" aria-describedby="helpId" placeholder="" multiple />
            {errors.images && <span className="validation-error">{errors.images}</span>}
          </div>
          <div className="mb-6">
            <label className="form-label">Mô tả</label>
            <textarea className="form-control" name="description" value={productData.description} onChange={handleTextareaChange} id="" aria-describedby="helpId" rows={3}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Thêm
          </button>
          <a href="/admin/product" className="btn btn-danger ms-3">
            Quay lại
          </a>
        </form>
        <CreateTrademark />
      </div>
    </>
  )
}

export default Create

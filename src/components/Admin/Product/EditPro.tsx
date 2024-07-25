import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
interface ProUpdateType {
  name: ""
  price: 0
  description: ""
  trademarkId: 0
}

interface ProType {
  name: ""
  price: 0
  description: ""
  trademarkId: 0
  images: {
    id: "int"
    name: "string"
    productId: "int"
  }[]

  productDetails: {
    id: "int"
    size: "int"
    quantity: "int"
    productId: "int"
  }
}

type SPchiTietType = {
  id: string
  quantity: number
  size: number
}

type Img = {
  id: "int"
  name: "string"
  productId: "int"
}

const EditPro = () => {
  const [newSPchiTiet, setNewSPchiTiet] = useState<{ size: number; quantity: number }>({
    quantity: 0,
    size: 0,
  })
  const [updateSPchiTiet, setUpdateSPchiTiet] = useState<SPchiTietType[]>([])
  const [deleteSPchiTiet, setDeleteSPchiTiet] = useState<{ id: string }[]>([])
  const [SPchiTiet, setSPchiTiet] = useState<SPchiTietType[]>([])

  const [product, setProduct] = useState<ProType | null>(null)
  const [updatedProduct, setUpdatedProduct] = useState<ProUpdateType | null>(null)

  const [images, setImages] = useState<Img[]>([])
  const [newImages, setNewImages] = useState<File[]>([])

  const productId = useParams().ProductId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7080/api/Product/${productId}`)
        const data = await response.json()
        setProduct(data) // Khởi tạo dữ liệu cập nhật bằng dữ liệu gốc
        setUpdatedProduct(data)
        setSPchiTiet(data.productDetails)
        setImages(data.images)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  const onNewSpChiTietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setNewSPchiTiet({ ...newSPchiTiet, [name]: value })
  }
  const onAddSpChiTiet = () => {
    setUpdateSPchiTiet([
      ...updateSPchiTiet,
      {
        id: uuidv4(),
        size: newSPchiTiet.size,
        quantity: newSPchiTiet.quantity,
      },
    ])
  }

  const onDeleteUpdateSpChiTiet = (id: string) => {
    const newItems = updateSPchiTiet.filter((item) => item.id !== id)
    setUpdateSPchiTiet(newItems)
    console.log(updateSPchiTiet)
  }

  const onDeleteSpChiTiet = async (id: string) => {
    const deleteItems = await SPchiTiet.filter((item) => item.id === id)
    await setDeleteSPchiTiet([
      ...deleteSPchiTiet,
      {
        id: deleteItems[0].id,
      },
    ])
    const newItems = await SPchiTiet.filter((item) => item.id !== id)
    await setSPchiTiet(newItems)
  }

  console.log(deleteSPchiTiet)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setUpdatedProduct((prevProduct) => {
      if (prevProduct === null) {
        return {
          [name]: value,
          name: "",
          price: 0,
          description: "",
          trademarkId: 0,
        }
      } else {
        return {
          ...prevProduct,
          [name]: value,
        }
      }
    })
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    setUpdatedProduct((prevProduct) => {
      if (prevProduct === null) {
        return {
          [name]: value,
          name: "",
          price: 0,
          description: "",
          minSize: 0,
          maxSize: 0,
          trademarkId: 0,
        }
      } else {
        return {
          ...prevProduct,
          [name]: value,
        }
      }
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget
    setUpdatedProduct((prevProduct) => {
      if (prevProduct === null) {
        return {
          [name]: value,
          name: "",
          price: 0,
          description: "",
          minSize: 0,
          maxSize: 0,
          trademarkId: 0,
        }
      } else {
        return {
          ...prevProduct,
          [name]: value,
        }
      }
    })
  }
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = await Array.from(e.target.files || [])
    await setNewImages((prevImages) => [...prevImages, ...files])
    console.log(files)
  }

  const UpdateImage = async (ProductId: number) => {
    const formData = new FormData()
    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i])
    }

    try {
      const response = await fetch(`https://localhost:7080/api/Image/${ProductId}`, {
        method: "PUT",
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
    console.log(JSON.stringify(SPchiTiet))

    try {
      for (const item of deleteSPchiTiet) {
        const responseDelete = await fetch(`https://localhost:7080/api/ProductDetail/${item.id}`, {
          method: "DELETE",
        })
        if (!responseDelete.ok) {
          console.log("Delete failed:", responseDelete.statusText)
        }
      }

      const response = await fetch(`https://localhost:7080/api/ProductDetail/${ProductId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateSPchiTiet),
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`https://localhost:7080/api/Product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })

      if (response.ok) {
        const updatedData = await response.json()
        console.log(updatedData)
        if (updateSPchiTiet !== null) {
          await UpLoadCTSP(updatedData.id)
        }
        if (newImages.length > 0) {
          await UpdateImage(updatedData.id)
        }
        setProduct(updatedData) // Cập nhật state với dữ liệu mới từ API
        alert("Sản phẩm đã được cập nhật thành công!")
        //Chuyển hướng sang trang danh sách
        window.location.href = "/product"
      } else {
        throw new Error("Failed to update product")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.")
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>Sửa sản phẩm : {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="form-label">Tên sản phẩm</label>
          <input type="text" className="form-control" id="name" name="name" value={updatedProduct?.name || ""} onChange={handleInputChange} aria-describedby="helpId" placeholder="" />
        </div>
        <div className="mb-6">
          <label className="form-label">Giá</label>
          <input type="number" className="form-control" name="price" value={updatedProduct?.price || ""} onChange={handleInputChange} id="" aria-describedby="helpId" placeholder="" />
        </div>
        <div className="row mb-6">
          <div className="row">
            <div className="col-4">
              <label className="form-label">Số size : </label>
              <input className="form-control" type="number" name="size" id="" onChange={onNewSpChiTietChange} />
            </div>
            <div className="col-4">
              <label className="form-label">Số lượng: </label>
              <input className="form-control" type="number" name="quantity" id="" onChange={onNewSpChiTietChange} />
            </div>
            <div className="col-4">
              <div className="btn btn-primary mt-4" onClick={onAddSpChiTiet}>
                Thêm
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-8">
              {SPchiTiet.map((item) => {
                return (
                  <div className="row px-3 align-items-center align-middle" key={item.id}>
                    <div className="col-4 align-middle">
                      <label className="align-middle">Số size : {item.size}</label>
                    </div>
                    <div className="col-4">
                      <label className="">Số lượng: {item.quantity}</label>
                    </div>
                    <div className="col-4">
                      <a className="btn" style={{ color: "red" }} onClick={() => onDeleteSpChiTiet(item.id)}>
                        <i className="fa-solid fa-x"></i>
                      </a>
                    </div>
                  </div>
                )
              })}
              {updateSPchiTiet.map((item) => {
                return (
                  <div className="row px-3" key={item.id}>
                    <div className="col-4">
                      <label className="form-label">Số size : {item.size}</label>
                    </div>
                    <div className="col-4">
                      <label className="form-label">Số lượng: {item.quantity}</label>
                    </div>
                    <div className="col-4">
                      <a className="btn" style={{ color: "red" }} onClick={() => onDeleteUpdateSpChiTiet(item.id)}>
                        <i className="fa-solid fa-x"></i>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col-4"></div>
          </div>
        </div>
        <div className="mb-6">
          <label className="form-label">Thương hiệu</label>
          <select className="form-select" name="trademarkId" value={updatedProduct?.trademarkId || ""} onChange={handleSelectChange}>
            <option value="1">Nike</option>
            <option value="2">Asidas</option>
            <option value="3">Converse</option>
            <option value="4">Puma</option>
            <option value="4">New Blance</option>
            <option value="4">Vans</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="form-label">Hình ảnh</label>
          <div className="mb-2">
            {images.map((image) => (
              <img src={`https://localhost:7080/api/Image/get-pro-img/${image.name}`} key={image.id} style={{ width: "100px", marginRight: "5px" }} alt="" />
            ))}
          </div>
          <input type="file" className="form-control" name="image" onChange={handleFileChange} id="imgPro" aria-describedby="helpId" placeholder="" multiple />
        </div>
        <div className="mb-6">
          <label className="form-label">Mô tả</label>
          <textarea className="form-control" name="description" value={updatedProduct?.description || ""} onChange={handleTextareaChange} id="" aria-describedby="helpId" rows={3}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Sửa
        </button>
        <a href="/product" className="btn btn-danger ms-3">
          Quay lại
        </a>
      </form>
    </>
  )
}

export default EditPro

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Admin/Home';
import Product from './components/Admin/Product/Product';
import Trademark from './components/Admin/Trademark';
import Create from './components/Admin/Product/Create';
import EditPro from './components/Admin/Product/EditPro';
import DonHang from './components/Admin/DonHang/DonHang';
import DangNhap from './components/Admin/DangNhap';
import TaiKhoan from './components/Admin/TaiKhoan/TaiKhoan';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donhang",
        element: <DonHang />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/create",
        element: <Create />,
      },
      {
        path: "/product/edit/:ProductId",
        element: <EditPro />,
      },
      {
        path: "/trademark",
        element: <Trademark />,
      },
      {
        path: "/tai-khoan",
        element: <TaiKhoan />,
      }
      
    ],
    
  },
  {
    path: "/dang-nhap",
    element: <DangNhap />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import '../assets/admin/css/styles.min.css'
import Header from './Admin/Header'

import '../assets/admin/libs/bootstrap/dist/js/bootstrap'
import Sidebar from './Admin/Sidebar'


const AdminLayout = () => {


  const location = useLocation();

  

  return (
    <>
      
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <div className="container-fluid">
          <Outlet />
        
              
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
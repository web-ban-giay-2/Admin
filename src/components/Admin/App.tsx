
import './index.css'
import Header from './Header'

import Sidebar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Product from './Product/Product'
import CreatePro from './Product/Create'


const App = () => {
  return (
    <>
        <h1>Admin</h1>

      <script src="../assets/admin/libs/jquery/dist/jquery.min.js"></script>
      <script src="../assets/admin/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
      <script src="../assets/admin/js/sidebarmenu.js"></script>
      <script src="../assets/admin/js/app.min.js"></script>
      <script src="../assets/admin/libs/apexcharts/dist/apexcharts.min.js"></script>
      <script src="../assets/admin/libs/simplebar/dist/simplebar.js"></script>
      <script src="../assets/admin/js/dashboard.js"></script>

    </>
  )
}

export default App
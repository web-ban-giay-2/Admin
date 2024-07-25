
import { Link } from "react-router-dom"



const Sidebar = () => {

  return (
    <>
        <aside className="left-sidebar">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-between">
              <img src="/src/assets/admin/images/logos/shoes-shop-logo-vector-store-260nw-1718721763.png" width="180" alt="" />
            <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>

          <nav className="sidebar-nav scroll-sidebar" data-simplebar="init">
            <div className="simplebar-wrapper selected">
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask selected">
                <div className="simplebar-offset selected">
                  <div className="simplebar-content-wrapper selected" role="region" aria-label="scrollable content">
                    <div className="simplebar-content selected">
                      <ul id="sidebarnav" className="in">
                        <li className="sidebar-item selected">
                          <Link className="sidebar-link active" to="./" aria-expanded="false">
                            <span>
                              <i className="ti ti-layout-dashboard"></i>
                            </span>
                            <span className="hide-menu">Home</span>
                          </Link>
                        </li>
                        <li className="nav-small-cap">
                          <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                          <span className="hide-menu">Chức năng</span>
                        </li>
                        <li className="sidebar-item">
                          <Link className="sidebar-link" to="./donhang" aria-expanded="false">
                            <span>
                              <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Đơn hàng</span>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link className="sidebar-link" to="./product" aria-expanded="false">
                            <span>
                              <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Sản phẩm</span>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link className="sidebar-link" to="./trademark" aria-expanded="false">
                            <span>
                              <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Thương hiệu</span>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link className="sidebar-link" to="./tai-khoan" aria-expanded="false">
                            <span>
                              <i className="ti ti-article"></i>
                            </span>
                            <span className="hide-menu">Tài khoản</span>
                          </Link>
                        </li>
                        
                      </ul>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="simplebar-placeholder"></div>
            </div>
            <div className="simplebar-track simplebar-horizontal">
              <div className="simplebar-scrollbar"></div>
            </div>
            <div className="simplebar-track simplebar-vertical">
              <div className="simplebar-scrollbar"></div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
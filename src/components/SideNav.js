import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className={pathname === "/" ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/">
            <i className="fa fa-dashboard menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className={pathname === "/all_issue" ? "nav-item active" : "nav-item"}>
          <Link  className="nav-link" to={{pathname:"/all_issue"}}>
          <i class="fas fa-tasks menu-icon"></i>
            <span className="menu-title">My Tasks</span>
          </Link>
        </li>

        {/* <li className={pathname === "/issue" ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/issue">
            <i className="fas fa-bug menu-icon"></i>
            <span className="menu-title">Issues</span>
          </Link>
        </li> */}
        
        {/*     <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i className="mdi mdi-circle-outline menu-icon"></i>
            <span className="menu-title">UI Elements</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/charts/chartjs.html">
            <i className="mdi mdi-chart-pie menu-icon"></i>
            <span className="menu-title">Charts</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/tables/basic-table.html">
            <i className="mdi mdi-grid-large menu-icon"></i>
            <span className="menu-title">Tables</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/icons/mdi.html">
            <i className="mdi mdi-emoticon menu-icon"></i>
            <span className="menu-title">Icons</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <i className="mdi mdi-account menu-icon"></i>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
              <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="documentation/documentation.html">
            <i className="mdi mdi-file-document-box-outline menu-icon"></i>
            <span className="menu-title">Documentation</span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default SideNav;

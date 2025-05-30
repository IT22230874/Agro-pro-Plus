import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assests/logo.png";
import { FaChevronRight } from "react-icons/fa";
import "../../../App.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to the login page
    window.location.href = "/admin"; // Assuming your login page path is '/login'
  };

  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <a href="/finance" className="logo d-flex align-items-center">
          <img src={logo} alt="logo image" />
          <span className="">AgroPro+</span>
        </a>
        <hr className="hr"></hr>
        <FaChevronRight
          className="toggle-sidebar-btn d-flex align-items-center justify-content-center"
          onClick={handleToggleSideBar}
        />

        <ul className="sidebar-nav" id="sidebar-nav">
          <li
            className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
            onClick={() => handleItemClick("dashboard")}
          >
            <a className="nav-link" href="/">
              <i className="bi bi-grid-1x2"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li
            className={`nav-item ${activeItem === "sales" ? "active" : ""}`}
            onClick={() => handleItemClick("sales")}
          >
            <Link to="/StockDetails" className="nav-link collapsed">
              <i className="bi bi-bar-chart"></i>
              <span>Stocks</span>
            </Link>

            <ul
              id="components-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/DistributeDetails">
                  <i className="bi bi-circle">
                    <span>Distributers</span>
                  </i>
                </Link>
              </li>
              <li>
                {/* <a href="#">
                  <i className="bi bi-circle">
                    <span>Tax Reports</span>
                  </i>
                </a> */}
              </li>
            </ul>
          </li>

          <li
            className={`nav-item ${activeItem === "expenses" ? "active" : ""}`}
            onClick={() => handleItemClick("expenses")}
          >
            {/* <Link to="/ExpensePage" className="nav-link collapsed">
              <i className="bi bi-wallet"></i>
              <span>Expenses</span>
            </Link> */}
            {/* 
                        <ul id='forms-nav' className='nav-content collapse' data-bs-parent='#sidebar-nav'>
                            <li>
                                <a href='/ExpensePage'>
                                    <i className='bi bi-circle'>
                                        <span>Expenses </span>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <i className='bi bi-circle'>
                                        <span>Expense Approvals</span>
                                    </i>
                                </a>
                            </li>
                        </ul> */}
          </li>

          {/* <li
            className={`nav-item ${activeItem === "reports" ? "active" : ""}`}
            onClick={() => handleItemClick("reports")}
          >
            <Link to="/approvals" className="nav-link collapsed">
              <i className="bi bi-archive"></i>
              <span>Approvals</span>
            </Link>
          </li> */}

          <li
            className={`nav-item ${activeItem === "reports" ? "active" : ""}`}
            onClick={() => handleItemClick("reports")}
          >
            {" "}
            <Link to="/DistributeDetails" className="nav-link collapsed">
              <i class="bi bi-credit-card"></i> <span>Distributers</span>
            </Link>
          </li>

          <div className="mt-16 ">
            <li
              className={`nav-item ${
                activeItem === "settings" ? "active" : ""
              }`}
              onClick={() => handleItemClick("settings")}
            >
              {/* <a className="nav-link collapsed" href="/">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
              </a> */}
            </li>
            <li
              className={`nav-item ${activeItem === "logout" ? "active" : ""}`}
              onClick={() => handleItemClick("logout")}
            >
              {/* Use Link component to navigate to login page */}
              <Link
                to="/"
                className="nav-link collapsed"
                onClick={handleLogout}
              >
                {/* <i className="bi bi-box-arrow-left"></i> */}
                {/* <span>Logout</span> */}
              </Link>
            </li>
          </div>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;

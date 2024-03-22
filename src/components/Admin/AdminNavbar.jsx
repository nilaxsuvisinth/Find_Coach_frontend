import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/Logo V2.png'; 

const AdminNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand fw-bolder fs-4 mx-auto" to="/">
            <img src={logo} alt="Logo" className="logonav me-2" />
            Admin
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/admin/user">
                  User
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: '25%' }}>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/resource">
                  Resource
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: '25%' }}>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/bookings">
                  Bookings
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: '25%' }}>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/message">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;

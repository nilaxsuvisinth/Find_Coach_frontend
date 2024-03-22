import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './Assets/Logo V2.png';
import profile from './Assets/default_avatar.png';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  let role = userInfo ? userInfo.role : "";
  // console.log(role);


  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (res.status == 200) {

        localStorage.removeItem("userInfo");
      }

      if (res.status === 401 || !res) {
        toast.error('Please Logout Later', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        navigate('/');
        window.location.reload();
        toast.success('Logout Successful', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during logout', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">
              <img src={logo} alt="Logo" className="logonav me-2" />
              Find Coach
            </NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/service">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            {user ? (
              <NavLink to="/login" className="btn btn-outline-danger ms-auto px-4 rounded-pill">
                <i className="fa fa-sign-in me-2"></i> Login
              </NavLink>
            ) : (
              <div className="position-relative d-flex align-items-center">
                <figure className='avatar avatar-nav me-2' onClick={handleDropdownToggle}>
                  <img src={profile} alt="Profile" className="profilenav me-2" />
                </figure>
                <span>{userInfo.username}</span>
                {dropdownOpen && (
                  <Dropdown className='d-inline' style={{ position: 'absolute', zIndex: 1000 }}>
                    <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                      {/* <span style={{ color: 'black' }}>{userInfo.username}</span> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {role === "admin" && <Dropdown.Item onClick={() => { navigate('admin/user') }} className='text-dark'>Dashboard</Dropdown.Item>}
                      <Dropdown.Item onClick={() => { navigate('/profile') }} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout} className='text-danger'>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

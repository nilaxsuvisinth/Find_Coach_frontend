import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
    showPassword: false
  });

  const handleInput = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckboxChange = (event) => {
    setUser({
      ...user,
      termsAccepted: event.target.checked
    });
  };

  const toggleShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword
    });
  };

  const validateForm = () => {
    return user.username && user.email && user.password && user.termsAccepted;
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Error registering user');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Error registering user');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all the fields', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const data = await registerUser(user);
      console.log(data);
      navigate('/login');
      toast.success('Register successful!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error registering user', {
        position: "top-right",
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
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column 
                    align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello, Friend</h1>
            <p className="lead text-center">Enter Your Details to Register</p>
            <h5 className="mb-4">OR</h5>
            <NavLink to="/login" className="btn btn-outline-light 
                        rounded-pill pb-2 w-50">Login</NavLink>
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Username</label>
                <input type="text" className="form-control" id="name"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <div className="input-group">
                  <input type={user.showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                  />
                  <span className="input-group-text" onClick={toggleShowPassword}>
                    <FontAwesomeIcon icon={user.showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  checked={user.termsAccepted}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">I agree Terms and Conditions</label>
              </div>
              <button type="submit" className="btn btn-outline-danger w-100 mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;

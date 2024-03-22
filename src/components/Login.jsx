import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ handleLogin }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
        showPassword: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const toggleShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = user;
        try {
            const res = await fetch('http://localhost:5000/api/user/login', {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!res.ok) {
                toast.error("Invalid Credentials");
                return;
            }

            const data = await res.json();
            if(data){
                
                localStorage.setItem("userInfo",JSON.stringify(data))
            }
            if (data.role === 'admin') {
                navigate('/');
            } else {
                navigate('/');
            }
            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleLogin();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    return (
        <div>
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={handleChange} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={user.showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={handleChange} />
                                    <span className="input-group-text" onClick={toggleShowPassword}>
                                        <FontAwesomeIcon icon={user.showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-danger w-100 mt-4 rounded-pill">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

import axios from "axios";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Details() {
    const [resource, setResource] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const fetchResource = useCallback(() => {
        setIsLoading(true);
        axios.get(`http://localhost:5000/api/user/${id}`)
            .then(res => {
                setResource(res.data.resource);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const handleRoute = (route) => {
        if (userInfo === null) {
            navigate("/login")
        } else {
            navigate(route)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchResource();
        }, 500);

        return () => clearTimeout(timer);
    }, [fetchResource]);

    return (
        <section id="portfolio-details" className="portfolio-details mt-5">
            <div className="container">
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <img className="w-100 shadow mt-5" src="../assets/details.jpg" alt="..." />
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <h1 className="display-4">
                                        Welcome to Learn {resource ? resource.courseName : "Resource Details"}
                                    </h1>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Coach Name:</span> {resource && resource.name}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Location:</span> {resource && resource.address}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Gender:</span> {resource && resource.gender}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Years of Experience:</span> {resource && resource.yearOfExperience}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Current Employment:</span> {resource && resource.currentEmployment}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Course Name:</span> {resource && resource.courseName}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Course Description:</span> {resource && resource.courseDescription}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Course Duration:</span> {resource && resource.courseDuration}
                                    </p>
                                    <p className="lead">
                                        <span className="text-black fw-bold">Course Fees:</span> {resource && resource.courseFees}
                                    </p>
                                    
                                    <button onClick={() => handleRoute(`/bookingcoach/${id}`)} className="btn btn-outline-danger mb-3" type="">Book Now</button>

                                    <Link to="/service" className="m-5">
                                        <button className="btn btn-outline-danger mb-3" type=""><i className="fa fa-arrow-left me-2"></i> Back</button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Details;
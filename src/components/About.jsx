import React from 'react';
import {NavLink} from 'react-router-dom';

const About = () => {
    return (
        <div>
            <section id="about">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="/assets/about2.jpg" alt="About" 
                            className="w-75 mt-5 img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fs-5 mb-0">About Us</h3>
                            <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
                            <hr className="w-50"/>
                            <p className="lead mb-4">Welcome to our coaching web app, a dynamic space 
                            where growth meets personalized guidance. Our platform connects you with a 
                            diverse array of experienced coaches, each specializing in various fields 
                            such as career development, personal growth, wellness, and more. Whether 
                            you're striving for professional success, seeking clarity in personal endeavors, 
                            or aiming to enhance your overall well-being, our coaches are here to support 
                            you every step of the way. Through tailored sessions, actionable insights, 
                            and unwavering encouragement, we're dedicated to helping you unleash your 
                            full potential and achieve your goals. Join our community today and embark 
                            on a transformative journey towards a brighter, more fulfilling future.</p>
                            <NavLink to="/service">
                            <div className="btn btn-danger rounded-pill px-4 py-2">Get Started</div>
                            </NavLink>
                            <NavLink to="/contact">
                            <div className="btn btn-outline-danger rounded-pill px-4 py-2 ms-2">Contact Us</div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;
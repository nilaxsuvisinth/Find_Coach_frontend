import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 footer-item">
                            <h4>Find Coach</h4>
                            <p>Contact us here for assistance in finding your ideal coach or use our online database to search</p>
                            <p>Location : Mallavi</p>
                            <p>Email : findcoach2024@gmail.com</p>
                            <p>Contact : +94 76 882 5415</p>
                        </div>
                        <div className="col-md-4 footer-item">
                            <h4>Useful Links</h4>
                            <div className="menu-list">
                                <div onClick={handleScrollToTop} className="mb-3">Vivamus ut tellus mi</div>
                                <div onClick={handleScrollToTop} className="mb-3">Nulla nec cursus elit</div>
                                <div onClick={handleScrollToTop} className="mb-3">Vulputate sed nec</div>
                                <div onClick={handleScrollToTop} className="mb-3">Cursus augue hasellus</div>
                                <div onClick={handleScrollToTop} className="mb-3">Lacinia ac sapien</div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-item">
                            <h4>Our Pages</h4>
                            <div className="menu-list">
                                <div onClick={handleScrollToTop} className="mb-3">About Us</div>
                                <div onClick={handleScrollToTop} className="mb-3">Service</div>
                                <div onClick={handleScrollToTop} className="mb-3">Contact Us</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="sub-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p>
                                <span style={{ marginRight: '10px' }}>Copyright &copy; 2024- Find Coach.</span>
                                <span style={{ cursor: 'pointer', marginLeft: '50px' }}>
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleUp}
                                        onClick={handleScrollToTop}
                                        style={{ fontSize: '25px' }} // Adjust the fontSize as needed
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;

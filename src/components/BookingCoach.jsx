import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';

const BookingCoach = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        nic: '',
        contactNumber: ''
    });
    const { id } = useParams();
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/booking/bookingcoach/${id}`, formData,{withCredentials:true});
            console.log(response.data); 
            navigate('/'); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <section className="container my-5 bg-white w-50 text-dark p-2 shadow my-5">
                <form className="row g-5 p-5" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nic" className="form-label">NIC</label>
                        <input type="text" className="form-control" id="nic" name="nic" value={formData.nic} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroupPrepend2">+94 </span>
                            <input type="number" className="form-control" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-danger rounded-pill px-4 py-2">
                            Submit <i className="fa fa-paper-plane ms-2"></i>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default BookingCoach;

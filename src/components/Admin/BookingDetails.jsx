import axios from "axios";
import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchBookings();
    }, 500); 

    return () => clearTimeout(timer); 
  }, []);

  const fetchBookings = () => {
    setIsLoading(true); 
    axios.get('http://localhost:5000/api/admin/bookingdetails')
      .then(res => {
        setBookings(res.data.bookings); 
        setIsLoading(false); 
      })
      .catch(err => {
        setIsLoading(false); 
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading && (
            <div className="bg-white rounded p-3 mt-4">
              <table className="table table-bordered" style={{ border: "2px solid #333" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>NIC</th>
                    <th>Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 && bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.address}</td>
                      <td>{booking.nic}</td>
                      <td>{booking.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllBookings;

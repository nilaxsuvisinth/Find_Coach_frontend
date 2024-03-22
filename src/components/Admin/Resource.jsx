import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Resource() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [coachToDelete, setCoachToDelete] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = () => {
    setIsLoading(true); 
    axios.get('http://localhost:5000/api/admin/resources')
      .then(res => {
        setData(res.data.resources); 
        setIsLoading(false); 
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false); 
      });
  };

  const handleDelete = (id) => {
    const coach = data.find(coach => coach._id === id);
    setCoachToDelete(coach);
  };

  const handleVerify = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/resources/${id}/verify`, null, { withCredentials: true })
      .then((response) => {
        console.log("Resource verified successfully:", response.data);
        fetchResources(); 
      })
      .catch((error) => {
        console.error("Error verifying resource:", error);
      });
  };

  const confirmDelete = () => {
    if (coachToDelete) {
      axios.delete(`http://localhost:5000/api/admin/resources/${coachToDelete._id}`)
        .then(res => {
          console.log(res);
          setData(data.filter(coach => coach._id !== coachToDelete._id));
          toast.success("Resource deleted successfully.", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(err => console.log(err));
      setCoachToDelete(null);
    }
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
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Contact Number</th>
                    <th>Current Employment</th>
                    <th>Year of Experience</th>
                    <th>Course Name</th>
                    <th>Course Description</th>
                    <th>Course Duration</th>
                    <th>Course Fees</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 && data.map((coach, index) => (
                    <tr key={index}>
                      <td>{coach.name}</td>
                      <td>{coach.address}</td>
                      <td>{coach.gender}</td>
                      <td>{coach.contactNumber}</td>
                      <td>{coach.currentEmployment}</td>
                      <td>{coach.yearOfExperience}</td>
                      <td>{coach.courseName}</td>
                      <td>{coach.courseDescription}</td>
                      <td>{coach.courseDuration}</td>
                      <td>{coach.courseFees}</td>
                      <td>{coach.category}</td>
                      <td>
                        <button onClick={() => handleDelete(coach._id)} className="btn btn-xs btn-danger">Delete</button>
                        {!coach.verified && (
                          <button onClick={() => handleVerify(coach._id)} className="btn btn-xs btn-success ms-1">Verify</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {coachToDelete && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setCoachToDelete(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete resource: {coachToDelete.name}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setCoachToDelete(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resource;

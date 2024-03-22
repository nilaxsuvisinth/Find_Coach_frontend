import axios from "axios";
import React, { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
          fetchUsers();
        }, 500);
    
        return () => clearTimeout(timer); 
      }, []);

    const fetchUsers = () => {
        setIsLoading(true); 
        axios.get('http://localhost:5000/api/admin/users')
            .then(res => {
                setUsers(res.data);
                setIsLoading(false); 
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); 
            });
    };

    const handleDelete = (id) => {
        const user = users.find(user => user._id === id);
        setUserToDelete(user);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            axios.delete(`http://localhost:5000/api/admin/users/${userToDelete._id}`)
                .then(res => {
                    setUserToDelete(null);
                    fetchUsers(); 
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {isLoading && (
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="w-100 bg-white rounded p-3 mt-4">
                            <table className="table table-bordered" style={{ border: "2px solid #333" }}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-xs btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {userToDelete && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setUserToDelete(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete user: {userToDelete.username}?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setUserToDelete(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;

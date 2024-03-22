import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/users/" + id);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/admin/users/${id}`, { name, email, password })
            .then((res) => {
                console.log(res);
                navigate("/admin");
            })
            .catch((err) => {
                setError("Failed to update user. Please try again.");
                console.log(err);
            });
    };

    const handleCancel = () => {
        navigate("/admin");
    };

    return (
        <div className="d-flex vh-100  justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Update</button>
                        <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );  
}

export default UpdateUser;

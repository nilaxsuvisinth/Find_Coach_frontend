import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateResource = () => {

  const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  
  let role=userInfo?userInfo.role:"";

  const navigate = useNavigate();

 
  const [coach, setCoach] = useState(null);
  
   let verified=coach?coach.verified:false;
   
useEffect(() => {
      const fetchUserProfile = async () => {
          try {
              const response = await fetch(`http://localhost:5000/api/user/users`,
             
                  {credentials:"include"}
              
              );
              
              if (!response.ok) {
                  throw new Error('Failed to fetch user data');
              }
              const userData = await response.json();
              if(role==="coach"){
               
                  setCoach(userData.coach);
                 
              }else{
                  setUser(userData.user);
              }
              
              
          } catch (error) {
              console.error('Error fetching user data:', error);
              
          }
      };
      if(role=="coach"){
        fetchUserProfile();
      }
      
  }, []);

  
  const [user, setUser] = useState({
    name: userInfo ? userInfo.username : '',
    address: '',
    gender: '',
    contactNumber: '',
    currentEmployment: '',
    yearOfExperience: '',
    courseName: '',
    courseDescription: '',
    courseDuration: '',
    courseFees: '',
    category: ''
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const validateForm = () => {
    return (
      user.name &&
      user.address &&
      user.gender &&
      user.contactNumber &&
      user.currentEmployment &&
      user.yearOfExperience &&
      user.courseName &&
      user.courseDescription &&
      user.courseDuration &&
      user.courseFees &&
      user.category
    );
  };


  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/createResource', {
        method: 'POST',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Error registering user');
      }
      const data = await response.json();
      if(data){
                
        localStorage.setItem("userInfo",JSON.stringify(data.user))
        setTimeout(()=>{
          window.location.reload(true)
        },1000)
    }
      return data;
    } catch (error) {
      console.error(error);
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
      // console.log(data);
      // navigate('/login');
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
    }
  };
   

    return (
        <div>
         {role==="coach"?
         <>
         {
          verified?navigate("/profile")
          :
          <div className='mb-5 mt-5' style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '500px', padding: '20px', backgroundColor: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
            <h1>Wait for admin verification</h1>
            <NavLink to="/" className="m-5">
              <button className="btn btn-outline-danger mb-3 mt-3" type=""><i className="fa fa-home me-2"></i>Home</button>
            </NavLink>
          </div>
        </div>
        
         }
         </>
         :
         
        <div className="container shadow my-5">
          <div className="row justify-content-end p-5">
            <div className="d-flex align-items-center text-black justify-content-center">
              <h2 className="display-4 fw-bolder">Register as a Coach</h2>
            </div>

            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3 mt-5   ">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address"
                  name="address"
                  value={user.address}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input type="text" className="form-control" id="gender"
                  name="gender"
                  value={user.gender}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input type="text" className="form-control" id="contactNumber"
                  name="contactNumber"
                  value={user.contactNumber}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="currentEmployment" className="form-label">Current Employment</label>
                <input type="text" className="form-control" id="currentEmployment"
                  name="currentEmployment"
                  value={user.currentEmployment}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="yearOfExperience" className="form-label">Year Of Experience</label>
                <input type="text" className="form-control" id="yearOfExperience"
                  name="yearOfExperience"
                  value={user.yearOfExperience}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="courseName" className="form-label">Course Name</label>
                <input type="text" className="form-control" id="courseName"
                  name="courseName"
                  value={user.courseName}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="courseDescription" className="form-label">Any Course Description</label>
                <input type="text" className="form-control" id="courseDescription"
                  name="courseDescription"
                  value={user.courseDescription}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="courseDuration" className="form-label">Course Duration</label>
                <input type="text" className="form-control" id="courseDuration"
                  name="courseDuration"
                  value={user.courseDuration}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="courseFees" className="form-label">Course Fees</label>
                <input type="number" className="form-control" id="courseFees"
                  name="courseFees"
                  value={user.courseFees}
                  onChange={handleInput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-select" id="category"
                  name="category"
                  value={user.category}
                  onChange={handleInput}
                >
                  <option value="">Select category</option>
                  <option value="Sports">Sports</option>
                  <option value="Music">Music</option>
                  <option value="Dance">Dance</option>
                  <option value="Others">Others</option>
                </select>
              </div>



              <div className=" justify-content-center  align-items-center">
                <button type="submit" className="btn btn-outline-danger rounded-pill pb-2 w-25 mt-4 mb-4">Submit</button>
                {/* <h6 className="mb-4" style={{ paddingLeft: '8%' }}>Not registered?</h6>
                <NavLink to="/login" className="btn btn-outline-danger rounded-pill pb-2 w-25"><i className="fa fa-sign-in me-2"></i>Login</NavLink> */}
              </div>
            </form>

          </div>
        </div>}
    </div>
    )
}

export default CreateResource;
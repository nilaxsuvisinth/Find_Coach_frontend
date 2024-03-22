import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import profile from './Assets/default_avatar.png';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [coach, setCoach] = useState(null);
    const [booking, setBooking] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let role = userInfo ? userInfo.role : "";
    let bookingData=booking!==null?booking:[];
     let coachId=coach!==null?coach._id:"";
     
     const fetchBooking = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/booking/getBookingById/${coachId}`,
                { credentials: "include" }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const bookingData = await response.json();
            if (role === "coach") {
                setBooking(bookingData);
                
            } 
        } catch (error) {
            console.error('Error fetching user data:', error);

        }}
        useEffect(() => {
            if(coachId!=="")
            fetchBooking()
        } ,[coachId]); 
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/users`,
                    { credentials: "include" }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                if (role === "coach") {
                    setUser(userData.user);
                    setCoach(userData.coach);
                } else {
                    setUser(userData.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);

            }
        };

        fetchUserProfile();
    }, []);

    // const handleUpdateProfile = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('name', 'New Name');
    //         formData.append('email', 'newemail@example.com');

    //         const response = await fetch(`/api/user/update`, {
    //             method: 'PUT',
    //             body: formData,
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to update profile');
    //         }
    //         const updatedUserData = await response.json();
    //         setUser(updatedUserData.user);
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto  row justify-content-around mt-5 user-info pink-text">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={profile} alt='' style={{ width: '50%', height: '50%' }} />
                </figure>
                {/* <Link to={`/profile/update`} id="edit_profile" className="btn btn-danger btn-block my-5">
                    Edit Profile
                </Link> */}
            </div>
            <div className="col-12 col-md-5">
                <h4>Name : {user.username}</h4>
                <h4>Email Address : {user.email}</h4>
                <h4>Joined</h4>
            </div>
            <div className="mt-4 mb-4">
                {coach !== null &&
                    <>
                        <div className="row">
                            <h1 className="display-4 p-5">
                                This is  {coach ? coach.name : "Resource Details"} Details
                            </h1>
                            <div className="col-lg-6">

                                <p className="lead">
                                    <span className="text-black fw-bold">Location:</span> {coach && coach.address}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Gender:</span> {coach && coach.gender}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Years of Experience:</span> {coach && coach.yearOfExperience}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Current Employment:</span> {coach && coach.currentEmployment}
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <p className="lead">
                                    <span className="text-black fw-bold">Course Name:</span> {coach && coach.courseName}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Course Description:</span> {coach && coach.courseDescription}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Course Duration:</span> {coach && coach.courseDuration}
                                </p>
                                <p className="lead">
                                    <span className="text-black fw-bold">Course Fees:</span> {coach && coach.courseFees}
                                </p>
                            </div>
                        </div>
                        <h1>Your Bookings</h1>
                        {bookingData.length==0&&<p>No Bookings right now</p>}
                        <div className='row '>
                        {bookingData.map((data,i)=>(
                            <div key={i} className="card col-4 me-5" style={{width: "18rem"}}>
                            <div className="card-body">
                              <h5 className="card-title">{data.name}</h5>
                              <h6 className="card-subtitle mb-2 text-muted"><i className="fa fa-envelope me-2"></i>{data.email}</h6>
                              <p className="card-text"><i className="fa fa-phone me-2"></i>{data.contactNumber}</p>
                              <p className="card-text"><i className="fa fa-id-card me-2"></i>{data.nic}</p>
                              <p className="card-text"><i className="fa fa-map me-2"></i>{data.address}</p>
                              <button  className="btn btn-success me-2">Accept</button>
                              <button  className="btn btn-danger">Reject</button>
                            </div>
                          </div>
                        ))}
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Profile;
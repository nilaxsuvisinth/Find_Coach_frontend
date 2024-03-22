import React from 'react';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate()
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
    const handleJoin=(route)=>{
      if(userInfo===null){
       navigate("/login")
      }else{
        navigate(route)
      }
    }
    return (
        <div>
            

            <section class="home" id="home">
                <div class="content">
                    <h1 class="title">FIND  <span>COACH</span></h1>
                    <p class="description">Contact us here for assitance in finding your ideal coach<br>
                    </br> or use our online database to search</p>
                    <NavLink to="/service" className="btn btn-danger me-4
                                rounded-pill px-4 py-2">Our Services</NavLink>
                                <button onClick={()=>handleJoin("/registercoach")} className="btn btn-outline-danger
                                rounded-pill px-4 py-2">Join as Coach</button>
                </div>
                <div class="image">
                </div>
            </section>
            <About />
            <Services />
            <Contact />
        </div>
    );
}

export default Home;
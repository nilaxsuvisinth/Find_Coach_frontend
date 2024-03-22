import './App.css';
import {  useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Basketball from './components/Basketball';
import Details from './components/Details';
import CreateResource from './components/CreateResource';
import {ToastContainer} from 'react-toastify';
import BookingCoach from './components/BookingCoach';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const userInfo=JSON.parse(localStorage.getItem('userInfo'));

  useEffect(()=>{

    if(userInfo!==null){
      setIsLoggedIn(false);
    }

  },[userInfo])
  

  const handleLogin = () => {
    // setIsLoggedIn(false);
  };

  return (
    <>
     <ToastContainer theme="dark"/>
     {!isAdminPage && <Navbar user={isLoggedIn} />}
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/about' element={< About />} />
        <Route path='/service' element={< Services />} />
        <Route path='/contact' element={< Contact />} />
        <Route path='/login' element={< Login user={isLoggedIn} handleLogin={handleLogin}/>} />
        <Route path='/register' element={< Register user={isLoggedIn}/>} />
        <Route path='/service/basketball' element={< Basketball />} />
        <Route path='/details/:id' element={< Details />} />
        <Route path='/registercoach' element={< CreateResource />} /> 
        <Route path='/bookingcoach/:id' element={< BookingCoach />} />
        <Route path='/admin/*' element={< Admin />} /> 
        <Route path='/profile' element={< UserProfile />} /> 
        <Route path='/update' element={< UpdateUser />} />
      </Routes>
      {!isAdminPage && <Footer />}

    </>
  );
}

export default App;

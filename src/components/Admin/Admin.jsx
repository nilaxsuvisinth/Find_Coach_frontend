import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar';
import User from './User';
import Resource from './Resource';
import BookingDetails from './BookingDetails';
import Feedback from "react-bootstrap/esm/Feedback";

function Admin() {
    return (
        <div>
            <AdminNavbar />
            <Routes>
                <Route path="/" element={<Navigate to="user" />} />
                <Route path="/user" element={<User />} />
                <Route path="/resource" element={<Resource />} />
                <Route path="/bookings" element={<BookingDetails />} />
                <Route path="/message" element={<Feedback />} />
            </Routes>
        </div>
    );
}

export default Admin;

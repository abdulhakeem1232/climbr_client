import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/admin/Home';
import Users from '../pages/admin/Users';
import Recruiter from '../pages/admin/Recruiter';
function AdminRoute() {
    return (
        <div>
            < Routes >
                <Route path='/dashboard' element={<Home />} />
                <Route path='/usermanagement' element={<Users />} />
                <Route path='/recruitermanagement' element={<Recruiter />} />


            </Routes >
        </div>
    )
}

export default AdminRoute


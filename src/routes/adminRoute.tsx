import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/admin/Home';
import Users from '../pages/admin/Users';
import Recruiter from '../pages/admin/Recruiter';
import PrivateRoute from '../utils/admin/PrivateRoute';
import SharedLayout from '../pages/admin/SharedLayout';
function AdminRoute() {
    return (
        <div>
            < Routes >
                <Route element={<PrivateRoute />}>
                    <Route element={<SharedLayout />}>
                        <Route path='/dashboard' element={<Home />} />
                        <Route path='/usermanagement' element={<Users />} />
                        <Route path='/recruitermanagement' element={<Recruiter />} />
                    </Route>
                </Route>
            </Routes >
        </div >
    )
}

export default AdminRoute


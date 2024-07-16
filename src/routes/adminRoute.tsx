import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/admin/Home';
import Users from '../pages/admin/Users';
import Recruiter from '../pages/admin/Recruiter';
import Post from '../pages/admin/PostManagement';
import PrivateRoute from '../utils/admin/PrivateRoute';
import SharedLayout from '../pages/admin/SharedLayout';
import NotFound from '../components/user/home/NotFound';
import { Toaster } from 'sonner';
function AdminRoute() {
    return (
        <div>
            <Toaster position="top-center" richColors />
            < Routes >
                <Route element={<PrivateRoute />}>
                    <Route element={<SharedLayout />}>
                        <Route path='/dashboard' element={<Home />} />
                        <Route path='/usermanagement' element={<Users />} />
                        <Route path='/recruitermanagement' element={<Recruiter />} />
                        <Route path='/postmanagement' element={<Post />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes >
        </div >
    )
}

export default AdminRoute


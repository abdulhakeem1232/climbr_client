import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const token = Cookies.get('token');
    const isAuthenticated = token && token.trim() !== '';
    const role = Cookies.get('role');

    if (token && token.trim() !== '') {
        if (role === 'user') {
            return <Navigate to="/home" />;
        } else if (role === 'recruiter') {
            return <Navigate to="/recruiter/home" />;
        } else if (role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        }
    }

    return <Outlet />;
}
export default PublicRoute

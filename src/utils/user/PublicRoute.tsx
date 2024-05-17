import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const token = Cookies.get('token');
    const isAuthenticated = token && token.trim() !== '';
    return isAuthenticated ? <Navigate to="home" /> : <Outlet />
}
export default PublicRoute

import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = () => {
    const token = Cookies.get('token');
    const isAuthenticated = token && token.trim() !== '';
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoute

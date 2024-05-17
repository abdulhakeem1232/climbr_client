import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = () => {
    const token = Cookies.get('token');
    console.log(token, '-----');

    const isAuthenticated = token ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoute

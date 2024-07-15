import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { RootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((store: RootState) => store.UserData.isAuthenticated);
    const token = Cookies.get('token');
    console.log(token, isAuthenticated, 'admin');
    // const isAuthenticated = token && token.trim() !== '';
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoute

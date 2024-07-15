import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { RootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const token = Cookies.get('token');
    // const isAuthenticated = token && token.trim() !== '';
    const isAuthenticated = useSelector((store: RootState) => store.UserData.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoute

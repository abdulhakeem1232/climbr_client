import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { RootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";

const PrivateRoute = () => {

    const token = Cookies.get('token');

    const isAuthenticated = useSelector((store: RootState) => store.UserData.isAuthenticated);
    const role = useSelector((store: RootState) => store.UserData.role);
    console.log('popopo', isAuthenticated, token);

    return isAuthenticated && role == 'user' ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;



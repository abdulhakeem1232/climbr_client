import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { RootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const token = Cookies.get('token');
    // const role = Cookies.get('role');
    const role = useSelector((store: RootState) => store.UserData.role);
    const isAuthenticated = useSelector((store: RootState) => store.UserData.isAuthenticated);


    if (isAuthenticated) {
        if (role == 'user') {
            return <Navigate to="/home" />;
        } else if (role == 'recruiter') {
            return <Navigate to="/recruiter/home" />;
        } else if (role == 'admin') {
            return <Navigate to="/admin/dashboard" />;
        }
    }

    return <Outlet />;
}
export default PublicRoute

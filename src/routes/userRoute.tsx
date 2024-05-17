import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/user/Login";
import OtpPage from "../pages/user/Otp";
import SignupPage from "../pages/user/Signup";
import HomePage from "../pages/user/HomePage";
import CreatePost from "../components/user/home/CreatePost";
import EmailPage from "../pages/user/Email";
import ResetPasswordPage from "../pages/user/ResetPassword";
import PrivateRoute from "../utils/user/PrivateRoutes";
import PublicRoute from "../utils/user/PublicRoute";

const UserRoutes = () => {
    return (
        < Routes >
            <Route element={<PublicRoute />}>
                < Route path='/register' element={< SignupPage />} />
                < Route path='/otp' element={< OtpPage />} />
                < Route path='/' element={< LoginPage />} />
                < Route path='/email' element={< EmailPage />} />
                < Route path='/reset' element={< ResetPasswordPage />} />
            </Route >

            < Route element={< PrivateRoute />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/post' element={<CreatePost />} />
            </Route >


        </Routes >
    )
}
export default UserRoutes

import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/user/Login";
import OtpPage from "../pages/user/Otp";
import SignupPage from "../pages/user/Signup";
import HomePage from "../pages/user/HomePage";
import Post from "../pages/user/Post";
import EmailPage from "../pages/user/Email";
import ResetPasswordPage from "../pages/user/ResetPassword";
import PrivateRoute from "../utils/user/PrivateRoutes";
import PublicRoute from "../utils/user/PublicRoute";
import LandingPage from "../pages/user/LandingPage";
import Job from "../pages/user/Job";
import SingleJob from "../pages/user/SingleJob";
import ProfilePage from "../pages/user/Profile";

const UserRoutes = () => {
    return (
        < Routes >
            < Route path='/landing' element={< LandingPage />} />
            <Route element={<PublicRoute />}>
                < Route path='/register' element={< SignupPage />} />
                < Route path='/otp' element={< OtpPage />} />
                < Route path='/' element={< LoginPage />} />
                < Route path='/email' element={< EmailPage />} />
                < Route path='/reset' element={< ResetPasswordPage />} />
            </Route >

            < Route element={< PrivateRoute />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/job' element={<Job />} />
                <Route path='/job/:id' element={<SingleJob />} />
                <Route path='/post' element={<Post />} />
                <Route path='/profile/:id' element={<ProfilePage />} />

            </Route >


        </Routes >
    )
}
export default UserRoutes

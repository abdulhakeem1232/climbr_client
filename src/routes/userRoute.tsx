import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/user/Login";
import OtpPage from "../pages/user/Otp";
import SignupPage from "../pages/user/Signup";
import HomePage from "../pages/user/HomePage";
import CreatePost from "../components/user/home/CreatePost";

const UserRoutes = () => {
    return (
        < Routes >
            <Route path='/register' element={<SignupPage />} />
            <Route path='/otp' element={<OtpPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/post' element={<CreatePost />} />

        </Routes >
    )
}
export default UserRoutes

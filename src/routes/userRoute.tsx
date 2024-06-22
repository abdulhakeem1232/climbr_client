import { Routes, Route } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
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
import Message from "../pages/user/Message";
import VideoCall from "../pages/user/VideoCall";
import LoadingWave from "../components/user/home/Spinner";

const UserRoutes = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Routes>

            <Route path='/landing' element={<LandingPage />} />
            <Route path='/videoCall/:roomId' element={<VideoCall />} />
            <Route path='/loading' element={<LoadingWave />} />

            <Route element={<PublicRoute />}>
                <Route path='/register' element={<SignupPage />} />
                <Route path='/otp' element={<OtpPage />} />
                <Route path='/' element={loading ? (<LoadingWave />) : (<Suspense fallback={<LoadingWave />}>< LoginPage /></Suspense>)} />
                <Route path='/email' element={<EmailPage />} />
                <Route path='/reset' element={<ResetPasswordPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path='/home' element={
                    loading ? (
                        <LoadingWave />
                    ) : (
                        <Suspense fallback={<LoadingWave />}>
                            <HomePage />
                        </Suspense>
                    )
                } />
                <Route path='/job' element={<Job />} />
                <Route path='/job/:id' element={<SingleJob />} />
                <Route path='/post' element={<Post />} />
                <Route path='/profile/:id' element={
                    loading ? (
                        <LoadingWave />
                    ) : (
                        <Suspense fallback={<LoadingWave />}>
                            <ProfilePage />
                        </Suspense>
                    )
                } />
                <Route path='/chats' element={<Message />} />
            </Route>
        </Routes >
    )
}
export default UserRoutes

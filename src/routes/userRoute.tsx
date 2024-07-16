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
import Sampl from "../components/user/home/Sampl";
import NotFound from "../components/user/home/NotFound";
import { Toaster } from "sonner";
const UserRoutes = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <><Toaster position="top-center" richColors />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<SignupPage />} />
                    <Route path='/otp' element={<OtpPage />} />
                    <Route path='/' element={loading ? (<LoadingWave />) : (<Suspense fallback={<LoadingWave />}>< LandingPage /></Suspense>)} />
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
                <Route path='/*' element={<NotFound />} />
            </Routes >
        </>
    )
}
export default UserRoutes

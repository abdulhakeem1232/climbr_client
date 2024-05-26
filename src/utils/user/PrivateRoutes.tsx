import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { userAxios, endpoints } from "../../endpoints/userEndpoint";

const PrivateRoute = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // useEffect(() => {
    //     const checkUserStatus = async () => {
    //         const token = Cookies.get('token');
    //         if (token) {
    //             try {
    //                 const response = await userAxios.get(endpoints.getStatus);
    //                 console.log("User data fromsss server:", response.data);
    //                 const userData = response.data.status;
    //                 if (userData) {
    //                     console.log("User data from server:", response.data);
    //                     setIsAuthenticated(true);
    //                 } else {
    //                     setIsAuthenticated(false);
    //                     Cookies.remove('token');
    //                     Cookies.remove('role');

    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching user status:", error);
    //                 setIsAuthenticated(false);
    //                 Cookies.remove('token');
    //                 Cookies.remove('role');


    //             }
    //         } else {
    //             setIsAuthenticated(false);
    //             Cookies.remove('token');
    //             Cookies.remove('role');
    //         }
    //     };

    //     checkUserStatus();
    // }, []);
    // console.log(isAuthenticated, 'jajajaj');
    useEffect(() => {
        console.log('useEffect');

    }, [])
    const token = Cookies.get('token');
    console.log('popopo');

    const isAuthenticated = token && token.trim() !== '';

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;

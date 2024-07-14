import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { endpoints } from "../../endpoints/userEndpoint";
import { userAxios } from "../Config";

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




    const token = Cookies.get('token');

    const isAuthenticated = token && token.trim() !== '';
    console.log('popopo', isAuthenticated, token);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;


// import { Navigate, Outlet } from "react-router-dom";
// import { useState } from 'react';
// import Cookies from 'js-cookie';
// import { userAxios, endpoints } from '../../endpoints/userEndpoint';

// const PrivateRoute = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const checkAuthentication = async () => {
//         const token = Cookies.get('token');
//         if (token) {
//             try {
//                 const response = await userAxios.get(endpoints.getStatus);
//                 const userData = response.data.status;
//                 if (userData) {
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

//     checkAuthentication();

//     return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// };

// export default PrivateRoute;


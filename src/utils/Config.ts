// import axios from 'axios'
// import { logout } from '../Redux/slice/UserSlice';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const dispatch = useDispatch()
// const navigate = useNavigate()
// export const USER_API_GATEWAY_BASE_URL = 'http://localhost:8080';
// export const RECRUITER_API_GATEWAY_BASE_URL = 'http://localhost:8080/recruiter';
// export const ADMIN_API_GATEWAY_BASE_URL = 'http://localhost:8080/admin';
// export const USER_API_GATEWAY_BASE_URL = 'http://localhost:30080';
// export const RECRUITER_API_GATEWAY_BASE_URL = 'http://localhost:30080/recruiter';
// export const ADMIN_API_GATEWAY_BASE_URL = 'http://localhost:30080/admin';


export const USER_API_GATEWAY_BASE_URL = 'https://climbrserver.site';
export const RECRUITER_API_GATEWAY_BASE_URL = 'https://climbrserver.site/recruiter';
export const ADMIN_API_GATEWAY_BASE_URL = 'https://climbrserver.site/admin';

// export const userAxios = axios.create({
//     baseURL: USER_API_GATEWAY_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });

// export const recruiterAxios = axios.create({
//     baseURL: RECRUITER_API_GATEWAY_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });

// export const adminAxios = axios.create({
//     baseURL: ADMIN_API_GATEWAY_BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });

// const handle401Error = () => {
//     dispatch(logout());
//     navigate('/')
//     toast.info("Session Expired")
// };

// userAxios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             handle401Error();
//         }
//         return Promise.reject(error);
//     }
// );
// recruiterAxios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             handle401Error();
//         }
//         return Promise.reject(error);
//     }
// );

// adminAxios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response && error.response.status === 401) {
//             handle401Error();
//         }
//         return Promise.reject(error);
//     }
// );

import axios from 'axios';
import { logout } from '../Redux/slice/UserSlice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const userAxios = axios.create({
    baseURL: 'https://climbrserver.site',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const recruiterAxios = axios.create({
    baseURL: 'https://climbrserver.site/recruiter',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


const adminAxios = axios.create({
    baseURL: 'https://climbrserver.site/admin',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


const handle401Error = (dispatch: any, navigate: any) => {
    dispatch(logout());
    navigate('/');
    toast.info("Session Expired");
};


const addRequestInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use(
        (config: any) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );
};



const addResponseInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            if (error.response && error.response.status === 401) {
                const dispatch = useDispatch();
                const navigate = useNavigate();
                handle401Error(dispatch, navigate);
            }
            return Promise.reject(error);
        }
    );
};


addRequestInterceptor(userAxios);
addRequestInterceptor(recruiterAxios);
addRequestInterceptor(adminAxios);

addResponseInterceptor(userAxios);
addResponseInterceptor(recruiterAxios);
addResponseInterceptor(adminAxios);

export { userAxios, recruiterAxios, adminAxios };


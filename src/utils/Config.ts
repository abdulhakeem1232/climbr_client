import axios from 'axios'
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

export const userAxios = axios.create({
    baseURL: USER_API_GATEWAY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const recruiterAxios = axios.create({
    baseURL: RECRUITER_API_GATEWAY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const adminAxios = axios.create({
    baseURL: ADMIN_API_GATEWAY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

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

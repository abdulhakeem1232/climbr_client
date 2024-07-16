import axios from 'axios'

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

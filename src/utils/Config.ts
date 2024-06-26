import axios from 'axios'

const USER_API_GATEWAY_BASE_URL = 'http://localhost:8080';
const RECRUITER_API_GATEWAY_BASE_URL = 'http://localhost:8080/recruiter';
const ADMIN_API_GATEWAY_BASE_URL = 'http://localhost:8080/admin';

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

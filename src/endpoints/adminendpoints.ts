import axios, { AxiosInstance } from 'axios'

const API_GATEWAY_BASE_URL = 'http://localhost:8080/admin';
export const adminAxios = axios.create({
    baseURL: API_GATEWAY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


export const adminendpoints = {
    getallUser: `${API_GATEWAY_BASE_URL}/getalluser`,
    updateUser: `${API_GATEWAY_BASE_URL}/updateUserStatus`,
    getallRecruiter: `${API_GATEWAY_BASE_URL}/getallrecruiter`,
    updateRecruiter: `${API_GATEWAY_BASE_URL}/updateRecruiterStatus`,
    approveRecruiter: `${API_GATEWAY_BASE_URL}/approve`,
    post: `${API_GATEWAY_BASE_URL}/reportedpost`,
    deletePost: `${API_GATEWAY_BASE_URL}/post`,
};

import axios,{AxiosInstance} from 'axios'

const API_GATEWAY_BASE_URL = 'http://localhost:8080';
export const userAxios = axios.create({
  baseURL: API_GATEWAY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



export const endpoints = {
    register: `${API_GATEWAY_BASE_URL}/register`,
    otp:`${API_GATEWAY_BASE_URL}/verifyOtp` ,
    login:`${API_GATEWAY_BASE_URL}/login` ,


  };

import axios, { AxiosInstance } from 'axios'
import ResetPassword from '../components/user/auth/ResetPassword';

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
  otp: `${API_GATEWAY_BASE_URL}/verifyOtp`,
  login: `${API_GATEWAY_BASE_URL}/login`,
  getall: `${API_GATEWAY_BASE_URL}/getalluser`,
  updateStatus: `${API_GATEWAY_BASE_URL}/updateStatus`,
  emailValidate: `${API_GATEWAY_BASE_URL}/emailValidate`,
  ResetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
  resendOtp: `${API_GATEWAY_BASE_URL}/resendOtp`,
  createpost: `${API_GATEWAY_BASE_URL}/post/createpost`,
  getPost: `${API_GATEWAY_BASE_URL}/post/getall`,



};

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
  emailValidate: `${API_GATEWAY_BASE_URL}/emailValidate`,
  ResetPassword: `${API_GATEWAY_BASE_URL}/resetPassword`,
  resendOtp: `${API_GATEWAY_BASE_URL}/resendOtp`,
  getStatus: `${API_GATEWAY_BASE_URL}/getStatus`,
  userDetails: `${API_GATEWAY_BASE_URL}/getUserDetails`,
  updateCover: `${API_GATEWAY_BASE_URL}/updateCover`,
  updateProfile: `${API_GATEWAY_BASE_URL}/updateProfile`,
  updateData: `${API_GATEWAY_BASE_URL}/updateData`,
  updateSkills: `${API_GATEWAY_BASE_URL}/updateSkills`,
  updateEducation: `${API_GATEWAY_BASE_URL}/updateEducation`,
  updateExperience: `${API_GATEWAY_BASE_URL}/updateExperience`,

  createpost: `${API_GATEWAY_BASE_URL}/post/createpost`,
  getPost: `${API_GATEWAY_BASE_URL}/post/getall`,
  logout: `${API_GATEWAY_BASE_URL}/logout`,
  likePost: `${API_GATEWAY_BASE_URL}/post/like`,
  deleteComment: `${API_GATEWAY_BASE_URL}/post/deleteComment`,
  DislikePost: `${API_GATEWAY_BASE_URL}/post/dislike`,
  commentPost: `${API_GATEWAY_BASE_URL}/post/comment`,
  reportPost: `${API_GATEWAY_BASE_URL}/post/report`,
  deletePost: `${API_GATEWAY_BASE_URL}/post/delete`,
  editpost: `${API_GATEWAY_BASE_URL}/post/edit`,

  getalljob: `${API_GATEWAY_BASE_URL}/job/getalljob`,
  singlejob: `${API_GATEWAY_BASE_URL}/job/singlejob`,
  applyjob: `${API_GATEWAY_BASE_URL}/job/applyjob`,
  getsearchjobs: `${API_GATEWAY_BASE_URL}/job/searchjob`,






};

import axios from 'axios'

const API_GATEWAY_BASE_URL = 'http://localhost:8080';

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
  userFollwings: `${API_GATEWAY_BASE_URL}/getFollowings`,
  follow: `${API_GATEWAY_BASE_URL}/follow`,
  unfollow: `${API_GATEWAY_BASE_URL}/unfollow`,
  searchUser: `${API_GATEWAY_BASE_URL}/SearchUser`,
  getSuggestion: `${API_GATEWAY_BASE_URL}/suggestion`,


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

  createchats: `${API_GATEWAY_BASE_URL}/message/createchats`,
  getChatlist: `${API_GATEWAY_BASE_URL}/message/getchatlist`,
  getMessages: `${API_GATEWAY_BASE_URL}/message/getMessages`,
  sendFiles: `${API_GATEWAY_BASE_URL}/message/sendFiles`,




};

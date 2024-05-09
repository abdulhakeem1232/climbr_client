import axios,{AxiosInstance} from 'axios'

const API_GATEWAY_BASE_URL = 'http://localhost:8080/recruiter';
export const recruiterAxios = axios.create({
  baseURL: API_GATEWAY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



export const recruiterendpoints = {
    register: `${API_GATEWAY_BASE_URL}/register`,
    otp:`${API_GATEWAY_BASE_URL}/verifyOtp` ,
    login:`${API_GATEWAY_BASE_URL}/login` ,
    getall:`${API_GATEWAY_BASE_URL}/getallrecruiter` ,
    updateStatus:`${API_GATEWAY_BASE_URL}/updateStatus`,
    approve:`${API_GATEWAY_BASE_URL}/approve`

  };

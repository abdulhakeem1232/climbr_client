// const API_GATEWAY_BASE_URL = 'http://localhost:8080/recruiter';
// const API_GATEWAY_BASE_URL = 'http://localhost:30080/recruiter';
const API_GATEWAY_BASE_URL = 'https://climbrserver.online/recruiter';



export const recruiterendpoints = {
  register: `${API_GATEWAY_BASE_URL}/register`,
  otp: `${API_GATEWAY_BASE_URL}/verifyOtp`,
  login: `${API_GATEWAY_BASE_URL}/login`,
  createjob: `${API_GATEWAY_BASE_URL}/job/createjob`,
  getjob: `${API_GATEWAY_BASE_URL}/job/getjob`,
  deletejob: `${API_GATEWAY_BASE_URL}/job/deletejob`,
  getSinglejob: `${API_GATEWAY_BASE_URL}/job/singlejob`,
  updatejob: `${API_GATEWAY_BASE_URL}/job/updatejob`,
  applicantChart: `${API_GATEWAY_BASE_URL}/job/applicantChart`,
  getApplicant: `${API_GATEWAY_BASE_URL}/job/getApplicant`,
  changeApplicantStatus: `${API_GATEWAY_BASE_URL}/job/applicantStatus`,






};

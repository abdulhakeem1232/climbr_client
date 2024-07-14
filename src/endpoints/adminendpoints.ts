// const API_GATEWAY_BASE_URL = 'http://localhost:8080/admin';
// const API_GATEWAY_BASE_URL = 'http://localhost:30080/admin';
const API_GATEWAY_BASE_URL = 'https://climbrserver.online/admin';



export const adminendpoints = {
    getallUser: `${API_GATEWAY_BASE_URL}/getalluser`,
    updateUser: `${API_GATEWAY_BASE_URL}/updateUserStatus`,
    getallRecruiter: `${API_GATEWAY_BASE_URL}/getallrecruiter`,
    updateRecruiter: `${API_GATEWAY_BASE_URL}/updateRecruiterStatus`,
    approveRecruiter: `${API_GATEWAY_BASE_URL}/approve`,
    post: `${API_GATEWAY_BASE_URL}/reportedpost`,
    deletePost: `${API_GATEWAY_BASE_URL}/post`,
    userReport: `${API_GATEWAY_BASE_URL}/userReport`,
    recruiterReport: `${API_GATEWAY_BASE_URL}/recruiterReport`,
    postReport: `${API_GATEWAY_BASE_URL}/postReport`,
    jobReport: `${API_GATEWAY_BASE_URL}/jobReport`,

};

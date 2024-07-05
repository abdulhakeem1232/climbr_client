import { Routes, Route } from "react-router-dom";
import JobPage from "../pages/recruiter/PostedJobs";
import Addjob from "../pages/recruiter/Addjob";
import PrivateRoute from "../utils/recruiter/PrivateRoute";
import EditJobPage from "../pages/recruiter/EditJobPage";
//@ts-ignore
import HomePage from '../pages/recruiter/Home'
import Applicants from "../pages/recruiter/Applicants";
import NotFound from "../components/user/home/NotFound";


const RecruiterRoute = () => {
    return (
        < Routes >
            <Route element={<PrivateRoute />} >
                <Route path='/home' element={<HomePage />} />
                <Route path="/newJob" element={<Addjob />} />
                <Route path="/postedJobs" element={<JobPage />} />
                <Route path="/editjob/:id" element={<EditJobPage />} />
                <Route path="/applicants/:jobId" element={<Applicants />} />
            </Route >
            <Route path='*' element={<NotFound />} />
        </Routes >
    )
}

export default RecruiterRoute

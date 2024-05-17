import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/recruiter/Home";
import PrivateRoute from "../utils/recruiter/PrivateRoute";


const RecruiterRoute = () => {
    return (
        < Routes >
            <Route element={<PrivateRoute />} >
                <Route path='/home' element={<HomePage />} />
            </Route >
        </Routes >
    )
}

export default RecruiterRoute

import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/recruiter/Home";


const RecruiterRoute = () => {
    return (
        < Routes >
            <Route path='/home' element={<HomePage />} />

        </Routes >
    )
}

export default RecruiterRoute

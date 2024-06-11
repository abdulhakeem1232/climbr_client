import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './routes/userRoute'
import RecruiterRoute from './routes/recruiterRoute';
import AdminRoute from './routes/adminRoute';




function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/recruiter/*' element={<RecruiterRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />


        </Routes>
      </Router>

    </div >
  );
}

export default App;

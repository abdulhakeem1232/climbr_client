import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoutes from './routes/userRoute'
import Login from './components/user/auth/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

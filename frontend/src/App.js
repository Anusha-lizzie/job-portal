// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import CoverPage from './components/CoverPage';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<CoverPage/>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ApplicantDashboard from './components/ApplicantDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddJobPost from './components/AddJobPost';


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-job-post" element={<AddJobPost />} />
        <Route
          path="/applicant-dashboard"
          element={
            <PrivateRoute>
              <ApplicantDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter-dashboard"
          element={
            <PrivateRoute>
              <RecruiterDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

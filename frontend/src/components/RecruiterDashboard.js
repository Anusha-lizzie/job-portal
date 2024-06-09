import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddJobPost from './AddJobPost';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecruiterDashboard = () => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };
      const res = await axios.get('http://localhost:5000/api/jobPosts', config); // Corrected route
      setJobPosts(res.data);
    };
    fetchJobPosts();
  }, []);

  const handleJobPostAdded = jobPost => {
    setJobPosts([...jobPosts, jobPost]);
  };

  const handleDelete = async id => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };
      await axios.delete(`http://localhost:5000/api/jobPosts/${id}`, config); // Corrected route
      setJobPosts(jobPosts.filter(jobPost => jobPost._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const recruiterName = 'Recruiter Name'; // Fetch this from your backend or context

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="http://localhost:3000">Job Portal</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="nav-link">{recruiterName}</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" className="pt-3 px-4">
        <AddJobPost onJobPostAdded={handleJobPostAdded} />
        <h2 className="mt-5">Job Posts</h2>
        <ul className="list-group">
          {jobPosts.map(jobPost => (
            <li key={jobPost._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{jobPost.jobTitle}</h5>
                <p>{jobPost.description}</p>
                <p><strong>Salary:</strong> {jobPost.salary}</p>
                <p><strong>Vacant Posts:</strong> {jobPost.vacantPosts}</p>
              </div>
              <div>
                <button className="btn btn-danger" onClick={() => handleDelete(jobPost._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default RecruiterDashboard;

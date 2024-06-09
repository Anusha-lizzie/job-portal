import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddJobPost = ({ onJobPostAdded }) => {
  const [newJob, setNewJob] = useState({ jobTitle: '', salary: '', description: '', vacantPosts: '' });

  const onChange = e => setNewJob({ ...newJob, [e.target.name]: e.target.value });

  const addJobPost = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/jobPosts', newJob, {
        headers: { 'x-auth-token': localStorage.getItem('token') } // Corrected route
      });
      onJobPostAdded(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Job Post</h2>
      <form onSubmit={(e) => { e.preventDefault(); addJobPost(); }}>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            value={newJob.jobTitle}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            name="salary"
            value={newJob.salary}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={newJob.description}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Vacant Posts</label>
          <input
            type="number"
            className="form-control"
            name="vacantPosts"
            value={newJob.vacantPosts}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Job Post</button>
      </form>
    </div>
  );
};

export default AddJobPost;

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CoverPage.css'; // Create a CSS file for custom styles

const CoverPage = () => {
  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Job Portal</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Signup</Link>
          </nav>
        </div>
      </header>

      <main className="px-3">
        <h1>Welcome to the Job Portal</h1>
        <p className="lead">Find your dream job or the perfect candidate today.</p>
        <p className="lead">
          <Link to="/signup" className="btn btn-lg btn-secondary fw-bold border-white">Get Started</Link>
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Job Portal by Anusha Mohanty.</p>
      </footer>
    </div>
  );
};

export default CoverPage;

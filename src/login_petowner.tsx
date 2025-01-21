import React from 'react';
import './login_petowner.css'; // Ensure styling matches the design

const LoginPetOwner: React.FC = () => {
  return (
    <div className="login-container">
      <header className="header">Login Pet Owner</header>
      <div className="login-wrapper">
        <div className="login-left">
          <div className="welcome-section">
            <h1>Welcome,</h1>
            <h2>Pet Owner</h2>
            <img
              src="https://via.placeholder.com/250" // Replace with the provided cat image
              alt="Pet Owner Illustration"
              className="login-image"
            />
          </div>
        </div>
        <div className="login-right">
          <img
            src="https://via.placeholder.com/100" // Replace with PawPal logo
            alt="PawPal Logo"
            className="logo"
          />
          <form className="login-form">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPetOwner;

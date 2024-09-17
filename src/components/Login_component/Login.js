import React, { useState, useRef } from "react";
import "./Login.css";
import Logo from "../assets/Logo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage form values and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Reference to the password input field
  const passwordField = useRef(null);
  
  const navigate = useNavigate();

  // Toggle password visibility function
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    
    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault();

    // Check if form is valid
    if (validateForm()) {
      navigate('/Dashboard_nav');
    }
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <img src={Logo} alt="Logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="Ename">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="Ename"
            name="Ename"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error_message">{errors.email}</p>} {/* Email error */}

          <label htmlFor="Pname">Password</label>
          <div className="password_box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="Pname"
              name="Pname"
              ref={passwordField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ion-icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              onClick={handleTogglePassword}
              style={{ cursor: "pointer" }}
            ></ion-icon>
          </div>
          {errors.password && <p className="error_message">{errors.password}</p>} {/* Password error */}

          <input type="submit" value="LogIn" />
        </form>
        <a href="#">forgot password?</a>
      </div>
      <div className="circle"></div>
    </div>
  );
}

export default Login;

import React, { useState, useRef } from "react";
import "./Login.css";
import Logo from "../assets/Logo.png";

function Login() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Reference to the password input field
  const passwordField = useRef(null);

  // Toggle password visibility function
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login_page">
      <div className="login_container">
        <img src={Logo} alt="Logo" />
        <h2>Login</h2>
        <form>
          <label htmlFor="Ename">Email</label>
          <input type="text" placeholder="Email" id="Ename" name="Ename" />

          <label htmlFor="Pname">Password</label>
          <div className="password_box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="Pname"
              name="Pname"
              ref={passwordField}
            />
            <ion-icon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              onClick={handleTogglePassword}
              style={{ cursor: "pointer" }}
            ></ion-icon>
          </div>
          <input type="submit" value="LogIn" />
        </form>
        <a>forgot password?</a>
      </div>
      <div className="circle"></div>
    </div>
  );
}

export default Login;

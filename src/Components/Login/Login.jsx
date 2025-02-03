import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { loginUrl } from "../../Redux/Services/apiServer/ApiServer";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); 
  const [serialNo, setSerialNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = loginUrl;

  const handleLogin = async (e) => {
    e.preventDefault();

    const userName = `WIN${name}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (data.response.success) {
        localStorage.setItem("authToken", data.response.token);
        localStorage.setItem("empCode", data.response.employeeCode);
        localStorage.setItem("userName", data.response.userName);
        navigate("/compose");
      } else {
        setError(data.response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const finalText = `WIN${name}`;

  return (
    <div className="Login-Conatiner">
      <div className="login-page">
        <div className="welcome-banner">
          <h1>Welcome to WinWealthAlgos</h1>
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <div className="final-text">{finalText}</div>
          <form onSubmit={handleLogin}>
            <div className="form-row">
              <div className="form-group code-name-group">
                <label>Code and Name</label>
                <div className="code-name-wrapper">
                  <input
                    type="text"
                    className="code-input"
                    value="WIN"
                    readOnly
                  />
                  <input
                    type="text"
                    className="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </div>
            <div className="form-group password-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                   <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

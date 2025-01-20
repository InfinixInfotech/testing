import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const LoginPage = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); 
  const [serialNo, setSerialNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = 'http://192.168.1.36:5118/api/Auth/login';

  const handleLogin = async (e) => {
    e.preventDefault();

    const userName = `INF${name}${dob}${serialNo}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName,password}),
      });

      const data = await response.json();

      if (data.response.success) {
        localStorage.setItem("authToken", data.response.token);
        navigate("/mailbox");
      } else {
        setError(data.response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Login-Conatiner">
      <div className="login-page">
        <div className="welcome-banner">
          <h1>check the cicd pipeline</h1>
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                value="INF"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control text-uppercase"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="number"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  appearance: "none",
                }}
              />
            </div>
            <div className="form-group">
              <label>Serial No.</label>
              <input
                type="number"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  appearance: "none",
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
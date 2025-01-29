import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  
  return (
    <div >
    
            <button onClick={handleLogout} > <i className="bi bi-box-arrow-right" style={{ fontSize: "1.5rem" }}></i></button>
            {/* <button onClick={() => navigate(-1)} className="cancel-btn">Cancel</button> */}
         
    </div>
  );
};

export default LogoutPage;
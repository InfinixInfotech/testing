import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoutPage from "../Login/Logout";
import { userName } from "../../Redux/Services/apiServer/ApiServer";
import Logo from "../../assets/1.png";

const Navbar = () => {
  // Function to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours(); // Get the current hour
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      style={{
        height: "8vh",
        display: "flex",
        justifyContent: "space-between", // Align items at both ends
        alignItems: "center",
        padding: "0.2rem"
      }}
    >

      
        <span
          className="navbar-text text-white"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          INFINIX INFOTECH
        </span>
    
      <span
        className="navbar-text text-white"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        {`${getGreeting()}, ${userName}!`}
      </span>
      <div>
        <button
          className="btn btn-outline-light"
          style={{ border: "none", background: "transparent" }}

        >

          <LogoutPage />
        </button>
      </div>
    </nav>

  );
};

export default Navbar;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ userName = "User" }) => {
  // Function to get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours(); // Get the current hour
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      style={{
        height: "8vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        className="navbar-text text-white"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        {`${getGreeting()}, ${userName}!`}
      </span>
    </nav>
  );
};

export default Navbar;

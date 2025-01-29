import React from "react";
import { Navigate } from "react-router-dom";
const ProtecteRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};
export default ProtecteRoute;
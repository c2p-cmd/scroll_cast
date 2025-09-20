import React from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../utils/getUserDetails";

const ProtectedRoute = ({ children }) => {
  const userDetails = getUserDetails();

  if (!userDetails) {
    // If no user details, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If user details exist, render the child component (e.g., HomePage)
  return children;
};

export default ProtectedRoute;

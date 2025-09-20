import React from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../utils/getUserDetails";

const AdminProtectedRoute = ({ children }) => {
  const userDetails = getUserDetails();

  if (userDetails === null) {
    // If no user details, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  if (userDetails && userDetails.role.toLowerCase() !== "admin") {
    // If user is not admin, redirect to the /login page
    return <Navigate to="/login" replace />;
  }

  // If user details exist, render the child component
  return children;
};

export default AdminProtectedRoute;

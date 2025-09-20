import React from "react";
import { Typography } from "@mui/material";
import { getUserDetails } from "../utils/getUserDetails";

const HomePage = () => {
  const userDetails = getUserDetails();

  // Show loading or redirect if no user details
  if (!userDetails) {
    return <Typography variant="h3">Redirecting...</Typography>;
  }

  return <Typography variant="h3">Welcome Home {userDetails.name}</Typography>;
};

export default HomePage;

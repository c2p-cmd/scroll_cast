import { Typography } from "@mui/material";
import { getUserDetails } from "../utils/getUserDetails";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const userDetails = getUserDetails();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user details, redirect to login
    if (!userDetails) {
      navigate("/login", { replace: true });
    }
  }, [userDetails, navigate]);

  // Show loading or redirect if no user details
  if (!userDetails) {
    return <Typography variant="h3">Redirecting...</Typography>;
  }

  return <Typography variant="h3">Welcome Home {userDetails.name}</Typography>;
};

export default HomePage;

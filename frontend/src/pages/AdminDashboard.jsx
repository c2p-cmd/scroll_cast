import React from "react";
import { Stack, Typography } from "@mui/material";
import { getUserDetails } from "../utils/getUserDetails";

const AdminDashboard = () => {
  const userDetails = getUserDetails();

  return (
    <>
      <Stack direction={"column"}>
        <Typography variant="h2">
          Hello {userDetails.role}, {userDetails.name}
        </Typography>
        <Typography variant="h3">{userDetails.email}</Typography>
      </Stack>
    </>
  );
};

export default AdminDashboard;

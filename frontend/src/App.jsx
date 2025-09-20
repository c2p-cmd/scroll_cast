import React from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Button, Box, Typography, AppBar, Toolbar, Stack } from "@mui/material";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

import { getUserDetails } from "./utils/getUserDetails";

function App() {
  return (
    <div>
      {/* Dynamic Navigation Bar */}
      <NavigationBar />

      {/* Route Definitions */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

// Navigation Bar Component
const NavigationBar = () => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();
  const isLoggedIn = !!userDetails;
  const location = useLocation();

  const isLoginPath = () => {
    return location.pathname.toLowerCase() === "/login";
  };

  const handleLogout = () => {
    // Remove user details from localStorage
    localStorage.removeItem("userDetails");
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Box
          component="img"
          sx={{ height: 35, mr: 1 }}
          alt="ScrollCast Icon"
          src="/favicon.ico"
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          fontWeight={"900"}
        >
          ScrollCast
        </Typography>

        {isLoggedIn ? (
          // Show these when user is logged in
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Stack direction={"column"}>
              <Typography
                variant={{ md: "subtitle2", xs: "body2" }}
                sx={{ mr: 2 }}
                fontWeight={"bold"}
              >
                Welcome {userDetails.role}, {userDetails.name}
              </Typography>
              <Typography
                variant={{ md: "subtitle2", sm: "caption" }}
                sx={{ mr: 2 }}
                fontWeight={"bold"}
              >
                {userDetails.email}
              </Typography>
            </Stack>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              sx={{ borderColor: "white", color: "white" }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          // Show these when user is not logged in
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              variant={isLoginPath() ? "outlined" : "text"}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              variant={isLoginPath() ? "text" : "outlined"}
              sx={{ borderColor: "white", color: "white" }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default App;

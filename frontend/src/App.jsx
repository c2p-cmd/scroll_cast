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
import {
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import ProtectedRoute from "./components/ProtectedRoute";
import WeatherPage from "./pages/WeatherPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminProtectedRoute>
              <AdminAnalytics />
            </AdminProtectedRoute>
          }
        />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="*" element={<Typography>404 Not Found</Typography>} />
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1976d2",
        minHeight: isMobile ? 56 : 64,
      }}
    >
      <Toolbar sx={{ minHeight: isMobile ? 56 : 64 }}>
        <Button
          color="inherit"
          component={Link}
          to="/home"
          startIcon={
            <Box
              component="img"
              sx={{ height: 24 }}
              alt="ScrollCast Icon"
              src="/favicon.ico"
            />
          }
          sx={{
            textTransform: "none",
            fontSize: isMobile ? "1rem" : "1.25rem",
            fontWeight: 900,
            mr: isMobile ? 0.5 : 2,
            minWidth: "auto",
          }}
        >
          {isMobile ? "" : "ScrollCast"}
        </Button>
        <Box sx={{ flexGrow: 1 }} />

        {isLoggedIn ? (
          // Show these when user is logged in
          <Box
            sx={{
              display: "flex",
              gap: isMobile ? 0.5 : 1,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Stack direction={"column"} sx={{ minWidth: 0 }}>
              <Typography
                variant={
                  isSmallMobile ? "caption" : isMobile ? "caption" : "subtitle1"
                }
                sx={{
                  mr: isMobile ? 1 : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                fontWeight={"bold"}
              >
                Welcome {userDetails.role}, {userDetails.name}
              </Typography>
              <Typography
                variant={
                  isSmallMobile ? "caption" : isMobile ? "caption" : "subtitle2"
                }
                sx={{
                  mr: isMobile ? 1 : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                fontWeight={"bold"}
              >
                {userDetails.email}
              </Typography>
            </Stack>
            {userDetails.role.toLowerCase() === "admin" && (
              <Button color="inherit" component={Link} to="/admin/dashboard">
                <Typography
                  variant={
                    isSmallMobile
                      ? "caption"
                      : isMobile
                      ? "caption"
                      : "subtitle2"
                  }
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Admin Panel
                </Typography>
              </Button>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              startIcon={<ExitToAppIcon />}
              sx={{ borderColor: "white", color: "white" }}
            >
              {isMobile ? "" : "Logout"}
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

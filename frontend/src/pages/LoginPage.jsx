import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import PasswordComponent from "../components/PasswordComponent";
import SimpleDialog from "../components/SimpleDialog";
import { getUserDetails } from "../utils/getUserDetails";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  React.useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      // User is already logged in, redirect to home page
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      if (response.data.token) {
        localStorage.setItem("userDetails", JSON.stringify(response.data)); // Store the details
        navigate("/home"); // Redirect to a protected home page
      } else {
        showError({ message: response.data.message ?? "Unknown Error" });
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data.message || error.message
      );
      showError({ message: error.response?.data.message ?? error.message });
    }
  };

  const showError = ({ message }) => {
    setShowAlert(true);
    setAlertMessage(message);
  };

  return (
    <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
      {/* Left side: Illustration */}
      <Grid
        size={{
          xs: false,
          sm: 4,
          md: 7,
        }}
        sx={{
          backgroundImage: "url(/login-illustration.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : "#212121",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />

      {/* Right side: Form */}
      <Grid
        size={{
          xs: 12,
          sm: 8,
          md: 5,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#212121",
        }}
      >
        <Box
          component="form"
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              Welcome Back
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordComponent
              label={"Password"}
              value={password}
              setValue={setPassword}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
            >
              Login
            </Button>
            <SimpleDialog
              open={showAlert}
              title={"Error"}
              description={alertMessage}
              onClose={() => {
                setAlertMessage("");
              }}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;

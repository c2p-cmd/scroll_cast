import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordComponent from "../components/PasswordComponent";

import axiosInstance from "../api/axiosInstance";
import SimpleDialog from "../components/SimpleDialog";
import { getUserDetails } from "../utils/getUserDetails";

const RegisterPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [alerMessage, setAlertMessage] = React.useState("");
  const [alerTitle, setAlertTitle] = React.useState("");
  const [navigateToLogin, setNavigateToLogin] = React.useState(false);

  const navigate = useNavigate();

  // Check if user is already logged in
  React.useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      // User is already logged in, redirect to home page
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const showAlert = ({ title, message }) => {
    setShowDialog(true);
    setAlertMessage(message);
    setAlertTitle(title ?? "Alert!");
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showAlert({ message: "Passwords don't match!" });
      return;
    }

    // email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showAlert({ message: "Please enter a valid email address." });
      return;
    }

    try {
      const userForm = { name, email, password };
      const response = await axiosInstance.post("/auth/register", userForm);

      if (response.status === 201) {
        const data = response.data;
        setNavigateToLogin(true);
        showAlert({
          title: "Success",
          message: data.message,
        });
        const userDetails = data;
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.error("e0", response.data);
        showAlert({
          title: "Error",
          message:
            response.data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setNavigateToLogin(false);
      showAlert({
        title: "Error",
        message:
          error.response?.data?.message ||
          "An error occurred during registration. Please try again.",
      });
      console.error("Registration error:", error);
    }
  };

  const handleDialogClose = (e) => {
    e.preventDefault();

    setAlertMessage("");
    setAlertTitle("");
    setNavigateToLogin(false);
  };

  const alertButtons = () => {
    if (navigateToLogin) {
      return [
        {
          title: "Okay",
          onClick: () => setShowDialog(false),
          autoFocus: true,
        },
        {
          title: "Cancel",
          onClick: () => setShowDialog(false),
        },
        {
          title: "Home",
          onClick: () => {
            setShowDialog(false);
            navigate("/home", { replace: true });
          },
        },
      ];
    } else {
      return [
        {
          title: "Okay",
          onClick: () => setShowDialog(false),
          autoFocus: true,
        },
        {
          title: "Cancel",
          onClick: () => setShowDialog(false),
        },
      ];
    }
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
          backgroundImage: "url(/auth-illustration.svg)", // Path from public folder
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
              Create an Account
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              togglePassword={togglePassword}
            />
            <PasswordComponent
              label={"Confirm Password"}
              value={confirmPassword}
              setValue={setConfirmPassword}
              showPassword={showPassword}
              togglePassword={togglePassword}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleFormSubmission}
            >
              Register
            </Button>
            <SimpleDialog
              open={showDialog}
              title={alerTitle}
              description={alerMessage}
              onClose={handleDialogClose}
              buttons={alertButtons()}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;

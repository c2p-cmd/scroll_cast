import axios from "axios";
import { getUserDetails, isTokenExpired } from "../utils/getUserDetails.js";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token and check expiry
axiosInstance.interceptors.request.use(
  (config) => {
    const userDetails = getUserDetails();

    if (userDetails && userDetails.token) {
      // Check if token is expired before making request
      if (isTokenExpired(userDetails.token)) {
        console.log("Token expired, redirecting to login");
        localStorage.removeItem("userDetails");
        window.location.href = "/login"; // or handle redirect as needed
        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${userDetails.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const errorData = error.response.data;

      // Handle specific token expiry
      if (errorData.expired) {
        console.log("Token expired on server, clearing local storage");
        localStorage.removeItem("userDetails");
        window.location.href = "/login"; // or handle redirect as needed
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

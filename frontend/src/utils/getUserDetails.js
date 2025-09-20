// Helper function to decode JWT token without verification
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Check if token is expired
const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true; // Consider invalid tokens as expired
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return decoded.exp < currentTime;
};

// Check if token expires within a certain time (in seconds)
const isTokenExpiringSoon = (token, bufferSeconds = 300) => {
  // 5 minutes buffer
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp - currentTime <= bufferSeconds;
};

const getUserDetails = () => {
  const userDetailsString = localStorage.getItem("userDetails");
  if (!userDetailsString) {
    return null;
  }

  try {
    const userDetails = JSON.parse(userDetailsString);
    const token = userDetails.token;

    if (!token) {
      return null;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      console.log("Token has expired");
      localStorage.removeItem("userDetails"); // Clean up expired token
      return null;
    }

    // Check if token expires soon
    if (isTokenExpiringSoon(token)) {
      console.log("Token expires soon, consider refreshing");
    }

    return userDetails;
  } catch (error) {
    console.error("Error parsing user details:", error);
    localStorage.removeItem("userDetails"); // Clean up invalid data
    return null;
  }
};

export { getUserDetails, isTokenExpired, isTokenExpiringSoon, decodeToken };

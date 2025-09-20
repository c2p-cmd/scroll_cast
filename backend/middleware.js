import express from "express";
import jwt from "jsonwebtoken";

// jwt middleware for all `/admin` routes
const jwtMiddleware = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

jwtMiddleware.use((req, res, next) => {
  const bearerToken = req.headers["authorization"]?.split(" ");
  console.log("JWT Middleware", bearerToken);

  if (!bearerToken || bearerToken[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = bearerToken[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Provide more specific error messages
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired",
          expired: true,
          expiredAt: err.expiredAt,
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token",
          invalid: true,
        });
      }
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;

    // Add token expiry info to response headers for client use
    res.set("X-Token-Expires", decoded.exp);

    if (decoded.role !== "Admin" && req.url.includes("/admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
});

export default jwtMiddleware;

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
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    if (decoded.role !== "Admin" && req.url.includes("/admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
});

export default jwtMiddleware;

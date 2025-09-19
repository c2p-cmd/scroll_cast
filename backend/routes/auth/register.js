import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/db.js";

const registerRouter = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

registerRouter.post("/register", async (req, res) => {
  const { email, password, name, faker } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, password, and name are required" });
  }

  // email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailTrimmed = email.trim();
  if (!emailRegex.test(emailTrimmed)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // no space in username
  const usernameRegex = /^\S*$/;
  const nameTrimmed = name.trim();
  if (!usernameRegex.test(nameTrimmed)) {
    return res.status(400).json({ message: "Name cannot contain spaces" });
  }

  // password to be between 6 & 20
  const passwordTrimmed = password.trim();
  if (passwordTrimmed.length < 6 || passwordTrimmed.length > 20) {
    return res.status(400).json({
      message: "Password must be between 6 and 20 characters",
    });
  }

  try {
    const userObject = {
      email: emailTrimmed,
      password: await bcrypt.hash(passwordTrimmed, 10),
      name: nameTrimmed,
      faker: faker || false,
    };
    const user = await db.user.create({ data: userObject });
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "User registered successfully",
      name: user.name,
      email: user.email,
      token: jwtToken,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed" });
  }
});

export default registerRouter;

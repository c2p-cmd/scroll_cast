import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/db.js";

const loginRouter = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

loginRouter.post("/login", async (req, res) => {
  const { email, password, name } = req.body;

  // user can use either name or email to login
  if (!email && !name) {
    return res.status(400).json({ message: "Email or name is required" });
  }
  const emailTrimmed = email ? email.trim().toLowerCase() : null;
  const nameTrimmed = name ? name.trim() : null;

  const passwordTrimmed = password ? password.trim() : null;
  if (!passwordTrimmed) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const filters = [];
    if (emailTrimmed) filters.push({ email: emailTrimmed });
    if (nameTrimmed) filters.push({ name: nameTrimmed });

    const user = await db.user.findFirst({
      where: { OR: filters },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      passwordTrimmed,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `Login successful for ${user.role}`,
      name: user.name,
      email: user.email,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "User login failed" });
  }
});

export default loginRouter;

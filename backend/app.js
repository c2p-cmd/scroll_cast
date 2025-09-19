import express from "express";
import cors from "cors";
import registerRouter from "./routes/auth/register.js";
import loginRouter from "./routes//auth/login.js";
import adminFeedRouter from "./routes/feed/admin.js";
import publicFeedRouter from "./routes/feed/public.js";
import favouriteRouter from "./routes/feed/favourite.js";
import jwtMiddleware from "./middleware.js";
import weatherRouter from "./routes/weather/index.js";

// ===== App Initialization =====
const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Auth Routes =====
app.use("/auth", registerRouter);
app.use("/auth", loginRouter);

// ===== Protected Routes =====
app.use("/admin", jwtMiddleware, adminFeedRouter);

// ===== Feed Routes =====
app.use("/feed", jwtMiddleware, publicFeedRouter);
app.use("/feed/favourite", jwtMiddleware, favouriteRouter);

// ===== Weather Routes =====
app.use("/weather", weatherRouter);

// ===== Root Route =====
app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

export default app;

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import messageRoutes from "./routes/message.route.js";
import otpRoutes from "./routes/otp.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// ✅ Increase payload size limit to support large images (Base64)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ✅ Use cookie parser before routes
app.use(cookieParser());

// ✅ Enable CORS with credentials and specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev origin
    credentials: true,
  })
);

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/otp", otpRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ✅ Start server and connect DB
server.listen(PORT, () => {
  console.log("🚀 Server is running on Port:", PORT);
  connectDB();
});

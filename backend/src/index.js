import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import otpRoutes from "./routes/otp.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// ✅ Increase payload size limit to support large images (Base64)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ✅ Use cookie parser before routes
app.use(cookieParser());

// ✅ CORS setup to allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://yemmychats-frontend.onrender.com" // your deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/otp", otpRoutes);

// ✅ Start server and connect DB
server.listen(PORT, () => {
  console.log("🚀 Server is running on Port:", PORT);
  connectDB();
});
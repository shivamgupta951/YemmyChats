import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import otpRoutes from "./routes/otp.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import newsletterRoutes from "./routes/newsletter.route.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// ✅ Increase payload size limit to support large images (Base64)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// ✅ Use cookie parser before routes
app.use(cookieParser());

// ✅ CORS setup to allow multiple origins
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // ✅ Local development
      "https://yemmy-chats.onrender.com" // ✅ Production
    ],
    credentials: true,
  })
);

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Socket server running.");
});

// ✅ Start server and connect DB
server.listen(PORT, () => {
  console.log("🚀 Server is running on Port:", PORT);
  connectDB();
});
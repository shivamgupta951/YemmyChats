import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ✅ import
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import otpRoutes from "./routes/otp.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser()); // ✅ use this before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/otp", otpRoutes);


app.listen(PORT, () => {
  console.log("Server is running on Port:" + PORT);
  connectDB();
});

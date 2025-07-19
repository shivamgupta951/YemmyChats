import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
  sendOtp,
  testRoute, 
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/test", testRoute); 
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendOtp);
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;

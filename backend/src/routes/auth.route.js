import express from "express";
import User from "../models/user.model.js"; 
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
// Check if username is available
router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ available: false, message: "Username required" });

  const exists = await User.findOne({ username });
  if (exists) {
    return res.json({ available: false, message: "Username already taken" });
  } else {
    return res.json({ available: true, message: "Username is available" });
  }
});


export default router;

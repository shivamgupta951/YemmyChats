import express from "express";
import { sendVerificationOTP, verifyOTP } from "../controllers/emailVerification.controller.js";

const router = express.Router();

router.post("/send-otp", sendVerificationOTP);
router.post("/verify-otp", verifyOTP);

export default router;

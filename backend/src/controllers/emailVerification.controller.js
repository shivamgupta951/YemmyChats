import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "../models/user.model.js";

// temporary in-memory OTP store
const otpStore = new Map();

export const sendVerificationOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email already registered" });

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 min

  otpStore.set(email, { otp, expiry });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Yemmy Chats" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Yemmy Chats Signup",
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record) return res.status(400).json({ message: "OTP not found or expired" });

  if (Date.now() > record.expiry)
    return res.status(400).json({ message: "OTP expired" });

  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  otpStore.delete(email); // clear after success
  res.status(200).json({ message: "OTP verified" });
};

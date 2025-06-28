// src/models/otp.model.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

// Create TTL index to auto-expire OTPs after 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const OTP = mongoose.model("OTP", otpSchema);

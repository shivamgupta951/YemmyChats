// src/lib/email.js
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"Yemmy Chats 💬" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "🔐 Verify your email for Yemmy Chats",
    html: `
    <p style="font-family: sans-serif; font-size: 15px;">
      👋 Hello there!
    </p>
    <p style="font-family: sans-serif; font-size: 15px;">
      Thank you for signing up with <b>Yemmy Chats</b> – your new go-to place for real-time conversations and staying connected! 🎉
    </p>
    <p style="font-family: sans-serif; font-size: 15px;">
      Please use the following OTP to verify your email address:
    </p>
    <h2 style="font-family: sans-serif; color: #4f46e5;">${otp}</h2>
    <p style="font-family: sans-serif; font-size: 15px;">
      This OTP is valid for <b>5 minutes</b>. ⏱️
    </p>
    <p style="font-family: sans-serif; font-size: 15px;">
      If you did not request this, you can safely ignore this email.
    </p>
    <br />
    <p style="font-family: sans-serif; font-size: 15px;">
      Cheers,<br />
      <b>The Yemmy Chats Team 🚀</b>
    </p>
  `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await OTP.deleteMany({ email }); // clear any existing OTPs
    const newOtp = new OTP({ email, otp: otpCode });
    await newOtp.save();
    await sendOTP(email, otpCode);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

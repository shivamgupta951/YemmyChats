import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import { OTP } from "../models/otp.model.js";
import { sendOTP } from "../lib/email.js"; // utility to send email OTP

// ----------------------- Signup Controller -----------------------
export const signup = async (req, res) => {
  const { fullName, email, password, otp } = req.body;

  try {
    // Check for required fields
    if (!fullName || !email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate OTP
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteMany({ email }); // Clean up old OTPs

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save and generate token
    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Login Controller -----------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Logout Controller -----------------------
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Update Profile Picture -----------------------
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Check Auth -----------------------
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Test Route -----------------------
export const testRoute = (req, res) => {
  try {
    res.status(200).json({
      status: "ok",
      message: "Test route working — backend is alive!",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


// ----------------------- Send OTP Controller -----------------------
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Check for existing OTP sent within the last 60 seconds
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (recentOtp) {
      const now = new Date();
      const timeDiff = (now - recentOtp.createdAt) / 1000; // in seconds

      if (timeDiff < 60) {
        return res
          .status(429)
          .json({ message: "Please wait before requesting another OTP" });
      }
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove old OTPs
    await OTP.deleteMany({ email });

    // Save new OTP
    const newOtp = new OTP({ email, otp: otpCode });
    await newOtp.save();

    // Send email
    await sendOTP(email, otpCode);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOtp controller:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

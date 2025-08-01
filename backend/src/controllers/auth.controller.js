import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import { OTP } from "../models/otp.model.js";
import { sendOTP } from "../lib/email.js"; // utility to send email OTP
import { syncGlobalCompanions } from "../utils/companionSync.js";


// ----------------------- Signup Controller -----------------------
export const signup = async (req, res) => {
  const { fullName, email, password, otp, username } = req.body;

  try {
    if (!fullName || !email || !password || !otp || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🚫 Blocklist check
    const blockedEmails = [
      "hritika08shankhdhar@gmail.com",
      "shivamgupta606040@gmail.com"
    ];

    if (blockedEmails.includes(email.toLowerCase())) {
      return res.status(403).json({
        message:
          "Your account is in suspect list of users, ~site is currently under maintenance!",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteMany({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const commonUsernames = ["YemmyChats", "shivam2004"];
    const companionsToAdd = await User.find({
      username: { $in: commonUsernames, $ne: username },
    });

    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
      companions: companionsToAdd.map((u) => u._id),
    });

    await newUser.save();
    await syncGlobalCompanions();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Login Controller -----------------------
export const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = email
      ? await User.findOne({ email })
      : await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
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
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------------- Update Profile Picture -----------------------
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, username } = req.body;
    const userId = req.user._id;

    const updates = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updates.profilePic = uploadResponse.secure_url;
    }

    if (bio !== undefined) {
      updates.bio = bio;
    }

    if (username !== undefined) {
      updates.username = username;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

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

// ----------------------- Note Management (Embedded) -----------------------
export const getUserNote = async (req, res) => {
  const userId = req.user._id;
  const targetId = req.params.userId;

  try {
    const user = await User.findById(userId);
    const content = user.notes.get(targetId) || "";
    res.status(200).json({ content });
  } catch (err) {
    console.error("❌ getUserNote failed:", err);
    res.status(500).json({ message: "Failed to get note" });
  }
};

export const updateUserNote = async (req, res) => {
  const userId = req.user._id;
  const targetId = req.params.userId;
  const { content } = req.body;

  try {
    const user = await User.findById(userId);
    user.notes.set(targetId, content);
    await user.save();
    res.status(200).json({ content });
  } catch (err) {
    console.error("❌ updateUserNote failed:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
};

export const deleteUserNote = async (req, res) => {
  const userId = req.user._id;
  const targetId = req.params.userId;

  try {
    const user = await User.findById(userId);
    user.notes.delete(targetId);
    await user.save();
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    console.error("❌ deleteUserNote failed:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
};

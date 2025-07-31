import express from "express";
import User from "../models/user.model.js";
import {
  getUserNote,
  updateUserNote,
  deleteUserNote,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Get basic user info by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "fullName profilePic email username companions lastSeen"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Embedded Note Routes (store note inside User.notes map)
router.get("/note/:userId", protectRoute, getUserNote);
router.put("/note/:userId", protectRoute, updateUserNote);
router.delete("/note/:userId", protectRoute, deleteUserNote);

export default router;

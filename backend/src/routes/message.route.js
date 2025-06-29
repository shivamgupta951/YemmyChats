import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// ✅ Get users for sidebar
router.get("/users", protectRoute, getUsersForSidebar);

// ✅ Get messages with safer route
router.get("/id/:id", protectRoute, getMessages);

// ✅ Send message
router.post("/send/:id", protectRoute, sendMessage);

export default router;

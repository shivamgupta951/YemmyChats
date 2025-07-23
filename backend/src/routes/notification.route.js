import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  toggleNotification,
  getNotificationStatus,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/toggle", protectRoute, toggleNotification);
router.get("/status/:companionId", protectRoute, getNotificationStatus);

export default router;

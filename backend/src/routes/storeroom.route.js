import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { getStoreRoom, uploadToStoreRoom } from "../controllers/storeroom.controller.js";

const router = express.Router();

router.get("/:userId", protectRoute, getStoreRoom);
router.post("/:userId", protectRoute, upload.single("file"), uploadToStoreRoom);

export default router;

import express from "express";
import {
  addCompanion,
  getCompanions,
  removeCompanion, 
} from "../controllers/companion.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addCompanion);
router.get("/list", protectRoute, getCompanions);
router.delete("/remove/:username", protectRoute, removeCompanion); 

export default router;

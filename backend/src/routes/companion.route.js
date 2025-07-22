import express from "express";
import { addCompanion, getCompanions } from "../controllers/companion.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/add", protectRoute, addCompanion);
router.get("/list", protectRoute, getCompanions);

export default router;

import express from "express";
import { handleContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/submit", handleContact);

export default router;
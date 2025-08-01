import express from "express";
import { addTask, getTodoList, updateTaskStatus, deleteTask , editTask} from "../controllers/todo.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:userId", protectRoute, getTodoList); 
router.post("/:userId", protectRoute, addTask); 
router.put("/:userId/:todoId", protectRoute, editTask); 
router.patch("/:userId/:todoId/toggle", protectRoute, updateTaskStatus); 
router.delete("/:userId/:todoId", protectRoute, deleteTask); 

export default router;

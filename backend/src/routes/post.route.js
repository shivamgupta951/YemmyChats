// backend/src/routes/post.route.js
import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  addComment,
  deleteComment,
  editPost,
  deletePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js"; // multer middleware

const router = express.Router();

/**
 * POST /api/posts/: create a new post (multipart/form-data)
 * field name for files: "media" (use upload.array('media', 6) for up to 6 files)
 */
router.post("/", protectRoute, upload.array("media", 6), createPost);

/**
 * GET /api/posts?type=&author=&page=&limit=
 */
router.get("/", protectRoute, getPosts);

/**
 * GET /api/posts/:postId
 */
router.get("/:postId", protectRoute, getPostById);

/**
 * POST /api/posts/:postId/like  -> toggle like/unlike
 */
router.post("/:postId/like", protectRoute, toggleLike);

/**
 * POST /api/posts/:postId/comment -> add comment
 */
router.post("/:postId/comment", protectRoute, addComment);

/**
 * DELETE /api/posts/:postId/comment/:commentId -> delete comment
 */
router.delete("/:postId/comment/:commentId", protectRoute, deleteComment);

/**
 * PUT /api/posts/:postId -> edit (caption/type)
 */
router.patch("/:postId", protectRoute, editPost);

/**
 * DELETE /api/posts/:postId -> delete post
 */
router.delete("/:postId", protectRoute, deletePost);

export default router;

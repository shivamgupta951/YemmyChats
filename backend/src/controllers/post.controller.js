// backend/src/controllers/post.controller.js
import { Post } from "../models/post.model.js";
import User from "../models/user.model.js"; 
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

/**
 * Helper: upload files array (multer) to Cloudinary and return media array
 */
async function uploadFilesToCloudinary(files = []) {
  const media = [];
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "yemmy_posts",
        resource_type: file.mimetype.startsWith("video") ? "video" : "image",
      });

      media.push({
        url: result.secure_url,
        public_id: result.public_id,
        mimeType: file.mimetype,
        kind: file.mimetype.startsWith("video") ? "video" : "image",
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      try {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      } catch {}
    }
  }
  return media;
}

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  const authorId = req.user._id;
  const { caption = "", type = "your" } = req.body;

  try {
    const media = await uploadFilesToCloudinary(req.files || []);

    const newPost = new Post({
      author: authorId,
      caption,
      media,
      type,
    });

    await newPost.save();
    await newPost.populate("author", "fullName username profilePic");

    return res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * Get posts (feed)
 */
export const getPosts = async (req, res) => {
  try {
    const { type, author, page = 1, limit = 12, sort = "-createdAt" } = req.query;
    const skip = (Math.max(1, page) - 1) * Math.max(1, limit);

    let filter = {};

    if (author) {
      // ✅ specific author's posts
      filter.author = author;
    } else if (type === "companions") {
      // ✅ companions posts
      const currentUser = await User.findById(req.user._id).select("companions");
      filter.author = { $in: currentUser.companions || [] };
    }

    const posts = await Post.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("author", "fullName username profilePic")
      .populate("comments.author", "fullName username profilePic")
      .lean();

    const total = await Post.countDocuments(filter);

    return res.status(200).json({ posts, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

/**
 * Get single post by ID
 */
export const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate("author", "fullName username profilePic")
      .populate("comments.author", "fullName username profilePic");
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Failed to fetch post" });
  }
};

/**
 * Toggle like/unlike
 */
export const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const idx = post.likes.findIndex((id) => id.toString() === userId.toString());
    if (idx === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(idx, 1);
    }

    await post.save();
    await post.populate("author", "fullName username profilePic");

    return res.status(200).json({
      message: idx === -1 ? "Liked" : "Unliked",
      likes: post.likes,
      likeCount: post.likes.length,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ message: "Failed to toggle like" });
  }
};

/**
 * Add a comment
 */
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Comment text required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ author: userId, text: text.trim() });
    await post.save();
    await post.populate("comments.author", "fullName username profilePic");

    return res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Failed to add comment" });
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const commentAuthorId = comment.author.toString();
    const postAuthorId = post.author.toString();

    if (commentAuthorId !== userId.toString() && postAuthorId !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    comment.deleteOne(); // ✅ updated from .remove()
    await post.save();

    return res.status(200).json({ message: "Comment deleted", comments: post.comments });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};

/**
 * Edit a post
 */
export const editPost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const { caption, type } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (caption !== undefined) post.caption = caption;
    if (type !== undefined) post.type = type;
    post.lastEdited = new Date();

    await post.save();
    await post.populate("author", "fullName username profilePic");

    return res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    console.error("Error editing post:", error);
    return res.status(500).json({ message: "Failed to edit post" });
  }
};

/**
 * Delete a post
 */
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete post" });
    }

    // Remove media from Cloudinary
    for (const m of post.media || []) {
      try {
        if (m.public_id) {
          await cloudinary.uploader.destroy(m.public_id, {
            resource_type: m.kind === "video" ? "video" : "image",
          });
        }
      } catch (err) {
        console.warn("Failed to remove media from cloudinary:", err);
      }
    }

    await post.deleteOne(); // ✅ updated from .remove()
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

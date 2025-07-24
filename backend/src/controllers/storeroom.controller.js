import { StoreRoom } from "../models/storeroom.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs/promises"; // Promisified fs for file cleanup

// ✅ GET all saved files/messages with a user
export const getStoreRoom = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const companionId = req.params.userId;

    const room = await StoreRoom.findOne({
      participants: { $all: [currentUserId, companionId] },
    }).populate("files.uploadedBy", "fullName profilePic");

    if (!room) return res.status(200).json({ files: [] });

    res.status(200).json(room);
  } catch (error) {
    console.error("❌ Error in getStoreRoom:", error);
    res.status(500).json({ message: "Failed to fetch StoreRoom data" });
  }
};

// ✅ POST - Upload new text, image, or file to StoreRoom
export const uploadToStoreRoom = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { userId, type } = req.body;
    let content;

    // 🖼️ Handle image or file upload to Cloudinary
    if (req.file && (type === "image" || type === "file")) {
      const cloudRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "YemmyChats/StoreRoom",
      });
      content = cloudRes.secure_url;

      // Delete temp file from local uploads
      await fs.unlink(req.file.path);
    }
    // 📝 Handle plain text saving
    else if (type === "text" && req.body.content?.trim()) {
      content = req.body.content.trim();
    } else {
      return res.status(400).json({
        message: "Invalid upload type or missing content",
      });
    }

    // 🔗 Find or create StoreRoom
    let room = await StoreRoom.findOne({
      participants: { $all: [currentUserId, userId] },
    });

    if (!room) {
      room = new StoreRoom({
        participants: [currentUserId, userId],
        files: [],
      });
    }

    // 💾 Add file/text to store
    room.files.push({
      type,
      content,
      uploadedBy: currentUserId,
    });

    await room.save();

    res.status(200).json({ success: true, room });
  } catch (error) {
    console.error("❌ Error in uploadToStoreRoom:", error);
    res.status(500).json({ message: "Failed to upload to StoreRoom" });
  }
};

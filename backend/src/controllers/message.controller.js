import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { encryptMessage, decryptMessage } from "../lib/encrypt.js";

// Sidebar Users
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Messages (DECRYPTED)
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    console.log(`🟢 Found ${messages.length} messages between ${myId} and ${userToChatId}`);

    // Attempt to decrypt each message safely
    const decryptedMessages = messages.map((msg, index) => {
      try {
        const decryptedText = msg.text ? decryptMessage(msg.text) : "";
        console.log(`✅ [${index}] Decrypted text:`, decryptedText);

        return {
          ...msg.toObject(),
          text: decryptedText,
        };
      } catch (err) {
        console.error(`❌ [${index}] Decryption failed for msg._id=${msg._id}:`, err.message);
        return {
          ...msg.toObject(),
          text: "[decryption failed]",
        };
      }
    });

    res.status(200).json(decryptedMessages);
  } catch (error) {
    console.log("❌ Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Message (ENCRYPTED)
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("🖼️ Image uploaded to Cloudinary:", imageUrl);
    }

    const encryptedText = text ? encryptMessage(text) : "";
    console.log("🔐 Encrypted text:", encryptedText);

    const newMessage = new Message({
      senderId,
      receiverId,
      text: encryptedText,
      image: imageUrl,
    });

    await newMessage.save();
    console.log("💾 Message saved to DB with ID:", newMessage._id);

    const decryptedMessage = {
      ...newMessage.toObject(),
      text: text, // sending original plain text for socket
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      console.log("📡 Emitting to socket:", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", decryptedMessage);
    }

    res.status(201).json(decryptedMessage);
  } catch (error) {
    console.log("❌ Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

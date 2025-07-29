import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { encryptMessage, decryptMessage } from "../lib/encrypt.js";

// Sidebar Users
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
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

    const decryptedMessages = messages.map((msg) => {
      try {
        return {
          ...msg.toObject(),
          text: msg.text ? decryptMessage(msg.text) : "",
        };
      } catch (err) {
        return {
          ...msg.toObject(),
          text: "[decryption failed]",
        };
      }
    });

    res.status(200).json(decryptedMessages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Message (ENCRYPTED + Supports image + audio)
export const sendMessage = async (req, res) => {
  try {
    const { text, image, audio } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // `audio` is already uploaded on frontend and sent as URL in req.body
    const encryptedText = text ? encryptMessage(text) : "";

    const newMessage = new Message({
      senderId,
      receiverId,
      text: encryptedText,
      image: imageUrl,
      audio: audio || null,
    });

    await newMessage.save();

    const decryptedMessage = {
      ...newMessage.toObject(),
      text, // plain for frontend UI
    };

    // Send over socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", decryptedMessage);
    }

    // 📧 EMAIL NOTIFICATION LOGIC (All users managed by preference)
    try {
      const recipient = await User.findById(receiverId);
      const sender = await User.findById(senderId);

      const senderIsPro = ["shivam2004", "YemmyChats"].includes(sender.username);
      const recipientIsPro = ["shivam2004", "YemmyChats"].includes(recipient.username);

      const notify =
        senderIsPro ||
        recipientIsPro ||
        recipient.notificationPreferences?.get(senderId.toString());

      if (notify) {
        const { sendMessageEmail } = await import("../utils/sendMail.js");

        console.log(`📧 Sending message email to ${recipient.email} from ${sender.fullName}`);

        await sendMessageEmail(recipient.email, {
          senderName: sender.fullName,
          senderPic: sender.profilePic,
        });
      }
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr.message);
    }

    res.status(201).json(decryptedMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

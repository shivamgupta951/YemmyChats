import { Server } from "socket.io";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js"; // ✅ Import User model

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://yemmy-chats.onrender.com"
];

const io = new Server(server, {
  path: "/socket.io",
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  },
});

// ✅ Used to store online users
const userSocketMap = {}; // { userId: socketId }

// ✅ Get socket id for specific user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("🔌 A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // ✅ Attach userId to socket instance
  }

  // ✅ Notify all clients about updated online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    console.log("❌ A user disconnected", socket.id);

    const disconnectedUserId = socket.userId;
    if (disconnectedUserId) {
      try {
        await User.findByIdAndUpdate(disconnectedUserId, {
          lastSeen: new Date(),
        });
        console.log(`📅 Updated lastSeen for user ${disconnectedUserId}`);
      } catch (err) {
        console.error("❌ Failed to update lastSeen:", err.message);
      }

      // ✅ Clean up the socket map
      delete userSocketMap[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };

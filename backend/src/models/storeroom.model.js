import mongoose from "mongoose";

const storeRoomSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  files: [
    {
      type: { type: String, enum: ["file", "image", "text"], required: true },
      content: { type: String, required: true },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export const StoreRoom = mongoose.model("StoreRoom", storeRoomSchema);

// backend/src/scripts/cleanLastSeen.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config(); // Load .env variables

const cleanLastSeen = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const result = await User.updateMany(
      { lastSeen: { $exists: true } },
      { $unset: { lastSeen: "" } }
    );

    console.log(`🧹 Cleared 'lastSeen' for ${result.modifiedCount} users.`);
  } catch (error) {
    console.error("❌ Error cleaning lastSeen:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

cleanLastSeen();

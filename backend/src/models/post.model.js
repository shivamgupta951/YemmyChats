// backend/src/models/post.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const mediaSchema = new mongoose.Schema({
  url: { type: String },
  public_id: { type: String }, // cloudinary public id (useful for deletion)
  mimeType: { type: String },
  kind: { type: String, enum: ["image", "video", "other"], default: "image" },
});

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, default: "" },
    media: [mediaSchema], // support multiple media items (array)
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    type: {
      type: String,
      enum: ["your", "companions", "trending", "official"],
      default: "your",
    },
  },
  { timestamps: true }
);

// Virtual counts
postSchema.virtual("likeCount").get(function () {
  return (this.likes && this.likes.length) || 0;
});
postSchema.virtual("commentCount").get(function () {
  return (this.comments && this.comments.length) || 0;
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

export const Post = mongoose.model("Post", postSchema);

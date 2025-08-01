import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    validate: v => v.length === 2,
  },
tasks: [
  {
    title: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creatorCompleted: {
      type: Boolean,
      default: false,
    },
    mateCompleted: {
      type: Boolean,
      default: false,
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
  },
]
}, { timestamps: true });

export const Todo = mongoose.model("Todo", todoSchema);

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, ImagePlus, Cookie } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import TrueFocus from "../TrueFocus";
import ElectricBorder from "../ElectricBorder";
import YemmyChat_logo from "../../assets/YemmyChat_logo.png";

const CreatePost = ({ onClose = () => {}, onCreated = () => {} }) => {
  const { authUser } = useAuthStore();
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).slice(0, 6);
    setFiles(arr);
  };

  const removeFile = (index) => {
    setFiles((f) => f.filter((_, i) => i !== index));
  };

  const submit = async () => {
    if (!authUser) return toast.error("Login required");
    if (!caption.trim() && files.length === 0)
      return toast.error("Add an image or caption");

    const form = new FormData();
    form.append("caption", caption);
    form.append("type", "your"); // default type
    files.forEach((f) => form.append("media", f));

    setUploading(true);
    try {
      const res = await axiosInstance.post("/posts", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post created");
      setTimeout(() => {
        window.location.reload();
      }, 900);
      onCreated(res.data.post);
      onClose();
    } catch (err) {
      console.error("create post error", err);
      toast.error("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-base-300/90 rounded-xl shadow-xl border "
      >
        <ElectricBorder>
          <div className="flex items-center justify-between mb-3 p-4">
            <h3 className="text-lg font-semibold">Create Post</h3>
            <div className="flex justify-center items-center space-x-2">
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: [0, -30, 0], y: [0, 0, 0] }}
                transition={{
                  duration: 7.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="ring-2 cursor-pointer text-sm flex justify-center items-center border p-1 rounded-xl bg-base-300 border-error px-3"
              >
                <Cookie size={20} className="mx-1"/>
                Yemmy Chats
                <img
                  src={YemmyChat_logo}
                  alt="Yemmy Chats Logo"
                  className="size-6 mx-2 rounded-lg"
                />{" "}
              </motion.div>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>
                <X />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="textarea textarea-bordered w-[90%]"
              rows={3}
            />
          </div>

          <div className="mt-3 px-8">
            <label className="btn btn-outline btn-sm gap-2 btn-primary">
              <ImagePlus />
              Add media
              <input
                ref={inputRef}
                multiple
                accept="image/*,video/*"
                type="file"
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>

            <div className="mt-3 grid grid-cols-4 gap-2 px-2">
              {files.map((f, i) => {
                const url = URL.createObjectURL(f);
                return (
                  <div key={i} className="relative rounded overflow-hidden">
                    <img
                      src={url}
                      alt={f.name}
                      className="object-cover w-full h-24"
                    />
                    <button
                      className="absolute top-1 right-1 btn btn-xs btn-circle btn-error"
                      onClick={() => removeFile(i)}
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 p-4">
            <button className="btn" onClick={onClose} disabled={uploading}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={uploading}
            >
              {uploading ? (
                <TrueFocus
                  sentence="Uploading post"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="red"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </ElectricBorder>
      </motion.div>
    </div>
  );
};

export default CreatePost;

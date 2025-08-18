import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const PostCard = ({ post, onUpdated = () => {}, onDeleted = () => {} }) => {
  const { authUser } = useAuthStore();
  const [localPost, setLocalPost] = useState(post);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLikeAnim, setShowLikeAnim] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.caption || "");
  const isLiked = localPost.likes?.includes(authUser?._id);
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);

  // Autoplay video when visible
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === carouselIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [carouselIndex]);

  // --- LIKE ---
  const toggleLike = async () => {
    if (!authUser) {
      toast.error("You must be logged in to like");
      return;
    }

    const liked = isLiked;
    const newLikes = liked
      ? localPost.likes.filter((id) => id !== authUser._id)
      : [...(localPost.likes || []), authUser._id];
    setLocalPost({ ...localPost, likes: newLikes });

    try {
      const res = await axiosInstance.post(`/posts/${localPost._id}/like`);
      setLocalPost((prev) => ({
        ...prev,
        likes: res.data.likes || prev.likes,
      }));
    } catch (err) {
      console.error("like failed", err);
      toast.error("Failed to update like");
      setLocalPost(post);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) toggleLike();
    setShowLikeAnim(true);
    setTimeout(() => setShowLikeAnim(false), 800);
  };

  // --- COMMENT ---
  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!authUser) {
      toast.error("Login to comment");
      return;
    }

    const tempComment = {
      _id: `temp-${Date.now()}`,
      author: { _id: authUser._id, fullName: authUser.fullName },
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setLocalPost({
      ...localPost,
      comments: [...(localPost.comments || []), tempComment],
    });
    setCommentText("");
    setShowComments(true);

    try {
      const res = await axiosInstance.post(`/posts/${localPost._id}/comment`, {
        text: tempComment.text,
      });
      setLocalPost((prev) => ({
        ...prev,
        comments: res.data.comments || prev.comments,
      }));
      toast.success("Comment added");
    } catch (err) {
      console.error("comment error", err);
      toast.error("Failed to add comment");
    }
  };

  // --- DELETE POST ---
  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await axiosInstance.delete(`/posts/${localPost._id}`);
      onDeleted(localPost._id);
      toast.success("Post deleted");
    } catch (err) {
      console.error("delete post error", err);
      toast.error("Failed to delete post");
    }
  };

  // --- EDIT POST ---
  const handleEditSave = async () => {
    if (!editText.trim()) {
      toast.error("Caption cannot be empty");
      return;
    }
    try {
      const res = await axiosInstance.patch(`/posts/${localPost._id}`, {
        caption: editText.trim(),
      });
      setLocalPost((prev) => ({
        ...prev,
        caption: res.data.post?.caption || editText.trim(),
      }));
      toast.success("Post updated");
      setIsEditing(false);
      onUpdated(localPost._id);
    } catch (err) {
      console.error("edit post error", err);
      toast.error("Failed to update post");
    }
  };

  // --- CAROUSEL ---
  const prevSlide = () => {
    setCarouselIndex(
      (i) =>
        (i - 1 + (localPost.media?.length || 1)) %
        (localPost.media?.length || 1)
    );
  };
  const nextSlide = () => {
    setCarouselIndex((i) => (i + 1) % (localPost.media?.length || 1));
  };

  return (
    <motion.div
      layout
      className="max-w-xl mx-auto bg-base-300 border border-warning/70 rounded-xl shadow-md shadow-warning/30 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={localPost.author?.profilePic || "/avatar.png"}
          alt={localPost.author?.fullName}
          className="w-11 h-11 rounded-full object-cover border"
        />
        <div className="flex-1">
          <div className="font-semibold">{localPost.author?.fullName}</div>
          <div className="text-xs text-base-content/60">
            {localPost.createdAt
              ? new Date(localPost.createdAt).toLocaleString()
              : ""}
          </div>
        </div>
        {localPost.author?._id === authUser?._id && (
          <>
            {isEditing ? (
              <button
                className="btn btn-ghost btn-xs text-success"
                title="Save"
                onClick={handleEditSave}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-ghost btn-xs"
                title="Edit"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={14} />
              </button>
            )}
            <button
              className="btn btn-ghost btn-xs text-error"
              title="Delete"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>

      {/* Media Carousel */}
      {localPost.media?.length > 0 && (
        <div
          className="relative bg-black/5 select-none"
          onDoubleClick={handleDoubleTap}
        >
          <div
            className="aspect-video w-full overflow-hidden relative"
            ref={carouselRef}
          >
            {localPost.media.map((m, i) => {
              const fileUrl = m.url;
              const isVideo = /\.(mp4|webm|ogg)$/i.test(fileUrl);
              return isVideo ? (
                <motion.video
                  key={fileUrl}
                  src={fileUrl}
                  ref={(el) => (videoRefs.current[i] = el)}
                  muted
                  loop
                  playsInline
                  controls
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === carouselIndex ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  style={{ display: i === carouselIndex ? "block" : "none" }}
                />
              ) : (
                <motion.img
                  key={fileUrl}
                  src={fileUrl}
                  alt={localPost.caption || "post media"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === carouselIndex ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  style={{ display: i === carouselIndex ? "block" : "none" }}
                />
              );
            })}

            {/* Page Index */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
              {carouselIndex + 1} / {localPost.media.length}
            </div>

            {/* Like Animation */}
            <AnimatePresence>
              {showLikeAnim && (
                <motion.div
                  key="like-anim"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center text-red-500"
                >
                  <Heart size={80} fill="currentColor" />
                </motion.div>
              )}
            </AnimatePresence>

            {localPost.media.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-base-100/60 p-2 rounded-full shadow bg-base-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-base-100/60 p-2 rounded-full shadow bg-base-300"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Caption & Actions */}
      <div className="p-4">
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="textarea textarea-bordered w-full mb-3"
          />
        ) : (
          <p className="mb-3 mx-2 text-secondary/90">{localPost.caption}</p>
        )}

        <div className="flex items-center gap-4 border rounded-lg">
          <button
            className="flex items-center gap-1 btn btn-ghost"
            onClick={toggleLike}
          >
            <Heart
              className={`transition-colors ${isLiked ? "text-error" : ""}`}
              fill={isLiked ? "currentColor" : "none"}
            />
            <span>{localPost.likes?.length || 0}</span>
          </button>
          <button
            className="flex items-center gap-1 btn btn-ghost"
            onClick={() => setShowComments((s) => !s)}
          >
            <MessageCircle />
            <span>{localPost.comments?.length || 0}</span>
          </button>
          <button
            className="flex items-center gap-1 btn btn-ghost"
            onClick={() => {
              navigator.clipboard.writeText(
                window.location.href + `#post-${localPost._id}`
              );
              toast.success("Link copied");
            }}
          >
            <Share2 />
          </button>
        </div>

        {/* Comments */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-3"
            >
              <div className="space-y-2 mb-4">
                <div className="text-center text-warning">Comments</div>
                {(localPost.comments || [])
                  .slice()
                  .reverse()
                  .map((c) => (
                    <div
                      key={c._id}
                      className="border rounded-md p-2 bg-base-200"
                    >
                      <div className="flex">
                        <img
                          src={c.author?.profilePic || "/avatar.png"}
                          alt="Profile"
                          className="size-10 rounded-full object-cover shadow-md mx-2"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="text-sm font-medium">
                            {c.author?.fullName}
                          </div>
                          <div className="text-[70%] font-medium text-primary">
                            @{c.author?.username}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm my-2 mx-2">{c.text}</div>
                      <div className="text-xs text-base-content/50">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString()
                          : ""}
                      </div>
                    </div>
                  ))}
              </div>
              <form onSubmit={submitComment} className="flex gap-2 items-start">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="input input-bordered flex-1"
                />
                <button className="btn btn-primary" type="submit">
                  Comment
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostCard;

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const PostFeed = ({ feedType = "your" }) => {
  const { authUser } = useAuthStore(); // ✅ fixed to use correct user
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();

  const fetchPosts = async (pageNum = 1) => {
    if (feedType === "your" && (!authUser || !authUser._id)) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const params = { page: pageNum, limit: 8 };

      if (feedType === "your") {
        params.author = authUser._id;
      } else if (feedType === "companions") {
        params.type = "companions";
      }

      const res = await axiosInstance.get("/posts", { params });
      const { posts: fetchedPosts = [] } = res.data || {};

      if (pageNum === 1) setPosts(fetchedPosts);
      else setPosts((prev) => [...prev, ...fetchedPosts]);

      setHasMore(fetchedPosts.length >= 8);
    } catch (err) {
      console.error("fetchPosts error", err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(1);
    // eslint-disable-next-line
  }, [feedType]);

  useEffect(() => {
    if (!hasMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          const next = page + 1;
          setPage(next);
          fetchPosts(next);
        }
      },
      { threshold: 0.5 }
    );
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [page, loading, hasMore]);

  const onPostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
    );
  };

  const onPostDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  const getEmptyMessage = () => {
    if (feedType === "your") return "You haven't posted anything yet.";
    if (feedType === "companions") return "No posts from your companions yet.";
    return "No posts to display.";
  };

  return (
    <div className="p-10 pt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold capitalize">Feed — {feedType}</h1>
      </div>

      <div className="space-y-6">
        {loading && posts.length === 0 ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : !loading && posts.length === 0 ? (
          <div className="text-center text-base-content/60 py-60">
            {getEmptyMessage()}
          </div>
        ) : (
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <PostCard
                  post={post}
                  onUpdated={onPostUpdated}
                  onDeleted={onPostDeleted}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div
        ref={loaderRef}
        className="h-8 flex items-center justify-center mt-2"
      >
        {loading && posts.length > 0 && (
          <div className="loading loading-spinner" />
        )}
        {!hasMore && posts.length > 0 && (
          <div className="text-xs text-center text-base-content/60">
            No more posts
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;

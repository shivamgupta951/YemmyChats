import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Plus, Sparkles } from "lucide-react";
import CircularText from "../components/CircularText";
import { motion } from "framer-motion";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";
import PostFeed from "../components/posts/PostFeed";
import CreatePost from "../components/posts/CreatePost";

const PostSection = () => {
  const navigate = useNavigate();
  const [feedType, setFeedType] = useState("your");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { key: "your", label: "Your Posts" },
    { key: "companions", label: "Companions" },
  ];

  return (
    <div className="min-h-screen flex justify-between items-start pt-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 h-screen sticky top-0 border-r border-base-300 p-4 space-y-6"
      >
        <div className="text-2xl font-bold text-center py-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md shadow-md">
          <Sparkles className="inline-block mr-2 text-primary" />
          Post Tabs
        </div>

        {tabs.map((tab) => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFeedType(tab.key)}
            className={`w-full py-3 rounded-xl text-lg font-medium transition-all ${
              feedType === tab.key
                ? "bg-primary text-primary-content shadow-lg"
                : "bg-base-200 hover:bg-base-300"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Main Feed */}
      <div className="flex-1 h-screen overflow-y-auto px-6 pb-20 relative">
        <PostFeed feedType={feedType} />

        {/* Floating Create Post Button */}
        {feedType === "your" && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="btn btn-primary btn-sm absolute top-2 right-8 shadow-lg hover:scale-110 flex justify-center items-center"
            onClick={() => setShowCreateModal(true)}
          >
            Create Post
            <Plus size={20} />
          </motion.button>
        )}
      </div>

      {/* Right Sidebar */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 h-screen sticky top-0 border-l border-base-300 px-4"
      >
        <div className="flex justify-center my-5">
          <button
            className="btn btn-outline btn-accent flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home size={20} />
            Home
          </button>
        </div>

        <div className="bg-gradient-to-b from-accent/20 to-secondary/20 backdrop-blur-md border border-base-300 rounded-3xl shadow-lg text-center p-6 hover:scale-[1.02] transition-all duration-500">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="mb-4"
          >
            <img
              src={YemmyChat_logo}
              alt="Yemmy Chats Logo"
              className="mx-auto size-32 sm:size-40 rounded-xl shadow-md"
            />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Yemmy Chats</h2>
          <p className="text-base-content/70 text-sm leading-relaxed">
            A secure, fast, and modern platform to connect with your companions
            in real time!
          </p>
        </div>

        <div>
          <CircularText
            text="**YEMMY****CHATS**"
            onHover="speedUp"
            spinDuration={20}
            className="my-6"
          />
        </div>
      </motion.div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePost
          onClose={() => setShowCreateModal(false)}
          onCreated={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default PostSection;

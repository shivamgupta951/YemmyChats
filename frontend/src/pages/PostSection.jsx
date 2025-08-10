import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import CircularText from "../components/CircularText";

import { motion } from "framer-motion";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";
const PostSection = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-between items-center">
      <div className="min-h-screen border-l-0 border-b-0 border-t-0 w-1/4 pt-20 space-y-10 border-base-300 border-4 p-2">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center text-5xl border p-4 rounded-2xl bg-base-300"
        >
          Tabs
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center text-3xl transition-all p-3 rounded-2xl transform ease-in-out duration-100 hover:rounded-2xl hover:border hover:scale-105"
        >
          Your Posts
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center text-3xl transition-all p-3 rounded-2xl transform ease-in-out duration-100 hover:rounded-2xl hover:border hover:scale-105"
        >
          Companions Post
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center text-3xl transition-all p-3 rounded-2xl transform ease-in-out duration-100 hover:rounded-2xl hover:border hover:scale-105"
        >
          Trending Posts
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center items-center text-3xl transition-all p-3 rounded-2xl transform ease-in-out duration-100 hover:rounded-2xl hover:border hover:scale-105"
        >
          Official Posts
        </motion.div>
      </div>
      <div className="text-4xl p-10 px-20 rounded-2xl bg-base-300 text-error/60 border ">
        Comming Soon
      </div>
      <div className="border-l-4 border-base-300 w-1/4 min-h-screen pt-16">
        <div className="flex justify-center items-end my-5">
          <button
            className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight"
            onClick={() => navigate("/")}
          >
            <Home size={20} />
            Back To Home
          </button>
        </div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, duration: 1 }}
          className="w-full lg:w-[90%] bg-accent/20 border border-base-300 rounded-3xl shadow-lg text-center p-6 animate-pulse-slower hover:scale-105 transition-all duration-500 ease-in-out ml-4"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="mb-4"
          >
            <img
              src={YemmyChat_logo}
              alt="Yemmy Chats Logo"
              className="mx-auto size-32 sm:size-40 rounded-xl shadow-md"
            />
          </motion.div>

          <h2 className="text-3xl font-bold text-base-content mb-2">
            Yemmy Chats
          </h2>
          <p className="text-base-content/60 px-4 text-md sm:text-lg">
            A secure, fast, and modern platform to connect with your companions
            in real time!
          </p>
        </motion.div>
        <div>
          <CircularText
            text="**YEMMY****CHATS**"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class my-6"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default PostSection;

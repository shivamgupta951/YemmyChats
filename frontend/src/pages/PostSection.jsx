import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
const PostSection = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-end items-end my-5">
          <button
            className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight"
            onClick={() => navigate("/")}
          >
            <Home size={20} />
            Back To Home
          </button>
        </div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.9 }}
          className="p-10 border rounded-ss-2xl rounded-ee-2xl px-60 border-error bg-base-300 text-3xl font-bold "
        >
          Comming Soon!
        </motion.div>
      </div>
    </div>
  );
};

export default PostSection;

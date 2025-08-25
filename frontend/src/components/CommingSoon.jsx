import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const CommingSoon = () => {
  const navigate = useNavigate();
  const NavigateHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="space-y-20">
        <div className="flex justify-end items-center py-2">
          <button className="btn btn-sm btn-accent" onClick={NavigateHome}>
            {" "}
            <Home size={20}/>
            Back to Home
          </button>
        </div>
        <motion.div
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, 30, 30, 0, 0],
            y: [0, 0, 30, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center items-center py-16 border px-60 rounded-ss-2xl rounded-ee-2xl text-warning bg-gradient-to-l from-error rounded-r-2xl"
        >
          Comming Soon!
        </motion.div>
      </div>
    </div>
  );
};

export default CommingSoon;

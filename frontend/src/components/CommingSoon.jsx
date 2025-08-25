import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import ElectricBorder from "./ElectricBorder";
import { Button } from "./moving-border";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";

const CommingSoon = () => {
  const navigate = useNavigate();
  const NavigateHome = () => {
    navigate("/");
  };
  return (
    <BackgroundBeamsWithCollision>
      <div className="min-h-screen flex justify-center items-center">
        <div className="space-y-10">
          <div className="flex justify-end items-center py-2">
            <Button
              borderRadius="1.5rem"
              duration={3000}
              onClick={NavigateHome}
              className="btn btn-sm btn-accent flex gap-3"
            >
              <Home size={20} />
              Back to Home
            </Button>
          </div>
          <ElectricBorder
            color="#7df9ff"
            speed={0.8}
            chaos={0.5}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <motion.div
              initial={{ x: 0, y: 0 }}
              animate={{
                x: [0, 40, 40, 0, 0],
                y: [0, 0, 30, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              className="flex justify-center items-center py-16 border px-60 text-warning bg-gradient-to-l from-error rounded-2xl"
            >
              Comming Soon!
            </motion.div>
          </ElectricBorder>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default CommingSoon;

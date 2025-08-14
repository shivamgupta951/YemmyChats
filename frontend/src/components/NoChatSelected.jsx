import { Bot, Boxes, Home, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MetaBalls from "../components/MetaBalls";

const NoChatSelected = () => {
  const navigate = useNavigate();
  const ManageFriends = () => {
    navigate("/fam");
  };
  const callyemmit = () => {
    navigate("/yemmit");
  };

  return (
    <div className="w-full flex flex-1 flex-col bg-base-100/50">
      {/* Manage Companions Button - animate from top */}
      <motion.div
        key="manage-companions"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-3 flex justify-end border-b border-base-300"
      >
        <button
          className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight mx-3"
          onClick={ManageFriends}
        >
          <Boxes size={20} />
          Manage Companions
        </button>
        <button
          className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight"
          onClick={() => navigate("/")}
        >
          <Home size={20} />
          Back To Home
        </button>
      </motion.div>

      {/* Welcome Message - animate from right */}
      <motion.div
        key="welcome-message"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-1 flex-col items-center justify-center p-16 pt-5 bg-base-100/50"
      >
        <div className="max-w-md text-center space-y-4 mt-5">
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                <MessageSquare className="w-8 h-8 text-primary " />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Welcome to Yemmy Chats!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
        <div className="border py-2 rounded-2xl border-primary shadow-md shadow-primary w-[60%] mt-10">
          <div className="text-center flex justify-center items-center">
            Yemmit <Bot className="mx-1" /> at your service!
          </div>
          <div className="py-2">
            <MetaBalls
              color="#ffffff"
              cursorBallColor="#ffffff"
              cursorBallSize={2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction={true}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
          </div>
          <div className="flex justify-end items-center mx-3">
            <button
              className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-primary-content"
              onClick={callyemmit}
            >
              click here
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;

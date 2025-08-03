import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Castle, Cookie, Presentation, Table } from "lucide-react";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const navigate = useNavigate();

  const handleNavigate = (path, label) => {
    navigate(path);
    toast.success(`Welcome to ${label} Section!`);
  };

  return (
    <div className="h-screen bg-base-200 flex justify-center items-center">
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center w-[90%] h-full gap-10 pt-24 lg:pt-0">
        {/* Left Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, duration: 1 }}
          className="space-y-6 max-w-xl"
        >
          <div className="text-3xl flex justify-center text-warning/70 font-semibold tracking-tight underline mb-4">
            ~Yemmy Chats Services
            <Castle className="mx-2 mt-1 text-accent/80" size={30} />
            <Presentation className="mt-2 animate-spin-slow" />
          </div>

          <div className="grid gap-6">
            {[
              { label: "Chat", path: "/chat" },
              { label: "Blog", path: "/blog" },
              { label: "Community", path: "/community" },
            ].map((section, i) => (
              <motion.div
                key={section.label}
                custom={i}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigate(section.path, section.label)}
                className="cursor-pointer py-8 px-10 sm:px-20 bg-base-100 shadow-xl hover:shadow-2xl rounded-3xl border border-error/30 hover:border-error/60 text-accent font-bold text-2xl text-center transition-all ease-in-out duration-300"
              >
                {section.label} Section
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Logo */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, duration: 1 }}
          className="w-full lg:w-[35%] bg-accent/20 border border-base-300 rounded-3xl shadow-lg text-center p-6 animate-pulse-slower hover:scale-105 transition-all duration-500 ease-in-out"
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
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
            A secure, fast, and modern platform to connect with your companions in real time!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

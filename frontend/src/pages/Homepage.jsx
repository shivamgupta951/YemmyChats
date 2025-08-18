import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Boxes, Castle, Presentation, Trophy } from "lucide-react";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";
import { motion } from "framer-motion";
import { GoHubot } from "react-icons/go";
import { FaBlogger } from "react-icons/fa";
import { PiChatsCircleBold } from "react-icons/pi";
import { RiUserCommunityFill } from "react-icons/ri";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { AiFillCompass } from "react-icons/ai";
import { MdOutlineConstruction } from "react-icons/md";
import TextType from "../components/TextType";
import { BackgroundLines } from "../components/background-lines";
import { IoFootball } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";
import { RiMenFill } from "react-icons/ri";
import { ImEnvelop } from "react-icons/im";


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
  const ManageFriends = () => {
    navigate("/fam");
  };

  const sections = [
    { label: "Chats", path: "/chat", icon: PiChatsCircleBold },
    { label: "Blogs", path: "/blog", icon: FaBlogger },
    { label: "Communitys", path: "/community", icon: RiUserCommunityFill },
    { label: "Posts", path: "/post", icon: BsFillPostcardHeartFill },
    { label: "Yemmit", path: "/yemmit", icon: GoHubot },
    { label: "Achivements", path: "/achivement", icon: Trophy },
  ];

  return (
    <div className="h-screen bg-base-200 flex justify-center items-center pt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center w-[90%] h-full gap-10 pt-24 lg:pt-0">
        {/* Left Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, duration: 1 }}
          className="space-y-6 max-w-xl"
        >
          <div className="text-3xl flex justify-center text-warning/70 font-semibold tracking-tight underline mb-4 relative">
            ~Yemmy Chats Services
            <div className="animate-bounce">
              <motion.div 
              className="z-50"
                initial={{ x: 0 , y: 0}}
                animate={{ x: [0,70,0,60,0,70,0],y: [0,100,200,300,380,500,600], rotate: 360 }}
                transition={{
                  duration: 30,
                  delay: 5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              >
                <IoFootball
                  className="mx-2 mt-2 text-error/70 animate-spin-slow z-50"
                  size={30}
                />
              </motion.div>
            </div>
            <div className="animate-bounce">
              <IoFootball
                className="mx-2 mt-2 text-error/70 animate-spin-slow absolute right-0"
                size={30}
              />
            </div>
            <ImEnvelop className="mt-1"/>
          </div>

          <div className="grid gap-3">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.label}
                  custom={i}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigate(section.path, section.label)}
                  className="cursor-pointer py-5 px-10 sm:px-16 bg-base-100 shadow-xl hover:shadow-2xl rounded-3xl border border-error/30 hover:border-error/60 text-accent font-bold text-2xl text-center transition-all ease-in-out duration-300 relative"
                >
                  <div className="flex justify-center items-center">
                    {section.label === "Yemmit" ? (
                      <>
                        <div className="flex justify-center items-center gap-2">
                          Ask Yemmit <Icon className="text-xl mt-1" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="flex justify-center items-center gap-2">
                            {section.label}
                            <Icon className="text-2xl mt-1" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {section.label === "Yemmit" && (
                    <div
                      className="label-text absolute right-4 top-5"
                      title="Work in Progress!"
                    >
                      <MdOutlineConstruction size={18} />
                    </div>
                  )}
                  {section.label === "Blogs" && (
                    <div
                      className="label-text absolute right-4 top-5"
                      title="Work in Progress!"
                    >
                      <MdOutlineConstruction size={18} />
                    </div>
                  )}
                  {section.label === "Communitys" && (
                    <div
                      className="label-text absolute right-4 top-5"
                      title="Work in Progress!"
                    >
                      <MdOutlineConstruction size={18} />
                    </div>
                  )}
                  {section.label === "Achivements" && (
                    <div
                      className="label-text absolute right-4 top-5"
                      title="Work in Progress!"
                    >
                      <MdOutlineConstruction size={18} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side - Logo */}
        <div className="w-[40%] h-[70%] space-y-4 pt-5 relative">
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="flex justify-center items-center"
          >
            <button
              className="btn btn-outline btn-accent btn-sm flex items-center gap-2 tracking-tight cursor-pointer"
              onClick={ManageFriends}
            >
              <Boxes size={20} />
              Manage Companions
            </button>
          </motion.div>
          <BackgroundLines>
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, duration: 1 }}
              className="mx-10 w-full lg:w-[85%] bg-accent/20 border border-base-300 rounded-3xl shadow-lg text-center p-6 animate-pulse-slower hover:scale-105 transition-all duration-500 ease-in-out"
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
              <p className="text-base-content/60 px-4 text-md sm:text-lg py-4">
                <TextType
                  text={[
                    "A secure, fast, and modern platform to connect with your companions in real time!",
                    "Stay connected anytime, anywhere and anybody with Yemmy Chats 🚀.",
                  ]}
                  typingSpeed={70}
                  pauseDuration={1500}
                  deletingSpeed={30}
                  showCursor={true}
                  cursorCharacter="~YC!"
                />
              </p>
            </motion.div>
          </BackgroundLines>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

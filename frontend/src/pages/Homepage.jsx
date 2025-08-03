import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Castle } from "lucide-react";
import YemmyChat_logo from "../assets/YemmyChat_logo.png";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-base-200 flex justify-around items-center">
      <div className="flex items-center justify-center space-x-20 w-[70%] h-[90%]">
        <div>
          <div className="text-3xl flex justify-center my-8 text-warning/70 font-semibold tracking-tight underline">
            Yemmy Chats Services!
            <Castle className="mx-2 mt-1 text-accent/80" size={30} />
          </div>
          <div className="border border-error p-10 rounded-ss-3xl rounded-ee-3xl rounded-es-3xl bg-base-300 space-y-4">
            <div
              className="py-8 px-32 rounded-2xl bg-error/30 text-accent/50 font-extrabold text-3xl flex justify-center items-center transition-all transform duration-300 ease-in-out hover:scale-105 hover:border"
              onClick={() => {
                navigate("/chat");
                toast.success("Welcome to Chat Section!");
              }}
            >
              <div>Chat Section</div>
            </div>
            <div
              className="py-8 px-32 rounded-2xl bg-error/30 text-accent/50 font-extrabold text-3xl flex justify-center items-center transition-all transform duration-300 ease-in-out hover:scale-105 hover:border"
              onClick={() => {
                navigate("/blog");
                toast.success("Welcome to Blog Section!");
              }}
            >
              <div>Blog Section</div>
            </div>

            <div
              className="py-8 px-32 rounded-2xl bg-error/30 text-accent/50 font-extrabold text-3xl flex justify-center items-center transition-all transform duration-300 ease-in-out hover:scale-105 hover:border"
              onClick={() => {
                navigate("/community");
                toast.success("Welcome to Community Section!");
              }}
            >
              <div>Community Section</div>
            </div>
          </div>
        </div>
        <div className="border w-[30%] text-4xl h-96 mb-40 rounded-badge bg-accent/20 transition-all transform duration-300 ease-in-out hover:scale-105">
          <div className="m-10 my-5 text-base-300 font-bold flex justify-center items-center">
            Yemmy Chats
          </div>
          <div className="flex justify-center items-center">
            <img
              src={YemmyChat_logo}
              alt="Yemmy Chats Logo"
              className="size-40 mx-2 rounded-lg"
            />
          </div>
          <div className="text-lg flex justify-center items-center px-6 my-2 ">
            A secure, fast, and modern platform to connect with your Companions in real time.
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

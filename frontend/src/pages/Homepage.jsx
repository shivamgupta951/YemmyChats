import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-28 px-4">
        <div>
          <div className="text-3xl flex justify-center text-base-content my-10">
            Yemmy Chats Services!
          </div>
          <div className="flex space-x-8">
            <button
              className="btn btn-sm btn-accent"
              onClick={() => {
                navigate("/chat");
                toast.success("Welcome to Chat Section!");
              }}
            >
              Chat Section
            </button>
            <button
              className="btn btn-sm btn-accent"
              onClick={() => {
                navigate("/blog");
                toast.success("Welcome to Blog Section!");
              }}
            >
              Blog Section
            </button>
            <button
              className="btn btn-sm btn-accent"
              onClick={() => {
                navigate("/community");
                toast.success("Welcome to Community Section!");
              }}
            >
              Community Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;

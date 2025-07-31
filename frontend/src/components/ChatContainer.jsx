import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { formatMessageDay } from "../lib/formatMessageDay";
import { ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  let lastRenderedDate = null;

  return (
    <div className="flex-1 flex flex-col overflow-auto relative">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const currentDate = formatMessageDay(message.createdAt);
          const showDate = currentDate !== lastRenderedDate;
          lastRenderedDate = currentDate;

          return (
            <div key={message._id}>
              {showDate && (
                <div className="text-center text-xs font-semibold text-base-content/50 my-4">
                  {currentDate}
                </div>
              )}

              <div
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>

                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                <div className="chat-bubble flex flex-col max-w-[80%]">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}

                  {message.text && <p>{message.text}</p>}

                  {message.audio && (
                    <div className="mt-2">
                      <audio
                        controls
                        src={message.audio}
                        className="w-full"
                        onPlay={() => console.log("🔊 Audio played")}
                      />
                      <p className="text-xs text-right text-base-content/70 mt-1">
                        🎧 Voice message
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
      <div className="absolute py-4 border rounded-e-2xl bg-base-200 left-0 top-1/4 border-l-0 cursor-pointer hover:bg-base-300">
        <ArrowLeftRight className="text-base-content" size={20} />
      </div>
      <motion.div initial={{x: -30 , opacity: 0}} animate={{x: 0 , opacity: 1}} transition={{duration: 0.5}} className="absolute border size-60 top-60 rounded-xl bg-neutral opacity-70">
        <h4 className="flex justify-center items-center">Chat-Note</h4>
      </motion.div>
    </div>
  );
};

export default ChatContainer;

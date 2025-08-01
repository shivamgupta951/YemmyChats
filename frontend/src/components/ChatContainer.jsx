import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { formatMessageDay } from "../lib/formatMessageDay";
import { ArrowLeftRight, BookCheck, NotepadText, Trash } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getNote, updateNote, deleteNote } from "../lib/userApi";

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

  const [notebox, setNotebox] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [loadingNote, setLoadingNote] = useState(false);

  // Load messages
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  // Scroll to bottom
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load NoteBox on user change
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoadingNote(true);
        const res = await getNote(selectedUser._id);
        setNoteText(res?.content || "");
      } catch (err) {
        console.error("Error fetching note:", err);
      } finally {
        setLoadingNote(false);
      }
    };
    fetchNote();
  }, [selectedUser._id]);

  const handleNoteChange = (e) => {
    const text = e.target.value;
    if (text.split(" ").length <= 200) {
      setNoteText(text);
    } else {
      toast.error("Note can't exceed 200 words");
    }
  };

  const handleNoteSave = async () => {
    try {
      await updateNote(selectedUser._id, noteText);
      toast.success("Note updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save note");
    }
  };

  const handleNoteDelete = async () => {
    if (confirm("Are you sure you want to clear the note?")) {
      try {
        await deleteNote(selectedUser._id);
        setNoteText("");
        toast.success("Note deleted");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
      }
    }
  };

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

      {/* Notebox toggle button */}
      <div
        title="Note-Box"
        className="absolute py-4 border rounded-e-2xl bg-base-200 left-0 top-1/4 border-l-0 cursor-pointer hover:bg-base-300"
        onClick={() => setNotebox((prev) => !prev)}
      >
        <ArrowLeftRight className="text-base-content" size={20} />
      </div>

      {/* Notebox Panel */}
      {notebox && (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute border size-72 top-60 rounded-xl bg-base-300 opacity-90 border-l-0"
        >
          <h4 className="flex justify-center items-center label-text font-bold my-2">
            <BookCheck className="mx-1"/> Note-Box
          </h4>

          <div className="flex justify-center items-center">
            <textarea
              className="text-[70%] w-[90%] mx-auto resize-none border px-2 py-1 border-error shadow-sm shadow-warning rounded-md h-[140px] bg-base-200"
              placeholder="Save a note (max 200 words)..."
              value={noteText}
              onChange={handleNoteChange}
              disabled={loadingNote}
            />
          </div>
          <div className="flex mx-6 justify-between items-center my-4 space-x-3">
            <button
              onClick={handleNoteSave}
              disabled={loadingNote}
              className="btn btn-xs btn-success"
            >
              Save
            </button>

            <button
              onClick={handleNoteDelete}
              className="btn btn-xs btn-error"
              disabled={loadingNote}
            >
              <Trash size={16} />
            </button>
          </div>

          <div className="label-text mx-5 mt-9 font-serif text-[80%] flex justify-between items-end">
            <div>You 🔗 {selectedUser.fullName}</div> <div className="text-[80%] text-error font-sans">
              ~YemmyChats🦝 
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatContainer;

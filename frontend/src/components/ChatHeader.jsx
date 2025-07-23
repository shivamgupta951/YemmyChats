import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [locked, setLocked] = useState(false); // 🔒 Track lock status

  // 🟢 Fetch current notification status and lock status
  const fetchStatus = async () => {
    try {
      const res = await axiosInstance.get(`/notifications/status/${selectedUser._id}`);
      setNotificationsOn(res.data.enabled);
      setLocked(res.data.locked); // 🔒 update lock state
    } catch {
      setNotificationsOn(false);
      setLocked(false);
    }
  };

  // 🟢 Toggle email notification (disabled if locked)
  const toggleNotification = async () => {
    if (locked) {
      toast.error("🔒 This user's notifications cannot be disabled.");
      return;
    }
    try {
      const res = await axiosInstance.post("/notifications/toggle", {
        companionId: selectedUser._id,
      });
      setNotificationsOn(res.data.enabled);

      toast.success(
        res.data.enabled
          ? "Email Notification Enabled for this user!"
          : "🔕 Email Notification Disabled for this user!"
      );
    } catch {
      toast.error("Failed to toggle notification");
    }
  };

  useEffect(() => {
    if (selectedUser?._id) fetchStatus();
  }, [selectedUser]);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Left Section - Avatar & Name */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right Section - Notification Toggle + Close */}
        <div className="flex items-center gap-3 relative">
          <div className="label-text">Notifications</div>

          <button
            onClick={toggleNotification}
            disabled={locked}
            className={`label-text flex justify-center items-center tracking-tighter size-6 border rounded-md ${
              locked ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {notificationsOn ? (
              <Check className="text-success" />
            ) : (
              ""
            )}
          </button>

          {/* 🔒 Overlay div to handle clicks on disabled button */}
          {locked && (
            <div
              onClick={() =>
                toast.error("🔒 This user's notifications cannot be disabled.")
              }
              className="absolute right-11 w-6 h-6 cursor-not-allowed"
              title="Locked"
            />
          )}

          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

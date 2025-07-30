import {
  BrickWallFire,
  Check,
  CircleDotDashed,
  Cookie,
  Dock,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";
import { formatTimeAgo } from "../lib/formatTimeAgo"; // ✅
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [locked, setLocked] = useState(false);
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const res = await axiosInstance.get(
        `/notifications/status/${selectedUser._id}`
      );
      setNotificationsOn(res.data.enabled);
      setLocked(res.data.locked);
    } catch {
      setNotificationsOn(false);
      setLocked(false);
    }
  };
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

  const companionCount = selectedUser?.companions?.length || 0;
  const isOnline = onlineUsers.includes(selectedUser._id);
  const lastSeen =
    !isOnline && selectedUser?.lastSeen
      ? formatTimeAgo(selectedUser.lastSeen)
      : null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Left Section - Avatar & Name */}
        <div className="flex items-center gap-3 group relative">
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
              {isOnline
                ? "Online"
                : selectedUser?.lastSeen
                ? `Last seen ${formatTimeAgo(selectedUser.lastSeen)}`
                : "Last seen ~ Unknown"}
            </p>
          </div>

          {/* Hover Profile Card */}
          <div className="absolute left-10 top-12 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-base-300 border border-base-200 rounded-lg p-4 shadow-md w-64">
              <div className="flex items-center justify-center border-b pb-2 my-2">
                <BrickWallFire className="mr-2" />
                <span className="text-xl font-semibold">Profile Card</span>
              </div>
              <div className="flex justify-center items-center my-5">
                <div className="avatar">
                  <div className="size-24 rounded-full outline outline-2 outline-error">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt={selectedUser.fullName}
                    />
                  </div>
                </div>
                <div className="mx-3">
                  <div className="underline font-bold flex justify-center items-center text-xl">
                    {selectedUser.fullName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[24px_1fr] gap-x-3 gap-y-2 text-sm my-6">
                <CircleDotDashed />
                <div className="truncate break-all">
                  User ID ~ {selectedUser._id}
                </div>

                <CircleDotDashed />
                <div>Username ~ {selectedUser.username || "N/A"}</div>

                <CircleDotDashed />
                <div>
                  Last Online ~{" "}
                  {selectedUser.lastSeen
                    ? formatTimeAgo(selectedUser.lastSeen)
                    : "Unknown"}
                </div>

                <CircleDotDashed />
                <div>Total Companions ~ {companionCount}</div>
              </div>

              <div className="flex justify-center items-center label-text">
                ~ <Cookie size={15} className="mx-1" />
                Yemmy Chats
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => navigate(`/storeroom/${selectedUser._id}`)}
            className="label-text transform transition-transform duration-700 ease-in-out hover:scale-90 flex items-center gap-1 mx-2"
          >
            <Dock size={16} />
            Chat-StoreRoom
          </button>

          <div className="label-text transform transition-transform duration-700 ease-in-out hover:scale-90">
            Email-Notifications
          </div>

          <button
            onClick={toggleNotification}
            disabled={locked}
            className={`label-text flex justify-center items-center tracking-tighter size-6 border rounded-md ${
              locked ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {notificationsOn ? <Check className="text-success" /> : ""}
          </button>

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

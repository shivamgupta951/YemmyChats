import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import {
  FileText,
  ImageIcon,
  Upload,
  FilePlus,
  Copy,
  Boxes,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom"; // 🆕 useParams

const StoreRoomPage = () => {
  const { selectedUser, setSelectedUser } = useChatStore(); // 🆕 Add setSelectedUser
  const { authUser } = useAuthStore();
  const { userId } = useParams(); // 🆕 Grab :userId from route
  const [storeRoomData, setStoreRoomData] = useState([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("file");
  const navigate = useNavigate();

  // 🆕 Fetch selected user on reload
  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedUser && userId) {
        try {
          const res = await axiosInstance.get(`/users/${userId}`);
          setSelectedUser(res.data); // set in Zustand
        } catch (error) {
          console.error("Failed to fetch user:", error);
          toast.error("User not found");
        }
      }
    };
    fetchUser();
  }, [selectedUser, userId, setSelectedUser]);

  const fetchStoreRoom = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/storeroom/${userId}`);
      setStoreRoomData(res.data.files || []);
    } catch (err) {
      console.error("Failed to fetch StoreRoom:", err);
      toast.error("Could not load StoreRoom");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadText = async () => {
    if (!newText.trim()) return;
    try {
      await axiosInstance.post(`/storeroom/${userId}`, {
        type: "text",
        content: newText,
        userId,
      });
      toast.success("Text saved to StoreRoom!");
      setNewText("");
      fetchStoreRoom();
    } catch (err) {
      toast.error("Failed to upload text");
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !fileType) {
      toast.error("Please select a file and type");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", fileType);
      formData.append("userId", userId);

      await axiosInstance.post(`/storeroom/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded to StoreRoom!");
      setSelectedFile(null);
      fetchStoreRoom();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload file");
    }
  };

  useEffect(() => {
    fetchStoreRoom();
  }, [userId]);

  if (!selectedUser) {
    return (
      <div className="text-center p-10 text-gray-500 my-16">No user selected</div>
    );
  }

  return (
    <div className="p-5 max-w-5xl mx-auto space-y-8 my-28">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex text-accent">
          <Boxes className="mt-1 mx-2" /> Chat-StoreRoom with{" "}
          {selectedUser.fullName}
        </h2>
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-outline"
        >
          Back to Chat
        </button>
      </div>
      <div className="label-text">
        save and store anything with your chatmates and access it any time!
      </div>

      {/* Upload Text Section */}
      <div className="flex flex-col gap-3">
        <label className="label-text">Upload Test Message</label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Save important notes here..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm w-fit"
          onClick={handleUploadText}
        >
          <FilePlus size={16} />
          Save Text
        </button>
      </div>

      {/* Upload File/Image Section */}
      <div className="flex flex-col gap-3 border-t border-base-300 pt-4">
        <label className="label-text">Upload File or Image</label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs"
        />

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="file">File</option>
          <option value="image">Image</option>
        </select>

        <button
          onClick={handleUploadFile}
          className="btn btn-accent btn-sm w-fit"
        >
          <Upload size={16} />
          Upload
        </button>
      </div>

      {/* Files Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📁 Saved Items</h3>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {storeRoomData.map((item, idx) => {
              const fileName =
                item.type === "file" ? item.content.split("/").pop() : null;
              const fileExt = fileName
                ? fileName.split(".").pop()?.toUpperCase()
                : null;

              const handleCopy = async () => {
                try {
                  await navigator.clipboard.writeText(item.content);
                  toast.success("Text copied!");
                } catch (err) {
                  toast.error("Failed to copy");
                }
              };

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-base-200 rounded-lg shadow relative"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    {item.type === "image" && <ImageIcon size={18} />}
                    {item.type === "file" && <Upload size={18} />}
                    {item.type === "text" && <FileText size={18} />}
                    <span>{item.type.toUpperCase()}</span>
                  </div>

                  {/* Content Render Based on Type */}
                  {item.type === "image" ? (
                    <>
                      <img
                        src={item.content}
                        alt="shared-img"
                        className="rounded max-h-40 object-contain w-full"
                      />
                      <a
                        href={item.content}
                        target="_blank"
                        download
                        className="text-success text-sm absolute top-3 right-3 tooltip tooltip-left"
                      >
                        Download-Image⬇️
                      </a>
                    </>
                  ) : item.type === "file" ? (
                    <>
                      <p className="text-sm font-semibold break-all">
                        {fileName}
                      </p>
                      <p className="text-xs text-gray-500 mb-1">
                        Type: {fileExt}
                      </p>
                      <a
                        href={item.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success text-sm absolute top-3 right-3 tooltip tooltip-left"
                      >
                        Download-File⬇️
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="text-base-content text-sm break-all">
                        {item.content}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 tooltip tooltip-left flex text-sm text-success"
                        data-tip="Copy"
                      >
                        Copy
                        <Copy
                          size={16}
                          className="text-gray-500 hover:text-primary mt-1 mx-1"
                        />
                      </button>
                    </>
                  )}

                  <p className="text-xs text-right text-gray-400 mt-2">
                    – {item.uploadedBy?.fullName || "Unknown"}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreRoomPage;

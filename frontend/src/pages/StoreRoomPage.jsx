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
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const StoreRoomPage = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const { userId } = useParams();
  const [storeRoomData, setStoreRoomData] = useState([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("file");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedUser && userId) {
        try {
          const res = await axiosInstance.get(`/users/${userId}`);
          setSelectedUser(res.data);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-base-200 shadow-md p-8 rounded-2xl text-center">
          <p className="text-base-content/70 text-lg">No user selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="mt-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="btn btn-sm btn-outline flex items-center gap-2 px-4 rounded-lg"
          >
            <ChevronLeft size={20} />
            Back to Chat
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-200 shadow-md px-6 py-4 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-base-content flex items-center justify-center gap-2">
              <Boxes className="text-indigo-500" size={24} />
              Chat-StoreRoom with {selectedUser.fullName}
            </h2>
            <p className="text-sm text-base-content/70 mt-1 flex justify-center items-center">
              Save and store anything with your chatmates and access it any time!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-base-200 shadow-md p-6 rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Upload Text Message
            </h3>
            <textarea
              className="textarea textarea-bordered w-full p-4 rounded-xl mb-4 min-h-[120px]"
              placeholder="Save important notes here..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUploadText}
              className="btn btn-primary flex items-center gap-2 px-6 py-2 rounded-xl"
            >
              <FilePlus size={18} />
              Save Text
            </motion.button>
          </motion.div>

          {/* Upload File Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-base-200 shadow-md p-6 rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
              <Upload className="text-purple-500" size={20} />
              Upload File or Image
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                Select File
              </label>
              <div className="file-input file-input-bordered w-full p-2 rounded-xl">
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-base-content/80 mb-2">
                File Type
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="select select-bordered w-full p-3 rounded-xl"
              >
                <option value="file">File</option>
                <option value="image">Image</option>
              </select>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUploadFile}
              className="btn btn-accent flex items-center gap-2 px-6 py-2 rounded-xl"
            >
              <Upload size={18} />
              Upload File
            </motion.button>
          </motion.div>
        </div>

        {/* Files Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <div className="bg-base-200 shadow-md p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-base-content mb-6 flex items-center gap-2">
              <Boxes className="text-amber-500" size={24} />
              Saved Items
            </h3>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="loading loading-spinner text-primary w-12 h-12 rounded-full animate-spin"></div>
              </div>
            ) : storeRoomData.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No items saved yet. Start by uploading something!
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-base-200 shadow-md p-5 rounded-xl relative"
                    >
                      <div className="flex items-center gap-2 text-sm text-base-content/70 mb-3">
                        {item.type === "image" && <ImageIcon size={18} className="text-pink-500" />}
                        {item.type === "file" && <Upload size={18} className="text-blue-500" />}
                        {item.type === "text" && <FileText size={18} className="text-green-500" />}
                        <span className="font-medium">{item.type.toUpperCase()}</span>
                      </div>

                      {/* Content Render Based on Type */}
                      {item.type === "image" ? (
                        <>
                          <div className="bg-base-100 shadow-inner p-2 rounded-lg mb-3">
                            <img
                              src={item.content}
                              alt="shared-img"
                              className="rounded-lg max-h-40 w-full object-cover"
                            />
                          </div>
                          <a
                            href={item.content}
                            target="_blank"
                            download
                            className="btn btn-sm btn-outline absolute top-3 right-3 text-xs flex items-center gap-1"
                          >
                            Download
                          </a>
                        </>
                      ) : item.type === "file" ? (
                        <>
                          <div className="bg-base-100 shadow-inner p-4 rounded-lg mb-3">
                            <p className="text-sm font-semibold break-all">
                              {fileName}
                            </p>
                            <p className="text-xs text-base-content/70 mt-1">
                              Type: {fileExt}
                            </p>
                          </div>
                          <a
                            href={item.content}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline absolute top-3 right-3 text-xs flex items-center gap-1"
                          >
                            Download
                          </a>
                        </>
                      ) : (
                        <>
                          <div className="bg-base-100 shadow-inner p-4 rounded-lg mb-3">
                            <p className="text-base-content text-sm break-all">
                              {item.content}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className="btn btn-sm btn-outline absolute top-3 right-3 text-xs flex items-center gap-1"
                          >
                            <Copy size={14} />
                            Copy
                          </motion.button>
                        </>
                      )}

                      <p className="text-xs text-right text-base-content/70 mt-2">
                        – {item.uploadedBy?.fullName || "Unknown"}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoreRoomPage;
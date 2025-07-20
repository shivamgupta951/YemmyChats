import { Camera, Mail, User, ArrowLeft, Shield, Calendar, CheckCircle, Loader2, Edit, Save, X, ChevronDown, ChevronUp, Bell, Lock, Globe, Palette } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Newsletter from "./NewsLetter";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(authUser?.bio || "");
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedSection, setExpandedSection] = useState(null);
  const [themeColor, setThemeColor] = useState("#3b82f6");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Track if dropdown is open to handle scrollbar
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Add/remove padding when dropdown is open to prevent layout shift
    if (dropdownOpen) {
      document.body.style.paddingRight = "8px";
    } else {
      document.body.style.paddingRight = "0";
    }
  }, [dropdownOpen]);

  // Available theme colors
  const themeColors = [
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#6366f1", // Indigo
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#ec4899", // Pink
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  useEffect(() => {
    // Load saved theme color from localStorage
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
      setThemeColor(savedColor);
      document.documentElement.style.setProperty("--primary", savedColor);
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB) and type
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please upload an image smaller than 2MB");
      return;
    }
    if (!file.type.match("image.*")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(progress);
      }
    };

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
        // toast updated in store
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile picture");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast.error("Error reading file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const saveBio = async () => {
    try {
      await updateProfile({ bio });
      setIsEditingBio(false);
    } catch (error) {
      // toast updated in store
    }
  };

  const triggerFileInput = () => {
    if (!isUploading && !isUpdatingProfile) {
      fileInputRef.current.click();
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const changeThemeColor = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("themeColor", color);
    toast.success("Theme color updated!");
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(
      notificationsEnabled
        ? "Notifications disabled"
        : "Notifications enabled"
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 px-4 bg-gray-50"
      style={{ "--primary": themeColor }}
    >
      <div className="max-w-4xl mx-auto pb-10">

        {/* Back Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-end mb-6"
        >
          <motion.button
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex mb-6 border-b border-gray-200">
          <button
            className={`pb-3 px-4 font-medium text-sm ${activeTab === "profile" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`pb-3 px-4 font-medium text-sm ${activeTab === "settings" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`pb-3 px-4 font-medium text-sm ${activeTab === "security" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`pb-3 px-4 font-medium text-sm ${activeTab === "newsletter" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("newsletter")}
          >
            News-Letter
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-50 rounded-xl p-8 space-y-6 shadow-neumorph"
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <>
              {/* Header */}
              <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  My Profile
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage your personal information and presence
                </p>
              </motion.div>

              {/* Avatar Upload */}
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="relative rounded-full p-1 border-4 border-gray-50 shadow-neumorph-inset transition-all duration-300">
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="size-36 rounded-full object-cover shadow-md"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <button
                    onClick={triggerFileInput}
                    disabled={isUploading || isUpdatingProfile}
                    className={`absolute -bottom-2 -right-2 bg-primary hover:bg-primary-dark p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg ${(isUploading || isUpdatingProfile) ? "opacity-70 pointer-events-none" : ""
                      }`}
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading || isUpdatingProfile}
                  />
                </div>

                <AnimatePresence>
                  {isUploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-48 bg-gray-100 rounded-full h-2 overflow-hidden"
                    >
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <h2 className="text-2xl font-semibold mt-2 text-gray-800">{authUser?.fullName}</h2>
                <p className="text-primary/80">@{authUser?.username || authUser?.email.split("@")[0]}</p>
              </motion.div>

              {/* Bio Section */}
              <motion.div variants={itemVariants} className="bg-gray-100 rounded-xl p-6 shadow-neumorph-inset">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-700">About Me</h3>
                  {isEditingBio ? (
                    <div className="flex gap-2">
                      <button
                        onClick={saveBio}
                        className="flex items-center gap-1 px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                        disabled={isUpdatingProfile}
                      >
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingBio(false)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingBio(true)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                  )}
                </div>

                {isEditingBio ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white text-gray-700"
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600">
                    {bio || "No bio added yet. Click edit to add one."}
                  </p>
                )}
              </motion.div>

              {/* Profile Info */}
              <motion.div variants={containerVariants} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-between shadow-neumorph-inset">
                    <span className="text-gray-700">{authUser?.fullName || "Not provided"}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">
                      Read Only
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-between shadow-neumorph-inset">
                    <span className="text-gray-700">{authUser?.email}</span>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded text-green-700">
                      Verified
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-6">
                <div className="stat bg-gray-50 p-4 rounded-xl shadow-neumorph text-center">
                  <div className="stat-title text-gray-500 text-sm">Posts</div>
                  <div className="stat-value text-primary text-2xl font-bold">1.2K</div>
                  <div className="stat-desc text-green-500 text-xs">+12% this month</div>
                </div>
                <div className="stat bg-gray-50 p-4 rounded-xl shadow-neumorph text-center">
                  <div className="stat-title text-gray-500 text-sm">Following</div>
                  <div className="stat-value text-secondary text-2xl font-bold">356</div>
                  <div className="stat-desc text-blue-500 text-xs">+5 recently</div>
                </div>
                <div className="stat bg-gray-50 p-4 rounded-xl shadow-neumorph text-center">
                  <div className="stat-title text-gray-500 text-sm">Followers</div>
                  <div className="stat-value text-purple-500 text-2xl font-bold">892</div>
                  <div className="stat-desc text-pink-500 text-xs">+21 this week</div>
                </div>
              </motion.div>
            </>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <>
              <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Account Settings
                </h1>
                <p className="mt-2 text-gray-500">
                  Customize your experience
                </p>
              </motion.div>

              {/* Theme Settings */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("theme")}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Palette className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-700">Theme Settings</h3>
                  </div>
                  {expandedSection === "theme" ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                <AnimatePresence>
                  {expandedSection === "theme" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-600 mb-3">Primary Color</h4>
                          <div className="flex gap-3 flex-wrap">
                            {themeColors.map((color) => (
                              <button
                                key={color}
                                className="w-10 h-10 rounded-full border-2 transition-transform hover:scale-110"
                                style={{
                                  backgroundColor: color,
                                  borderColor: themeColor === color ? color : "transparent",
                                  boxShadow: themeColor === color ? `0 0 0 2px ${color}, 0 4px 6px -1px rgba(0, 0, 0, 0.1)` : "none"
                                }}
                                onClick={() => changeThemeColor(color)}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-200 rounded-lg">
                              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                              </svg>
                            </div>
                            <span className="text-gray-700">Dark Mode</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Notification Settings */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("notifications")}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                      <Bell className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-700">Notification Settings</h3>
                  </div>
                  {expandedSection === "notifications" ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                <AnimatePresence>
                  {expandedSection === "notifications" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-200 rounded-lg">
                              <Bell className="w-5 h-5 text-gray-700" />
                            </div>
                            <span className="text-gray-700">Enable Notifications</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={notificationsEnabled}
                              onChange={toggleNotifications}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-200 rounded-lg">
                              <Mail className="w-5 h-5 text-gray-700" />
                            </div>
                            <span className="text-gray-700">Email Notifications</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-200 rounded-lg">
                              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-gray-700">Push Notifications</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Language Settings */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    toggleSection("language");
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-700">Language & Region</h3>
                  </div>
                  {expandedSection === "language" ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                <AnimatePresence>
                  {expandedSection === "language" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Language</label>
                          <select
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white text-gray-700"
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Time Zone</label>
                          <select
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white text-gray-700"
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                          >
                            <option>(GMT-05:00) Eastern Time</option>
                            <option>(GMT-06:00) Central Time</option>
                            <option>(GMT-07:00) Mountain Time</option>
                            <option>(GMT-08:00) Pacific Time</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>


            </>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <>
              <motion.div variants={itemVariants} className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Security Settings
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage your account security
                </p>
              </motion.div>

              {/* Password Section */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-700">Password</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Change your password regularly to keep your account secure
                </p>
                <button className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Change Password
                </button>
              </motion.div>

              {/* Security Activity */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-700">Security Activity</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-700">Login from Chrome</p>
                      <p className="text-xs text-gray-400">Today at 10:30 AM</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Current</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-700">Login from Safari</p>
                      <p className="text-xs text-gray-400">Yesterday at 2:15 PM</p>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Previous</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-gray-700">Password changed</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Two-Factor Authentication */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-6 shadow-neumorph">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-500">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-gray-700">Two-Factor Authentication</h3>
                  </div>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Disabled</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Add an extra layer of security to your account
                </p>
                <button className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
                  Enable 2FA
                </button>
              </motion.div>
            </>
          )}

          {/* Newsletter tab */}
          {activeTab === "newsletter" && (
            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-50 rounded-xl p-6 shadow-neumorph"
            >
              <Newsletter />
            </motion.div>
          )}

          {/* Account Info */}
          <motion.div variants={itemVariants} className="mt-6 bg-gray-50 rounded-xl p-6 shadow-neumorph">
            <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                <Shield className="w-5 h-5" />
              </div>
              Account Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  Member Since
                </span>
                <span className="font-medium text-gray-700">{formatDate(authUser.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Account Status
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
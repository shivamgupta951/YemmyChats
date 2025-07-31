import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  CircleUserRound,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Link as LinkIcon,
  Loader2,
  MailCheck,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { motion, AnimatePresence } from "framer-motion";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!usernameAvailable) return toast.error("Username not available");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const checkUsernameAvailability = async (username) => {
    if (!username.trim()) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      const res = await axiosInstance.get("/auth/check-username", {
        params: { username },
      });
      setUsernameAvailable(res.data.available);
    } catch (error) {
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleSendOtp = async () => {
    const valid = validateForm();
    if (valid !== true) return;

    setSendingOtp(true);
    try {
      const res = await axiosInstance.post("/auth/send-otp", {
        email: formData.email,
      });
      toast.success(res.data.message || "OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validateForm();
    if (valid !== true) return;

    if (!otpSent) return toast.error("Please send and enter OTP first!");
    if (!otp) return toast.error("OTP is required!");

    signup({ ...formData, otp });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-base-100 to-base-200 pt-16">
      {/* Left Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 order-2 lg:order-1"
      >
        <div className="w-full max-w-md bg-base-100 p-6 sm:p-8 rounded-2xl shadow-xl border border-base-300">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"
              >
                <CircleUserRound className="size-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              <p className="text-base-content/60 text-sm">
                Get started with your free account
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </motion.div>

            {/* Username */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/50"
                  placeholder="johndoe123"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    checkUsernameAvailability(e.target.value);
                  }}
                />
                {checkingUsername && (
                  <Loader2 className="absolute right-3 top-3 size-4 animate-spin" />
                )}
              </div>
              <AnimatePresence>
                {usernameAvailable === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-success text-sm mt-1 flex items-center gap-1"
                  >
                    <Check className="size-4" /> Username is available
                  </motion.div>
                )}
                {usernameAvailable === false && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-error text-sm mt-1 flex items-center gap-1"
                  >
                    <X className="size-4" /> Username is taken
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-10 focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* OTP Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={`btn btn-outline btn-accent w-full sm:w-auto ${otpSent ? 'btn-success' : ''}`}
                onClick={handleSendOtp}
                disabled={sendingOtp}
              >
                {sendingOtp ? (
                  <>
                    <Loader2 className="animate-spin size-4" /> Sending...
                  </>
                ) : (
                  <>
                    <MailCheck className="size-4" /> {otpSent ? 'OTP Sent' : 'Send OTP'}
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {otpSent && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-full sm:w-32"
                  >
                    <input
                      type="text"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Image/Pattern */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with Companions, share moments and stay in touch with your loved ones with amazing features!"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
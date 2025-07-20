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
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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
    <div className="min-h-screen grid lg:grid-cols-2 place-items-center">
      {/* Signup box */}
      <div className="w-full max-w-md space-y-1 shadow-lg shadow-gray-600 bg-base-300 p-10 rounded-e-3xl transition-all transform duration-300 ease-in-out hover:scale-105 outline outline-2 outline-gray-600 mt-10">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-1 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <CircleUserRound className="size-6 text-primary animate-bounce" />
            </div>
            <h1 className="text-2xl font-bold ">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Username */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-medium">Create Username</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="your-unique-username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  checkUsernameAvailability(e.target.value);
                }}
              />
            </div>
            {usernameAvailable === true && (
              <span className="text-success text-sm mt-1">
                ✅ Username is available
              </span>
            )}
            {usernameAvailable === false && (
              <span className="text-error text-sm mt-1">
                ❌ Username is already taken
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-2.5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Send OTP button */}
          <div className="flex items-center justify-between gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline btn-sm btn-accent my-2"
              onClick={handleSendOtp}
              disabled={sendingOtp}
            >
              {sendingOtp ? (
                <>
                  <Loader2 className="animate-spin size-4" /> Sending...
                </>
              ) : (
                <>
                  <MailCheck className="size-4" /> Send OTP
                </>
              )}
            </button>

            {otpSent && (
              <input
                type="text"
                className="input input-bordered input-sm w-32 my-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-3"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-1">
          <LinkIcon size={20} className="inline-block animate-spin" />
          <span className="px-1 text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </span>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community on"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones with lots of new Amazing Features!"
      />
    </div>
  );
};

export default SignUpPage;

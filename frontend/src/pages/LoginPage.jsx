import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Cookie,
  LinkIcon,
  User,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(true); // ✅ toggle state
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Send either email or username based on selected mode
    const payload = useEmail
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, password: formData.password };
    login(payload);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 place-items-center">
      {/* Left Side - Form */}
      <div className="w-full max-w-md space-y-6 shadow-lg shadow-gray-600 bg-base-300 p-10 rounded-e-3xl transform transition-transform duration-300 ease-in-out hover:scale-105 outline outline-2 outline-gray-600 ">
        <div className="w-full max-w-md space-y-2">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-1 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back!</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Field Selection */}
          <div className="label-text font-bold flex justify-center items-center">
            Login with
            <div className="flex mx-4">
              <button
                type="button"
                className={`btn btn-outline p-2 px-5 mx-2 ${useEmail ? "btn-accent" : ""}`}
                onClick={() => setUseEmail(true)}
              >
                Email
              </button>
              <button
                type="button"
                className={`btn btn-outline p-2 ${!useEmail ? "btn-accent" : ""}`}
                onClick={() => setUseEmail(false)}
              >
                Username
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="">
            {useEmail ? (
              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
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
            ) : (
              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text font-medium">Username</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="form-control my-3">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full my-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Link to Signup */}
          <div className="text-center flex justify-center items-center">
            <LinkIcon size={20} className="animate-spin mx-1" />
            <div className="text-center">
              <p className="text-base-content/60">
                Don&apos;t have an Yemmy account?{" "}
                <Link to="/signup" className="link link-primary">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back to"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

// ✅ Correct way to import an image asset
import signup_image from "../assets/signup_image.png";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // ✅ Use background image with Tailwind inline style
    <div
      className="min-h-screen grid lg:grid-cols-2 place-items-center"
      style={{
        backgroundImage: `url(${signup_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Signup box */}
      <div className="w-full max-w-md space-y-6 shadow-lg shadow-gray-600 bg-gray-900/70 p-10 rounded-e-3xl transform transition-transform duration-300 ease-in-out hover:scale-105 outline outline-2 outline-gray-600 ">
        {/* Logo section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <CircleUserRound className="size-6 text-primary animate-bounce" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        {/* Form inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-1">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="w-5 h-5 text-base-content/40" />
              </div>
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

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-1">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="size-5 text-base-content/40" />
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

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium mb-1">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="size-5 text-base-content/40" />
              </div>
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center flex justify-center items-center">
          <LinkIcon size={20} className="animate-spin" />
          <p className="text-base-content/60 px-1">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Pattern */}
      <AuthImagePattern
        title="Join our community on "
        subtitle="Connect with friends, share moments and stay in touch with your loved ones with lots of new Amazing Features!"
      />
    </div>
  );
};

export default SignUpPage;

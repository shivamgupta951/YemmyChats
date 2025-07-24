import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MessageSquare, Send, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.username || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/contact/submit", formData);
      toast.success(res.data.message);
      setFormData({ username: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copied to clipboard!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-28"
    >
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="mb-6 btn btn-outline btn-accent btn-sm"
        >
          ← Back
        </button>
      </div>

      <div className="bg-base-200 rounded-xl p-6 md:p-8 shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="text-sm text-base-content/60">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Name</span>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                className="input input-bordered pl-10 w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Email</span>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered pl-10 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Phone</span>
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className="input input-bordered pl-10 w-full"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">Message</span>
            </div>
            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-base-content/50" />
              <textarea
                name="message"
                placeholder="Your Message"
                className="textarea textarea-bordered pl-10 w-full"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-base-content/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Email */}
          <motion.div
            whileHover={{ y: -2 }}
            className="card bg-base-100 shadow cursor-pointer"
            onClick={() => copyToClipboard("yemmychats@gmail.com")}
          >
            <div className="card-body items-center text-center">
              <Mail className="h-6 w-6 text-primary" />
              <h4 className="font-semibold">Email Us</h4>
              <p className="text-xs text-base-content/60">
                Click to copy email
              </p>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            whileHover={{ y: -2 }}
            className="card bg-base-100 shadow cursor-pointer"
            onClick={() => copyToClipboard("Phone Number")}
          >
            <div className="card-body items-center text-center">
              <Phone className="h-6 w-6 text-primary" />
              <h4 className="font-semibold">Call Us</h4>
              <p className="text-xs text-base-content/60">
                Click to copy number
              </p>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            whileHover={{ y: -2 }}
            className="card bg-base-100 shadow cursor-pointer"
            onClick={() => copyToClipboard("YemmyChat-WorkBase 203/34 India")}
          >
            <div className="card-body items-center text-center">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <h4 className="font-semibold">Visit Us</h4>
              <p className="text-xs text-base-content/60">
                Click to copy address
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;

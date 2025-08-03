import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MessageSquare, Send, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 pt-24 px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-base-100/70 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-xl border border-base-300"
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="btn btn-sm btn-outline btn-accent mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary">Get In Touch</h2>
          <p className="text-base-content/60 mt-2">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Name</span>
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  name="username"
                  className="input input-bordered pl-10 w-full"
                  placeholder="Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Email</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  type="email"
                  name="email"
                  className="input input-bordered pl-10 w-full"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Phone</span>
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered pl-10 w-full"
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </label>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Message</span>
              </div>
              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-base-content/40" />
                <textarea
                  name="message"
                  className="textarea textarea-bordered pl-10 w-full"
                  rows="5"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner" />
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

        {/* Quick Contact Cards */}
        <div className="mt-10 pt-6 border-t border-base-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "Email Us",
              icon: <Mail className="w-6 h-6 text-primary" />,
              text: "yemmychats@gmail.com",
            },
            {
              title: "Call Us",
              icon: <Phone className="w-6 h-6 text-primary" />,
              text: "Phone Number",
            },
            {
              title: "Visit Us",
              icon: (
                <svg
                  className="w-6 h-6 text-primary"
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
              ),
              text: "YemmyChat-WorkBase 203/34 India",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, rotate: 0.5 }}
              onClick={() => copyToClipboard(item.text)}
              className="card bg-base-100 shadow-xl border border-base-300 cursor-pointer"
            >
              <div className="card-body items-center text-center space-y-1">
                {item.icon}
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-xs text-base-content/60">Click to copy</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

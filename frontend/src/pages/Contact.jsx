import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      className="mt-12 max-w-2xl mx-auto p-4 sm:p-8"
    >
      <div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-neumorph">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Get In Touch
          </motion.h2>
          <p className="text-gray-500">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700 shadow-neumorph-inset"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700 shadow-neumorph-inset"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700 shadow-neumorph-inset"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <div className="absolute top-3 left-3">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700 shadow-neumorph-inset"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-primary text-white font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email Card with Copy Functionality */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-50 rounded-lg shadow-neumorph cursor-pointer"
              onClick={() => copyToClipboard("support@yourdomain.com")}
            >
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary mr-2" />
                <h4 className="font-medium text-gray-700">Email Us</h4>
                <Copy className="h-4 w-4 ml-2 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 truncate">Click to copy email</p>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-50 rounded-lg shadow-neumorph cursor-pointer"
              onClick={() => copyToClipboard("+1 (555) 123-4567")}
            >
              <div className="flex items-center justify-center mb-2">
                <Phone className="h-6 w-6 text-primary mr-2" />
                <h4 className="font-medium text-gray-700">Call Us</h4>
                <Copy className="h-4 w-4 ml-2 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 truncate">Click to copy number</p>
            </motion.div>

            {/* Address Card */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-4 bg-gray-50 rounded-lg shadow-neumorph cursor-pointer"
              onClick={() => copyToClipboard("123 Business St, City")}
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="h-6 w-6 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h4 className="font-medium text-gray-700">Visit Us</h4>
                <Copy className="h-4 w-4 ml-2 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 truncate">Click to copy address</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
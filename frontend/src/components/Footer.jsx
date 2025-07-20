import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About YemmyChats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">YemmyChats</h3>
            <p className="text-gray-600">
              A secure, fast, and modern platform to connect with your friends in real time.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" className="text-gray-500 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-primary">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-primary">About</a></li>
              <li><a href="/features" className="text-gray-600 hover:text-primary">Features</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-primary">Contact</a></li>
              <li><a href="/newsletter" className="text-gray-600 hover:text-primary">Newsletter</a></li>
            </ul>
          </motion.div>

          {/* Tools / Features */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Features</h3>
            <ul className="space-y-2">
              <li><a href="/messages" className="text-gray-600 hover:text-primary">Real-Time Messaging</a></li>
              <li><a href="/profile" className="text-gray-600 hover:text-primary">Profile Management</a></li>
              <li><a href="/security" className="text-gray-600 hover:text-primary">Security Settings</a></li>
              <li><a href="/admin" className="text-gray-600 hover:text-primary">Admin Panel</a></li>
              <li><a href="/set-username" className="text-gray-600 hover:text-primary">Username Setup</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <span className="text-gray-600">support@yemmychats.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <span className="text-gray-600">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <span className="text-gray-600">Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} YemmyChats. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-gray-500 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
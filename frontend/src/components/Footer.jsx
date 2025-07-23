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
      className="bg-base-100 border-t border-base-300"
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
            <h3 className="text-lg font-semibold text-base-content">YemmyChats</h3>
            <p className="text-base-content/70">
              A secure, fast, and modern platform to connect with your Companions in real time.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/shivam_pvt951?igsh=MWw5ejl6cGlwamxpbg==" target="_blank" className="text-base-content/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/shivam-gupta-199203339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="text-base-content/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/shivamgupta951" target="_blank" className="text-base-content/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-base-content">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-base-content/70 hover:text-primary">Home</a></li>
              <li><a href="/contact" className="text-base-content/70 hover:text-primary">Contact</a></li>
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-base-content">Features</h3>
            <ul className="space-y-2">
              <li><div  className="text-base-content/70 hover:text-primary">Real-Time Messaging</div></li>
              <li><div  className="text-base-content/70 hover:text-primary">Profile Management</div></li>
              <li><div  className="text-base-content/70 hover:text-primary">Security Settings</div></li>
              <li><div  className="text-base-content/70 hover:text-primary">Admin Panel</div></li>
              <li><div  className="text-base-content/70 hover:text-primary">Username Setup</div></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-base-content">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-base-content/60 mt-0.5" />
                <span className="text-base-content/70">yemmychats@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-base-content/60 mt-0.5" />
                <span className="text-base-content/70">+91 93357 91524</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-base-content/60 mt-0.5" />
                <span className="text-base-content/70">Noida, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-300 my-8"></div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-base-content/60 text-sm">
            &copy; {currentYear} YemmyChats. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-base-content/60 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-base-content/60 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-base-content/60 hover:text-primary text-sm transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

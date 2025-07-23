import { motion } from "framer-motion";
import {
  Rocket,
  CheckCircle,
  Zap,
  Brain,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const featureList = [
  "Secure Real-time Messaging",
  "Encrypted Image Sharing",
  "Companion & Family Chat Groups",
  "Theme Customization",
  "Email Notifications",
  "Emoji Support",
];

const pricingPlans = [
  { duration: "1 Month", price: 2000 },
  { duration: "6 Months", price: 10000 },
  { duration: "12 Months", price: 17000 },
];

const futurePlans = [
  "AI-powered Smart Suggestions",
  "Group Video Calling",
  "Multi-device Synchronization",
  "Voice Message Support",
  "AI Auto-Translation",
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return (
    <div className="px-4 sm:px-10 py-24 max-w-5xl mx-auto space-y-20">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        {/* Back Button Top Right */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(authUser ? "/" : "/login")}
            className="btn btn-outline btn-accent btn-sm flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-center">About Yemmy Chats 🚀</h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto text-center">
          Built with ❤️ to connect you with your companions and family — fast,
          fun, and secure. Stay connected like never before.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CheckCircle className="text-primary" /> Current Features
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {featureList.map((feature, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl bg-base-200 flex items-center gap-3 shadow"
            >
              <span className="bg-primary text-white rounded-full p-1">
                <CheckCircle size={18} />
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Professional Account Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Zap className="text-yellow-500" /> Professional Accounts
          <div className="label-text flex justify-center items-center border mt-1 px-2 rounded-xl bg-accent text-base-300">Comming Soon</div>
        </h2>
        <p className="text-zinc-500">
          Unlock exclusive features with a professional account:
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-base-200 rounded-xl p-5 shadow text-center"
            >
              <h3 className="text-lg font-semibold">{plan.duration}</h3>
              <p className="text-2xl font-bold text-primary mt-2">
                ₹{plan.price}
              </p>
              <button className="mt-4 btn btn-sm btn-primary">Buy Now</button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Future Enhancements */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Brain className="text-secondary" /> Future Enhancements
        </h2>
        <ul className="space-y-3 pl-5 list-disc">
          {futurePlans.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.03 }}
              className="text-zinc-600"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
};

export default AboutPage;

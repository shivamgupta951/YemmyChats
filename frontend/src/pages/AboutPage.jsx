import { motion } from "framer-motion";
import { Rocket, CheckCircle, Zap, Brain, ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import storeRoomImage from "../assets/storeRoomImage.png";
import chatboxImage from "../assets/chatboxImage.png";

const featureList = [
  {
    title: "Secure Messaging",
    icon: "🔒",
    desc: "End-to-end encrypted real-time chats"
  },
  {
    title: "Media Sharing",
    icon: "🖼️",
    desc: "Encrypted image and file transfers"
  },
  {
    title: "Chat Groups",
    icon: "👨‍👩‍👧‍👦",
    desc: "Family & companion group spaces"
  },
  {
    title: "Themes",
    icon: "🎨",
    desc: "Personalize your chat experience"
  }
];

const pricingPlans = [
  {
    duration: "1 Month",
    price: 2000,
    popular: false,
    features: ["All basic features", "Priority support"]
  },
  {
    duration: "6 Months",
    price: 10000,
    popular: true,
    features: ["Everything in Basic", "+ Save 17%", "Early access to features"]
  },
  {
    duration: "12 Months",
    price: 17000,
    popular: false,
    features: ["Everything in Plus", "+ Save 29%", "VIP support", "Custom themes"]
  }
];

const futurePlans = [
  "AI Smart Suggestions",
  "Group Video Calls",
  "Multi-device Sync",
  "Voice Messages",
  "Auto-Translation"
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  // Enhanced Neumorphism Styles
  const neoCard = "rounded-3xl bg-base-100 shadow-[12px_12px_24px_#d1d5db,-12px_-12px_24px_#ffffff]";
  const neoButton = "rounded-xl bg-base-100 shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff] active:shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]";
  const neoInset = "rounded-xl bg-base-100 shadow-[inset_6px_6px_12px_#d1d5db,inset_-6px_-6px_12px_#ffffff]";
  const neoActive = "shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]";

  return (
    <div className="mt-16 min-h-screen px-4 sm:px-6 py-12 max-w-7xl mx-auto bg-base-100/50">
      {/* Asymmetrical Hero Section */}
      <motion.section
        className="relative mb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating back button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(authUser ? "/" : "/login")}
          className={`${neoButton} absolute -top-4 right-0 px-4 py-2 flex items-center gap-2 text-sm font-medium z-10`}
        >
          <ArrowLeft size={16} />
          Back to {authUser ? "Chats" : "Login"}
        </motion.button>

        {/* Hero with diagonal shape */}
        <div className="relative overflow-hidden">
          <div className={`${neoCard} pt-16 pb-24 px-8 sm:px-16`}>
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                  Reimagining <br />Digital Connections
                </h1>
                <p className="text-lg text-zinc-600 mt-6 max-w-md">
                  Yemmy Chats brings people together with secure, joyful communication designed for real life.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 rounded-xl bg-gradient-to-r from-primary to-secondary text-white px-8 py-3.5 font-bold shadow-lg flex items-center gap-2"
                  onClick={() => navigate("/signup")}
                >
                  Get Started <ChevronRight size={18} />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`${neoInset} p-2 rounded-2xl overflow-hidden`}
              >
                <img
                  src={chatboxImage}
                  alt="App Preview"
                  className="w-full h-auto rounded-xl transform rotate-1 hover:rotate-0 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Floating Features Grid */}
      <motion.section
        className="relative mb-28"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4/5 h-32 bg-primary/5 blur-3xl rounded-full"></div>

        <div className={`${neoCard} p-8 sm:p-12 relative overflow-hidden`}>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-xl"></div>

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Features That Matter</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureList.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`${neoCard} p-6 text-center transition-all duration-300`}
              >
                <div className={`${neoInset} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Diagonal Pricing Section */}
      <motion.section
        className="relative mb-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl transform rotate-1 blur-lg opacity-70"></div>
          <div className={`${neoCard} p-8 sm:p-12 relative`}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Simple Pricing</h2>
                <p className="text-zinc-600 max-w-lg">Choose the plan that fits your needs</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-medium shadow-md flex items-center gap-2">
                <Zap className="h-4 w-4" /> Coming Soon
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`${neoCard} p-6 relative overflow-hidden transition-all duration-300 ${plan.popular ? "ring-2 ring-primary/30" : ""
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.duration}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ₹{plan.price}
                    </span>
                    {plan.duration !== "1 Month" && (
                      <span className="text-sm text-zinc-500 block">
                        {Math.round(
                          (1 - plan.price / (2000 * parseInt(plan.duration.split(' ')[0]))) * 100
                        )}%
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                        <span className="text-zinc-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`${neoButton} w-full py-3 font-medium mt-auto`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curved Future Plans Section */}
      <motion.section
        className="relative mb-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl transform -rotate-1 blur-lg opacity-70"></div>
          <div className={`${neoCard} p-8 sm:p-12 relative overflow-hidden`}>
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-secondary/10 blur-xl"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">What's Coming Next</h2>
                <p className="text-zinc-600 mb-8 max-w-lg">
                  We're constantly innovating to bring you the best communication experience.
                </p>

                <ul className="space-y-4">
                  {futurePlans.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className={`${neoCard} px-5 py-4 flex items-center gap-4`}
                    >
                      <div className={`${neoInset} p-2 rounded-full`}>
                        <Brain className="text-secondary h-5 w-5" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`${neoInset} p-3 rounded-2xl overflow-hidden`}
              >
                <img
                  src={storeRoomImage}
                  alt="Future Preview"
                  className="w-full h-auto rounded-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Floating CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className={`${neoCard} p-12 text-center relative overflow-hidden`}>
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-primary/10 blur-xl"></div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10">
            Be part of the revolution in digital communication
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 font-bold shadow-lg text-lg"
              onClick={() => navigate("/signup")}
            >
              Create Free Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${neoButton} px-8 py-4 font-bold text-lg`}
              onClick={() => navigate("/login")}
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
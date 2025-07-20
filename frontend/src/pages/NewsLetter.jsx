import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { Mail, Send, Bell, Gift, ShieldCheck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frequency, setFrequency] = useState("weekly");
  const [interests, setInterests] = useState({
    updates: true,
    offers: false,
    security: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/newsletter/subscribe", { 
        email,
        frequency,
        interests
      });
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInterest = (interest) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto z-50 relative"
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        className="bg-gray-50 rounded-xl p-6 shadow-neumorph mb-6"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Bell className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Stay Updated With Our Newsletter
          </h3>
          <p className="mt-2 text-gray-500">
            Join {Math.floor(Math.random() * 5000) + 1000}+ subscribers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700 shadow-neumorph-inset"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-neumorph-inset">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-gray-700"
              >
                <option value="weekly">Weekly Digest</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly Roundup</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-neumorph-inset">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests (Select at least one)
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => toggleInterest("updates")}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all ${interests.updates ? 'bg-blue-50 text-primary' : 'hover:bg-gray-100'}`}
                >
                  <BadgeCheck className={`h-5 w-5 mr-2 ${interests.updates ? 'text-primary' : 'text-gray-400'}`} />
                  <span>Product Updates</span>
                  <div className={`ml-auto h-4 w-4 rounded-full border ${interests.updates ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                    {interests.updates && (
                      <svg className="h-full w-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleInterest("offers")}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all ${interests.offers ? 'bg-blue-50 text-primary' : 'hover:bg-gray-100'}`}
                >
                  <Gift className={`h-5 w-5 mr-2 ${interests.offers ? 'text-primary' : 'text-gray-400'}`} />
                  <span>Special Offers</span>
                  <div className={`ml-auto h-4 w-4 rounded-full border ${interests.offers ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                    {interests.offers && (
                      <svg className="h-full w-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => toggleInterest("security")}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all ${interests.security ? 'bg-blue-50 text-primary' : 'hover:bg-gray-100'}`}
                >
                  <ShieldCheck className={`h-5 w-5 mr-2 ${interests.security ? 'text-primary' : 'text-gray-400'}`} />
                  <span>Security Alerts</span>
                  <div className={`ml-auto h-4 w-4 rounded-full border ${interests.security ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                    {interests.security && (
                      <svg className="h-full w-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-primary text-white font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Subscribe Now
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <p className="text-xs text-gray-400">
              <ShieldCheck className="inline h-3 w-3 mr-1" />
              100% Secure
            </p>
            <p className="text-xs text-gray-400">
              <BadgeCheck className="inline h-3 w-3 mr-1" />
              No Spam
            </p>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400">
            By subscribing, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to receive updates.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Newsletter;
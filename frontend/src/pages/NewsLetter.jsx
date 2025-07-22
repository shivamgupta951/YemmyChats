import { useState } from "react";
import { Mail, Send, Bell, Gift, ShieldCheck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frequency, setFrequency] = useState("weekly");
  const [interests, setInterests] = useState({
    updates: true,
    offers: false,
    security: true,
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
        interests,
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

  const toggleInterest = (key) => {
    setInterests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 py-10"
    >
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Bell className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-center text-xl font-bold">
            Stay Updated With Our Newsletter
          </h2>
          <p className="text-center text-sm text-base-content/70 mb-4">
            Join {Math.floor(Math.random() * 5000) + 1000}+ subscribers
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <input
                type="email"
                className="grow"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <div>
              <label className="label font-semibold">Email Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="weekly">Weekly Digest</option>
                <option value="biweekly">Bi-Weekly</option>
                <option value="monthly">Monthly Roundup</option>
              </select>
            </div>

            <div>
              <label className="label font-semibold">Interests</label>
              <div className="flex flex-col gap-2">
                {[
                  { key: "updates", label: "Product Updates", icon: BadgeCheck },
                  { key: "offers", label: "Special Offers", icon: Gift },
                  { key: "security", label: "Security Alerts", icon: ShieldCheck },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => toggleInterest(key)}
                    className={`flex items-center p-3 rounded-lg justify-between border ${
                      interests[key]
                        ? "bg-primary/10 border-primary text-primary"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </div>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={interests[key]}
                      readOnly
                    />
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-4 border-t pt-4 text-center space-y-1 text-xs text-base-content/60">
            <p>
              <ShieldCheck className="inline w-3 h-3 mr-1" />
              100% Secure
            </p>
            <p>
              <BadgeCheck className="inline w-3 h-3 mr-1" />
              No Spam
            </p>
            <p>
              By subscribing, you agree to our{" "}
              <a className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Newsletter;

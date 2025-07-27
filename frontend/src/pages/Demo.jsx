import { motion } from "framer-motion";
import { Send, Check, Star, Zap, Shield, Layout } from "lucide-react";
import Img1 from "../assets/signup_image.png";

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast",
      description: "Optimized for performance with instant load times."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure by Design",
      description: "Enterprise-grade security with end-to-end encryption."
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Intuitive Interface",
      description: "Carefully crafted UX patterns and workflows."
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed our workflow completely. 300% productivity increase!",
      author: "Alex Johnson",
      role: "CTO at TechCorp",
      rating: 5
    },
    {
      quote: "The design is phenomenal. Our team adopted it with zero learning curve.",
      author: "Sarah Williams",
      role: "Product Lead",
      rating: 5
    },
    {
      quote: "Scales with our business while remaining simple. Worth every penny.",
      author: "Michael Chen",
      role: "Startup Founder",
      rating: 5
    }
  ];

  const benefits = [
    "24/7 customer support with real humans",
    "Regular feature updates based on feedback",
    "Transparent pricing with no hidden fees",
    "Enterprise-grade 99.99% uptime",
    "Seamless third-party integrations"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section - Full Width, No Side Margin, With Top Margin */}
      <section className="mt-10 w-full mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-100 rounded-3xl p-6 sm:p-8 shadow-neumorph mx-auto max-w-[1600px]"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text Content */}
            <div className="lg:w-1/2">
              <motion.span 
                className="inline-block px-4 py-2 bg-gray-100 rounded-xl shadow-neumorph-sm text-primary font-medium mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Version 3.0 Released
              </motion.span>

              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Build Better <br />
                <span className="text-primary">Digital Experiences</span>
              </motion.h1>

              <motion.p 
                className="text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Our platform empowers creators to build stunning digital products with unmatched speed and efficiency.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="px-6 py-3 rounded-xl shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-primary text-white font-medium flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Get Started
                </motion.button>

                <motion.button
                  className="px-6 py-3 rounded-xl shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-gray-100 text-gray-700 font-medium flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </motion.button>
              </motion.div>
            </div>

            {/* Image Section */}
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-neumorph-lg">
                <img 
                  src={Img1} 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover rounded-3xl"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Other Sections - Contained width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Features Section */}
        <section>
          <motion.div 
            className="bg-gray-100 rounded-3xl p-6 sm:p-8 shadow-neumorph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.span 
                className="inline-block px-4 py-2 bg-gray-100 rounded-xl shadow-neumorph-sm text-primary font-medium mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Features
              </motion.span>
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Designed for <span className="text-primary">Performance</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Every aspect optimized to help you work faster and smarter.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-100 rounded-2xl p-6 shadow-neumorph-md hover:shadow-neumorph-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 shadow-neumorph-sm flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section>
          <motion.div 
            className="bg-gray-100 rounded-3xl p-8 sm:p-12 shadow-neumorph text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Workflow?
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of satisfied users who have revolutionized their digital experience.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-6 py-3 rounded-xl shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-primary text-white font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2" />
                Start Free Trial
              </motion.button>
              
              <motion.button
                className="px-6 py-3 rounded-xl shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-inset transition-all duration-200 bg-gray-100 text-gray-700 font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Schedule Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section>
          <motion.div 
            className="bg-gray-100 rounded-3xl p-6 sm:p-8 shadow-neumorph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <motion.span 
                  className="inline-block px-4 py-2 bg-gray-100 rounded-xl shadow-neumorph-sm text-primary font-medium mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Why Choose Us
                </motion.span>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  The <span className="text-primary">Complete</span> Solution
                </motion.h2>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  We provide a complete ecosystem designed to help you succeed in the digital landscape.
                </motion.p>
                
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.div 
                className="lg:w-1/2 mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-neumorph-lg h-full">
                  <img 
                    src={Img1} 
                    alt="Benefits Illustration" 
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section>
          <motion.div 
            className="bg-gray-100 rounded-3xl p-6 sm:p-8 shadow-neumorph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.span 
                className="inline-block px-4 py-2 bg-gray-100 rounded-xl shadow-neumorph-sm text-primary font-medium mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Testimonials
              </motion.span>
              <motion.h2 
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Trusted by <span className="text-primary">Industry Leaders</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Don't just take our word for it - hear what our customers say.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-100 rounded-2xl p-6 shadow-neumorph-md hover:shadow-neumorph-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 shadow-neumorph-sm mr-4 overflow-hidden">
                      <img 
                        src={Img1} 
                        alt={testimonial.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                      <p className="text-primary text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA - Full width */}
        <section className="w-full">
          <div className="mb-12 bg-primary rounded-3xl p-8 sm:p-12 shadow-neumorph-lg text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p 
              className="text-indigo-100 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of businesses using our platform to transform their digital presence.
            </motion.p>
            <motion.button
              className="px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 bg-white text-primary font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free for 14 Days
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
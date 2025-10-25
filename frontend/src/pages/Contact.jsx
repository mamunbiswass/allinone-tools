import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import MetaManager from "../components/MetaManager";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <MetaManager
        title="Contact Us | QuickTools by QuickTools Pro"
        description="Have questions or feedback? Contact the QuickTools team. We're here to help you get the best experience from our free online utilities."
        keywords="contact quicktools, feedback, support, easy pick plaza"
        url="https://quicktoolspro.in/contact"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 flex justify-center items-center px-6 pt-24 pb-20">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 🌟 Page Header */}
          <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Have any questions or suggestions? We’d love to hear from you.            
          </p>

          {/* ✉️ Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all flex justify-center items-center gap-2"
            >
              <Send size={18} /> Send Message
            </button>
          </form>

          {/* ✅ Success Message */}
          {submitted && (
            <motion.p
              className="text-green-600 font-medium mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ Your message has been sent successfully!
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Target, Shield, Zap } from "lucide-react";
import MetaManager from "../components/MetaManager";

export default function About() {
  return (
    <>
      <MetaManager
        title="About QuickTools | Free Online Utilities Platform"
        description="Learn about QuickTools — a free online platform by QuickTools Pro offering smart utilities like QR generator, image compressor, age calculator, and PDF converter."
        keywords="about quicktools, free online tools, easy pick plaza, utilities, qr generator, image to pdf, compressor"
        url="https://quicktoolspro.in/about"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 flex justify-center items-center px-6 pt-24 pb-20">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 🌟 Title Section */}
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            About <span className="text-cyan-600">QuickTools</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Welcome to <b className="text-indigo-600">QuickTools</b> — your ultimate destination for fast, simple, and smart online utilities.  
            Whether you need to generate QR codes, compress images, convert photos to PDF, or calculate your age — we’ve got everything in one place ⚡
          </p>

          {/* 💡 Mission Section */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-2 mb-2">
              <Target className="text-indigo-600" /> Our Mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our mission is to make your digital life easier by providing powerful yet easy-to-use online tools —  
              all completely free, ad-light, and privacy-respecting 🔒
            </p>
          </motion.div>

          {/* ⚙️ Features Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-xl shadow-sm">
              <CheckCircle className="text-indigo-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Free & Easy to Use</h3>
                <p className="text-gray-600 text-sm">
                  All tools are completely free and designed for everyone — no signup required!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl shadow-sm">
              <Shield className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Secure & Private</h3>
                <p className="text-gray-600 text-sm">
                  We never store your data — all processing happens in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-cyan-50 p-4 rounded-xl shadow-sm">
              <Zap className="text-cyan-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Fast & Reliable</h3>
                <p className="text-gray-600 text-sm">
                  Lightning-fast performance optimized for mobile and desktop users.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl shadow-sm">
              <CheckCircle className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Always Improving</h3>
                <p className="text-gray-600 text-sm">
                  We continuously add new tools and improvements based on your feedback 💬
                </p>
              </div>
            </div>
          </motion.div>

          {/* 💬 Closing Section */}
          <motion.div
            className="border-t border-gray-200 pt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 leading-relaxed mb-3">
              Thank you for being part of the <b className="text-indigo-600">QuickTools</b> community.  
              We’re committed to building the most trusted and useful online tools hub for everyone 🌍
            </p>
            <p className="text-gray-500 text-sm">
              — The <span className="font-semibold text-indigo-600">QuickTools Pro</span> Team ❤️
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

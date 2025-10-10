import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Calendar, FileImage, ChevronRight } from "lucide-react";

const tools = [
  {
    name: "QR Code Generator",
    desc: "Create custom QR codes for your links, text, or contacts in seconds.",
    path: "/qr-generator",
    icon: <QrCode className="text-indigo-600" size={36} />,
  },
  {
    name: "Age Calculator",
    desc: "Quickly calculate your exact age in years, months, and days.",
    path: "/age-calculator",
    icon: <Calendar className="text-green-600" size={36} />,
  },
  {
    name: "Image to PDF Converter",
    desc: "Convert multiple images into one high-quality PDF file instantly.",
    path: "/img-to-pdf",
    icon: <FileImage className="text-pink-600" size={36} />,
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 min-h-screen pt-24 pb-20 overflow-x-hidden">
      {/* 🌟 Hero Section */}
      <motion.div
        className="text-center mb-14 px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
          🧰 All-in-One Tools
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Simplify your digital life with our collection of smart, free, and easy-to-use online tools.  
          No registration, no hassle — just productivity ⚡
        </p>
      </motion.div>

      {/* ⚙️ Tools Grid */}
      <motion.div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              {tool.icon}
              <h2 className="text-2xl font-semibold text-gray-800">{tool.name}</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{tool.desc}</p>
            <Link
              to={tool.path}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Open Tool <ChevronRight size={18} />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* 💡 About Section */}
      <motion.div
        className="mt-20 text-center max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-3">
          Why Use All-in-One Tools?
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We designed this platform to bring all useful tools under one roof —
          whether you need to generate QR codes, calculate your age, or convert images to PDF.
          It’s 100% free, fast, and built for everyone 🚀
        </p>
      </motion.div>

      
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  QrCode,
  Calendar,
  FileImage,
  Scale,
  ChevronRight,
  Info,
  Volume2,
  FileDown,
} from "lucide-react";
import MetaManager from "../components/MetaManager";

const tools = [
  {
    name: "QR Code Generator",
    desc: "Create custom QR codes for your links, text, or contacts in seconds.",
    path: "/qrgenerator",
    icon: <QrCode className="text-indigo-600" size={36} />,
  },
  {
    name: "Age Calculator",
    desc: "Quickly calculate your exact age in years, months, and days.",
    path: "/agecalculator",
    icon: <Calendar className="text-green-600" size={36} />,
  },
  {
    name: "Image to PDF Converter",
    desc: "Convert multiple images into one high-quality PDF file instantly.",
    path: "/imagetopdf",
    icon: <FileImage className="text-pink-600" size={36} />,
  },
  {
    name: "PDF to Image Converter",
    desc: "Turn your PDF pages into high-quality PNG or JPG images with one click — fast and secure.",
    path: "/pdftoimage",
    icon: <FileDown className="text-cyan-600" size={36} />,
    isNew: true,
  },
  {
    name: "Image Compressor & Resizer",
    desc: "Compress and resize images without losing quality. Preview before download!",
    path: "/imagecompressor",
    icon: <Scale className="text-orange-600" size={36} />,
  },
  {
    name: "Text to Speech (Bangla | Hindi | English)",
    desc: "Instantly convert your text into natural human-like voices. Listen or download MP3 easily.",
    path: "/texttospeech",
    icon: <Volume2 className="text-blue-600" size={36} />,
  },
];

export default function Home() {
  return (
    <>
      <MetaManager
        title="QuickTools by QuickTools Pro | Free Online Utilities"
        description="QuickTools by QuickTools Pro — a free online toolkit offering Text to Speech, Image Compression, QR Code Generation, Age Calculation, PDF to Image, and PDF Conversion. Fast, ad-free, and mobile friendly!"
        keywords="text to speech bangla, hindi, english, pdf to image, qr code generator, pdf converter, image compressor, quicktools pro"
        url="https://quicktoolspro.in/"
      />

      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 min-h-screen pt-24 pb-20 overflow-x-hidden">
        {/* 🌟 Hero Section */}
        <motion.div
          className="text-center mb-14 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">
            QuickTools — Free Online Utilities
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simplify your digital life with our collection of smart, free, and
            easy-to-use online tools. No registration, no hassle — just
            productivity ⚡
          </p>
        </motion.div>

        {/* ⚙️ Tools Grid */}
        <motion.div
          className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {tool.isNew && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full animate-pulse">
                  NEW 🔥
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                {tool.icon}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {tool.name}
                </h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tool.desc}
              </p>
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
            Why Use QuickTools?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We designed this platform to bring all useful tools under one roof —
            whether you need to generate QR codes, compress images, convert
            photos to PDF, or listen to your text in natural voice. It’s 100%
            free, lightning-fast, and built for everyone 🚀
          </p>
        </motion.div>

        {/* 🌍 Info Section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
            <Info className="text-indigo-600" /> About QuickTools Pro
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Tools like{" "}
            <Link to="/qrgenerator" className="text-indigo-600 font-semibold">
              QR Generator
            </Link>
            ,{" "}
            <Link to="/texttospeech" className="text-indigo-600 font-semibold">
              Text to Speech
            </Link>
            ,{" "}
            <Link to="/pdftoimage" className="text-indigo-600 font-semibold">
              PDF to Image Converter
            </Link>
            ,{" "}
            <Link to="/imagecompressor" className="text-indigo-600 font-semibold">
              Image Compressor
            </Link>
            ,{" "}
            <Link to="/agecalculator" className="text-indigo-600 font-semibold">
              Age Calculator
            </Link>{" "}
            and{" "}
            <Link to="/imagetopdf" className="text-indigo-600 font-semibold">
              Image to PDF Converter
            </Link>{" "}
            are constantly updated to provide the best experience. ⚙️
          </p>
        </motion.div>
      </div>
    </>
  );
}

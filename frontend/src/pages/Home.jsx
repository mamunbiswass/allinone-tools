import React from "react";
import { Link } from "react-router-dom";

const tools = [
  {
    name: "QR Code Generator",
    desc: "Generate QR codes easily from any text or link.",
    path: "/qr-generator",
  },
  {
    name: "Age Calculator",
    desc: "Quickly calculate your age in years, months, and days.",
    path: "/age-calculator",
  },
  {
    name: "Image to PDF Converter",
    desc: "Convert your text or notes into downloadable PDF files.",
    path: "/img-to-pdf",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen pt-24 pb-10 overflow-x-hidden">
      {/* Header Section */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 drop-shadow-sm">
          🧰 Welcome to All-in-One Tools
        </h1>
        <p className="text-gray-600 text-lg">
          Simplify your daily tasks with our smart utilities.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
              {tool.name}
            </h2>
            <p className="text-gray-600 mb-5">{tool.desc}</p>
            <Link
              to={tool.path}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Open Tool
            </Link>
          </div>
        ))}
      </div>     
    </div>
  );
}

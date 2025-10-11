import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100 flex justify-center items-center p-6 pt-24">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">About Us</h1>
        <p className="text-gray-600 mb-6">
          Welcome to <span className="font-semibold text-indigo-600">All-in-One Tools</span> — your one-stop solution for quick and easy online utilities.  
          We provide free tools like QR Code Generator, Age Calculator, and Image to PDF Converter — all designed to make your daily digital tasks simpler.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">💡 Our Mission</h2>
        <p className="text-gray-600 mb-4">
          To empower everyone with simple, effective, and ad-free online tools that save time and improve productivity.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">⚙️ What We Offer</h2>
        <ul className="text-gray-700 list-disc list-inside text-left inline-block mb-4">
          <li>Free and easy-to-use web tools</li>
          <li>No signup required</li>
          <li>Secure and privacy-focused experience</li>
          <li>Fast performance and mobile friendly</li>
        </ul>

        <p className="text-gray-600 mt-4">
          We are constantly working to add new tools and enhance your experience.  
          Stay connected and make your digital life easier with us!
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Thank you for visiting <b>All-in-One Tools</b> ❤️
        </p>
      </div>
    </div>
  );
}

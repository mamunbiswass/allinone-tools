import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-6 mt-0 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 👨‍💻 Left Section - Developer Info */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-white">QuickTools</span> | Developed by{" "}
            <a
              href="https://www.linkedin.com/in/mamunbiswas/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              MamunTech 💪
            </a>
          </p>          
        </div>

        {/* 🔗 Right Section - Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <Link
            to="/"
            className="hover:text-indigo-400 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-400 transition"
          >
            Contact
          </Link>
          <Link
            to="/privacypolicy"
            className="hover:text-indigo-400 transition"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

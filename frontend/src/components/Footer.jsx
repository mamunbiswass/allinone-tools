import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 👨‍💻 Left Section - Developer Info */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">QuickTools</span> | Developed by{" "}
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

        {/* 🌐 Social Icons */}
      <div className="flex justify-center gap-6 text-gray-400">
        <a
          href="https://facebook.com/quicktoolspro"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-500 transition transform hover:scale-110"
        >
          <Facebook size={20} />
        </a>
        {/* <a
          href="https://linkedin.com/in/quicktoolspro/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-400 transition transform hover:scale-110"
        >
          <Linkedin size={20} />
        </a> */}
       
        <a
          href="https://youtube.com/@quicktoolspro"
          target="_blank"
          rel="noreferrer"
          className="hover:text-red-500 transition transform hover:scale-110"
        >
          <Youtube size={20} />
        </a>
        <a
          href="mailto:quicktoolspro@gmail.com"
          className="hover:text-yellow-400 transition transform hover:scale-110"
        >
          <Mail size={20} />
        </a>
      </div>

        {/* 🔗 Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
          <Link to="/privacypolicy" className="hover:text-indigo-400 transition">Privacy Policy</Link>
        </div>
      </div>

      

     
    </footer>
  );
}

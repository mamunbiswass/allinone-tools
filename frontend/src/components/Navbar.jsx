import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            🧰 All-in-One Tools
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/qr-generator" className="hover:text-gray-200 transition">
              QR Generator
            </Link>
            <Link to="/age-calculator" className="hover:text-gray-200 transition">
              Age Calculator
            </Link>
            <Link to="/img-to-pdf" className="hover:text-gray-200 transition">
              Image to PDF
            </Link>
            <Link to="/image-resizer" className="hover:text-gray-200 transition">
              Image Compressor
            </Link>

            {/* 🔒 Login/Signup hidden temporarily */}
            {/* <Link to="/login" ...>Login</Link>
            <Link to="/signup" ...>Signup</Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-3 space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            Home
          </Link>
          <Link to="/qr-generator" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            QR Generator
          </Link>
          <Link to="/age-calculator" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            Age Calculator
          </Link>
          <Link to="/img-to-pdf" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            Image to PDF
          </Link>
        </div>
      )}
    </nav>
  );
}

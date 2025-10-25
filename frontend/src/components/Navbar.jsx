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
          <div className="logo">
            <Link className="flex items-center gap-2" to="/">
              <img src="/logo.svg" alt="QuickTools Logo" className="w-8 h-8" />       
 
            <h1 className="text-xl font-bold text-white tracking-wide">QuickTools</h1>
             </Link>
          </div>         

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/qrgenerator" className="hover:text-gray-200 transition">
              QR & Barcode Generator
            </Link>
            <Link to="/agecalculator" className="hover:text-gray-200 transition">
              Age Calculator
            </Link>
            <Link to="/imagetopdf" className="hover:text-gray-200 transition">
              Image to PDF
            </Link>
            <Link to="/pdftoimage" className="hover:text-gray-200 transition">
              PDF to Image
            </Link>            
            <Link to="/imagecompressor" className="hover:text-gray-200 transition">
              Image Compressor
            </Link>
            <Link to="/texttospeech" className="hover:text-gray-200 transition">Text To Speech</Link>

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
          <Link to="/qrgenerator" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            QR Generator
          </Link>
          <Link to="/agecalculator" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            Age Calculator
          </Link>
          <Link to="/imagetopdf" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            Image to PDF
          </Link>
           <Link to="/pdftoimage" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
            PDF to Image
          </Link>
          
          <Link to="/imagecompressor" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">
              Image Compressor
            </Link>
          <Link to="/texttospeech" onClick={() => setMenuOpen(false)} className="block hover:text-gray-200">Text To Speech</Link>
        </div>
      )}
    </nav>
  );
}

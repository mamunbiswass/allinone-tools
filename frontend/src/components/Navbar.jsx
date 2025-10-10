import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken"); // 👈 User logged in কিনা চেক করবে
  const role = localStorage.getItem("userRole");
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    alert("Logged out successfully ✅");
    navigate("/");
  };

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
            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
            <Link to="/qr-generator" className="hover:text-gray-200 transition">QR Generator</Link>
            <Link to="/age-calculator" className="hover:text-gray-200 transition">Age Calculator</Link>
            <Link to="/img-to-pdf" className="hover:text-gray-200 transition">Image to PDF</Link>

            {/* Auth Links */}
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 bg-white text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-100 transition"
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  <UserPlus size={16} /> Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
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
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/qr-generator"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            QR Generator
          </Link>
          <Link
            to="/age-calculator"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            Age Calculator
          </Link>
          <Link
            to="/image-to-pdf"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-200"
          >
            Image to PDF
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-white text-indigo-600 px-3 py-2 rounded-lg"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-green-500 px-3 py-2 rounded-lg"
              >
                <UserPlus size={16} /> Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg w-full text-left"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // lucide-react icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "QR Generator", path: "/qr-generator" },
    { name: "Age Calculator", path: "/age-calculator" },
    { name: "Text → PDF", path: "/text-to-pdf" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md fixed w-full top-0 z-50 ">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold tracking-wide">⚙️ All-In-One Tools</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="hover:text-yellow-300 transition duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white transition-all duration-300">
          <ul className="flex flex-col space-y-3 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 rounded hover:bg-indigo-600 transition duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

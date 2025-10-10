import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4">
      <p>
        © {new Date().getFullYear()} All-in-One Tools | Developed by{" "}
        <span className="text-indigo-400 font-semibold">MamunTech</span> 💪
      </p>
    </footer>
  );
}

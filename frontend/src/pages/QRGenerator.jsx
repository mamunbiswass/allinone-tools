import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy } from "lucide-react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef();

  // ✅ Copy text
  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("✅ Text copied to clipboard!");
  };

  // ✅ Download QR code
  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 p-4">
      {/* Main card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform hover:scale-[1.02] transition">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🔳 QR Code Generator
        </h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none p-3 rounded-md w-full mb-5 text-gray-800"
        />

        {/* QR Display */}
        <div className="flex flex-col items-center space-y-4" ref={qrRef}>
          {text ? (
            <>
              <div className="p-4 bg-white rounded-xl shadow-inner">
                <QRCodeCanvas value={text} size={200} />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-all"
                >
                  <Copy size={18} /> Copy Text
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-all"
                >
                  <Download size={18} /> Download
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-center">
              Type something to generate QR Code...
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm text-center">
        Developed by <span className="text-indigo-600 font-semibold">Boss Mamun 💪</span>
      </footer>
    </div>
  );
}

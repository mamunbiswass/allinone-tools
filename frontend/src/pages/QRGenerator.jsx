import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Copy, Link, User, Mail, Phone, FileText, Info, Image } from "lucide-react";

export default function QRGenerator() {
  const [type, setType] = useState("url");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const qrRef = useRef();

  // 🧾 Validation function
  const validateInput = () => {
    if (!input.trim()) return "⚠️ Please enter a value.";

    switch (type) {
      case "url":
        if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(input))
          return "❌ Please enter a valid URL (e.g. https://example.com)";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input))
          return "❌ Please enter a valid email address.";
        break;
      case "phone":
        if (!/^[\d+\-\s]{6,15}$/.test(input))
          return "❌ Please enter a valid phone number.";
        break;
      default:
        break;
    }
    return "";
  };

  const generateValue = () => {
    switch (type) {
      case "email": return `mailto:${input}`;
      case "phone": return `tel:${input}`;
      case "url": return input.startsWith("http") ? input : `https://${input}`;
      default: return input;
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    alert("✅ Text copied to clipboard!");
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("⚠️ Please upload a valid image file!");
    }
  };

  const handleGenerate = () => {
    const err = validateInput();
    if (err) setError(err);
    else setError("");
  };

  const tabs = [
    { id: "url", label: "URL", icon: <Link size={18} /> },
    { id: "contact", label: "Contact", icon: <User size={18} /> },
    { id: "text", label: "Text", icon: <FileText size={18} /> },
    { id: "email", label: "Email", icon: <Mail size={18} /> },
    { id: "phone", label: "Phone", icon: <Phone size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-indigo-50 to-cyan-100 p-6 pt-20">
      {/* Main Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transform hover:scale-[1.02] transition-all">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🎨 Premium QR Code Generator
        </h1>

        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-200 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setType(tab.id); setInput(""); setError(""); }}
              className={`flex flex-col items-center text-sm font-medium p-2 rounded-md transition ${
                type === tab.id
                  ? "text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-500"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder={
            type === "url"
              ? "https://example.com"
              : type === "email"
              ? "example@mail.com"
              : type === "phone"
              ? "+91 9876543210"
              : "Enter your text or info"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 outline-none mb-2 focus:ring-2 focus:ring-indigo-400"
        />

        {/* Validation Error */}
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Color Pickers */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">🎨 Foreground:</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">🖼️ Background:</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="flex flex-col items-start mb-4">
          <label className="text-sm font-medium text-gray-600 mb-1">📸 Add Logo (optional):</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logo && (
            <img src={logo} alt="logo" className="mt-2 w-16 h-16 object-cover rounded-md border" />
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition mb-5"
        >
          Generate QR Code
        </button>

        {/* QR Preview */}
        <div className="flex flex-col items-center space-y-4" ref={qrRef}>
          {input && !error ? (
            <>
              <div className="relative bg-white p-4 rounded-xl shadow-inner">
                <QRCodeCanvas
                  value={generateValue()}
                  size={200}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  imageSettings={
                    logo
                      ? { src: logo, height: 40, width: 40, excavate: true }
                      : undefined
                  }
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCopy}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Copy size={16} /> Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Enter valid data and click Generate.
            </p>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-6 max-w-3xl text-gray-700">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
          <Info size={22} /> How to Create a Free QR Code
        </h2>
        <p className="mb-3">
          You can create colorful and professional QR codes easily in seconds.
          Choose what type of QR you need — URL, Contact, Text, Email, or Phone — 
          then customize colors and add your logo for branding.
        </p>
        <ol className="list-decimal pl-6 space-y-1 mb-3">
          <li>Select your QR type (URL, Text, etc.)</li>
          <li>Enter valid data and customize colors.</li>
          <li>Click “Generate” and download your QR instantly.</li>
        </ol>
        <p>
          This free QR Code generator is ideal for websites, business cards,
          or digital promotions. No registration required!
        </p>
      </div>     
    </div>
  );
}

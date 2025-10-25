import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import {
  Download,
  Copy,
  QrCode,
  ScanLine,
  Link,
  User,
  Mail,
  Phone,
  FileText,
  Wifi,
  MessageCircle,
  IndianRupee,
} from "lucide-react";
import { toast } from "react-toastify";
import MetaManager from "../components/MetaManager";
import QRHelpSection from "../components/QRHelpSection";

export default function QRGenerator() {
  const [mainTab, setMainTab] = useState("qr");
  const [qrType, setQrType] = useState("vcard");
  const [input, setInput] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const qrRef = useRef();

  // 🧩 State for vCard
  const [vcard, setVcard] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    fax: "",
    email: "",
    company: "",
    job: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    website: "",
  });

  // 🧩 State for UPI
  const [upi, setUpi] = useState({
    upiId: "",
    name: "",
    amount: "",
  });

  // ✅ Generate QR Value
  const generateValue = () => {
    switch (qrType) {
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
N:${vcard.lastName};${vcard.firstName};;;
FN:${vcard.firstName} ${vcard.lastName}
ORG:${vcard.company}
TITLE:${vcard.job}
TEL;TYPE=CELL:${vcard.mobile}
TEL;TYPE=FAX:${vcard.fax}
EMAIL;TYPE=INTERNET:${vcard.email}
ADR;TYPE=WORK;LABEL="${vcard.street}, ${vcard.city}, ${vcard.state}, ${vcard.zip}, ${vcard.country}":;;${vcard.street};${vcard.city};${vcard.state};${vcard.zip};${vcard.country}
URL:${vcard.website}
END:VCARD`;

      case "upi":
        const { upiId, name, amount } = upi;
        if (!upiId) return "";
        return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
          name
        )}&am=${amount}&cu=INR`;

      case "email":
        return `mailto:${input}`;
      case "phone":
        return `tel:${input}`;
      case "sms":
        return `sms:${input}`;
      case "wifi":
        return `WIFI:${input}`;
      case "url":
        return input.startsWith("http") ? input : `https://${input}`;
      default:
        return input;
    }
  };

  // ✅ Download QR / Barcode
  const handleDownload = () => {
    if (mainTab === "barcode") {
      const svg = qrRef.current.querySelector("svg");
      if (!svg) return toast.warning("⚠️ Please generate a barcode first!");
      const canvas = document.createElement("canvas");
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        const link = document.createElement("a");
        link.download = `barcode-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        toast.success("📦 Barcode downloaded successfully!");
      };
      img.src = url;
    } else {
      const canvas = qrRef.current.querySelector("canvas");
      if (!canvas) return toast.warning("⚠️ Please generate a QR code first!");
      const link = document.createElement("a");
      link.download = `${qrType}-qr-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("✅ QR Code downloaded successfully!");
    }
  };

  // ✅ Copy Data
const handleCopy = () => {
  const data = mainTab === "barcode" ? input : generateValue();

  if (!data) {
    toast.warning("⚠️ Please generate a code first!");
    return;
  }

  navigator.clipboard.writeText(data).then(() => {
    if (mainTab === "barcode") {
      toast.success("✅ Barcode data copied successfully!");
    } else if (qrType === "url") {
      toast.success("🔗 QR link copied successfully!");
    } else if (qrType === "upi") {
      toast.success("💰 UPI payment link copied successfully!");
    } else {
      toast.success("📋 QR data copied successfully!");
    }
  });
};

  // ✅ Logo Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
    toast.success("🖼️ Logo added successfully!");
  };

  // Tabs
  const qrTabs = [
    { id: "vcard", label: "vCard", icon: <User size={16} /> },
    { id: "url", label: "URL", icon: <Link size={16} /> },
    { id: "text", label: "Text", icon: <FileText size={16} /> },
    { id: "email", label: "Email", icon: <Mail size={16} /> },
    { id: "phone", label: "Phone", icon: <Phone size={16} /> },
    { id: "sms", label: "SMS", icon: <MessageCircle size={16} /> },
    { id: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
    { id: "upi", label: "UPI Payment", icon: <IndianRupee size={16} /> },
  ];

  return (
    <>
      <MetaManager
        title="QR & Barcode Generator | QuickTools Pro"
        description="Generate QR codes for contacts, links, WiFi, and even UPI payments. Also create Barcodes easily — free and secure by QuickTools Pro."
        keywords="QR generator, UPI QR, Barcode generator, vCard QR, WiFi QR, QuickTools Pro"
        url="https://quicktoolspro.in/qrgenerator"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-cyan-100 p-6 pt-24">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
            🎨 QR & Barcode Generator
          </h1>

          {/* Main Tabs */}
          <div className="flex justify-center gap-6 border-b pb-3 mb-8">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${
                mainTab === "qr"
                  ? "text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setMainTab("qr")}
            >
              <QrCode size={18} /> QR Code
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${
                mainTab === "barcode"
                  ? "text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setMainTab("barcode")}
            >
              <ScanLine size={18} /> Barcode
            </button>
          </div>

          {/* ---------------- QR Section ---------------- */}
          {mainTab === "qr" && (
            <>
              <div className="flex flex-wrap justify-center border-b pb-3 mb-6 gap-3">
                {qrTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setQrType(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md font-medium transition-all ${
                      qrType === tab.id
                        ? "text-indigo-700 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* QR Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  {qrType === "vcard" ? (
                    <>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={vcard.firstName}
                            onChange={(e) =>
                              setVcard({ ...vcard, firstName: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={vcard.lastName}
                            onChange={(e) =>
                              setVcard({ ...vcard, lastName: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                        </div>

                        <input
                          type="email"
                          placeholder="Email"
                          value={vcard.email}
                          onChange={(e) =>
                            setVcard({ ...vcard, email: e.target.value })
                          }
                          className="border p-2 rounded-md w-full"
                        />

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Mobile"
                            value={vcard.mobile}
                            onChange={(e) =>
                              setVcard({ ...vcard, mobile: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="text"
                            placeholder="Fax"
                            value={vcard.fax}
                            onChange={(e) =>
                              setVcard({ ...vcard, fax: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Company"
                          value={vcard.company}
                          onChange={(e) =>
                            setVcard({ ...vcard, company: e.target.value })
                          }
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={vcard.job}
                          onChange={(e) =>
                            setVcard({ ...vcard, job: e.target.value })
                          }
                          className="border p-2 rounded-md w-full"
                        />

                        <input
                          type="text"
                          placeholder="Street Address"
                          value={vcard.street}
                          onChange={(e) =>
                            setVcard({ ...vcard, street: e.target.value })
                          }
                          className="border p-2 rounded-md w-full"
                        />

                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            value={vcard.city}
                            onChange={(e) =>
                              setVcard({ ...vcard, city: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={vcard.state}
                            onChange={(e) =>
                              setVcard({ ...vcard, state: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="text"
                            placeholder="ZIP"
                            value={vcard.zip}
                            onChange={(e) =>
                              setVcard({ ...vcard, zip: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Country"
                            value={vcard.country}
                            onChange={(e) =>
                              setVcard({ ...vcard, country: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="text"
                            placeholder="Website"
                            value={vcard.website}
                            onChange={(e) =>
                              setVcard({ ...vcard, website: e.target.value })
                            }
                            className="border p-2 rounded-md"
                          />
                        </div>
                      </div>
                    </>
                  ) : qrType === "upi" ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. mamun@oksbi)"
                        value={upi.upiId}
                        onChange={(e) =>
                          setUpi({ ...upi, upiId: e.target.value })
                        }
                        className="border p-2 rounded-md w-full mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Receiver Name"
                        value={upi.name}
                        onChange={(e) =>
                          setUpi({ ...upi, name: e.target.value })
                        }
                        className="border p-2 rounded-md w-full mb-2"
                      />
                      <input
                        type="number"
                        placeholder="Amount (optional)"
                        value={upi.amount}
                        onChange={(e) =>
                          setUpi({ ...upi, amount: e.target.value })
                        }
                        className="border p-2 rounded-md w-full"
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder={`Enter ${qrType} info`}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="border p-2 rounded-md w-full"
                    />
                  )}

                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <label className="text-sm text-gray-600">🎨 Foreground:</label>
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">🖼️ Background:</label>
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="text-sm font-medium text-gray-600">
                      📸 Add Logo (optional):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>

                {/* QR Preview */}
                <div
                  ref={qrRef}
                  className="flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-inner p-6"
                >
                  <QRCodeCanvas
                    value={generateValue()}
                    size={220}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    imageSettings={
                      logo
                        ? { src: logo, height: 50, width: 50, excavate: true }
                        : undefined
                    }
                  />
                  <div className="flex gap-4 mt-5">
                    <button
                      onClick={handleCopy}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Copy size={16} /> Copy Link
                    </button>
                    <button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Download size={16} /> Download
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ---------------- Barcode Section ---------------- */}
          {mainTab === "barcode" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <input
                  type="text"
                  placeholder="Enter Barcode Value (e.g., 8901234567890)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="border p-2 rounded-md w-full mb-3"
                />
                <select
                  value={barcodeType}
                  onChange={(e) => setBarcodeType(e.target.value)}
                  className="border p-2 rounded-md w-full"
                >
                  <option value="CODE128">Code 128</option>
                  <option value="EAN13">EAN-13</option>
                  <option value="UPC">UPC</option>
                  <option value="CODE39">Code 39</option>
                </select>
              </div>

              <div
                ref={qrRef}
                className="flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-inner p-6"
              >
                {input ? (
                  <Barcode
                    value={input}
                    format={barcodeType}
                    width={2}
                    height={100}
                    displayValue={true}
                    background={bgColor}
                    lineColor={fgColor}
                  />
                ) : (
                  <p className="text-gray-400 text-sm">
                    Enter a value to generate barcode
                  </p>
                )}

                <div className="flex gap-4 mt-5">
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
              </div>
            </div>
          )}
        </div>

        <QRHelpSection />
      </div>
    </>
  );
}

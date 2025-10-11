import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { Image, Download, Trash2, FileImage, UploadCloud, Scale, HelpCircle, Lightbulb } from "lucide-react";
import MetaManager from "../components/MetaManager";

export default function ImageToPdf() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fitMode, setFitMode] = useState("actual");
  const dropRef = useRef(null);

  // 📂 Handle Image Upload
  const handleImageUpload = (files) => {
    const validImages = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (validImages.length === 0) {
      alert("⚠️ Please select valid image files!");
      return;
    }

    const readers = validImages.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new window.Image();
            img.src = reader.result;
            img.onload = () => {
              resolve({
                dataUrl: reader.result,
                width: img.width,
                height: img.height,
              });
            };
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((results) => setImages((prev) => [...prev, ...results]));
  };

  // 🖱️ Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  // 🧾 Convert Images → PDF
  const convertToPDF = () => {
    if (images.length === 0) {
      alert("⚠️ Please upload at least one image!");
      return;
    }
    setLoading(true);

    if (fitMode === "actual") {
      const first = images[0];
      const pdf = new jsPDF({
        orientation: first.width > first.height ? "l" : "p",
        unit: "px",
        format: [first.width, first.height],
      });

      images.forEach((img, index) => {
        if (index > 0) pdf.addPage([img.width, img.height], img.width > img.height ? "l" : "p");
        pdf.addImage(img.dataUrl, "JPEG", 0, 0, img.width, img.height);
      });
      pdf.save("actual-size-images.pdf");
    } else {
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      images.forEach((img, index) => {
        if (index > 0) pdf.addPage();

        const imgAspect = img.width / img.height;
        const pageAspect = pageWidth / pageHeight;
        let renderWidth, renderHeight;

        if (imgAspect > pageAspect) {
          renderWidth = pageWidth - 20;
          renderHeight = renderWidth / imgAspect;
        } else {
          renderHeight = pageHeight - 20;
          renderWidth = renderHeight * imgAspect;
        }

        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;
        pdf.addImage(img.dataUrl, "JPEG", x, y, renderWidth, renderHeight);
      });

      pdf.save("fit-to-a4-images.pdf");
    }

    setLoading(false);
  };

  // ♻️ Reset
  const resetAll = () => setImages([]);

  return (
    <>
      <MetaManager
        title="Free Image to PDF Converter | All-in-One Tools"
        description="Convert your images into high-quality PDF files instantly. Free online image to PDF converter — no signup required!"
        keywords="image to pdf, convert image to pdf, free pdf tool, photo to pdf"
        url="https://yourdomain.com/img-to-pdf"
      />

      <div className="min-h-screen pt-20 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-100 p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg transform hover:scale-[1.02] transition-all">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2 flex justify-center items-center gap-2">
            <FileImage size={28} /> Image to PDF Converter
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Convert your images to PDF — choose between <strong>Actual Size</strong> or <strong>Fit to A4</strong> 📄
          </p>

          {/* 🔘 Toggle Buttons */}
          <div className="flex justify-center mb-6 gap-4">
            <button
              onClick={() => setFitMode("actual")}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                fitMode === "actual"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Scale size={18} /> Actual Size
            </button>
            <button
              onClick={() => setFitMode("fit")}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                fitMode === "fit"
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Scale size={18} /> Fit to A4
            </button>
          </div>

          {/* Upload Area */}
          <div
            ref={dropRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 mb-4 transition-all duration-300 ${
              isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <UploadCloud size={36} className={`mb-2 ${isDragging ? "text-blue-500" : "text-gray-500"}`} />
            <p className="text-gray-600 text-sm text-center mb-2">
              {isDragging ? "Drop images here..." : "Drag & drop your images or click below"}
            </p>
            <label className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-blue-600">
              <Image size={24} />
              <span className="mt-1 text-sm font-medium">Choose Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </label>
          </div>

          {/* Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img.dataUrl} alt={`preview-${index}`} className="w-full h-32 object-cover rounded-md shadow" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={convertToPDF}
              disabled={loading}
              className={`flex items-center gap-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-5 py-2 rounded-lg shadow-md transition-all`}
            >
              <Download size={18} /> {loading ? "Processing..." : "Download PDF"}
            </button>
            <button
              onClick={resetAll}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 📘 How It Works */}
        <div className="max-w-2xl bg-white mt-10 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <HelpCircle /> How It Works
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Upload one or more images (JPG, PNG supported).</li>
            <li>Select your preferred layout — Actual Size or Fit to A4.</li>
            <li>Click <b>Download PDF</b> and save it to your device instantly.</li>
          </ul>
        </div>

        {/* 💡 Tips */}
        <div className="max-w-2xl bg-white mt-6 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <Lightbulb /> Pro Tips
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Combine multiple images into a single document easily.</li>
            <li>All processing happens on your browser — 100% secure.</li>
            <li>No image data is uploaded to any server.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

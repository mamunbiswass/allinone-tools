import React, { useState } from "react";
import jsPDF from "jspdf";
import { FileText, Image, Download, Trash2 } from "lucide-react";

export default function TextToPdf() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // 🧾 Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("⚠️ Please select a valid image file!");
    }
  };

  // 🧾 Convert to PDF
  const downloadPDF = () => {
    if (!text && !image) {
      alert("⚠️ Please enter text or upload an image!");
      return;
    }

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    let yPosition = 20;

    if (text) {
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 15, yPosition);
      yPosition += splitText.length * 7;
    }

    if (image) {
      const imgWidth = 180;
      const imgHeight = 180 * (9 / 16);
      doc.addImage(image, "JPEG", 15, yPosition + 10, imgWidth, imgHeight);
    }

    doc.save("document.pdf");
  };

  // ♻️ Reset All
  const resetAll = () => {
    setText("");
    setImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-blue-50 to-cyan-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform hover:scale-[1.02] transition-all">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2 flex justify-center items-center gap-2">
          <FileText size={26} /> Text & Image to PDF
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Convert your notes or image into a downloadable PDF instantly 📄
        </p>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="✍️ Write or paste your text here..."
          className="border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-md w-full p-3 h-40 outline-none mb-4"
        />

        {/* Image Upload */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
          {!image ? (
            <>
              <label className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-green-600">
                <Image size={24} />
                <span className="mt-1 text-sm">Upload Image (optional)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded"
                className="w-40 h-40 object-cover rounded-md shadow"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            <Download size={18} /> Download PDF
          </button>
          <button
            onClick={resetAll}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm text-center">
        Developed by <span className="text-green-600 font-semibold">Boss Mamun 💪</span>
      </footer>
    </div>
  );
}

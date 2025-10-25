import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, Download, Image as ImageIcon, Info, FolderDown } from "lucide-react";
import { toast } from "react-toastify";
import MetaManager from "../components/MetaManager";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]);
  const [format, setFormat] = useState("png");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 📂 Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setImages([]);
      toast.success("✅ PDF selected successfully!");
    } else {
      toast.error("⚠️ Please upload a valid PDF file!");
    }
  };

  // 🔄 Convert PDF → Image(s)
  const convertPdfToImages = async () => {
    if (!pdfFile) return toast.warn("Please upload a PDF first!");

    setLoading(true);
    setProgress(0);
    toast.info("⏳ Converting... Please wait.");

    try {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const imageList = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: ctx, viewport }).promise;

          const dataUrl = canvas.toDataURL(`image/${format}`);
          imageList.push(dataUrl);

          // 📊 Progress update
          setProgress(Math.round((i / pdf.numPages) * 100));
        }

        setImages(imageList);
        setLoading(false);
        toast.success("🎉 PDF converted successfully!");
      };
      fileReader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Conversion failed!");
      setLoading(false);
    }
  };

  // 💾 Download Single Image
  const handleDownload = (imgUrl, index) => {
    const byteString = atob(imgUrl.split(",")[1]);
    const mimeType = imgUrl.split(",")[0].match(/:(.*?);/)[1];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: mimeType });
    saveAs(blob, `page-${index + 1}.${format}`);
    toast.success(`📥 Page ${index + 1} downloaded`);
  };

  // 📦 Download All Images as ZIP
  const handleDownloadAll = async () => {
    if (!images.length) return toast.warn("No images to download!");
    toast.info("📦 Preparing ZIP... Please wait.");

    const zip = new JSZip();
    images.forEach((img, i) => {
      const base64Data = img.split(",")[1];
      zip.file(`page-${i + 1}.${format}`, base64Data, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `pdf-images-${Date.now()}.zip`);
    toast.success("✅ ZIP file downloaded!");
  };

  return (
    <>
      <MetaManager
        title="PDF to Image Converter | QuickTools Pro"
        description="Convert your PDF to high-quality PNG or JPG images instantly. Free, fast, and secure PDF converter online."
        keywords="pdf to image, convert pdf to png, convert pdf to jpg, free online pdf tools, quicktools pro"
        url="https://quicktoolspro.in/pdf-to-image"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 pt-24 pb-20 px-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-3">
            🖼️ PDF to Image Converter
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Convert your PDF into beautiful high-resolution <b>PNG</b> or <b>JPG</b> images — right from your browser.
          </p>

          {/* File Upload */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <label
              htmlFor="pdfUpload"
              className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-all"
            >
              <Upload size={18} /> Choose PDF File
            </label>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">Output Format:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
              </select>
            </div>

            <button
              onClick={convertPdfToImages}
              disabled={loading}
              className={`mt-3 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <ImageIcon size={18} />
              {loading ? "Converting..." : "Convert to Images"}
            </button>
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
              <div
                className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-4 mb-8 text-sm flex gap-2">
            <Info className="mt-0.5" size={18} />
            <p>
              <b>Tip:</b> For better clarity, choose PNG. For smaller file size, use JPG.  
              You can also download all converted pages as a single ZIP file.
            </p>
          </div>

          {/* Converted Images */}
          {images.length > 0 && (
            <>
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-all"
                >
                  <FolderDown size={18} /> Download All as ZIP
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-lg shadow-md p-4 text-center"
                  >
                    <img
                      src={img}
                      alt={`Page ${i + 1}`}
                      className="w-full h-auto rounded-md mb-3"
                    />
                    <button
                      onClick={() => handleDownload(img, i)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                    >
                      <Download size={16} /> Download Page {i + 1}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {!images.length && !loading && (
            <p className="text-center text-gray-500 mt-10">
              📂 Upload your PDF and click “Convert to Images” to begin.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

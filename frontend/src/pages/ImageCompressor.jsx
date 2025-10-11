import React, { useRef, useState } from "react";
import MetaManager from "../components/MetaManager";
import { UploadCloud, Trash2, Download, SlidersHorizontal, Info } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageResizer() {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [usePercent, setUsePercent] = useState(true);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(90);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [processing, setProcessing] = useState(false);

  const handleFiles = (e) => {
    const arr = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
    const readers = arr.map(
      (file) =>
        new Promise((resolve) => {
          const url = URL.createObjectURL(file);
          const img = new Image();
          img.onload = () => {
            resolve({
              file,
              url,
              name: file.name,
              w: img.width,
              h: img.height,
              sizeKB: (file.size / 1024).toFixed(2),
            });
          };
          img.src = url;
        })
    );
    Promise.all(readers).then((res) => setFiles(res));
  };

  const computeResize = (imgW, imgH) => {
    let newW = imgW;
    let newH = imgH;

    if (usePercent) {
      const pct = parseFloat(width || 100);
      newW = Math.round((imgW * pct) / 100);
      newH = lockAspect ? Math.round((imgH * pct) / 100) : parseFloat(height || newH);
    } else {
      newW = parseFloat(width || imgW);
      newH = lockAspect ? Math.round((newW * imgH) / imgW) : parseFloat(height || imgH);
    }

    return { newW, newH };
  };

  const handlePreview = async () => {
    if (files.length === 0) {
      toast.warn("⚠️ Please upload at least one image first!", { position: "top-center" });
      return;
    }

    setProcessing(true);
    const previews = [];

    for (const f of files) {
      const { newW, newH } = computeResize(f.w, f.h);
      const canvas = document.createElement("canvas");
      canvas.width = newW;
      canvas.height = newH;

      const ctx = canvas.getContext("2d");
      if (format === "jpeg" || format === "webp") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, newW, newH);
      }
      const img = new Image();
      img.src = f.url;
      await new Promise((r) => (img.onload = r));
      ctx.drawImage(img, 0, 0, newW, newH);

      const mime =
        format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";
      const q = quality / 100;
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, mime, mime === "image/png" ? undefined : q)
      );

      const resizedUrl = URL.createObjectURL(blob);
      previews.push({
        ...f,
        previewUrl: resizedUrl,
        newW,
        newH,
        newSizeKB: (blob.size / 1024).toFixed(2),
      });
    }

    setProcessed(previews);
    setProcessing(false);
    toast.success("✅ Preview generated successfully!");
  };

  const handleDownload = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `resized_${name}`;
    a.click();
    toast.info("📥 Image downloaded successfully!", { position: "bottom-right" });
  };

  const clearAll = () => {
    setFiles([]);
    setProcessed([]);
    setWidth("");
    setHeight("");
    toast("🧹 Cleared all images!");
  };

  return (
    <>
      <MetaManager
        title="Free Image Resizer & Compressor with Preview | All-in-One Tools"
        description="Resize, compress, and preview your images before downloading. 100% free, secure, and browser-based image resizing tool with quality control and custom dimensions."
        keywords="resize image, image compressor, resize photo, image resizer, image preview, online image converter, image quality reducer"
        url="https://easypickplaza.com/image-resizer"
      />

      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 py-16 pt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
            Resize & Compress Images Online
          </h1>

          {/* Upload + Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Upload & Controls */}
            <div className="bg-white shadow-xl rounded-2xl p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <UploadCloud className="text-indigo-600" /> Upload Images
              </h2>

              <div
                className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-50 transition cursor-pointer"
                onClick={() => fileRef.current.click()}
              >
                <p className="text-gray-700">
                  Drag & drop or{" "}
                  <span className="text-indigo-600 font-semibold">click to upload</span>
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFiles}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-3">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md border"
                    >
                      <div>
                        <p className="font-medium text-gray-700">{f.name}</p>
                        <p className="text-sm text-gray-500">
                          {f.w}×{f.h}px — {f.sizeKB} KB
                        </p>
                      </div>
                      <button
                        onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings */}
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="text-indigo-600" /> Resize Settings
                </h3>

                <div className="flex gap-2 mb-4">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      usePercent ? "bg-indigo-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setUsePercent(true)}
                  >
                    Percent (%)
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md ${
                      !usePercent ? "bg-indigo-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setUsePercent(false)}
                  >
                    Pixels (px)
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border p-2 rounded-md"
                  />
                </div>

                <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={lockAspect}
                    onChange={() => setLockAspect(!lockAspect)}
                  />
                  Lock Aspect Ratio
                </label>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="border p-2 rounded-md w-full"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Quality ({quality}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Background</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="ml-3 w-10 h-10 border rounded"
                  />
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handlePreview}
                    disabled={processing}
                    className={`flex-1 px-4 py-2 rounded-md text-white font-semibold ${
                      processing ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {processing ? "Processing..." : "Preview Result"}
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white shadow-xl rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Preview & Download</h2>

              {processed.length === 0 && (
                <p className="text-gray-500 text-center mt-10">
                  👇 Preview will appear here after processing.
                </p>
              )}

              {processed.length > 0 && (
                <div className="space-y-6">
                  {processed.map((p, i) => (
                    <div key={i} className="border p-3 rounded-md shadow-sm">
                      <img
                        src={p.previewUrl}
                        alt="preview"
                        className="w-full h-auto max-h-80 object-contain rounded-md"
                      />
                      <div className="mt-2 text-sm text-gray-700 flex justify-between">
                        <p>
                          <b>{p.name}</b>
                          <br />
                          Original: {p.w}×{p.h}px — {p.sizeKB} KB
                          <br />
                          Resized: {p.newW}×{p.newH}px — {p.newSizeKB} KB
                        </p>
                        <button
                          onClick={() => handleDownload(p.previewUrl, p.name)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md h-fit"
                        >
                          <Download size={16} className="inline mr-1" /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Instruction Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-3 text-indigo-700">📘 About</h2>
              <p className="text-gray-700">
                Free browser-based Image Resizer for quick photo optimization. No data upload or
                registration required.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-3 text-indigo-700">🧭 How to Use</h2>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                <li>Upload or drag & drop your images.</li>
                <li>Choose size, format, and quality.</li>
                <li>Click “Preview Result” to check before downloading.</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-3 text-indigo-700">
                📊 Supported Formats & Quality Tips
              </h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><b>JPG:</b> Best for photos & web (small size).</li>
                <li><b>PNG:</b> Best for logos & transparency.</li>
                <li><b>WEBP:</b> Modern format, 40% smaller size.</li>
                <li>Use <b>80–90%</b> quality for web, <b>100%</b> for print.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

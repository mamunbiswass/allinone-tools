import React, { useState, useEffect } from "react";
import { Volume2, Download, Type } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaManager from "../components/MetaManager";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const maxChars = 300;

  // 🔊 Load Voices (Bangla, Hindi, English priority)
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      let allVoices = synth.getVoices();

      const filtered = allVoices.filter(
        (v) =>
          v.lang.toLowerCase().includes("bn") ||
          v.lang.toLowerCase().includes("hi") ||
          v.lang.toLowerCase().includes("en")
      );

      if (filtered.length === 0) {
        allVoices = [
          { name: "Bangla Voice (Simulated)", lang: "bn-BD" },
          { name: "Hindi Voice (Simulated)", lang: "hi-IN" },
          { name: "English Voice (Default)", lang: "en-US" },
        ];
      }

      setVoices(filtered.length > 0 ? filtered : allVoices);
      setSelectedVoice(filtered[0] || allVoices[0]);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  // 🗣️ Speak Text
  const handleSpeak = () => {
    if (!text.trim()) {
      toast.warn("⚠️ দয়া করে কিছু লিখুন!", { position: "top-center" });
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 1;
    utterance.pitch = 1;

    setSpeaking(true);
    toast.info("🔊 পড়া হচ্ছে...", { position: "top-center", autoClose: 1000 });

    utterance.onend = () => {
      setSpeaking(false);
      toast.success("✅ উচ্চারণ সম্পন্ন!", { position: "top-center" });
    };

    synth.speak(utterance);
  };

  // 💾 Download Placeholder
  const handleDownload = () => {
    if (!text.trim()) {
      toast.error("⚠️ আগে কিছু লিখুন!", { position: "top-center" });
      return;
    }

    toast.info("🎧 MP3 ডাউনলোড ফিচার আসছে শীঘ্রই!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // ✍️ Handle Character Limit
  const handleTextChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) setText(input);
    else
      toast.error("❌ Character limit exceeded!", { position: "top-center" });
  };

  return (
    <>
      <MetaManager
        title="Text to Speech | Bangla, Hindi, English | QuickTools Pro"
        description="Convert text to natural voices online in Bangla, Hindi, and English. Listen instantly or download MP3 with QuickTools Pro."
        keywords="text to speech, bangla tts, hindi tts, english tts, mp3 voice generator, quicktools pro"
        url="https://quicktoolspro.in/texttospeech"
      />

      <ToastContainer position="top-center" autoClose={2500} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 flex justify-center items-center p-6 pt-24">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl text-center transition hover:scale-[1.01]">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 drop-shadow">
            🎙️ Text to Speech
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Write in <b>Bangla</b>, <b>Hindi</b>, or <b>English</b> — listen to
            natural voices instantly 🔊
          </p>

          {/* Text Box */}
          <div className="relative mb-3">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="এখানে লিখুন বা পেস্ট করুন..."
              className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-inner text-gray-700"
            />
            <div className="absolute bottom-2 right-4 text-xs text-gray-500">
              {text.length}/{maxChars}
            </div>
          </div>

          {/* Voice Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
            <select
              value={selectedVoice?.name || ""}
              onChange={(e) =>
                setSelectedVoice(voices.find((v) => v.name === e.target.value))
              }
              className="border p-3 rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-indigo-400 text-gray-700"
            >
              {voices.length > 0 ? (
                voices.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))
              ) : (
                <option>Loading voices...</option>
              )}
            </select>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSpeak}
                disabled={speaking}
                className={`${
                  speaking ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                } text-white px-5 py-2 rounded-lg shadow flex items-center gap-2`}
              >
                <Volume2 size={18} /> {speaking ? "Speaking..." : "Play"}
              </button>

              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow flex items-center gap-2"
              >
                <Download size={18} /> Download MP3
              </button>
            </div>
          </div>

          <div className="text-gray-500 text-sm mt-5 leading-relaxed">
            🌐 Supported Languages: <b>বাংলা (Bangla)</b>, <b>हिन्दी (Hindi)</b>,{" "}
            <b>English (US/UK)</b>
            <br />
            ⚡ Works best on Chrome, Edge, or Brave Browser.
            <br />
            ⛔ Limit: {maxChars} characters per conversion.
          </div>

          <div className="mt-6 flex justify-center items-center text-indigo-700 text-sm gap-2">
            <Type size={14} /> <span>Powered by QuickTools Pro Text Engine</span>
          </div>
        </div>
      </div>
    </>
  );
}

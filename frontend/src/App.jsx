import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QRGenerator from "./pages/QRGenerator";
import AgeCalculator from "./pages/AgeCalculator";
import ImageToPdf from "./pages/ImageToPdf";
import PdfToImage from "./pages/PdfToImage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImageCompressor from "./pages/ImageCompressor";
import TextToSpeech from "./pages/TextToSpeech";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop/>
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrgenerator" element={<QRGenerator />} />
          <Route path="/agecalculator" element={<AgeCalculator />} />
          <Route path="/imagetopdf" element={<ImageToPdf />} />
          <Route path="/pdftoimage" element={<PdfToImage />} />  
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/imagecompressor" element={<ImageCompressor />}/>  
          <Route path="/texttospeech" element={<TextToSpeech />} />        

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000} // 2 সেকেন্ডে অটো ক্লোজ
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </div>      
      <Footer />
    </Router>
    
  );
}

export default App;

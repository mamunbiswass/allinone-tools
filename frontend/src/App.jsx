import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QRGenerator from "./pages/QRGenerator";
import AgeCalculator from "./pages/AgeCalculator";
import ImageToPdf from "./pages/ImageToPdf";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/img-to-pdf" element={<ImageToPdf />} />  
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          

        </Routes>
      </div>      
      <Footer />
    </Router>
  );
}

export default App;

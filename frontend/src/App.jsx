import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QRGenerator from "./pages/QRGenerator";
import AgeCalculator from "./pages/AgeCalculator";
import TextToPdf from "./pages/TextToPdf";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/text-to-pdf" element={<TextToPdf />} />
        </Routes>
      </div>      
      <Footer />
    </Router>
  );
}

export default App;

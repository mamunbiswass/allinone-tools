import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QRGenerator from "./pages/QRGenerator";
import AgeCalculator from "./pages/AgeCalculator";
import ImageToPdf from "./pages/ImageToPdf";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";


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
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />

        </Routes>
      </div>      
      <Footer />
    </Router>
  );
}

export default App;

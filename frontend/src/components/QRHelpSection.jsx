import React from "react";
import { Info } from "lucide-react";

export default function QRHelpSection() {
  return (
    <div className="bg-white shadow-lg rounded-xl mt-10 p-6 max-w-3xl text-gray-700 mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
        <Info size={22} /> How to Use QR Generator
      </h2>

      <p className="mb-3">
        You can create colorful and professional QR codes in seconds! Choose
        what type of QR you want — <b>URL</b>, <b>vCard</b>, <b>Text</b>,
        <b> Email</b>, <b>Phone</b>, <b>SMS</b>, <b>WiFi</b>, or{" "}
        <b>UPI Payment</b> — then customize color and add logo if you want.
      </p>

      {/* 🧾 vCard */}
      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-2">
        🧾 For vCard QR Code:
      </h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Enter your full name, phone number, and email correctly.</li>
        <li>Fill in optional fields like company, job title, and address.</li>
        <li>
          When scanned, it will automatically open “Add Contact” on any phone.
        </li>
      </ul>

      {/* 📶 WiFi */}
      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-2">
        📶 For WiFi QR Code:
      </h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          Use the format:{" "}
          <b>
            S:NetworkName;T:WPA;P:password;;
          </b>
        </li>
        <li>
          Example:{" "}
          <code>WIFI:S:HomeWiFi;T:WPA;P:12345678;;</code>
        </li>
        <li>Anyone can scan and connect instantly to your network!</li>
      </ul>

      {/* 📧 Email & SMS */}
      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-2">
        📧 For Email & SMS:
      </h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>Just enter your email or mobile number.</li>
        <li>
          When someone scans, it opens their default email or SMS app with your
          info ready.
        </li>
      </ul>

      {/* 💰 UPI Payment */}
      <h3 className="text-lg font-semibold text-indigo-600 mt-4 mb-2">
        💰 For UPI Payment QR:
      </h3>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>
          Enter your <b>UPI ID</b> (e.g. <code>yourupiid@oksbi</code>).
        </li>
        <li>Type your name — it’ll show in payment apps like GPay or Paytm.</li>
        <li>
          Optionally, enter an amount (e.g. <code>150</code>) to fix payment
          value.
        </li>
        <li>
          Scan the QR using any UPI app (GPay, PhonePe, Paytm) and payment page
          will open instantly.
        </li>
      </ul>

      {/* 🏷️ General Tip */}
      <p className="mt-5 text-sm text-gray-500 border-t pt-4">
        💡 Tip: You can change QR colors, add your logo, and download it in
        high-quality PNG format. Works great on both desktop and mobile!
      </p>
    </div>
  );
}

import React, { useState } from "react";
import { Calendar, User, RefreshCw } from "lucide-react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    if (!dob) {
      setError("⚠️ Please select your date of birth!");
      setAge(null);
      return;
    }

    const birth = new Date(dob);
    const today = new Date();

    if (birth > today) {
      setError("❌ Date of birth cannot be in the future!");
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setError("");
    setAge({ years, months, days });
  };

  const resetAll = () => {
    setDob("");
    setAge(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2 flex justify-center items-center gap-2">
          <User size={28} /> Age Calculator
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Find out your exact age in years, months, and days 🎂
        </p>

        {/* Input */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 w-full">
            <Calendar size={22} className="text-indigo-600" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-indigo-400 rounded-md w-full p-2 outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 w-full rounded-md text-center">
              {error}
            </p>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={calculateAge}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all"
            >
              Calculate
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <RefreshCw size={16} /> Reset
            </button>
          </div>

          {/* Result */}
          {age && (
            <div className="mt-6 text-center bg-indigo-50 border border-indigo-200 p-4 rounded-lg w-full">
              <h3 className="text-xl font-semibold text-indigo-700">🎉 Your Age</h3>
              <p className="text-gray-700 text-lg mt-2">
                {age.years} Years, {age.months} Months, {age.days} Days
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Developed by <span className="text-indigo-600 font-semibold">Boss Mamun 💪</span>
      </footer>
    </div>
  );
}

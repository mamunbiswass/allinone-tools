import React, { useState } from "react";
import { Calendar, User, RefreshCw, Clock, Info } from "lucide-react";
import MetaManager from "../components/MetaManager";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [compareDate, setCompareDate] = useState(""); // second date
  const [age, setAge] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    if (!dob) {
      setError("⚠️ Please select your starting date!");
      setAge(null);
      setNextBirthday(null);
      return;
    }

    const birth = new Date(dob);
    const today = compareDate ? new Date(compareDate) : new Date();

    if (birth > today) {
      setError("❌ Start date cannot be greater than end date!");
      setAge(null);
      setNextBirthday(null);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = today - birth;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;

    // Next birthday only if DOB mode (not between two dates)
    if (!compareDate) {
      let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
      const diffDays = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));
      setNextBirthday(diffDays);
    } else {
      setNextBirthday(null);
    }

    setError("");
    setAge({ years, months, days, weeks, totalDays, hours });
  };

  const resetAll = () => {
    setDob("");
    setCompareDate("");
    setAge(null);
    setNextBirthday(null);
    setError("");
  };

  return (
    <>
     <MetaManager
        title="Free Age Calculator | All-in-One Tools"
        description="Calculate your exact age in years, months, and days instantly. Free online age calculator with accurate results."
        keywords="age calculator, birthday calculator, date of birth, calculate age online"
        url="https://yourdomain.com/age-calculator"
      />
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 pt-20 pb-10 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.02]">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2 flex justify-center items-center gap-2">
         Age / Date Difference Calculator
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Find age or duration between two dates 🎂📅
        </p>

        {/* Input Section */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="font-medium text-gray-600 flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-indigo-600" /> Start Date (DOB)
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-indigo-400 rounded-md w-full p-2 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-600 flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-indigo-600" /> End Date (Optional)
            </label>
            <input
              type="date"
              value={compareDate}
              onChange={(e) => setCompareDate(e.target.value)}
              className="border border-gray-300 focus:ring-2 focus:ring-indigo-400 rounded-md w-full p-2 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to calculate age till today.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 w-full rounded-md text-center">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-2 justify-center">
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

          {/* Result Section */}
          {age && (
            <div className="mt-6 text-center bg-indigo-50 border border-indigo-200 p-4 rounded-lg w-full">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                🎉 Result
              </h3>
              <p className="text-gray-700 text-lg">
                {age.years} Years, {age.months} Months, {age.days} Days
              </p>
              <p className="text-gray-600 text-sm mt-2">
                ≈ {age.weeks.toLocaleString()} Weeks |{" "}
                {age.totalDays.toLocaleString()} Days |{" "}
                {age.hours.toLocaleString()} Hours
              </p>

              {/* Next Birthday */}
              {nextBirthday && (
                <div className="mt-4 bg-white rounded-md shadow p-3 border border-indigo-100">
                  <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium">
                    <Clock size={18} />
                    Next Birthday in{" "}
                    <span className="font-bold text-indigo-700">
                      {nextBirthday} days 🎂
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white shadow-lg rounded-xl mt-10 p-6 max-w-3xl text-gray-700">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
          <Info size={22} /> What is an Age / Date Difference Calculator?
        </h2>
        <p className="mb-4">
          This <strong>Age and Date Difference Calculator</strong> helps you find 
          the exact duration between two dates or calculate your current age. 
          It shows results in years, months, days, weeks, and hours — ideal for 
          personal, academic, or professional use.
        </p>
        <p className="mb-4">
          You can use it to calculate your age today or find out the exact time 
          span between any two important events such as joining & leaving a job, 
          marriage anniversaries, or project durations.
        </p>

        <h3 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          🔍 Features
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>✅ Calculate exact age or date difference.</li>
          <li>✅ See full breakdown in years, months, days, weeks, and hours.</li>
          <li>✅ Optional end date input for custom duration.</li>
          <li>✅ 100% accurate with leap year adjustment.</li>
        </ul>
      </div>
     
    </div>
    </>
  );
}

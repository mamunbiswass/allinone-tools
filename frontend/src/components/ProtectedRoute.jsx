import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // যদি লগইন না করা থাকে তাহলে Login page এ পাঠাবে
    return <Navigate to="/login" replace />;
  }

  // লগইন থাকলে child page render করবে
  return children;
}

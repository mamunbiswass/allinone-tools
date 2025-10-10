import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
    localStorage.setItem("userToken", res.data.token);
    localStorage.setItem("userRole", res.data.user.role); // 👈 role save করো

    alert("Login Successful ✅");

    if (res.data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/profile");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">User Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

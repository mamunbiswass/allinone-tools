import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Download, LogOut, BarChart2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ today: 0, weekly: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/login");

    // 🔒 Fetch all logs
    axios
      .get("http://localhost:5000/api/activity/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 403) {
          alert("Session expired! Please login again.");
          localStorage.removeItem("adminToken");
          navigate("/login");
        }
      });

    // 📊 Fetch stats
    axios
      .get("http://localhost:5000/api/activity/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const filtered = logs.filter(
    (item) =>
      item.tool_name.toLowerCase().includes(search.toLowerCase()) ||
      (item.ip_address && item.ip_address.includes(search))
  );

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Tool Name, IP, User Agent, Visited At"]
        .concat(
          filtered.map(
            (r) =>
              `${r.tool_name},${r.ip_address || "N/A"},${r.user_agent || "N/A"},${r.visited_at}`
          )
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "activity_logs.csv";
    link.click();
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-indigo-50 to-cyan-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">🧭 Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <Users size={40} />
            <div>
              <h3 className="text-lg">Today's Visitors</h3>
              <p className="text-3xl font-bold">{stats.today}</p>
            </div>
          </div>
          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <BarChart2 size={40} />
            <div>
              <h3 className="text-lg">Last 7 Days</h3>
              <p className="text-3xl font-bold">{stats.weekly.length}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border rounded-xl shadow-inner p-4 mb-8">
          <h2 className="text-lg font-semibold mb-3 text-indigo-700">📈 Weekly Visitors</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.weekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/3">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Tool or IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Tool</th>
                <th className="p-3 text-left">IP</th>
                <th className="p-3 text-left">Visited</th>
                <th className="p-3 text-left">User Agent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b hover:bg-indigo-50 ${
                    index % 2 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold text-indigo-700">{log.tool_name}</td>
                  <td className="p-3">{log.ip_address || "N/A"}</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(log.visited_at).toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">
                    {log.user_agent || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No data found.</p>
        )}
      </div>
    </div>
  );
}

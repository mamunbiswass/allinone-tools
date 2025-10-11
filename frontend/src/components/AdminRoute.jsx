import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") return <Navigate to="/admin-login" />;
  return children;
}

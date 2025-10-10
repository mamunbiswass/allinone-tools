import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Example usage
export const getAllTools = () => API.get("/tools");
export const getToolById = (id) => API.get(`/tools/${id}`);
export const createLog = (data) => API.post("/logs", data);

export default API;

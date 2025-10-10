import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Temporary single admin (for now)
const ADMIN = {
  username: "admin",
  password: "12345", // 🔐 তুমি পরে environment variable এ রাখবে
};

// 🧾 Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;

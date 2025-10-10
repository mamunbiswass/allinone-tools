import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashed]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid)
      return res.status(401).json({ message: "Invalid password" });

    // 🔑 JWT-তে role যুক্ত করো
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProfile = async (req, res) => {
  try {
    const [user] = await db.query("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.user.id]);
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

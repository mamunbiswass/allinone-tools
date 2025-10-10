import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/activity", activityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
  res.send("✅ All-in-One Tools Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

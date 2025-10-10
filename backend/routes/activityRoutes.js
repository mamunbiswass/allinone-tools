import express from "express";
import {
  logActivity,
  getAllActivity,
  getVisitorStats,
} from "../controllers/activityController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/log", logActivity);
router.get("/all", verifyToken, getAllActivity);
router.get("/stats", verifyToken, getVisitorStats); // ✅ নতুন route

export default router;

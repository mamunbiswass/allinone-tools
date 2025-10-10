import db from "../db.js";

// 🧾 Log new activity
export const logActivity = async (req, res) => {
  try {
    const { tool_name, ip_address, user_agent } = req.body;
    await db.query(
      "INSERT INTO user_activity (tool_name, ip_address, user_agent, visited_at) VALUES (?, ?, ?, NOW())",
      [tool_name, ip_address, user_agent]
    );
    res.status(201).json({ message: "Activity logged" });
  } catch (error) {
    console.error("❌ Activity Log Error:", error);
    res.status(500).json({ message: "Failed to log activity" });
  }
};

// 📊 All Activities (Admin)
export const getAllActivity = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM user_activity ORDER BY visited_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Fetch Activity Error:", error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};

// 📅 Visitor Stats (Today + Last 7 days)
export const getVisitorStats = async (req, res) => {
  try {
    // আজকের মোট ভিজিট
    const [today] = await db.query(
      "SELECT COUNT(*) AS total_today FROM user_activity WHERE DATE(visited_at) = CURDATE()"
    );

    // গত ৭ দিনের প্রতিদিনের count
    const [weekly] = await db.query(`
      SELECT DATE(visited_at) AS date, COUNT(*) AS count
      FROM user_activity
      WHERE visited_at >= CURDATE() - INTERVAL 7 DAY
      GROUP BY DATE(visited_at)
      ORDER BY DATE(visited_at)
    `);

    res.json({ today: today[0].total_today, weekly });
  } catch (error) {
    console.error("❌ Visitor Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch visitor stats" });
  }
};

// generate-sitemap.js
import fs from "fs";
import path from "path";

// 🌐 তোমার লাইভ ডোমেইন (Vercel এ গেলে আপডেট করে নিও)
const BASE_URL = "https://yourdomain.com"; // <-- এখানে তোমার ডোমেইন দাও

// 📂 Pages folder path (React এর src/pages)
const PAGES_DIR = path.join(process.cwd(), "frontend", "src", "pages");

// 🧭 Function: সব পেজ ফাইল বের করবে
function getRoutesFromPages(dir) {
  const files = fs.readdirSync(dir);
  const routes = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      routes.push(...getRoutesFromPages(fullPath));
    } else if (file.endsWith(".jsx")) {
      let route = "/" + file.replace(".jsx", "").toLowerCase();

      // index.jsx হলে শুধু root
      if (file.toLowerCase() === "home.jsx" || file.toLowerCase() === "index.jsx") {
        route = "/";
      }

      routes.push(route);
    }
  });

  return routes;
}

// 🧩 সব route বের করো
const routes = getRoutesFromPages(PAGES_DIR);

// 🗓️ আজকের তারিখ
const today = new Date().toISOString().split("T")[0];

// 🧾 Sitemap XML তৈরি
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach((route) => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${route}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

// 📂 public ফোল্ডারে sitemap.xml লিখে দাও
const OUTPUT_DIR = path.join(process.cwd(), "frontend", "public");
fs.writeFileSync(path.join(OUTPUT_DIR, "sitemap.xml"), xml, "utf8");

console.log(`✅ Sitemap generated successfully with ${routes.length} pages!`);

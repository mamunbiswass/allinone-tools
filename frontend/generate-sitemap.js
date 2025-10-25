import fs from "fs";
import path from "path";

// ✅ Domain name (শেষে "/" থাকবে না)
const BASE_URL = "https://quicktoolspro.in";

// 📁 React page folder path
const PAGES_DIR = path.join(process.cwd(), "src", "pages");

// 🧩 Function: সব page থেকে route বের করা
function getRoutesFromPages(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Pages directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir);
  const routes = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      routes.push(...getRoutesFromPages(fullPath));
    } else if (file.endsWith(".jsx")) {
      let route = "/" + file.replace(".jsx", "").toLowerCase();

      // 🏠 Home page handle
      if (["home.jsx", "index.jsx"].includes(file.toLowerCase())) route = "";

      routes.push(route);
    }
  });

  return routes;
}

// 📜 Generate routes
const routes = getRoutesFromPages(PAGES_DIR);
const today = new Date().toISOString().split("T")[0];

// 🧾 Sitemap XML তৈরি
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach((route) => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${route}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

// 📁 Output Folder (frontend/public)
const OUTPUT_DIR = path.join(process.cwd(), "public");

// যদি public folder না থাকে, তৈরি করবে
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ✍️ sitemap.xml ফাইল লিখবে
fs.writeFileSync(path.join(OUTPUT_DIR, "sitemap.xml"), xml, "utf8");
console.log(`✅ Sitemap generated successfully with ${routes.length} pages.`);

// 🤖 robots.txt তৈরি/আপডেট করবে
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(OUTPUT_DIR, "robots.txt"), robotsTxt, "utf8");
console.log("✅ robots.txt created/updated successfully.");

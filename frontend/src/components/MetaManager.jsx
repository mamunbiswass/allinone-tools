import React from "react";
import { Helmet } from "react-helmet";

/**
 * ✅ MetaManager Component
 * সহজভাবে যেকোনো পেজে SEO meta tag, OG, Twitter card এবং canonical link handle করবে।
 *
 * Example:
 * <MetaManager
 *   title="Free Image to PDF Converter | All-in-One Tools"
 *   description="Convert your images into high-quality PDF files instantly. Free online image to PDF converter — no signup required!"
 *   keywords="image to pdf, convert image to pdf, free pdf tool"
 *   url="https://yourdomain.com/img-to-pdf"
 * />
 */

export default function MetaManager({
  title = "All-in-One Tools | Free Online Utilities",
  description = "All-in-One Tools offers free online tools like QR Generator, Age Calculator, and Image to PDF Converter — fast, secure, and mobile-friendly.",
  keywords = "free tools, qr generator, pdf converter, age calculator, online utilities",
  url = "https://yourdomain.com",
  image = "https://yourdomain.com/og-image.jpg",
}) {
  return (
    <Helmet>
      {/* 🧠 Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* 🧾 Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="All-in-One Tools" />

      {/* 🐦 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ Schema Markup (optional but good for SEO) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "All-in-One Tools",
          description,
          url,
          applicationCategory: "Utilities",
          operatingSystem: "All",
        })}
      </script>
    </Helmet>
  );
}

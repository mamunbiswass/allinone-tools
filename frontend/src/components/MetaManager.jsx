// src/components/MetaManager.jsx
import React from "react";
import { Helmet } from "react-helmet";

export default function MetaManager({
  title,
  description,
  keywords,
  url,
  image,
}) {
  const siteName = "EasyPick Plaza";
  const defaultImage =
    image || "https://easypickplaza.com/assets/og-image.jpg"; // <-- চাইলে custom image ব্যবহার করো

  return (
    <Helmet>
      {/* 🔹 Basic SEO Meta */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MamunTech" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* 🔹 Open Graph (for Facebook, WhatsApp) */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={url || "https://easypickplaza.com"} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* 🔹 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:site" content="@EasyPickPlaza" />

      {/* 🔹 Canonical Link */}
      <link rel="canonical" href={url || "https://easypickplaza.com"} />

      {/* 🔹 Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* 🔹 JSON-LD Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: "https://easypickplaza.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://easypickplaza.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          description:
            "EasyPick Plaza is a free online tools platform that helps you convert images to PDF, generate QR codes, calculate age, and more.",
        })}
      </script>
    </Helmet>
  );
}

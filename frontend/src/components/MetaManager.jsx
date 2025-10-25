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
  const siteName = "QuickTools | Free Online Utilities by QuickTools Pro";
  const defaultImage =
    image || "https://quicktoolspro.in/quicktools-og.jpg";

  return (
    <Helmet>
      {/* 🔹 Basic SEO Meta */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta
        name="description"
        content={
          description ||
          "QuickTools by QuickTools Pro — a free online tools platform to create QR codes, convert images to PDF, calculate age, compress images, and more."
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          "QuickTools, free tools, online utilities, image to pdf, qr code generator, image compressor, age calculator, easy pick plaza"
        }
      />
      <meta name="author" content="MamunTech" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* 🔹 Open Graph (Facebook, WhatsApp, etc.) */}
      <meta property="og:title" content={title || siteName} />
      <meta
        property="og:description"
        content={
          description ||
          "QuickTools — Simple, fast, and free online tools to make your daily digital tasks easier."
        }
      />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:url" content={url || "https://quicktoolspro.in/"} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="QuickTools" />

      {/* 🔹 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta
        name="twitter:description"
        content={
          description ||
          "Use QuickTools to convert, calculate, and create — all in one platform!"
        }
      />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:site" content="@EasyPickPlaza" />

      {/* 🔹 Canonical Link */}
      <link rel="canonical" href={url || "https://quicktoolspro.in/"} />

      {/* 🔹 Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* 🔹 JSON-LD Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "QuickTools",
          alternateName: "QuickTools Pro Quick Tools",
          url: "https://quicktoolspro.in/",
          description:
            "QuickTools by QuickTools Pro is your go-to online toolkit — convert images, generate QR codes, compress photos, and calculate age instantly.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://quicktoolspro.in//search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
          sameAs: [
            "https://www.facebook.com/quicktoolspro",
            "https://twitter.com/quicktoolspro",
            "https://www.instagram.com/quicktoolspro",
          ],
        })}
      </script>
    </Helmet>
  );
}

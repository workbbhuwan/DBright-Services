import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

/**
 * Robots.txt Configuration
 * Optimized for global search engines (Google, Bing, Yandex)
 * and Japanese search engines (Yahoo Japan, Baidu)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule - allow all public pages
      {
        userAgent: "*",
        allow: ["/", "/en/"],
        disallow: [
          "/api/",
          "/admin/",
          "/*.json$", // API responses as JSON
          "/api/", // API routes
          "/*\\?*sort=", // Avoid duplicate sorted pages if any
        ],
        crawlDelay: 1, // Be friendly - 1 second between requests
      },

      // Google-specific optimizations
      {
        userAgent: "Googlebot",
        allow: ["/", "/en/"],
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0.5, // More aggressive crawl for Google
      },

      // Google Image bot - unrestricted
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [],
      },

      // Bing optimizations
      {
        userAgent: "Bingbot",
        allow: ["/", "/en/"],
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },

      // Yandex (Russian/European search engine)
      {
        userAgent: "Yandexbot",
        allow: ["/", "/en/"],
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },

      // Baidu (Chinese market reach)
      {
        userAgent: "Baiduspider",
        allow: ["/", "/en/"],
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },

      // Block low-quality crawlers and scrapers
      {
        userAgent: [
          "MJ12bot", // Majestic bot - often aggressive
          "SemrushBot", // SEO tools
          "AhrefsBot", // SEO tools
          "DotBot", // Moz crawler
        ],
        disallow: "/",
      },
    ],

    // Single sitemap containing both locale entries with hreflang
    sitemap: `${SITE_URL}/sitemap.xml`,

    // Canonical host (primary domain)
    host: SITE_URL,
  };
}

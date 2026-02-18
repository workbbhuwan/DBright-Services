import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

/**
 * Sitemap Configuration
 * Optimized for both Japanese (root) and English locales
 * Priority reflects business value: Homepage > Services > Company > Contact
 * Change frequency reflects content update patterns
 */
const pages: Array<{
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
}> = [
  // Homepage - highest priority, weekly changes (news/updates)
  {
    path: "",
    priority: 1.0,
    changeFrequency: "weekly",
    lastModified: new Date("2026-02-17"),
  },
  // Services - high value pages, monthly updates
  {
    path: "/services",
    priority: 0.95,
    changeFrequency: "monthly",
    lastModified: new Date("2026-02-01"),
  },
  // Company Profile - business credibility, stable content
  {
    path: "/company-profile",
    priority: 0.90,
    changeFrequency: "monthly",
    lastModified: new Date("2026-02-01"),
  },
  // Contact - conversion point, secondary priority
  {
    path: "/contact",
    priority: 0.85,
    changeFrequency: "yearly",
    lastModified: new Date("2026-02-01"),
  },
];

/**
 * Builds full localized URL
 * ja = root (canonical for Japanese market)
 * en = /en prefix
 */
function buildLocaleUrl(locale: "ja" | "en", path: string) {
  // No trailing slash — must match <link rel="canonical"> exactly
  if (locale === "ja") {
    return path === "" ? SITE_URL : `${SITE_URL}${path}`;
  }
  return path === "" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
}

/**
 * Generates sitemap entries with proper hreflang for bilingual SEO
 * Each locale gets full language alternates for maximum SEO benefit
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // Japanese entry (canonical in root)
    entries.push({
      url: buildLocaleUrl("ja", page.path),
      lastModified: page.lastModified || new Date("2026-02-01"),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ja: buildLocaleUrl("ja", page.path),
          en: buildLocaleUrl("en", page.path),
          "x-default": buildLocaleUrl("ja", page.path), // Japanese as default for Asia-Pacific
        },
      },
    });

    // English entry (secondary locale)
    entries.push({
      url: buildLocaleUrl("en", page.path),
      lastModified: page.lastModified || new Date("2026-02-01"),
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9, // Slight priority reduction for English (secondary market)
      alternates: {
        languages: {
          ja: buildLocaleUrl("ja", page.path),
          en: buildLocaleUrl("en", page.path),
          "x-default": buildLocaleUrl("ja", page.path),
        },
      },
    });
  }

  return entries;
}

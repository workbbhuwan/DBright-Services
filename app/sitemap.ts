import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/company-profile", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
];

/** ja = root (no prefix), en = /en prefix */
function localeUrl(locale: string, path: string) {
  if (locale === 'ja') return `${SITE_URL}${path}`;
  return `${SITE_URL}/en${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-02-15");

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // Japanese (canonical / root)
    entries.push({
      url: localeUrl('ja', page.path || '/'),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ja: localeUrl('ja', page.path || '/'),
          en: localeUrl('en', page.path || '/'),
          'x-default': localeUrl('ja', page.path || '/'),
        },
      },
    });

    // English
    entries.push({
      url: localeUrl('en', page.path || '/'),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ja: localeUrl('ja', page.path || '/'),
          en: localeUrl('en', page.path || '/'),
          'x-default': localeUrl('ja', page.path || '/'),
        },
      },
    });
  }

  return entries;
}

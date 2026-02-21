import type { MetadataRoute } from "next";
import { i18n, type Locale } from "@/config/i18n";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

/* ─────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH
 * Every public route lives here. When you add a page,
 * add it once — both locales + hreflang are generated
 * automatically.
 *
 * lastModified  → update when content actually changes.
 *                  Google uses this to decide re-crawl timing.
 *                  This is the ONLY sitemap field Google actually reads.
 *
 * priority / changeFrequency → intentionally omitted.
 *   Google confirmed they ignore both fields.
 * ───────────────────────────────────────────────────────── */
const routes: Array<{
  /** Path segment after locale, e.g. "/services". Empty string = homepage. */
  path: string;
  /** ISO date of last meaningful content change */
  lastModified: string;
}> = [
  { path: "",                 lastModified: "2026-02-21" },
  { path: "/services",        lastModified: "2026-02-21" },
  { path: "/company-profile", lastModified: "2026-02-21" },
  { path: "/contact",         lastModified: "2026-02-21" },
];

/* ─────────────────────────────────────────────────────────
 * URL builder
 *   ja → root   (https://dbrightservices.com/services)
 *   en → /en    (https://dbrightservices.com/en/services)
 *
 * MUST produce the exact same string as <link rel="canonical">
 * in each layout's generateMetadata(). No trailing slash.
 * ───────────────────────────────────────────────────────── */
function url(locale: Locale, path: string): string {
  const base = locale === "ja" ? SITE_URL : `${SITE_URL}/en`;
  return path === "" ? base : `${base}${path}`;
}

/* ─────────────────────────────────────────────────────────
 * Sitemap generator
 *
 * For every route, emits ONE entry per locale.
 * Each entry carries full hreflang alternates so Google
 * can cluster them without relying solely on <link> tags.
 *
 * x-default points to ja (primary market).
 * ───────────────────────────────────────────────────────── */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const alternates = {
      languages: {
        ja: url("ja", route.path),
        en: url("en", route.path),
        "x-default": url("ja", route.path),
      },
    };

    return i18n.locales.map((locale) => ({
      url: url(locale, route.path),
      lastModified: new Date(route.lastModified),
      alternates,
    }));
  });
}

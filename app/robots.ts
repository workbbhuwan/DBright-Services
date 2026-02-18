import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dbrightservices.com";

/* ─────────────────────────────────────────────────────────
 * robots.txt
 *
 * Design decisions (senior-level rationale):
 *
 * 1. ONE wildcard rule, not per-bot overrides.
 *    Google's own docs say Googlebot ignores crawl-delay,
 *    and per-bot rules create maintenance debt with no
 *    measurable ranking benefit for a site this size.
 *
 * 2. Disallow /api/ and /admin/ only.
 *    Regex-style patterns (*.json$, ?sort=) are not part
 *    of the robots.txt standard — most crawlers ignore them
 *    or misinterpret them. Block at route level instead.
 *
 * 3. No bot-blocking rules (SemrushBot, AhrefsBot, etc.)
 *    Blocking SEO tool bots hurts YOUR ability to audit
 *    the site. These tools don't affect rankings.
 *
 * 4. Single sitemap reference — the one sitemap already
 *    contains both locales with full hreflang annotations.
 *
 * 5. No `host` directive — it's a Yandex-only legacy field.
 *    Canonical host is declared via <link rel="canonical">.
 * ───────────────────────────────────────────────────────── */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

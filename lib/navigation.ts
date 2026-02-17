'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/config/i18n';
import { i18n } from '@/config/i18n';

/**
 * Extract current locale from the URL pathname.
 * /en/* → 'en', everything else → 'ja' (default, no prefix)
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const first = segments[1];
  // Only non-default locales appear in the URL
  if (first === 'en') return 'en';
  return i18n.defaultLocale; // 'ja'
}

/**
 * Return a path for use in <Link href="...">.
 * ja → /path  (no prefix)
 * en → /en/path
 */
export function useLocalePath(path: string): string {
  const locale = useLocale();
  return getLocalePath(locale, path);
}

/**
 * Return a locale-aware path (non-hook version).
 * ja → /path  (no prefix)
 * en → /en/path
 */
export function getLocalePath(locale: Locale, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === i18n.defaultLocale) {
    // ja = root, no prefix
    return normalizedPath === '/' ? '/' : normalizedPath;
  }
  return `/${locale}${normalizedPath}`;
}

/**
 * Switch from one locale to another while preserving the current path.
 * /services → /en/services  (ja→en)
 * /en/services → /services   (en→ja)
 */
export function getSwitchedLocalePath(
  currentPathname: string,
  targetLocale: Locale
): string {
  const segments = currentPathname.split('/');
  const currentIsEn = segments[1] === 'en';

  // Strip locale prefix to get the bare path
  const barePath = currentIsEn
    ? '/' + segments.slice(2).join('/')
    : currentPathname;

  return getLocalePath(targetLocale, barePath || '/');
}

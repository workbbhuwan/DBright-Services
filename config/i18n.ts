export const i18n = {
  defaultLocale: 'ja' as const,
  locales: ['ja', 'en'] as const,
};

export type Locale = (typeof i18n)['locales'][number];

import type { Locale } from '@/config/i18n';

import { common as enCommon } from './en/common';
import { frontPage as enFrontPage } from './en/frontPage';
import { contact as enContact } from './en/contact';
import { faqs as enFaqs } from './en/faqs';
import { location as enLocation } from './en/location';
import { pricing as enPricing } from './en/pricing';
import { reviews as enReviews } from './en/reviews';
import { services as enServices } from './en/services';

import { common as jaCommon } from './ja/common';
import { frontPage as jaFrontPage } from './ja/frontPage';
import { contact as jaContact } from './ja/contact';
import { faqs as jaFaqs } from './ja/faqs';
import { location as jaLocation } from './ja/location';
import { pricing as jaPricing } from './ja/pricing';
import { reviews as jaReviews } from './ja/reviews';
import { services as jaServices } from './ja/services';

const content = {
  en: {
    common: enCommon,
    frontPage: enFrontPage,
    contact: enContact,
    faqs: enFaqs,
    location: enLocation,
    pricing: enPricing,
    reviews: enReviews,
    services: enServices,
  },
  ja: {
    common: jaCommon,
    frontPage: jaFrontPage,
    contact: jaContact,
    faqs: jaFaqs,
    location: jaLocation,
    pricing: jaPricing,
    reviews: jaReviews,
    services: jaServices,
  },
} as const;

export type Content = (typeof content)['ja'];

export function getContent(locale: Locale) {
  return content[locale];
}

export function getCommon(locale: Locale) {
  return content[locale].common;
}

export function getFrontPage(locale: Locale) {
  return content[locale].frontPage;
}

export function getContact(locale: Locale) {
  return content[locale].contact;
}

export function getFaqs(locale: Locale) {
  return content[locale].faqs;
}

export function getLocation(locale: Locale) {
  return content[locale].location;
}

export function getPricing(locale: Locale) {
  return content[locale].pricing;
}

export function getReviews(locale: Locale) {
  return content[locale].reviews;
}

export function getServices(locale: Locale) {
  return content[locale].services;
}

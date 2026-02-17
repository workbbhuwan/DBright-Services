'use client';

/**
 * LanguageContext - Provides bilingual support (Japanese/English) throughout the app
 * Accepts an initialLocale prop from URL-based routing so SSR
 * renders the correct language on first paint.
 */

import React, { createContext, useContext, useState } from 'react';
import type { Language, Translations } from './types';
import jaTranslations from './ja.json';
import enTranslations from './en.json';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
    children,
    initialLocale = 'ja',
}: {
    children: React.ReactNode;
    initialLocale?: Language;
}) {
    const [language, setLanguage] = useState<Language>(initialLocale);

    // Get translations based on current language
    const translations = language === 'ja' ? jaTranslations : enTranslations;

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations as Translations
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook to use the language context
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

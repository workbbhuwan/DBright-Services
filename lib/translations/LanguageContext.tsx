'use client';

/**
 * LanguageContext - Provides bilingual support (Japanese/English) throughout the app
 * This context manages the current language state and provides translation data
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translations } from './types';
import jaTranslations from './ja.json';
import enTranslations from './en.json';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default to Japanese, with lazy initialization from localStorage
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language;
            if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
                return savedLanguage;
            }
        }
        return 'ja';
    });

    // Save language preference to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

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

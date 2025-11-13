'use client';

/**
 * LanguageSwitcher Component
 * Allows users to toggle between Japanese and English
 */

import { useLanguage } from '@/lib/translations/LanguageContext';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ja' ? 'en' : 'ja');
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
            aria-label="Switch language"
        >
            <Languages className="h-4 w-4" />
            <span className="font-medium text-lg">{language === 'ja' ? 'EN' : 'JA'}</span>
        </Button>
    );
}

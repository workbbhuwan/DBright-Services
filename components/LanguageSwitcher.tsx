'use client';

/**
 * LanguageSwitcher Component
 * Navigates between locale URLs (e.g. /ja/services ↔ /en/services)
 */

import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useLocale } from '@/lib/navigation';
import { getSwitchedLocalePath } from '@/lib/navigation';

export function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const toggleLanguage = () => {
        const targetLocale = locale === 'ja' ? 'en' : 'ja';
        router.push(getSwitchedLocalePath(pathname, targetLocale));
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
            <span className="font-medium text-lg">{locale === 'ja' ? 'EN' : 'JA'}</span>
        </Button>
    );
}

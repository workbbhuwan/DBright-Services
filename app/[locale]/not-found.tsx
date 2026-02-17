'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getLocalePath } from '@/lib/navigation';
import type { Locale } from '@/config/i18n';

export default function NotFound() {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as Locale) || 'ja';
    const homePath = getLocalePath(locale, '/');

    useEffect(() => {
        router.push(homePath);
    }, [router, homePath]);

    return null;
}

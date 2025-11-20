'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    // Redirect immediately to home page
    useEffect(() => {
        router.push('/');
    }, [router]);

    // Return null since we're redirecting
    return null;
}

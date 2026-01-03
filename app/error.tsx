'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error boundary caught:', error);
    }, [error]);

    // Auto-redirect to home page after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-100 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6"
                >
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                </motion.div>

                {/* Error Message */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                    Something went wrong!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 text-lg mb-8"
                >
                    We encountered an unexpected error. Don&apos;t worry, we&apos;re working on it!
                </motion.p>

                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && error.message && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-8 p-4 bg-gray-100 rounded-lg text-left max-w-xl mx-auto"
                    >
                        <p className="text-sm text-gray-700 font-mono wrap-break-words">
                            {error.message}
                        </p>
                    </motion.div>
                )}

                {/* Auto-redirect notice */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-orange-600 font-semibold mb-8"
                >
                    Redirecting to home page in 10 seconds...
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Try Again
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Go to Home
                    </button>
                </motion.div>

                {/* Loading indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="mt-12"
                >
                    <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 10, ease: 'linear' }}
                            className="h-full bg-orange-600 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

/**
 * Main page component
 */

'use client';

import { motion } from 'framer-motion';
import { TokenTable } from '@/components/organisms/TokenTable';
import { H1 } from '@/components/atoms/Typography';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <motion.header
                className="border-b border-background-tertiary px-6 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <H1>Pulse</H1>
                    <motion.div
                        className="text-sm text-text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Real-time Token Discovery
                    </motion.div>
                </div>
            </motion.header>

            {/* Main Content */}
            <TokenTable />
        </main>
    );
}

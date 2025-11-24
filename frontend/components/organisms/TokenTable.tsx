/**
 * TokenTable - Main container with all three sections
 */

'use client';

import { motion } from 'framer-motion';
import { TokenSection } from './TokenSection';
import { TokenSection as TokenSectionEnum } from '@/lib/types';

export function TokenTable() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)] p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* New Pairs Section */}
            <motion.div variants={sectionVariants}>
                <TokenSection section={TokenSectionEnum.NEW_PAIRS} />
            </motion.div>

            {/* Final Stretch Section */}
            <motion.div variants={sectionVariants}>
                <TokenSection section={TokenSectionEnum.FINAL_STRETCH} />
            </motion.div>

            {/* Migrated Section */}
            <motion.div variants={sectionVariants}>
                <TokenSection section={TokenSectionEnum.MIGRATED} />
            </motion.div>
        </motion.div>
    );
}

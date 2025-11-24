/**
 * TokenSection organism - Complete scrollable token section
 */

'use client';

import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPresetFilter, setSearchFilter } from '@/store/slices/tokensSlice';
import { TokenSection as TokenSectionEnum, PresetFilter } from '@/lib/types';
import { SectionHeader } from '../molecules/SectionHeader';
import { TokenRow } from '../molecules/TokenRow';
import { SkeletonTokenRow } from '../atoms/Skeleton';
import { useTokenData } from '@/hooks/useTokenData';
import { TOKEN_SECTIONS } from '@/lib/constants';

interface TokenSectionProps {
    section: TokenSectionEnum;
}

export function TokenSection({ section }: TokenSectionProps) {
    const dispatch = useAppDispatch();

    const tokens = useAppSelector((state) => state.tokens.tokens[section]);
    const activePreset = useAppSelector((state) => state.tokens.activePresets[section]);
    const searchFilter = useAppSelector((state) => state.tokens.searchFilters[section]);
    const isLoading = useAppSelector((state) => {
        const key = section === TokenSectionEnum.NEW_PAIRS ? 'newPairs'
            : section === TokenSectionEnum.FINAL_STRETCH ? 'finalStretch'
                : 'migrated';
        return state.ui.isLoading[key];
    });

    // Fetch data with React Query
    useTokenData(section, activePreset || undefined, searchFilter || undefined);

    const handlePresetChange = (preset: PresetFilter) => {
        dispatch(setPresetFilter({ section, preset }));
    };

    const handleSearchChange = (search: string) => {
        dispatch(setSearchFilter({ section, search }));
    };

    const sectionInfo = TOKEN_SECTIONS[
        section === TokenSectionEnum.NEW_PAIRS ? 'NEW_PAIRS'
            : section === TokenSectionEnum.FINAL_STRETCH ? 'FINAL_STRETCH'
                : 'MIGRATED'
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className="flex flex-col h-full bg-background-secondary rounded-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <SectionHeader
                title={sectionInfo.label}
                activePreset={activePreset}
                onPresetChange={handlePresetChange}
                onSearchChange={handleSearchChange}
            />

            {/* Table Header */}
            <div className="grid grid-cols-6 gap-2 p-3 bg-background-tertiary/30 text-xs font-medium text-text-muted uppercase">
                <div className="col-span-2">Token</div>
                <div className="text-right">MC</div>
                <div className="text-right">Vol</div>
                <div className="text-right">Price</div>
                <div className="text-right">24h%</div>
            </div>

            {/* Token List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <SkeletonTokenRow key={i} />
                        ))}
                    </>
                ) : tokens.length > 0 ? (
                    tokens.map((token, index) => (
                        <motion.div
                            key={token.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 }}
                        >
                            <TokenRow token={token} />
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        className="flex items-center justify-center h-40 text-text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        No tokens found
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

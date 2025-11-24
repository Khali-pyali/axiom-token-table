/**
 * TokenSection organism - Complete scrollable token section
 */

'use client';

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

    return (
        <div className="flex flex-col h-full bg-background-secondary rounded-lg overflow-hidden">
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
                    tokens.map((token) => (
                        <TokenRow key={token.id} token={token} />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-40 text-text-muted">
                        No tokens found
                    </div>
                )}
            </div>
        </div>
    );
}

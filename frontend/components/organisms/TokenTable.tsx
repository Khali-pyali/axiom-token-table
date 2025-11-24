/**
 * TokenTable - Main container with all three sections
 */

'use client';

import { TokenSection } from './TokenSection';
import { TokenSection as TokenSectionEnum } from '@/lib/types';

export function TokenTable() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)] p-4">
            {/* New Pairs Section */}
            <TokenSection section={TokenSectionEnum.NEW_PAIRS} />

            {/* Final Stretch Section */}
            <TokenSection section={TokenSectionEnum.FINAL_STRETCH} />

            {/* Migrated Section */}
            <TokenSection section={TokenSectionEnum.MIGRATED} />
        </div>
    );
}

/**
 * SectionHeader component - Header for each token section
 */

'use client';

import { useState } from 'react';
import { Button } from '../atoms/Button';
import { H3 } from '../atoms/Typography';
import { PresetFilter } from '@/lib/types';

interface SectionHeaderProps {
    title: string;
    activePreset: PresetFilter;
    onPresetChange: (preset: PresetFilter) => void;
    onSearchChange?: (search: string) => void;
}

export function SectionHeader({
    title,
    activePreset,
    onPresetChange,
    onSearchChange
}: SectionHeaderProps) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        onSearchChange?.(value);
    };

    return (
        <div className="sticky top-0 z-10 bg-background-secondary border-b border-background-tertiary p-4 space-y-3">
            <H3>{title}</H3>

            {/* Filter Input */}
            {onSearchChange && (
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Filter tokens..."
                    className="w-full px-3 py-2 bg-background-tertiary text-text-primary text-sm rounded border border-background-tertiary focus:border-accent-blue focus:outline-none"
                />
            )}

            {/* Preset Buttons */}
            <div className="flex gap-2">
                <Button
                    variant="preset"
                    size="sm"
                    active={activePreset === 'P1'}
                    onClick={() => onPresetChange('P1')}
                >
                    P1
                </Button>
                <Button
                    variant="preset"
                    size="sm"
                    active={activePreset === 'P2'}
                    onClick={() => onPresetChange('P2')}
                >
                    P2
                </Button>
                <Button
                    variant="preset"
                    size="sm"
                    active={activePreset === 'P3'}
                    onClick={() => onPresetChange('P3')}
                >
                    P3
                </Button>
                {activePreset && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPresetChange(null)}
                    >
                        Clear
                    </Button>
                )}
            </div>
        </div>
    );
}

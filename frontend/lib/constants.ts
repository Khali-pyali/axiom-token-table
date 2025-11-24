/**
 * Constants for the frontend application
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3002';

export const ENDPOINTS = {
    NEW_PAIRS: `${API_BASE_URL}/api/tokens/new-pairs`,
    FINAL_STRETCH: `${API_BASE_URL}/api/tokens/final-stretch`,
    MIGRATED: `${API_BASE_URL}/api/tokens/migrated`,
    ALL: `${API_BASE_URL}/api/tokens/all`,
} as const;

export const REFETCH_INTERVAL = 30000; // 30 seconds

export const TOKEN_SECTIONS = {
    NEW_PAIRS: {
        label: 'New Pairs',
        description: 'Recently launched tokens',
    },
    FINAL_STRETCH: {
        label: 'Final Stretch',
        description: 'Tokens approaching migration',
    },
    MIGRATED: {
        label: 'Migrated',
        description: 'Successfully migrated tokens',
    },
} as const;

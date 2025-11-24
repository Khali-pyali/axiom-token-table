/**
 * Custom hook for fetching token data with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { setTokens } from '@/store/slices/tokensSlice';
import { setLoading, setError } from '@/store/slices/uiSlice';
import { Token, TokenSection, TokenResponse, PresetFilter } from '@/lib/types';
import { ENDPOINTS, REFETCH_INTERVAL } from '@/lib/constants';

async function fetchTokens(
    section: TokenSection,
    preset?: PresetFilter,
    search?: string
): Promise<Token[]> {
    const endpoint = section === TokenSection.NEW_PAIRS
        ? ENDPOINTS.NEW_PAIRS
        : section === TokenSection.FINAL_STRETCH
            ? ENDPOINTS.FINAL_STRETCH
            : ENDPOINTS.MIGRATED;

    const params = new URLSearchParams();
    if (preset) params.append('preset', preset);
    if (search) params.append('search', search);

    const url = `${endpoint}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch tokens: ${response.statusText}`);
    }

    const data: TokenResponse = await response.json();
    return data.data;
}

export function useTokenData(
    section: TokenSection,
    preset?: PresetFilter,
    search?: string
) {
    const dispatch = useAppDispatch();

    const query = useQuery({
        queryKey: ['tokens', section, preset, search],
        queryFn: () => fetchTokens(section, preset, search),
        refetchInterval: REFETCH_INTERVAL,
        staleTime: 10000, // Consider data stale after 10 seconds
        onSuccess: (data) => {
            dispatch(setTokens({ section, tokens: data }));
            dispatch(setLoading({ section: getSectionKey(section), loading: false }));
            dispatch(setError({ section: getSectionKey(section), error: null }));
        },
        onError: (error: Error) => {
            dispatch(setLoading({ section: getSectionKey(section), loading: false }));
            dispatch(setError({ section: getSectionKey(section), error: error.message }));
        },
    });

    return query;
}

function getSectionKey(section: TokenSection): 'newPairs' | 'finalStretch' | 'migrated' {
    switch (section) {
        case TokenSection.NEW_PAIRS:
            return 'newPairs';
        case TokenSection.FINAL_STRETCH:
            return 'finalStretch';
        case TokenSection.MIGRATED:
            return 'migrated';
    }
}

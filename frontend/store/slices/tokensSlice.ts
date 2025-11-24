/**
 * Tokens slice - manages token state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenSection, PresetFilter, SortField, SortOrder } from '@/lib/types';

interface TokensState {
    tokens: {
        [TokenSection.NEW_PAIRS]: Token[];
        [TokenSection.FINAL_STRETCH]: Token[];
        [TokenSection.MIGRATED]: Token[];
    };
    activePresets: {
        [TokenSection.NEW_PAIRS]: PresetFilter;
        [TokenSection.FINAL_STRETCH]: PresetFilter;
        [TokenSection.MIGRATED]: PresetFilter;
    };
    searchFilters: {
        [TokenSection.NEW_PAIRS]: string;
        [TokenSection.FINAL_STRETCH]: string;
        [TokenSection.MIGRATED]: string;
    };
    sortConfig: {
        field: SortField | null;
        order: SortOrder;
    };
}

const initialState: TokensState = {
    tokens: {
        [TokenSection.NEW_PAIRS]: [],
        [TokenSection.FINAL_STRETCH]: [],
        [TokenSection.MIGRATED]: [],
    },
    activePresets: {
        [TokenSection.NEW_PAIRS]: null,
        [TokenSection.FINAL_STRETCH]: null,
        [TokenSection.MIGRATED]: null,
    },
    searchFilters: {
        [TokenSection.NEW_PAIRS]: '',
        [TokenSection.FINAL_STRETCH]: '',
        [TokenSection.MIGRATED]: '',
    },
    sortConfig: {
        field: null,
        order: 'desc',
    },
};

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ section: TokenSection; tokens: Token[] }>) => {
            state.tokens[action.payload.section] = action.payload.tokens;
        },
        updateTokenPrice: (state, action: PayloadAction<{ tokenId: string; price: number; priceChange: number }>) => {
            // Find and update the token across all sections
            Object.keys(state.tokens).forEach((section) => {
                const tokenIndex = state.tokens[section as TokenSection].findIndex(
                    (t) => t.id === action.payload.tokenId
                );
                if (tokenIndex !== -1) {
                    state.tokens[section as TokenSection][tokenIndex].price = action.payload.price;
                    state.tokens[section as TokenSection][tokenIndex].priceChange = action.payload.priceChange;
                }
            });
        },
        setPresetFilter: (state, action: PayloadAction<{ section: TokenSection; preset: PresetFilter }>) => {
            state.activePresets[action.payload.section] = action.payload.preset;
        },
        setSearchFilter: (state, action: PayloadAction<{ section: TokenSection; search: string }>) => {
            state.searchFilters[action.payload.section] = action.payload.search;
        },
        setSortConfig: (state, action: PayloadAction<{ field: SortField | null; order: SortOrder }>) => {
            state.sortConfig = action.payload;
        },
    },
});

export const { setTokens, updateTokenPrice, setPresetFilter, setSearchFilter, setSortConfig } = tokensSlice.actions;
export default tokensSlice.reducer;

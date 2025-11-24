/**
 * UI slice - manages UI state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isModalOpen: boolean;
    modalContent: string | null;
    selectedTokenId: string | null;
    isLoading: {
        newPairs: boolean;
        finalStretch: boolean;
        migrated: boolean;
    };
    errors: {
        newPairs: string | null;
        finalStretch: string | null;
        migrated: string | null;
    };
}

const initialState: UIState = {
    isModalOpen: false,
    modalContent: null,
    selectedTokenId: null,
    isLoading: {
        newPairs: false,
        finalStretch: false,
        migrated: false,
    },
    errors: {
        newPairs: null,
        finalStretch: null,
        migrated: null,
    },
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ content: string; tokenId?: string }>) => {
            state.isModalOpen = true;
            state.modalContent = action.payload.content;
            state.selectedTokenId = action.payload.tokenId || null;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.modalContent = null;
            state.selectedTokenId = null;
        },
        setLoading: (state, action: PayloadAction<{ section: keyof UIState['isLoading']; loading: boolean }>) => {
            state.isLoading[action.payload.section] = action.payload.loading;
        },
        setError: (state, action: PayloadAction<{ section: keyof UIState['errors']; error: string | null }>) => {
            state.errors[action.payload.section] = action.payload.error;
        },
        clearError: (state, action: PayloadAction<keyof UIState['errors']>) => {
            state.errors[action.payload] = null;
        },
    },
});

export const { openModal, closeModal, setLoading, setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;

/**
 * Shared TypeScript types for the backend service
 */

export enum TokenSection {
    NEW_PAIRS = 'new-pairs',
    FINAL_STRETCH = 'final-stretch',
    MIGRATED = 'migrated',
}

export interface Token {
    id: string;
    name: string;
    symbol: string;
    section: TokenSection;
    marketCap: number; // MC
    volume: number; // V
    fundingMetric: number; // F
    transactions: number; // TX
    price: number;
    priceChange: number; // Percentage change
    timeSinceLaunch: number; // Seconds since launch
    launchTime: Date;
    lastUpdate: Date;
}

export interface TokenResponse {
    success: boolean;
    data: Token[];
    total: number;
    section?: TokenSection;
}

export interface ErrorResponse {
    success: false;
    error: string;
    message: string;
}

export type ApiResponse<T = Token[]> = {
    success: true;
    data: T;
    total: number;
} | ErrorResponse;

export interface WebSocketMessage {
    type: 'price_update' | 'connection' | 'error';
    data?: PriceUpdate | ConnectionInfo | ErrorInfo;
    timestamp: number;
}

export interface PriceUpdate {
    tokenId: string;
    price: number;
    priceChange: number;
    previousPrice: number;
}

export interface ConnectionInfo {
    clientId: string;
    message: string;
}

export interface ErrorInfo {
    message: string;
    code?: string;
}

export type SortField = 'marketCap' | 'volume' | 'transactions' | 'timeSinceLaunch' | 'priceChange';
export type SortOrder = 'asc' | 'desc';

export interface TokenFilters {
    search?: string;
    preset?: 'P1' | 'P2' | 'P3';
    sortBy?: SortField;
    sortOrder?: SortOrder;
    limit?: number;
}

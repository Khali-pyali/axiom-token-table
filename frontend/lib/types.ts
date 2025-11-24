/**
 * Frontend TypeScript types (matching backend types)
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
    marketCap: number;
    volume: number;
    fundingMetric: number;
    transactions: number;
    price: number;
    priceChange: number;
    timeSinceLaunch: number;
    launchTime: Date | string;
    lastUpdate: Date | string;
}

export interface TokenResponse {
    success: boolean;
    data: Token[];
    total: number;
}

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

export type PresetFilter = 'P1' | 'P2' | 'P3' | null;

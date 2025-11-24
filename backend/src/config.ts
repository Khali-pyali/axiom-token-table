/**
 * Configuration constants for the backend service
 */

export const config = {
    // Server configuration
    port: process.env.PORT || 3001,
    wsPort: process.env.WS_PORT || 3002,

    // CORS configuration
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],

    // Data configuration
    tokensPerSection: 50, // Number of tokens to generate per section

    // WebSocket configuration
    priceUpdateInterval: 3000, // ms - update prices every 3 seconds
    priceChangeRange: {
        min: -5, // -5% minimum price change
        max: 5,  // +5% maximum price change
    },

    // Token generation configuration
    marketCapRange: {
        min: 10_000, // $10K
        max: 10_000_000, // $10M
    },
    volumeRange: {
        min: 1_000, // $1K
        max: 1_000_000, // $1M
    },
    transactionRange: {
        min: 50,
        max: 10_000,
    },
    priceRange: {
        min: 0.00001,
        max: 100,
    },
    timeSinceLaunchRange: {
        min: 60, // 1 minute
        max: 86400, // 24 hours
    },
} as const;

export type Config = typeof config;

/**
 * Mock data generator for realistic token data
 */

import { faker } from '@faker-js/faker';
import { Token, TokenSection } from '../types';
import { config } from '../config';

/**
 * Generate a random number within a range
 */
function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer within a range
 */
function randomIntInRange(min: number, max: number): number {
    return Math.floor(randomInRange(min, max));
}

/**
 * Generate a single token
 */
export function generateToken(section: TokenSection): Token {
    const launchTime = new Date(
        Date.now() - randomIntInRange(
            config.timeSinceLaunchRange.min * 1000,
            config.timeSinceLaunchRange.max * 1000
        )
    );

    const timeSinceLaunch = Math.floor((Date.now() - launchTime.getTime()) / 1000);

    const price = randomInRange(config.priceRange.min, config.priceRange.max);
    const priceChange = randomInRange(
        config.priceChangeRange.min,
        config.priceChangeRange.max
    );

    return {
        id: faker.string.uuid(),
        name: faker.company.name().split(' ')[0] + ' ' + faker.word.noun(),
        symbol: faker.string.alpha({ length: { min: 3, max: 5 }, casing: 'upper' }),
        section,
        marketCap: randomInRange(config.marketCapRange.min, config.marketCapRange.max),
        volume: randomInRange(config.volumeRange.min, config.volumeRange.max),
        fundingMetric: randomInRange(0, 100),
        transactions: randomIntInRange(config.transactionRange.min, config.transactionRange.max),
        price,
        priceChange,
        timeSinceLaunch,
        launchTime,
        lastUpdate: new Date(),
    };
}

/**
 * Generate multiple tokens for a section
 */
export function generateTokens(section: TokenSection, count: number = config.tokensPerSection): Token[] {
    const tokens: Token[] = [];

    for (let i = 0; i < count; i++) {
        tokens.push(generateToken(section));
    }

    return tokens;
}

/**
 * Generate all tokens for all sections
 */
export function generateAllTokens(): Record<TokenSection, Token[]> {
    return {
        [TokenSection.NEW_PAIRS]: generateTokens(TokenSection.NEW_PAIRS),
        [TokenSection.FINAL_STRETCH]: generateTokens(TokenSection.FINAL_STRETCH),
        [TokenSection.MIGRATED]: generateTokens(TokenSection.MIGRATED),
    };
}

/**
 * Update token price with a realistic change
 */
export function updateTokenPrice(token: Token): Token {
    const changePercent = randomInRange(
        config.priceChangeRange.min / 10, // Smaller changes for updates
        config.priceChangeRange.max / 10
    );

    const newPrice = token.price * (1 + changePercent / 100);

    return {
        ...token,
        price: Math.max(config.priceRange.min, newPrice),
        priceChange: changePercent,
        lastUpdate: new Date(),
    };
}

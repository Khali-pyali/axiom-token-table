/**
 * Token service - business logic for token management
 */

import { Token, TokenSection, TokenFilters, SortField, SortOrder } from '../types';
import { generateAllTokens, updateTokenPrice } from '../data/mockDataGenerator';

class TokenService {
    private tokens: Record<TokenSection, Token[]>;

    constructor() {
        // Initialize with mock data
        this.tokens = generateAllTokens();
    }

    /**
     * Get all tokens from a specific section
     */
    getTokensBySection(section: TokenSection, filters?: TokenFilters): Token[] {
        let tokens = [...this.tokens[section]];

        // Apply search filter
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            tokens = tokens.filter(
                (token) =>
                    token.name.toLowerCase().includes(searchLower) ||
                    token.symbol.toLowerCase().includes(searchLower)
            );
        }

        // Apply preset filters
        if (filters?.preset) {
            tokens = this.applyPresetFilter(tokens, filters.preset);
        }

        // Apply sorting
        if (filters?.sortBy) {
            tokens = this.sortTokens(tokens, filters.sortBy, filters.sortOrder || 'desc');
        }

        // Apply limit
        if (filters?.limit) {
            tokens = tokens.slice(0, filters.limit);
        }

        return tokens;
    }

    /**
     * Get all tokens across all sections
     */
    getAllTokens(filters?: TokenFilters): Token[] {
        const allTokens = [
            ...this.tokens[TokenSection.NEW_PAIRS],
            ...this.tokens[TokenSection.FINAL_STRETCH],
            ...this.tokens[TokenSection.MIGRATED],
        ];

        let tokens = allTokens;

        // Apply filters
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            tokens = tokens.filter(
                (token) =>
                    token.name.toLowerCase().includes(searchLower) ||
                    token.symbol.toLowerCase().includes(searchLower)
            );
        }

        if (filters?.preset) {
            tokens = this.applyPresetFilter(tokens, filters.preset);
        }

        if (filters?.sortBy) {
            tokens = this.sortTokens(tokens, filters.sortBy, filters.sortOrder || 'desc');
        }

        if (filters?.limit) {
            tokens = tokens.slice(0, filters.limit);
        }

        return tokens;
    }

    /**
     * Apply preset filters (P1, P2, P3)
     */
    private applyPresetFilter(tokens: Token[], preset: 'P1' | 'P2' | 'P3'): Token[] {
        switch (preset) {
            case 'P1':
                // High volume tokens
                return tokens.filter((token) => token.volume > 500_000);
            case 'P2':
                // High transaction count
                return tokens.filter((token) => token.transactions > 5_000);
            case 'P3':
                // Recent launches (< 1 hour)
                return tokens.filter((token) => token.timeSinceLaunch < 3600);
            default:
                return tokens;
        }
    }

    /**
     * Sort tokens by a specific field
     */
    private sortTokens(tokens: Token[], field: SortField, order: SortOrder): Token[] {
        return tokens.sort((a, b) => {
            let comparison = 0;

            switch (field) {
                case 'marketCap':
                    comparison = a.marketCap - b.marketCap;
                    break;
                case 'volume':
                    comparison = a.volume - b.volume;
                    break;
                case 'transactions':
                    comparison = a.transactions - b.transactions;
                    break;
                case 'timeSinceLaunch':
                    comparison = a.timeSinceLaunch - b.timeSinceLaunch;
                    break;
                case 'priceChange':
                    comparison = a.priceChange - b.priceChange;
                    break;
            }

            return order === 'asc' ? comparison : -comparison;
        });
    }

    /**
     * Update a token's price (for WebSocket simulation)
     */
    updateTokenPrice(tokenId: string): Token | null {
        // Find the token across all sections
        for (const section of Object.values(TokenSection)) {
            const tokenIndex = this.tokens[section].findIndex((t) => t.id === tokenId);
            if (tokenIndex !== -1) {
                const updatedToken = updateTokenPrice(this.tokens[section][tokenIndex]);
                this.tokens[section][tokenIndex] = updatedToken;
                return updatedToken;
            }
        }
        return null;
    }

    /**
     * Get a random token for price update simulation
     */
    getRandomToken(): Token | null {
        const sections = Object.values(TokenSection);
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        const sectionTokens = this.tokens[randomSection];

        if (sectionTokens.length === 0) return null;

        return sectionTokens[Math.floor(Math.random() * sectionTokens.length)];
    }

    /**
     * Get multiple random tokens for batch updates
     */
    getRandomTokens(count: number): Token[] {
        const allTokens = this.getAllTokens();
        const shuffled = allTokens.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, allTokens.length));
    }
}

// Export singleton instance
export const tokenService = new TokenService();

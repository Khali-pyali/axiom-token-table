/**
 * Token routes - REST API endpoints
 */

import { Router, Request, Response } from 'express';
import { tokenService } from '../services/tokenService';
import { TokenSection, TokenFilters, ApiResponse, Token } from '../types';
import { AppError } from '../middleware/errorHandler';

const router = Router();

/**
 * Parse query parameters into TokenFilters
 */
function parseFilters(query: any): TokenFilters {
    const filters: TokenFilters = {};

    if (query.search) {
        filters.search = String(query.search);
    }

    if (query.preset && ['P1', 'P2', 'P3'].includes(query.preset)) {
        filters.preset = query.preset as 'P1' | 'P2' | 'P3';
    }

    if (query.sortBy) {
        filters.sortBy = query.sortBy;
    }

    if (query.sortOrder && ['asc', 'desc'].includes(query.sortOrder)) {
        filters.sortOrder = query.sortOrder;
    }

    if (query.limit) {
        const limit = parseInt(query.limit, 10);
        if (!isNaN(limit) && limit > 0) {
            filters.limit = limit;
        }
    }

    return filters;
}

/**
 * GET /api/tokens/new-pairs
 * Fetch new pairs tokens
 */
router.get('/new-pairs', (req: Request, res: Response) => {
    const filters = parseFilters(req.query);
    const tokens = tokenService.getTokensBySection(TokenSection.NEW_PAIRS, filters);

    const response: ApiResponse<Token[]> = {
        success: true,
        data: tokens,
        total: tokens.length,
    };

    res.json(response);
});

/**
 * GET /api/tokens/final-stretch
 * Fetch final stretch tokens
 */
router.get('/final-stretch', (req: Request, res: Response) => {
    const filters = parseFilters(req.query);
    const tokens = tokenService.getTokensBySection(TokenSection.FINAL_STRETCH, filters);

    const response: ApiResponse<Token[]> = {
        success: true,
        data: tokens,
        total: tokens.length,
    };

    res.json(response);
});

/**
 * GET /api/tokens/migrated
 * Fetch migrated tokens
 */
router.get('/migrated', (req: Request, res: Response) => {
    const filters = parseFilters(req.query);
    const tokens = tokenService.getTokensBySection(TokenSection.MIGRATED, filters);

    const response: ApiResponse<Token[]> = {
        success: true,
        data: tokens,
        total: tokens.length,
    };

    res.json(response);
});

/**
 * GET /api/tokens/all
 * Fetch all tokens across all sections
 */
router.get('/all', (req: Request, res: Response) => {
    const filters = parseFilters(req.query);
    const tokens = tokenService.getAllTokens(filters);

    const response: ApiResponse<Token[]> = {
        success: true,
        data: tokens,
        total: tokens.length,
    };

    res.json(response);
});

export default router;

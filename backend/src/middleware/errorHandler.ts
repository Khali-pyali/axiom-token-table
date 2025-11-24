/**
 * Error handling middleware for Express
 */

import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

/**
 * Custom error class
 */
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

/**
 * Error handler middleware
 */
export function errorHandler(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('Error:', err);

    if (err instanceof AppError) {
        const response: ErrorResponse = {
            success: false,
            error: err.message,
            message: err.message,
        };
        res.status(err.statusCode).json(response);
        return;
    }

    // Default error
    const response: ErrorResponse = {
        success: false,
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
    };

    res.status(500).json(response);
}

/**
 * 404 handler
 */
export function notFoundHandler(req: Request, res: Response): void {
    const response: ErrorResponse = {
        success: false,
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    };

    res.status(404).json(response);
}

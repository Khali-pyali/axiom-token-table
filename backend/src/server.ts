/**
 * Main server file - Express app and WebSocket server initialization
 */

import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config';
import tokenRoutes from './routes/tokens';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { websocketService } from './services/websocketService';

// Create Express app
const app: Express = express();

// Middleware
app.use(cors({
    origin: config.corsOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Axiom Token Table Backend is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use('/api/tokens', tokenRoutes);

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start servers
function startServers() {
    // Start Express server
    app.listen(config.port, () => {
        console.log('='.repeat(50));
        console.log('🚀 Axiom Token Table Backend Started');
        console.log('='.repeat(50));
        console.log(`📡 REST API Server: http://localhost:${config.port}`);
        console.log(`🔌 WebSocket Server: ws://localhost:${config.wsPort}`);
        console.log('='.repeat(50));
        console.log('\nAvailable endpoints:');
        console.log(`  GET  /health`);
        console.log(`  GET  /api/tokens/new-pairs`);
        console.log(`  GET  /api/tokens/final-stretch`);
        console.log(`  GET  /api/tokens/migrated`);
        console.log(`  GET  /api/tokens/all`);
        console.log('\nQuery parameters:');
        console.log(`  ?search=<text>          - Filter by token name/symbol`);
        console.log(`  ?preset=<P1|P2|P3>      - Apply preset filter`);
        console.log(`  ?sortBy=<field>         - Sort by field`);
        console.log(`  ?sortOrder=<asc|desc>   - Sort order`);
        console.log(`  ?limit=<number>         - Limit results`);
        console.log('='.repeat(50));
    });

    // Start WebSocket server
    websocketService.initialize(Number(config.wsPort));
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received, shutting down gracefully...');
    websocketService.shutdown();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received, shutting down gracefully...');
    websocketService.shutdown();
    process.exit(0);
});

// Start the servers
startServers();

export default app;

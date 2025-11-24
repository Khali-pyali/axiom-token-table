/**
 * WebSocket service for real-time price updates
 */

import { WebSocket, WebSocketServer } from 'ws';
import { WebSocketMessage, PriceUpdate } from '../types';
import { tokenService } from './tokenService';
import { config } from '../config';

class WebSocketService {
    private wss: WebSocketServer | null = null;
    private updateInterval: NodeJS.Timeout | null = null;
    private clients: Set<WebSocket> = new Set();

    /**
     * Initialize WebSocket server
     */
    initialize(port: number): void {
        this.wss = new WebSocketServer({ port });

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('New WebSocket client connected');
            this.clients.add(ws);

            // Send welcome message
            this.sendToClient(ws, {
                type: 'connection',
                data: {
                    clientId: this.generateClientId(),
                    message: 'Connected to Axiom Token Table WebSocket',
                },
                timestamp: Date.now(),
            });

            // Handle client disconnect
            ws.on('close', () => {
                console.log('WebSocket client disconnected');
                this.clients.delete(ws);
            });

            // Handle errors
            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.clients.delete(ws);
            });
        });

        console.log(`WebSocket server running on port ${port}`);

        // Start sending price updates
        this.startPriceUpdates();
    }

    /**
     * Start periodic price updates
     */
    private startPriceUpdates(): void {
        this.updateInterval = setInterval(() => {
            this.broadcastPriceUpdates();
        }, config.priceUpdateInterval);
    }

    /**
     * Broadcast price updates to all connected clients
     */
    private broadcastPriceUpdates(): void {
        if (this.clients.size === 0) return;

        // Update 3-5 random tokens per interval
        const updateCount = Math.floor(Math.random() * 3) + 3;
        const tokensToUpdate = tokenService.getRandomTokens(updateCount);

        tokensToUpdate.forEach((token) => {
            const previousPrice = token.price;
            const updatedToken = tokenService.updateTokenPrice(token.id);

            if (updatedToken) {
                const priceUpdate: PriceUpdate = {
                    tokenId: updatedToken.id,
                    price: updatedToken.price,
                    priceChange: updatedToken.priceChange,
                    previousPrice,
                };

                this.broadcast({
                    type: 'price_update',
                    data: priceUpdate,
                    timestamp: Date.now(),
                });
            }
        });
    }

    /**
     * Broadcast message to all connected clients
     */
    private broadcast(message: WebSocketMessage): void {
        const messageStr = JSON.stringify(message);

        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageStr);
            }
        });
    }

    /**
     * Send message to a specific client
     */
    private sendToClient(client: WebSocket, message: WebSocketMessage): void {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    }

    /**
     * Generate a unique client ID
     */
    private generateClientId(): string {
        return `client_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    /**
     * Shutdown WebSocket server
     */
    shutdown(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.clients.forEach((client) => {
            client.close();
        });

        if (this.wss) {
            this.wss.close();
        }

        console.log('WebSocket server shut down');
    }
}

// Export singleton instance
export const websocketService = new WebSocketService();

/**
 * WebSocket custom hook for real-time price updates
 */

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateTokenPrice } from '@/store/slices/tokensSlice';
import { WS_URL } from '@/lib/constants';
import { WebSocketMessage, PriceUpdate } from '@/lib/types';

export function useWebSocket() {
    const ws = useRef<WebSocket | null>(null);
    const dispatch = useAppDispatch();
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback(() => {
        try {
            ws.current = new WebSocket(WS_URL);

            ws.current.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.current.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);

                    if (message.type === 'price_update' && message.data) {
                        const priceUpdate = message.data as PriceUpdate;
                        dispatch(updateTokenPrice({
                            tokenId: priceUpdate.tokenId,
                            price: priceUpdate.price,
                            priceChange: priceUpdate.priceChange,
                        }));
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            ws.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.current.onclose = () => {
                console.log('WebSocket disconnected, attempting to reconnect...');
                // Reconnect after 3 seconds
                reconnectTimeout.current = setTimeout(connect, 3000);
            };
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
            // Retry after 3 seconds
            reconnectTimeout.current = setTimeout(connect, 3000);
        }
    }, [dispatch]);

    useEffect(() => {
        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [connect]);

    return ws.current;
}

/**
 * Providers component - Wraps app with Redux and React Query
 */

'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store/store';
import { useWebSocket } from '@/hooks/useWebSocket';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function WebSocketProvider({ children }: { children: ReactNode }) {
    // Initialize WebSocket connection
    useWebSocket();
    return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <WebSocketProvider>
                    {children}
                </WebSocketProvider>
            </QueryClientProvider>
        </Provider>
    );
}

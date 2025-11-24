/**
 * Main page component
 */

import { TokenTable } from '@/components/organisms/TokenTable';
import { H1 } from '@/components/atoms/Typography';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-background-tertiary px-6 py-4">
                <div className="flex items-center justify-between">
                    <H1>Pulse</H1>
                    <div className="text-sm text-text-muted">
                        Real-time Token Discovery
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <TokenTable />
        </main>
    );
}

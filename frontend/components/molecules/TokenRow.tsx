/**
 * TokenRow component - Individual token row with hover effects and price animations
 */

'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { Token } from '@/lib/types';
import { formatNumber, formatPrice, formatPercentage, getPercentageColor, cn } from '@/lib/utils';

interface TokenRowProps {
    token: Token;
    onClick?: (token: Token) => void;
}

export const TokenRow = memo(function TokenRow({ token, onClick }: TokenRowProps) {
    return (
        <motion.div
            className={cn(
                'grid grid-cols-6 gap-2 p-3 border-b border-background-tertiary/30',
                'cursor-pointer'
            )}
            onClick={() => onClick?.(token)}
            whileHover={{
                scale: 1.01,
                backgroundColor: 'rgba(31, 41, 55, 0.3)',
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.99 }}
        >
            {/* Token Name & Symbol */}
            <div className="col-span-2 flex flex-col">
                <span className="text-sm font-medium text-text-primary truncate">
                    {token.name}
                </span>
                <span className="text-xs text-text-muted">{token.symbol}</span>
            </div>

            {/* Market Cap */}
            <div className="text-right text-sm text-text-secondary">
                {formatNumber(token.marketCap)}
            </div>

            {/* Volume */}
            <div className="text-right text-sm text-text-secondary">
                {formatNumber(token.volume)}
            </div>

            {/* Price */}
            <div className="text-right text-sm font-medium text-text-primary">
                {formatPrice(token.price)}
            </div>

            {/* Price Change */}
            <div className={cn('text-right text-sm font-medium', getPercentageColor(token.priceChange))}>
                {formatPercentage(token.priceChange)}
            </div>
        </motion.div>
    );
});

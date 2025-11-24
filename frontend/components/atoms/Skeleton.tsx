/**
 * Skeleton loader component with shimmer effect
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'shimmer';
    width?: string;
    height?: string;
}

export function Skeleton({
    variant = 'shimmer',
    width,
    height,
    className,
    style,
    ...props
}: SkeletonProps) {
    return (
        <div
            className={cn(
                variant === 'shimmer' ? 'skeleton-shimmer' : 'skeleton',
                className
            )}
            style={{
                width,
                height,
                ...style,
            }}
            {...props}
        />
    );
}

/**
 * Skeleton row for table loading
 */
export function SkeletonTokenRow() {
    return (
        <div className="flex items-center gap-4 p-3 border-b border-background-tertiary/50">
            <Skeleton width="40px" height="40px" className="rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton width="120px" height="16px" />
                <Skeleton width="80px" height="14px" />
            </div>
            <Skeleton width="80px" height="20px" />
            <Skeleton width="60px" height="20px" />
            <Skeleton width="60px" height="20px" />
        </div>
    );
}

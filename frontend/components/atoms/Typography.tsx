/**
 * Typography components for consistent text styling
 */

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

export function H1({ className, children, ...props }: TypographyProps) {
    return (
        <h1
            className={cn('text-4xl font-bold text-text-primary', className)}
            {...props}
        >
            {children}
        </h1>
    );
}

export function H2({ className, children, ...props }: TypographyProps) {
    return (
        <h2
            className={cn('text-2xl font-semibold text-text-primary', className)}
            {...props}
        >
            {children}
        </h2>
    );
}

export function H3({ className, children, ...props }: TypographyProps) {
    return (
        <h3
            className={cn('text-lg font-medium text-text-primary', className)}
            {...props}
        >
            {children}
        </h3>
    );
}

export function Text({ className, children, ...props }: TypographyProps) {
    return (
        <p
            className={cn('text-sm text-text-secondary', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function Label({ className, children, ...props }: TypographyProps) {
    return (
        <span
            className={cn('text-xs font-medium text-text-muted uppercase tracking-wider', className)}
            {...props}
        >
            {children}
        </span>
    );
}

/**
 * Reusable Button component with variants
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'preset';
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    active = false,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                // Base styles
                'inline-flex items-center justify-center rounded font-medium',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-accent-blue/50',
                'disabled:opacity-50 disabled:cursor-not-allowed',

                // Variant styles
                {
                    'bg-accent-blue hover:bg-accent-blue/90 text-white':
                        variant === 'primary',
                    'bg-background-tertiary hover:bg-background-tertiary/80 text-text-primary':
                        variant === 'secondary',
                    'bg-transparent hover:bg-background-tertiary/50 text-text-secondary':
                        variant === 'ghost',
                    'bg-background-tertiary text-text-secondary hover:bg-accent-purple/20':
                        variant === 'preset' && !active,
                    'bg-accent-purple text-white':
                        variant === 'preset' && active,
                },

                // Size styles
                {
                    'px-2 py-1 text-xs': size === 'sm',
                    'px-4 py-2 text-sm': size === 'md',
                    'px-6 py-3 text-base': size === 'lg',
                },

                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

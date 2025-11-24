/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Axiom-inspired dark theme colors
                background: {
                    DEFAULT: '#0a0e1a',
                    secondary: '#111827',
                    tertiary: '#1f2937',
                },
                accent: {
                    blue: '#3b82f6',
                    purple: '#8b5cf6',
                    green: '#10b981',
                    red: '#ef4444',
                },
                text: {
                    primary: '#f9fafb',
                    secondary: '#d1d5db',
                    muted: '#9ca3af',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'price-up': 'priceUp 0.5s ease-out',
                'price-down': 'priceDown 0.5s ease-out',
                shimmer: 'shimmer 2s infinite',
            },
            keyframes: {
                priceUp: {
                    '0%': { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
                    '100%': { backgroundColor: 'transparent' },
                },
                priceDown: {
                    '0%': { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
                    '100%': { backgroundColor: 'transparent' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            backgroundImage: {
                'shimmer-gradient':
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            },
        },
    },
    plugins: [],
};

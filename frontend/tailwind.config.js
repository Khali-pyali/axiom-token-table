/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
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
        },
    },
    plugins: [],
};

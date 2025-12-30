/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "selector", // Enables class-based dark mode (.dark class)
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./features/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                display: ['var(--font-plus-jakarta)'],
            },
            animation: {
                blob: "blob 10s infinite",
                "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out 3s infinite",
                "pulse-glow": "pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
        },
    },
    plugins: [],
};

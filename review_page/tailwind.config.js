/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#073B4C',
        'brand-blue': '#118AB2',
        'brand-green': '#06D6A0',
        'brand-yellow': '#FFD166',
        'brand-red': '#FF6B6B',
      }
    }
  },
  plugins: [],
};

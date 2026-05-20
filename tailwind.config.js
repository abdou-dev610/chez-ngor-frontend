/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3E1C00',
          light: '#7B4A2D',
          foreground: '#FEF9F0',
        },
        primary: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
          foreground: '#FFFFFF',
        },
        cream: {
          DEFAULT: '#FEF9F0',
          dark: '#F5E6C8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

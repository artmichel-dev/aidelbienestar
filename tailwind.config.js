/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores de marca para AIdelBienestar
        'bozo-accent': '#5b1329',
        bozo: {
          DEFAULT: '#5b1329',
          light: '#991a41',
          dark: '#5b1329',
        },
      },
      fontFamily: {
        display: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}; 
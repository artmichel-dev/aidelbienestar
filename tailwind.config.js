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
        'bozo-accent': '#660636',
        bozo: {
          DEFAULT: '#660636',
          light: '#8a0848',
          dark: '#3f0320',
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
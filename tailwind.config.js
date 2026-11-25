/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF6EE',
          light: '#FDFBF7',
          dark: '#F0E8D9',
        },
        maroon: {
          DEFAULT: '#4A0E1C',
          deep: '#350812',
          light: '#611627',
          surface: '#521221',
        },
        saffron: {
          DEFAULT: '#F28C28',
          light: '#FFA64D',
          dark: '#D97412',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E0BC45',
          dark: '#A68418',
          hairline: '#C9A227',
          muted: 'rgba(201, 162, 39, 0.25)',
        },
        indigo: {
          DEFAULT: '#12122B',
          deep: '#0B0B1D',
          surface: '#1A1A3A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ceremonial: '.3em',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 162, 39, 0.35)',
        'flame-glow': '0 0 20px rgba(242, 140, 40, 0.55), 0 0 40px rgba(201, 162, 39, 0.3)',
        'maroon-deep': '0 10px 30px rgba(74, 14, 28, 0.2)',
      },
    },
  },
  plugins: [],
};

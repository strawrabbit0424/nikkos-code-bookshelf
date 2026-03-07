/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palenight: {
          bg: '#292D3E',
          surface: '#32374D',
          text: '#A6ACCD',
          cyan: '#82AAFF',
          green: '#C3E88D',
          yellow: '#FFCB6B',
          purple: '#C792EA',
          orange: '#F78C6C',
          comment: '#676E95',
          border: '#454F7A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}

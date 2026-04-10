/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#10b981', // Emerald 500
          hover: '#059669',   // Emerald 600
          light: '#34d399',   // Emerald 400
          dark: '#047857',    // Emerald 700
        },
        dark: {
          DEFAULT: '#020617', // Slate 950
          lighter: '#0f172a', // Slate 900
          surface: '#1e293b', // Slate 800
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

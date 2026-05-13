/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#0B1026',
        primary: '#7C3AED',
        secondary: '#06B6D4',
        accent: '#A3FF12',
        text: {
          primary: '#F8FAFC',
          muted: '#94A3B8',
        },
        border: 'rgba(255,255,255,0.12)',
        error: '#FB7185',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
}

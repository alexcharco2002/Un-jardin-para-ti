/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          cream: '#FDFBF7',
          sunlight: '#FEF3C7',
          glow: '#FDE68A',
          amber: '#F59E0B',
          gold: '#FBBF24',
          deepGold: '#D97706',
          earth: '#451A03',
          earthLight: '#78350F',
          seed: '#B45309',
          stem: '#15803D',
          leafDark: '#166534',
          title: '#2C2520',
          body: '#4A3F35',
          darkBg: '#120E0C',
          darkSurface: '#1C1613',
          darkTitle: '#FEF3C7',
          darkBody: '#E7DDD5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'sway-left': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-3.5deg)' },
        },
        'sway-right': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(3.5deg)' },
        },
        'sway-gentle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        'float-pollen': {
          '0%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.2' },
          '50%': { transform: 'translateY(-60px) translateX(20px)', opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) translateX(-10px)', opacity: '0' },
        },
        'pulse-warm': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        }
      },
      animation: {
        'sway-left': 'sway-left 5.5s ease-in-out infinite',
        'sway-right': 'sway-right 6s ease-in-out infinite',
        'sway-gentle': 'sway-gentle 7s ease-in-out infinite',
        'float-pollen': 'float-pollen 8s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

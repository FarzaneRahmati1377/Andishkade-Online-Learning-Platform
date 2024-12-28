
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["vazir", "sans-serif"], 
      },
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 1s ease forwards',
      },
    },
    
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F1EA',
        parchment: '#E3D9CE',
        oxblood: '#3D0C11',
        maroon: '#6E1B24',
        champagne: '#D4AF7A',
        espresso: '#1A0B0D',
        dusty: '#8C6A6E',
        blush: '#F0E6E4',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 20px 50px -15px rgba(61, 12, 17, 0.08)',
        'editorial-hover': '0 25px 60px -15px rgba(61, 12, 17, 0.14)',
        'phone': '0 30px 70px -15px rgba(26, 11, 13, 0.22), 0 10px 25px -10px rgba(61, 12, 17, 0.15)',
      }
    },
  },
  plugins: [],
}

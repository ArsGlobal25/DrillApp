/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FFD700',
        'primary-black': '#1A1A1A',
      },
      fontFamily: {
        play: ['Play', 'sans-serif']
      }
    },
  },
  plugins: [],
}

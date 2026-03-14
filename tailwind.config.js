/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f2',
          100: '#fbe5e5',
          200: '#f8cccc',
          300: '#f3a6a6',
          400: '#eb7373',
          500: '#e04242',
          600: '#cc2929',
          700: '#a31b1b',
          800: '#8c1a1a',
          900: '#751a1a',
          950: '#3f0909',
        }
      }
    },
  },
  plugins: [],
}

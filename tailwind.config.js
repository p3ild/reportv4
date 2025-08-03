/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    colors: {

      'primary': '#4c7aff',
      'accent': '#EA9256',
      'secondary': ''
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',

      'phone': { 'max': '639px' },
      'tablet': { 'min': '640px', 'max': '1023px' },
      'desktopLow': { 'min': '600px', 'max': '1279px' },
      'desktopMedium': { 'min': '1280px', 'max': '1535px' },
      'desktopHigh': { 'min': '1536px', 'max': '1919px' },
      'desktopUltra': { 'min': '1920px', 'max': '2559px' },
      'desktopUltraHigh': { 'min': '2560px' },
    },
    extend: {},
  },
  plugins: [],
});
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
      'secondary': '',

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
      'desktopLow': { 'min': '300px', 'max': '1279px' },
      'desktopMedium': { 'min': '1280px', 'max': '1535px' },
      'desktopHigh': { 'min': '1536px', 'max': '1919px' },
      'desktopUltra': { 'min': '1920px', 'max': '2559px' },
      'desktopUltraHigh': { 'min': '2560px' },
    },
    extend: {
      keyframes: {
        horizontalBound: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(1px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        scaleDown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
        },
      },
      animation: {
        // scaleDown: 'scaleDown 1s ease-in-out infinite',
        horizontalBound: 'horizontalBound 1s ease-in-out infinite', // Adjust duration and easing
        marquee: 'marquee 15s linear infinite',
        marqueeReverse: 'marqueeReverse 15s linear infinite',
        marqueeLeft: 'marqueeLeft 10s linear infinite',
        marqueeRight: 'marqueeRight 10s linear infinite',
        marqueeFast: 'marquee 8s linear infinite',
        marqueeSlow: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
});
/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  colors: {
    'primary': '#1fb6ff',
    'secondary': ''
  },
  theme: {
    extend: {},
  },
  plugins: [],
});
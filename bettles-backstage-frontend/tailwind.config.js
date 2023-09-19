/** @type {import('tailwindcss').Config} */
import GRID_SETTING from "./src/assest/styles/grid";

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    GRID_SETTING,
    
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blackberry': '#000000',
        'champagne': '#FFF7F0',
        'blueberry': '#371447',
        'plum': '#5F285E',
        'grape': '#8A3575',
        'grapefruit': '#CB3974',
        'seafoam': '#1C988A',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
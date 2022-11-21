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
        'tiffany': '#0ABAB5'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bebas_neue: ["Bebas Neue", "cursive"],
        dancing_script: ["Dancing Script", "cursive"],
        great_vibes: ["Great Vibes", "cursive"],
        josefin_sans: ["Josefin Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        nanum_pen_script: ["Nanum Pen Script", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
}
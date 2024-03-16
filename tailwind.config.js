const colors = require('tailwindcss/colors');

module.exports = {
  content: ["**/*.{html,js}", "**.css"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        secondary: '#1B1A55', // If you want to define a specific color value
        // Or if you want to use a predefined color from Tailwind CSS
        // secondary: colors.teal['500'],
      },
    },
  },
  plugins: [],
};
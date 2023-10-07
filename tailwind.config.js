/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    },
    colors: {
      'bni-blue': '#006699',
      'bni-orange': '#ff6600',

    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}
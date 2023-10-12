/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    },
    colors: {
      'bni-blue': '#008073',
      'bni-orange': '#ff3300',

    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}
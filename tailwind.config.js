/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    },
    colors: {
      // 'bni-blue': '#008073',
      'bni-blue': '#006699',
      'bni-orange': '#ff3300',
      'retur' : '#eb4034'
    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}
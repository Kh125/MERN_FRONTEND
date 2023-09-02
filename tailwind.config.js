/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#6484B4',
        'custom-light-blue': '#C7DBE6',
        'custom-dark': '#282D35',
        'custom-widget-color': '#DEF0FF'
      },
      fontSize: {
        'custom-size-50': '60px',
        'custom-size-30': '30px',
      },
      borderRadius: {
        'custom-t': '40px'
      },
      textColor: {
        'custom-color': '#6484B4',
        'custom-class-title': '#5794EE',
        'custom-time':'#364652'
      },
    },
  },
  plugins: [],
}
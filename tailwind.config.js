/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custom-blue": "#6484B4",
        "custom-semibold-blue": "#C7DBE6",
        "custom-light-blue": "#C7DBE6",
        "custom-dark": "#282D35",
        "custom-widget-color": "#DEF0FF",
        "custom-purple-color": "#C3C2EF",
      },
      fontSize: {
        "custom-size-60": "60px",
        "custom-size-36": "36px",
        "custom-size-30": "30px",
        "custom-size-26": "26px",
        "custom-size-18": "18px",
      },
      borderRadius: {
        "custom-t": "40px",
      },
      textColor: {
        "custom-color": "#6484B4",
        "custom-class-title": "#5794EE",
        "custom-time": "#364652",
        "custom-upcoming-text": "#2F69FC",
        "custom-upcoming-sub-text": "#5794EE",
      },
    },
  },
  plugins: [],
};

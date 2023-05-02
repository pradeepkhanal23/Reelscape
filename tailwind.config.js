/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    screens: {
      sm: "375px",
      md: "810px",
      lg: "1000px",
      xl: "1300px",
    },
    extend: {
      fontFamily: {
        customFont: "'Sen','Cabin Sketch',serif",
      },
    },
  },
  plugins: [],
};

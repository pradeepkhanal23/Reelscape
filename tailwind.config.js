/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: "'Cabin Sketch','Poppins','Montserrat Alternates',serif",
      },
    },
  },
  plugins: [],
};

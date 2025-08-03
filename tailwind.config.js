module.exports = {
  content: ["./**/*.html", "./js/**/*.js"],
  safelist: ["overflow-hidden"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
        baloo: ["Baloo", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // TODO: purely for debug purposes, remove later
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  variants: {},
  plugins: [],
};

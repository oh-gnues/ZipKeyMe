/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pantone': '#6667AB',
        'pantone-light': '#A3A5D9',
        'pantone-dark': '#3D3F6F',
      },
    },
  },
  darkMode: "media", // class
  plugins: [require("@tailwindcss/forms")],
}
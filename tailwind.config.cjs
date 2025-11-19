/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // IMPORTANT: use class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // indigo-500-ish, sesuaikan jika mau
        },
      },
    },
  },
  plugins: [],
};

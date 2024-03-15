/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,hmtl}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

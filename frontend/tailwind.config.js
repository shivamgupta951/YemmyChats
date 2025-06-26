import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "pulse-slower": "pulse 5s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
};

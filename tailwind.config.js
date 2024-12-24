/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BA1B1D",
        secondary: "#f8b200",
      },
      boxShadow: {
        "custom-light":
          "-3px 3px 25px rgba(0, 0, 0, 0.3), 3px -3px 25px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};

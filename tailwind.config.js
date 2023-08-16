/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Rubik, sans-serif",
      secondary: "Anek Bangla, sans-serif",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    extend: {
      colors: {
        body: "#010208",
        white: "#fff",
        pink: "pink",
        transparent: "transparent",
      },
      boxShadow: {
        primary: "rgba(132, 59, 206, 0.15) 0px 4px 24px",
        secondary: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      },
      backgroundImage: {
        clBg: "url('./src/assets/image/clBg.jpeg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Rubik, sans-serif",
      secondary: "Anek Bangla, sans-serif",
    },
    container: {
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
      },
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
        primary: "0px 0px 15px -3px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        clBg: "url('./src/assets/image/clBg.jpeg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

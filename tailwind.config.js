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
        primary: "0px 4px 40px rgba(0, 0, 0, 0.03)",
      },
      backgroundImage: {
        radialBgCircle: "url('/src/assets/img/radial-bg.svg')",
        videoBg: "url('/src/assets/img/video-bg.png')",
        circle: "url('/src/assets/img/circle.png')",
        explore: "url('/src/assets/img/explore.png')",
      },
    },
  },
  plugins: [],
};

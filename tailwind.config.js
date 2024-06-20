/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],

  theme: {
    extend: {
      backgroundImage: {
        main_img: "url('/src/assets/main_bg2.jpg')",
      },
      colors: {
        "main-color": "#2E3A65",
      },
      height: {
        128: "32rem",
      },
      width: {
        128: "75rem",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14287b",
        secondary: "#287ff9",
        tertiary: "#fef22e",
      },
      backgroundImage: {
        "top-banner-bg": "url('/src/assets/images/slide1_3.jpg')",
        "working-process-dotted": "url('/src/assets/images/section-bg1.png')",
        "working-process-bg": "url('/src/assets/images/section-bg16.jpg')",
      },
    },
  },
  plugins: [],
};

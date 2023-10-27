/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d34aa5",
          secondary: "#7296ea",
          accent: "#e0fc8a",
          neutral: "#201c26",
          "base-100": "#303e64",
          info: "#8fb5dc",
          success: "#51e1c7",
          warning: "#edb131",
          error: "#e43825",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};

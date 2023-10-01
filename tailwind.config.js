/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    backgroundSize: {
      "1/2": "50%"
    },
    extend: {
      colors: {
        "color0": "#003558",
        "color1": "#22577A",
        "color2": "#57CC99",
        "color3": "#80ED99",
        "color4": "#C7F9CC"
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#003558",
          "secondary": "#57CC99",
          "accent": "#C7F9CC",
          "neutral": "#80ED99",
          "base-100": "#22577A",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180":{
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d"
    },
    ".perspective": {
      perspective: "1000px"
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden"
    }
  })
})
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back-card-gengar': "url('assets/back-card-gengar.jpg')"
      }
    },
  },
  plugins: [rotateY],
}

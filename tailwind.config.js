/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainPink: "#E7CCCC",
        deepPink: "#EBA0C9",
        lightPink: "#FFEDFA",
        textPrimary: "#093030",
        textSecondary: "#A9A9A9",
        lightGreen: "#DFF7E2",
        greenWhite: "#F1FFF3",
        darkGreen: "#446A46",
        green: "#48734C",
        greenBlack: "#031314",
        bagie: "#FFFDEC",
        peach: "#FFB1B1",
        white: "#fff",
        black: "#000000",
        border: "#c8e6c9",
      },
    },
  },
  plugins: [],
};

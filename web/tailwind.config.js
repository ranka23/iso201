module.exports = {
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
    },
    extend: {
      colors: {
        black: "#333333",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        black: "#333333",
      }),
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}

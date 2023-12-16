import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryColor: "#5FC795",
      primaryLightColor: "#83DDB2",
      black: "#000112",
      linesDark: "#3E3F4E",
      darkGrey: "#2B2C37",
      mediumGrey: "#828FA3",
      linesLight: "#E4EBFA",
      lightGrey: "#F4F7FD",
      white: "#FFFFFF",
      red: "#EA5555",
      lightRed: "#FF9898",
    },
    fontFamily: {
      mainFont: ["Plus Jakarta Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
export default config;

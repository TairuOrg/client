import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Si usas la nueva estructura de app
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],

      }
    },
  },
  plugins: [],
};
export default config;

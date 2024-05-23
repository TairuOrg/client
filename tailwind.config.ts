import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Si usas la nueva estructura de app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/share/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#201d2c',
        secondary: '#ffe98a',
      },
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      },
    },
  },
  safelist: [{ pattern: /grid-cols-[0-9]/, variants: ['lg'] }, 'overflow-hidden', 'basis-full', 'bg-green-400', 'bg-red-400'],
  plugins: [],
};
export default config;

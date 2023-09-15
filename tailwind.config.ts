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
    },
  },
  safelist: [{ pattern: /grid-cols-[0-9]/, variants: ['lg'] }],
  plugins: [],
};
export default config;

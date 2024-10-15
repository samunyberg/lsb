import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#524237',
        accent: '#c9a489',
        accentGreen: '#59cf61',
        accentOrange: '#ffa64d',
        accentRed: '#f77980',
        link: '#873f07',
        accentButtonHover: '#9c7f6a',
        primaryButtonHover: 'rgb(255 255 255 / 0.2)',
        bgSoft: 'rgb(255 255 255 / 0.8)',
        bgSofter: 'rgb(255 255 255 / 0.6)',
        bgMain: 'rgba(251, 215, 199, 255)',
      },
    },
  },
  plugins: [],
};
export default config;

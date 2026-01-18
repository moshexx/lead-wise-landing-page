import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF',
          dark: '#0F172A',
        },
        accent: {
          purple: '#7C3AED',
          light: '#A855F7',
        },
      },
      backgroundImage: {
        'gradient-primary': '#1E40AF',
        'gradient-hero': '#0F172A',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
export default config;

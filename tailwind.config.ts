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
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
export default config;

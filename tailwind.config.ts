import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Pages including dynamic routes
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // App Router pages (if applicable)
    "./node_modules/@nextui-org/theme/dist/components/(card|ripple).js" // NextUI components
  ],
  theme: {
    extend: {
      fontFamily: {
        lemone: ['lemone', 'sans-serif'],
        Burtons: ['Burtons', 'sans-serif'],
        cevaet: ['cevaet', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [nextui()],
};

export default config;

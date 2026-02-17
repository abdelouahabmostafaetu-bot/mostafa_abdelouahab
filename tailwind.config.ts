import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf4',
          100: '#c5d1e3',
          200: '#9eb3d0',
          300: '#7795bd',
          400: '#597eaf',
          500: '#3b67a1',
          600: '#335a8e',
          700: '#294a76',
          800: '#1e3a5f', // Main primary
          900: '#122642',
        },
        accent: {
          50: '#faf6eb',
          100: '#f2e8c9',
          200: '#e8d8a4',
          300: '#dec87f',
          400: '#d4b863',
          500: '#c9a84c', // Main accent/gold
          600: '#b89540',
          700: '#a07d35',
          800: '#88672b',
          900: '#6b5022',
        },
        surface: {
          50: '#f5f7fa',  // Light gray sections
          100: '#ebeef3',
          200: '#dce1e9',
          300: '#c8d0dc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: '#1e3a5f',
              textDecoration: 'underline',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

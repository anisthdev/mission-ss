/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hope Foundation Primary Color - Hope Blue
        hope: {
          50: '#f0f7fa',
          100: '#d9ebf2',
          200: '#b3d7e5',
          300: '#8dc3d8',
          400: '#74a9c3', // Main Hope Blue
          500: '#5a90ab',
          600: '#487388',
          700: '#365666',
          800: '#243a44',
          900: '#121d22',
        },
        // Hope Foundation Secondary Color - Nurture Green
        nurture: {
          50: '#f2faf5',
          100: '#ddf2e6',
          200: '#bce5cd',
          300: '#9ad8b4',
          400: '#93cba8', // Main Nurture Green
          500: '#6fb889',
          600: '#58926d',
          700: '#416d52',
          800: '#2a4936',
          900: '#15241b',
        },
        // Hope Foundation Accent Color - Radiance Gold
        radiance: {
          50: '#fefdf7',
          100: '#fdf9e6',
          200: '#fbf3cd',
          300: '#f9edb4',
          400: '#f7e79b',
          500: '#f4d163', // Main Radiance Gold
          600: '#d4b443',
          700: '#a68d35',
          800: '#786627',
          900: '#4a3f18',
        },
        // Hope Foundation Text Color - Slate Grey
        slate: {
          50: '#f5f6f7',
          100: '#e3e6e8',
          200: '#c7cdd1',
          300: '#abb4ba',
          400: '#8f9ba3',
          500: '#73828c',
          600: '#546e7a', // Main Slate Grey
          700: '#425862',
          800: '#2f4249',
          900: '#1d2c31',
        },
        // Keep sand for backgrounds
        sand: {
          50: '#fafaf8',
          100: '#f5e6d3',
          200: '#ebd4ba',
          300: '#dfc0a0',
          400: '#d4ac86',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}

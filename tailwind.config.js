/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure TSX is included
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Reference the CSS variable for the 'accent' color name
        accent: 'var(--color-accent)',
        // Optionally define shades if needed, referencing other variables
        // accent: {
        //   light: 'var(--color-accent-light)',
        //   DEFAULT: 'var(--color-accent)',
        //   dark: 'var(--color-accent-dark)',
        // }
      }
    },
  },
  plugins: [],
}